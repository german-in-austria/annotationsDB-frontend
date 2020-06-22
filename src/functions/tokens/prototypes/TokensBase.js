/* global _ */
// var _ = require('lodash')
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

const localFunctions = {
  addMultiple (nTokens) {
    // Tokens setzen
    Object.keys(nTokens).map(function (key, i) {
      this.add(key, nTokens[key], true)
    }, this)
    this.update()
  },
  add (nPk, nToken, dontUpdate = false) {
    // Token setzen
    this.tokensObj[nPk] = nToken
    if (!this.tokensObj[nPk].pk) {
      this.tokensObj[nPk].pk = parseInt(nPk)
      this.tokensObj[nPk].iObj = this.root.aInformanten.informantenObj[this.tokensObj[nPk].i]
    }
    if (this.tokensObj[nPk]['fo']) {
      this.updateTokenFragment(nPk, this.tokensObj[nPk]['fo'])
    }
    if (!dontUpdate) { this.update() }
  },
  updateTokenFragment (pkFo, foPk) {
    if (this.aTokenFragmenteObj[foPk]) {
      if (this.aTokenFragmenteObj[foPk].indexOf(pkFo) < 0) {
        this.aTokenFragmenteObj[foPk].push(pkFo)
      }
    } else {
      this.aTokenFragmenteObj[foPk] = [pkFo]
    }
  },
  getTokenString (aToken, field, bField = false) {
    let aTxt = this.getTokenFragment(aToken, field, bField)
    let space = ((aToken.tt === 2) || (aToken.fo > 0 || aTxt[0] === '_') ? '' : '\u00A0')
    if (aTxt[0] === '_') {
      aTxt = aTxt.substr(1)
    };
    return space + aTxt
  },
  getTokenFragment (aToken, field, bField = false) {
    let atTxt = ((bField && !aToken[field]) ? aToken[bField] : aToken[field])
    if (this.aTokenFragmenteObj[aToken.pk] && this.aTokenFragmenteObj[aToken.pk].length === 1) {
      this.aTokenFragmenteObj[aToken.pk].forEach(function (val) {
        let ntTxt = ((bField && !this.tokensObj[val][field]) ? this.tokensObj[val][bField] : this.tokensObj[val][field])
        let aPos = atTxt.lastIndexOf(ntTxt)
        if (aPos > 0) {
          atTxt = atTxt.substr(0, aPos)
        }
      }, this)
    }
    return atTxt
  },
  getTokenStringArray (aToken, fields) {
    let aTxt = this.getTokenFragmentArray(aToken, fields)
    if (aTxt) {
      let space = ((aToken.tt === 2) || (aToken.fo > 0 || aTxt[0] === '_') ? '' : '\u00A0')
      if (aTxt[0] === '_') {
        aTxt = aTxt.substr(1)
      }
      return space + aTxt
    }
    return ''
  },
  getTokenFragmentArray (aToken, fields) {
    let sField = null
    fields.some(aField => {
      sField = aField
      return aToken[aField]
    })
    let atTxt = aToken[sField]
    if (atTxt && this.aTokenFragmenteObj[aToken.pk] && this.aTokenFragmenteObj[aToken.pk].length === 1) {
      this.aTokenFragmenteObj[aToken.pk].forEach(function (val) {
        let xField = null
        fields.some(aField => {
          xField = aField
          return this.tokensObj[val][aField]
        })
        let ntTxt = this.tokensObj[val][xField]
        if (ntTxt) {
          let aPos = atTxt.lastIndexOf(ntTxt)
          if (aPos > 0) {
            atTxt = atTxt.substr(0, aPos)
          }
        }
      }, this)
    }
    return atTxt
  },
  update () {
    // Diverse Updates für weiterführende Daten durchführen
    let t1 = performance.now()
    this.updateTokensLists()
    this.updateATokenTextInf()
    this.updateTokensSVGData()
    console.log('Tokens Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateTokensSVGData () {
    this.tokenLists.all.forEach(function (val) {
      let svgTsObj = this.root.vueObj.$refs.svgTextSize
      let aw = 1
      this.root.aSVG.shownTracks.forEach(aSpur => {
        let aSpurW = this.root.aSVG.getTextWidth(this.getTokenStringArray(val, aSpur.field), svgTsObj, this.svgTwCache)
        if (aSpurW > aw) {
          aw = aSpurW
        }
      })
      val.svgWidth = aw + 2
      if (this.root.aEvents.eventsObj[val.e]) {
        this.root.aEvents.eventsObj[val.e].svgUpdate = true
      }
      delete val.svgUpdate
    }, this)
  },
  updateTokensLists () {
    this.tokenLists = {}
    // Alle Tokens in Liste hinzufügen
    this.tokenLists.all = []
    Object.keys(this.tokensObj).map(function (key) {
      this.tokenLists.all.push(this.tokensObj[key])
    }, this)
    // Tokens nach Reihung sortieren
    this.tokenLists.all.sort((a, b) => { return ((a.tr > b.tr) ? 1 : ((a.tr < b.tr) ? -1 : 0)) })
    // Tokens nach Informanten filtern
    this.tokenLists.byInf = {}
    this.tokenLists.all.forEach(function (val) {
      if (this.tokenLists.byInf[val.i]) {
        this.tokenLists.byInf[val.i].push(val)
      } else {
        this.tokenLists.byInf[val.i] = [val]
      }
    }, this)
    this.updateLength()
  },
  // Anzahl der Tokens setzen
  updateLength () {
    this.length = this.tokenLists.all.length
    return this.length
  },
  setTokenTypes (nTokenTypes) {
    this.aTokenTypes = nTokenTypes
  },
  updateTokenData (nToken, nAntwort) {
    nToken = _.cloneDeep(nToken)
    nAntwort = _.cloneDeep(nAntwort)
    let aTPK = nToken.pk
    this.tokensObj[aTPK].svgUpdate = true
    this.root.allTracks.forEach(aTrack => {
      this.tokensObj[aTPK][aTrack.field[0]] = nToken[aTrack.field[0]]
    })
    this.tokensObj[aTPK].tt = nToken.tt
    this.tokensObj[aTPK].le = nToken.le
    this.tokensObj[aTPK].stp = nToken.stp
    this.tokensObj[aTPK].etp = nToken.etp
    if (!nToken.delAntwort && nToken.aId) {
      if (nAntwort.it > 0 && nAntwort.it !== aTPK) {
        delete this.root.aTokens.tokensObj[nAntwort.it].aId
        this.root.aTokens.tokensObj[nAntwort.it].changed = true
        this.root.vueObj.$set(this.root.aAntworten, 'moveAntwortId', null)
      } else if (nAntwort.its > 0) {
        delete this.root.aTokenSets.tokenSetsObj[nAntwort.its].aId
        this.root.aTokenSets.tokenSetsObj[nAntwort.its].changed = true
        delete nAntwort.its
        this.root.vueObj.$set(this.root.aAntworten, 'moveAntwortId', null)
      }
      nAntwort.it = aTPK
      nAntwort.vi = nToken.i
      this.tokensObj[aTPK].aId = this.root.aAntworten.set(parseInt(nToken.aId), nAntwort)
      this.root.aAntworten.antwortenObj[this.tokensObj[aTPK].aId].changed = true
    }
    if (nToken.delAntwort && nToken.aId) {
      console.log('del', nToken.aId)
      this.root.aAntworten.del(nToken.aId)
      delete nToken.delAntwort
    }
    this.tokensObj[aTPK].changed = true
    this.root.changed = true
    console.log('updateTokenData', nToken, '->', this.tokensObj[aTPK])
    this.root.update()
  },
  getNextPrev (aToken, next = true) {
    let nToken = null
    if (!aToken) {
      nToken = next ? this.tokenLists.all[0] : this.tokenLists.all[this.tokenLists.all.length - 1]
    } else {
      let aTokReihung = this.tokenLists.byInf[aToken.i]
      let aPos = aTokReihung.indexOf(aToken)
      if (next) {
        nToken = (aPos < aTokReihung.length - 1) ? aTokReihung[aPos + 1] : aTokReihung[0]
      } else {
        nToken = (aPos > 0) ? aTokReihung[aPos - 1] : aTokReihung[aTokReihung.length - 1]
      }
    }
    return nToken
  },
  sortTokenIdListe (aEListe) {
    var nEListe = []
    this.tokenLists.all.forEach(function (val) {
      if (aEListe.indexOf(val.pk) >= 0) {
        nEListe.push(val.pk)
      }
    }, this)
    return nEListe
  },
  updateATokenTextInf () {
    this.aTokenTextInf = {}
    var t0 = performance.now()
    Object.keys(this.tokenLists.byInf).forEach(function (aInfKey) {
      if (!this.aTokenTextInf[aInfKey]) {
        this.aTokenTextInf[aInfKey] = {'tokens': {}}
        this.root.aTranskript.allTracks.forEach(function (aTrack) {
          if (aTrack.show) {
            this.aTokenTextInf[aInfKey][aTrack.title] = ''
          }
        }, this)
      }
      let aInfTokens = this.tokenLists.byInf[aInfKey]
      aInfTokens.forEach(function (aToken) {
        if (this.root.aTranskript) {
          this.root.aTranskript.allTracks.forEach(function (aTrack) {
            if (aTrack.show) {
              let vPos = this.aTokenTextInf[aInfKey][aTrack.title].length
              let aTxt = this.getTokenStringArray(aToken, aTrack.field).replace(String.fromCharCode(160), ' ')
              let bPos = vPos + aTxt.length - 1
              this.aTokenTextInf[aInfKey][aTrack.title] += aTxt
              if (!this.aTokenTextInf[aInfKey].tokens[aToken.pk]) {
                this.aTokenTextInf[aInfKey].tokens[aToken.pk] = {}
              }
              this.aTokenTextInf[aInfKey].tokens[aToken.pk][aTrack.title] = {'v': vPos, 'b': bPos}
            }
          }, this)
        }
      }, this)
    }, this)
    console.log('updateATokenTextInf: ' + Math.ceil(performance.now() - t0) + ' ms', this.aTokenTextInf)
    // console.log(this.aTokenTextInf)
  },
  naechsterSuchToken (next = true) {
    console.log('naechsterSuchToken')
    if (this.foundTokensList.length > 0) {
      this.root.selectedToken = AllgemeineFunktionen.wertNachWert(this.foundTokensList, this.root.selectedToken, next, true)
    } else {
      this.root.vueObj.$refs.suchenUndFiltern.focusSuche()
    }
  }
}

export default localFunctions
