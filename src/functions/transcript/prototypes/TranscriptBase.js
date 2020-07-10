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
              if (this.aTranskript.tiers && this.aTranskript.tiers.length > 0) {
                this.aTranskript.tiersObj = {}
                this.aTranskript.tiers.forEach(aTier => {
                  this.aTranskript.tiersObj[aTier.pk] = aTier
                })
              }
              this.aEinzelErhebung = response.data['aEinzelErhebung']
              this.aTokens.setTokenTypes(response.data['aTokenTypes'])
              this.aSaetze = response.data['aSaetze']
              this.aInformanten.set(response.data['aInformanten'])
            }
            this.aTokens.addMultiple(response.data['aTokens'])
            this.aEvents.addMultiple(response.data['aEvents'])
            this.aTokenSets.addMultiple(response.data['aTokenSets'])
            this.aEventSets.addMultiple(response.data['aEventSets'])
            this.aAntworten.addMultiple(response.data['aAntworten'])
            this.aSVG.updateZeilen()
            console.log('getTranscript', this.pk, tmpLSet, this.lMaxSet, '- Daten verarbeitet', (performance.now() - t1).toFixed(2), 'ms', response.data)
            this.ready = true
            if (tmpLSet === response.data['nNr']) {
              this.update()
              console.log('Alle Datensätze geladen.', this.pk, '-', (performance.now() - this.timer).toFixed(2), 'ms', this)
            }
            // Überprüfen ob die Reihungen stimmen:
            Object.keys(this.aTokens.tokenLists.byInf).forEach(aInfId => {
              let aInf = this.aTokens.tokenLists.byInf[aInfId]
              let lToken = null
              aInf.forEach(aToken => {
                if (lToken !== null) {
                  if (lToken.tr + 1 !== aToken.tr) {
                    let aError = 'Tokenreihung stimmt nicht! - token 1 id:' + lToken.pk + ', Reihung: ' + lToken.tr + ' - token 2 id: ' + aToken.pk + ', Reihung: ' + aToken.tr
                    if (this.errors.indexOf(aError) < 0) {
                      this.errors.push(aError)
                    }
                  }
                }
                lToken = aToken
              })
            })
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
  selectedEventBereichUpdate () {
    if (this.selectedEventBereich.v && this.selectedEventBereich.b) {
      if (this.selectedEventBereich.v === this.selectedEventBereich.b) {
        this.selectedEventBereich = {'v': null, 'b': null}
        this.aSVG.selectedEventList = []
        return true
      }
      this.selectedEventListe = []
      let vListPos = this.aEvents.eventLists.all.indexOf(this.selectedEventBereich.v)
      let bListPos = this.aEvents.eventLists.all.indexOf(this.selectedEventBereich.b)
      if (vListPos > bListPos) { var temp = vListPos; vListPos = bListPos; bListPos = temp }
      this.aSVG.selectedEventList = this.aEvents.eventLists.all.slice(vListPos, bListPos + 1)
    } else {
      if (this.selectedEventListe.length < 1) {
        this.aSVG.selectedEventList = []
      }
    }
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
      changedEventSets: {},
      deletedTokenSets: [],
      deletedEventSets: [],
      changedAntworten: {},
      deletedAntworten: []
    }
    // Tokens
    let aTokenPropertiesFilter = ['pk', 'a', 'tt', 'tr', 'e', 'i', 's', 'sr', 'fo', 'le', 'stp', 'etp', ...this.allTracks.map(aTrack => aTrack.field[0])]
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
    // EventSets
    this.aEventSets.eventSetsLists.all.forEach(function (val) {
      if (val.changed) {
        cData.changedEventSets[val.id] = AllgemeineFunktionen.filterProperties(val, ['id', 'a', 'id_von_event_id', 'id_bis_event_id'])
      }
    })
    Object.keys(this.aEventSets.delEventSetsObj).forEach(function (val) {
      if (val > 0) {
        cData.deletedEventSets.push(parseInt(val))
      }
    })
    // Antworten
    this.aAntworten.antwortLists.all.forEach(function (val) {
      if (val.changed) {
        cData.changedAntworten[val.pk] = AllgemeineFunktionen.filterProperties(val, ['pk', 'vi', 'inat', 'is', 'ibfl', 'it', 'its', 'ies', 'bds', 'sa', 'ea', 'k'])
        // Tags
        if (val.tags) {
          cData.changedAntworten[val.pk].tags = getFlatTags(val.tags)
        } else {
          cData.changedAntworten[val.pk].tags = null
        }
      }
    })
    cData.deletedAntworten = Object.keys(this.aAntworten.delAntworten).filter(val => val > 0).map(val => parseInt(val))
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
          alert(response.data.gespeichert.errors.reduce((errTxt, aErr) => errTxt + JSON.stringify(aErr) + ' \n', 'Fehler!\nEs kam beim speichern zu Fehlern!\n-----\n'))
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
        // changedEventSets
        Object.keys(response.data.gespeichert.changedEventSets).forEach(changedEventSetId => {
          let aChangedEventSet = response.data.gespeichert.changedEventSets[changedEventSetId]
          if (aChangedEventSet.saved) {
            aChangedEventSet.id = aChangedEventSet.nId
            delete aChangedEventSet.nId
            console.log(changedEventSetId, this.aEventSets.eventSetsObj[changedEventSetId], this)
            this.aEventSets.directDeleteAEventSet(changedEventSetId)
            this.aEventSets.add(aChangedEventSet.id, aChangedEventSet, true)
          }
        })
        // deletedEventSets
        response.data.gespeichert.deletedEventSets.forEach(delEventSetId => {
          let ok = true
          response.data.gespeichert.errors.forEach(aErr => {
            if (aErr.type === 'deletedEventSets' && aErr.id === delEventSetId) {
              ok = false
            }
          })
          if (ok) {
            delete this.aEventSets.delEventSetsObj[delEventSetId]
          }
        })
        this.aEventSets.update()
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
  return aTags.map(val => { return {'e': val.e, 't': getFlatTagsX(val.tags)} })
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
