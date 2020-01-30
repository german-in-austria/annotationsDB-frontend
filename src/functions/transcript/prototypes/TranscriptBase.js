/* global _ */
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

const localFunctions = {
  init () {
    console.log('init TranscriptBase', this.pk)
    console.log(this)
    this.timer = performance.now()
    return this.getTranscript()
  },
  // Transkript Daten laden
  getTranscript () {
    // console.log('getTranscript', this.pk, this.lSet, this.lMaxSet)
    if (!this.loaded) {
      this.loading = true
      this.vueObj.$http
        .post('', {
          getTranskript: this.pk,
          aType: (this.lSet === 0 ? 'start' : null),
          aNr: this.lSet
        })
        .then((response) => {
          if (this.vueObj.selTranscriptPk === this.pk) {
            let t1 = performance.now()
            let tmpLSet = this.lSet
            this.loading = false
            if (this.lSet === response.data['nNr']) {
              this.lSet = response.data['nNr']
              this.loaded = true
            } else if (this.loaded === false) {
              this.lSet = response.data['nNr']
              this.getTranscript()
            }
            if (tmpLSet === 0) {    // Einmalige Daten aus erster Abfrage laden
              // console.log(response)
              this.lMaxSet = response.data['aTmNr']
              this.aTranskript = response.data['aTranskript']
              this.allTracks = _.cloneDeep(this.aTranskript.allTracks)
              this.aSVG.updateShownTracks()
              this.aEinzelErhebung = response.data['aEinzelErhebung']
              this.aTokens.setTokenTypes(response.data['aTokenTypes'])
              this.aSaetze = response.data['aSaetze']
              this.aInformanten.set(response.data['aInformanten'])
            }
            this.aTokens.addMultiple(response.data['aTokens'])
            this.aEvents.addMultiple(response.data['aEvents'])
            this.aTokenSets.addMultiple(response.data['aTokenSets'])
            this.aAntworten.addMultiple(response.data['aAntworten'])
            this.aSVG.updateZeilen()
            console.log('getTranscript', this.pk, tmpLSet, this.lMaxSet, '- Daten verarbeitet', (performance.now() - t1).toFixed(2), 'ms')
            this.ready = true
            if (tmpLSet === response.data['nNr']) {
              this.update()
              console.log('Alle Datensätze geladen.', this.pk, '-', (performance.now() - this.timer).toFixed(2), 'ms', this)
            }
          } else {
            console.log('Ladevorgang für', this.pk, 'abgebrochen!')
          }
        })
        .catch((err) => {
          console.log(err)
          alert('Fehler!')
          this.loading = false
          this.error = true
        })
    }
    return !this.loaded
  },
  update () {
    this.aTokens.update()
    this.aEvents.update()
    this.aTokenSets.update()
    this.aAntworten.update()
    this.aSVG.updateZeilen()
  },
  selectedTokenBereichUpdate () {
    if (this.selectedTokenBereich.v && this.selectedTokenBereich.b) {
      if ((this.selectedTokenBereich.v.iObj !== this.selectedTokenBereich.b.iObj) || this.selectedTokenBereich.v === this.selectedTokenBereich.b) {
        this.selectedTokenBereich = {'v': null, 'b': null}
        this.aSVG.selectedTokenList = []
        return true
      }
      this.selectedTokenListe = []
      let tokenList = this.aTokens.tokenLists.byInf[this.selectedTokenBereich.v.iObj.pk]
      if (tokenList) {
        let vListPos = tokenList.indexOf(this.selectedTokenBereich.v)
        let bListPos = tokenList.indexOf(this.selectedTokenBereich.b)
        if (vListPos > bListPos) { var temp = vListPos; vListPos = bListPos; bListPos = temp }
        this.aSVG.selectedTokenList = tokenList.slice(vListPos, bListPos + 1)
      } else {
        this.aSVG.selectedTokenList = []
      }
    } else {
      if (this.selectedTokenListe.length < 1) {
        this.aSVG.selectedTokenList = []
      }
    }
  },
  toggleSelectedTokenListe (eTok = undefined) {
    if (eTok !== undefined) {
      this.selTokenBereich = {'v': null, 'b': null}
      if (this.selectedTokenListe.indexOf(eTok) > -1) {
        this.selectedTokenListe.splice(this.selectedTokenListe.indexOf(eTok), 1)
      } else {
        if (this.selectedTokenListe.length < 1 || eTok.iObj === this.selectedTokenListe[0].iObj) {
          this.selectedTokenListe.push(eTok)
        } else {
          this.selectedTokenListe = []
        }
      }
    }
    this.aSVG.selectedTokenList = this.selectedTokenListe
  },
  getChangedData () {
    let cData = {
      changedTokens: {},
      changedTokenSets: {},
      deletedTokenSets: [],
      changedAntworten: {},
      deletedAntworten: []
    }
    // Tokens
    let aTokenPropertiesFilter = ['pk', 'a', 'tt', 'tr', 'e', 'i', 's', 'sr', 'fo', 'le']
    this.allTracks.forEach(aTrack => {
      aTokenPropertiesFilter.push(aTrack.field[0])
    })
    this.aTokens.tokenLists.all.forEach(function (val) {
      if (val.changed) {
        cData.changedTokens[val.pk] = AllgemeineFunktionen.filterProperties(val, aTokenPropertiesFilter)
      }
    })
    // TokenSets
    this.aTokenSets.tokenSetsLists.all.forEach(function (val) {
      if (val.changed) {
        cData.changedTokenSets[val.pk] = AllgemeineFunktionen.filterProperties(val, ['pk', 'a', 'ivt', 'ibt', 't'])
      }
    })
    Object.keys(this.aTokenSets.delTokenSetsObj).forEach(function (val) {
      if (val > 0) {
        cData.deletedTokenSets.push(parseInt(val))
      }
    })
    // Antworten
    this.aAntworten.antwortLists.all.forEach(function (val) {
      if (val.changed) {
        cData.changedAntworten[val.pk] = AllgemeineFunktionen.filterProperties(val, ['pk', 'vi', 'inat', 'is', 'ibfl', 'it', 'its', 'bds', 'sa', 'ea', 'k'])
        // Tags
        if (val.tags) {
          cData.changedAntworten[val.pk].tags = getFlatTags(val.tags)
        } else {
          cData.changedAntworten[val.pk].tags = null
        }
      }
    })
    Object.keys(this.aAntworten.delAntworten).forEach(function (val) {
      if (val > 0) {
        cData.deletedAntworten.push(parseInt(val))
      }
    })
    return cData
  },
  save () {
    let sData = this.getChangedData()
    console.log('Transcript speichern', sData)
    this.loading = true
    this.saving = true
    this.vueObj.$http
      .post('', {
        speichern: JSON.stringify(sData)
      })
      .then((response) => {
        console.log('Transcript gespeichert', response.data)
        if (response.data.gespeichert.errors.length > 0) {
          let errTxt = ''
          response.data.gespeichert.errors.forEach(aErr => {
            errTxt += JSON.stringify(aErr) + ' \n'
          })
          alert('Fehler!\nEs kam beim speichern zu Fehlern!\n-----\n' + errTxt)
        }
        // changedTokens
        Object.keys(response.data.gespeichert.changedTokens).forEach(changedTokenId => {
          if (response.data.gespeichert.changedTokens[changedTokenId].saved) {
            delete this.aTokens.tokensObj[changedTokenId].changed
          }
        })
        // changedTokenSets
        Object.keys(response.data.gespeichert.changedTokenSets).forEach(changedTokenSetId => {
          let aChangedTokenSet = response.data.gespeichert.changedTokenSets[changedTokenSetId]
          if (aChangedTokenSet.saved) {
            aChangedTokenSet.pk = aChangedTokenSet.nId
            delete aChangedTokenSet.nId
            console.log(changedTokenSetId, this.aTokenSets.tokenSetsObj[changedTokenSetId], this)
            this.aTokenSets.directDeleteATokenSet(changedTokenSetId)
            this.aTokenSets.add(aChangedTokenSet.pk, aChangedTokenSet, true)
          }
        })
        // deletedTokenSets
        response.data.gespeichert.deletedTokenSets.forEach(delTokenSetId => {
          let ok = true
          response.data.gespeichert.errors.forEach(aErr => {
            if (aErr.type === 'deletedTokenSets' && aErr.id === delTokenSetId) {
              ok = false
            }
          })
          if (ok) {
            delete this.aTokenSets.delTokenSetsObj[delTokenSetId]
          }
        })
        this.aTokenSets.update()
        // changedAntworten
        Object.keys(response.data.gespeichert.changedAntworten).forEach(changedAntwortId => {
          let aChangedAntworten = response.data.gespeichert.changedAntworten[changedAntwortId]
          if (aChangedAntworten.saved) {
            aChangedAntworten.pk = aChangedAntworten.nId
            delete aChangedAntworten.nId
            console.log(changedAntwortId, this.aAntworten.antwortenObj[changedAntwortId], this)
            if (changedAntwortId < 1) { this.aAntworten.del(changedAntwortId, true) }
            this.aAntworten.add(aChangedAntworten.pk, aChangedAntworten, true)
          }
        })
        // deletedAntworten
        response.data.gespeichert.deletedAntworten.forEach(delAntwortId => {
          let ok = true
          response.data.gespeichert.errors.forEach(aErr => {
            if (aErr.type === 'deletedAntworten' && aErr.id === delAntwortId) {
              ok = false
            }
          })
          if (ok) {
            this.aAntworten.del(delAntwortId, true)
            delete this.aAntworten.delAntworten[delAntwortId]
          }
        })
        this.aAntworten.update()
        this.update()
        this.aSVG.updateZeilen()
        this.changed = false
        this.unsaved = false
        this.loading = false
        this.saving = false
      })
      .catch((err) => {
        console.log(err)
        alert('Fehler!')
        this.loading = false
        this.saving = false
      })
  }
}

function getFlatTags (aTags) {
  var fTags = []
  aTags.forEach(function (val) {
    fTags.push({'e': val.e, 't': getFlatTagsX(val.tags)})
  })
  return fTags
}
function getFlatTagsX (aTags) {
  var fTags = []
  aTags.forEach(function (val) {
    var aTag = {'i': val.id, 't': val.tag}
    fTags.push(aTag)
    if (val.tags) {
      getFlatTagsX(val.tags).forEach(function (sVal) {
        fTags.push(sVal)
      })
    }
  })
  return fTags
}

export default localFunctions
