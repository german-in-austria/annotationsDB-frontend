/* global _ */
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'
// var _ = require('lodash')

const localFunctions = {
  addMultiple (nTokenSets) {
    // TokenSets setzen
    Object.keys(nTokenSets).map(function (key, i) {
      this.add(key, nTokenSets[key], true)
    }, this)
    this.update()
  },
  add (nPk, nTokenSet, dontUpdate = false, changed = false) {
    // TokenSet setzen
    if (nPk === 'new') {
      nPk = this.getNextUnusedPk()
    }
    this.tokenSetsObj[nPk] = nTokenSet
    if (!this.tokenSetsObj[nPk].pk) {
      this.tokenSetsObj[nPk].pk = parseInt(nPk)
    }
    if (changed) { this.tokenSetsObj[nPk].changed = true }
    if (!dontUpdate) { this.update() }
  },
  getNextUnusedPk () {
    let nPk = -1
    while (this.tokenSetsObj[nPk]) {
      nPk -= 1
    }
    return nPk
  },
  update () {
    // Diverse Updates für weiterführende Daten durchführen
    let t1 = performance.now()
    this.updateTokenSetsLists()
    this.updateTokenSetsData()
    this.updateLength()
    console.log('TokenSets Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateTokenSetsLists () {
    this.tokenSetsLists = {}
    // Alle TokenSets in Liste hinzufügen
    this.tokenSetsLists.all = []
    Object.keys(this.tokenSetsObj).map(function (key) {
      this.tokenSetsLists.all.push(this.tokenSetsObj[key])
    }, this)
  },
  updateTokenSetsData () {
    // Verbindung bei Tokens zu TokenSets überprüfen ob die Tokens noch verwendet werden
    Object.keys(this.root.aTokens.tokensObj).map(function (tId, iI) {
      let aToken = this.root.aTokens.tokensObj[tId]
      if (aToken.tokenSetsList) {
        _.remove(aToken.tokenSetsList, (n) => {
          return (!n || !n.ok)
        })
        if (aToken.tokenSetsList.length < 1) {
          delete aToken.tokenSetsList
        }
      }
    }, this)
    // TokenSets aktualisieren/berechnen
    this.tokenSetsLists.all.forEach(function (aTokSet) {
      if (!aTokSet.ok) {
        // Tokens aus Bereich laden ...
        if (aTokSet.ivt) {
          let aInf = this.root.aTokens.tokensObj[aTokSet.ivt].i
          let aTokListByInf = this.root.aTokens.tokenLists.byInf[aInf]
          let ivtIdx = AllgemeineFunktionen.searchByKey(aTokSet.ivt, 'pk', aTokListByInf)
          let ibtIdx = AllgemeineFunktionen.searchByKey(aTokSet.ibt, 'pk', aTokListByInf)
          if (ivtIdx > -1 && ibtIdx > -1) {
            if (ivtIdx > ibtIdx) {
              console.log('TokenSet Reihenfolge korrigieren', aTokSet)
              let tmp = aTokSet.ivt
              aTokSet.ivt = aTokSet.ibt
              aTokSet.ibt = tmp
              aTokSet.changed = true
              this.root.changed = true
              this.root.unsaved = true
            }
            // ;[ivtIdx, ibtIdx] = [ivtIdx, ibtIdx].sort()
            aTokSet.tx = aTokListByInf.slice(ivtIdx, ibtIdx + 1)
            aTokSet.ok = aTokSet.tx.length > 0
          }
        // Tokens aus Liste laden ...
        } else if (aTokSet.t && AllgemeineFunktionen.listeWerteInListe(aTokSet.t, this.root.aTokens.tokenLists.all, 'pk')) {
          aTokSet.tObj = []
          let missToken = false
          aTokSet.t.some(function (tId) {
            if (!this.root.aTokens.tokensObj[tId]) {
              missToken = true
              return true
            }
          }, this)
          if (!missToken) {
            aTokSet.t = this.root.aTokens.sortTokenIdListe(aTokSet.t)
            aTokSet.t.some(function (tId) {
              if (this.root.aTokens.tokensObj[tId]) {
                aTokSet.tObj.push(this.root.aTokens.tokensObj[tId])
              }
            }, this)
            aTokSet.ok = aTokSet.tObj.length > 0
          }
        }
        // Verwendeten Tokens aktuelles TokenSet zuweisen
        var xt = aTokSet.tObj || aTokSet.tx
        if (xt && aTokSet.ok) {
          xt.forEach(function (tId) {
            if (this.root.aTokens.tokensObj[tId.pk]) {
              if (!this.root.aTokens.tokensObj[tId.pk].tokenSetsList) {
                this.root.aTokens.tokensObj[tId.pk].tokenSetsList = []
              }
              if (this.root.aTokens.tokensObj[tId.pk].tokenSetsList.indexOf(aTokSet) < 0) {
                this.root.aTokens.tokensObj[tId.pk].tokenSetsList.push(aTokSet)
              }
              this.root.aTokens.tokensObj[tId.pk].tokenSetsList = this.sortTokenSets(this.root.aTokens.tokensObj[tId.pk].tokenSetsList)
            }
          }, this)
        }
      }
    }, this)
  },
  updateLength () {
    // Anzahl der TokenSets setzen
    this.length = Object.keys(this.tokenSetsObj).length
    return this.length
  },
  sortTokenSets: function (tokSets) {
    // TokenSets sortieren
    return tokSets.slice().sort((a, b) => {
      var xa = this.root.aTokens.tokenLists.all.indexOf((a.tObj || a.tx)[0])
      var xb = this.root.aTokens.tokenLists.all.indexOf((b.tObj || b.tx)[0])
      if (xa > xb) { return 1 }
      if (xa < xb) { return -1 }
      var aTSa = a.tObj || a.tx
      var aTSb = b.tObj || b.tx
      xa = this.root.aTokens.tokenLists.all.indexOf(aTSa[aTSa.length - 1])
      xb = this.root.aTokens.tokenLists.all.indexOf(aTSb[aTSb.length - 1])
      if (xa < xb) { return 1 }
      if (xa > xb) { return -1 }
      if (a.t && b.tx) { return 1 }
      if (a.tx && b.t) { return -1 }
      return 0
    })
  },
  updateTokenSetData (nTokenSet, nAntwort) {
    // TokenSet ändern
    nTokenSet = _.cloneDeep(nTokenSet)
    nAntwort = _.cloneDeep(nAntwort)
    let aTSPK = nTokenSet.pk
    if (!nTokenSet.delAntwort && nTokenSet.aId) {
      nAntwort.its = aTSPK
      this.tokenSetsObj[aTSPK].aId = this.root.aAntworten.set(parseInt(nTokenSet.aId), nAntwort)
      this.root.aAntworten.antwortenObj[this.tokenSetsObj[aTSPK].aId].changed = true
    }
    if (nTokenSet.delAntwort && nTokenSet.aId) {
      console.log('del', nTokenSet.aId)
      this.root.aAntworten.del(nTokenSet.aId)
      delete nTokenSet.delAntwort
    }
    this.tokenSetsObj[aTSPK].ok = false
    this.root.changed = true
    console.log('updateTokenSetData', nTokenSet, '->', this.tokenSetsObj[aTSPK], '|', nAntwort, '->', this.root.aAntworten.antwortenObj[this.tokenSetsObj[aTSPK].aId])
    this.root.update()
  },
  deleteATokenSet: function (delTokenSet, direkt = false, aDirekt = false) {
    // TokenSet löschen
    let aTSPK = delTokenSet.pk
    if (direkt || confirm('Soll das TokenSet ID ' + aTSPK + ' gelöscht werden?')) {
      if ((delTokenSet.aId && this.root.aAntworten.antwortenObj[delTokenSet.aId]) && ((aDirekt) || confirm('Soll die dazugehörige Antwort auch gelöscht werden?'))) {
        this.root.aAntworten.set(delTokenSet.aId)
      }
      this.tokenSetsObj[aTSPK].ok = false
      this.delTokenSetsObj[aTSPK] = delTokenSet
      delete this.tokenSetsObj[aTSPK]
      this.root.changed = true
      this.root.update()
      console.log('TokenSet ID ' + aTSPK + ' gelöscht!')
      return true
    }
  },
  directDeleteATokenSet: function (delTokenSetId) {
    this.tokenSetsObj[delTokenSetId].ok = false
    delete this.tokenSetsObj[delTokenSetId]
  }
}

export default localFunctions
