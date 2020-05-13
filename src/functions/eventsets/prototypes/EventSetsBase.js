/* global _ */
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'
// var _ = require('lodash')

const localFunctions = {
  addMultiple (nEventSets) {
    // EventSets setzen
    Object.keys(nEventSets).map(function (key, i) {
      this.add(key, nEventSets[key], true)
    }, this)
    this.update()
  },
  add (nPk, nEventSet, dontUpdate = false, changed = false) {
    // EventSet setzen
    if (nPk === 'new') {
      nPk = this.getNextUnusedPk()
    }
    this.eventSetsObj[nPk] = nEventSet
    if (!this.eventSetsObj[nPk].pk) {
      this.eventSetsObj[nPk].pk = parseInt(nPk)
    }
    if (changed) { this.eventSetsObj[nPk].changed = true }
    if (!dontUpdate) { this.update() }
  },
  getNextUnusedPk () {
    let nPk = -1
    while (this.eventSetsObj[nPk]) {
      nPk -= 1
    }
    return nPk
  },
  update () {
    // Diverse Updates für weiterführende Daten durchführen
    let t1 = performance.now()
    this.updateEventSetsLists()
    this.updateEventSetsData()
    this.updateLength()
    console.log('EventSets Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateEventSetsLists () {
    this.eventSetsLists = {}
    // Alle EventSets in Liste hinzufügen
    this.eventSetsLists.all = []
    Object.keys(this.eventSetsObj).map(function (key) {
      this.eventSetsLists.all.push(this.eventSetsObj[key])
    }, this)
  },
  updateEventSetsData () {
    // ToDo: Verbindung bei Events zu EventSets überprüfen ob die Events noch verwendet werden
    // Object.keys(this.root.aTokens.tokensObj).map(function (tId, iI) {
    //   let aToken = this.root.aTokens.tokensObj[tId]
    //   if (aToken.eventSetsList) {
    //     _.remove(aToken.eventSetsList, (n) => {
    //       return (!n || !n.ok)
    //     })
    //     if (aToken.eventSetsList.length < 1) {
    //       delete aToken.eventSetsList
    //     }
    //   }
    // }, this)
    // EventSets aktualisieren/berechnen
    this.eventSetsLists.all.forEach(function (aEveSet) {
      if (!aEveSet.ok) {
        // ToDo: Events aus Bereich laden ...
        // let aInf = this.root.aTokens.tokensObj[aEveSet.ivt].i
        // let aTokListByInf = this.root.aTokens.tokenLists.byInf[aInf]
        // let ivtIdx = AllgemeineFunktionen.searchByKey(aEveSet.ivt, 'pk', aTokListByInf)
        // let ibtIdx = AllgemeineFunktionen.searchByKey(aEveSet.ibt, 'pk', aTokListByInf)
        // if (ivtIdx > ibtIdx) {
        //   console.log('EventSet Reihenfolge korrigieren', aEveSet)
        //   let tmp = aEveSet.ivt
        //   aEveSet.ivt = aEveSet.ibt
        //   aEveSet.ibt = tmp
        //   aEveSet.changed = true
        //   this.root.changed = true
        //   this.root.unsaved = true
        // }
        // // ;[ivtIdx, ibtIdx] = [ivtIdx, ibtIdx].sort()
        // aEveSet.tx = aTokListByInf.slice(ivtIdx, ibtIdx + 1)
        // aEveSet.ok = aEveSet.tx.length > 0
        // ToDo: Verwendeten Events aktuelles EventSet zuweisen
        // var xt = aEveSet.tx
        // if (xt && aEveSet.ok) {
        //   xt.forEach(function (tId) {
        //     if (this.root.aTokens.tokensObj[tId.pk]) {
        //       if (!this.root.aTokens.tokensObj[tId.pk].eventSetsList) {
        //         this.root.aTokens.tokensObj[tId.pk].eventSetsList = []
        //       }
        //       if (this.root.aTokens.tokensObj[tId.pk].eventSetsList.indexOf(aEveSet) < 0) {
        //         this.root.aTokens.tokensObj[tId.pk].eventSetsList.push(aEveSet)
        //       }
        //       this.root.aTokens.tokensObj[tId.pk].eventSetsList = this.sortEventSets(this.root.aTokens.tokensObj[tId.pk].eventSetsList)
        //     }
        //   }, this)
        // }
      }
    }, this)
  },
  updateLength () {
    // Anzahl der EventSets setzen
    this.length = Object.keys(this.eventSetsObj).length
    return this.length
  },
  sortEventSets: function (eveSets) {
    // EventSets sortieren
    return eveSets.slice().sort((a, b) => {
      // ToDo: Sortierung
      // var xa = this.root.aTokens.tokenLists.all.indexOf((a.tx)[0])
      // var xb = this.root.aTokens.tokenLists.all.indexOf((b.tx)[0])
      // if (xa > xb) { return 1 }
      // if (xa < xb) { return -1 }
      // var aTSa = a.tx
      // var aTSb = b.tx
      // xa = this.root.aTokens.tokenLists.all.indexOf(aTSa[aTSa.length - 1])
      // xb = this.root.aTokens.tokenLists.all.indexOf(aTSb[aTSb.length - 1])
      // if (xa < xb) { return 1 }
      // if (xa > xb) { return -1 }
      // if (a.t && b.tx) { return 1 }
      // if (a.tx && b.t) { return -1 }
      return 0
    })
  },
  updateEventSetData (nEventSet, nAntwort) {
    // EventSet ändern
    nEventSet = _.cloneDeep(nEventSet)
    nAntwort = _.cloneDeep(nAntwort)
    let aTSPK = nEventSet.pk
    if (!nEventSet.delAntwort && nEventSet.aId) {
      // ToDo:
      // nAntwort.its = aTSPK
      // this.eventSetsObj[aTSPK].aId = this.root.aAntworten.set(parseInt(nEventSet.aId), nAntwort)
      // this.root.aAntworten.antwortenObj[this.eventSetsObj[aTSPK].aId].changed = true
    }
    if (nEventSet.delAntwort && nEventSet.aId) {
      console.log('del', nEventSet.aId)
      this.root.aAntworten.del(nEventSet.aId)
      delete nEventSet.delAntwort
    }
    this.eventSetsObj[aTSPK].ok = false
    this.root.changed = true
    console.log('updateEventSetData', nEventSet, '->', this.eventSetsObj[aTSPK], '|', nAntwort, '->', this.root.aAntworten.antwortenObj[this.eventSetsObj[aTSPK].aId])
    this.root.update()
  },
  deleteAEventSet: function (delEventSet, direkt = false, aDirekt = false) {
    // EventSet löschen
    let aTSPK = delEventSet.pk
    if (direkt || confirm('Soll das EventSet ID ' + aTSPK + ' gelöscht werden?')) {
      if ((delEventSet.aId && this.root.aAntworten.antwortenObj[delEventSet.aId]) && ((aDirekt) || confirm('Soll die dazugehörige Antwort auch gelöscht werden?'))) {
        this.root.aAntworten.set(delEventSet.aId)
      }
      this.eventSetsObj[aTSPK].ok = false
      this.delEventSetsObj[aTSPK] = delEventSet
      delete this.eventSetsObj[aTSPK]
      this.root.changed = true
      this.root.update()
      console.log('EventSet ID ' + aTSPK + ' gelöscht!')
      return true
    }
  },
  directDeleteAEventSet: function (delEventSetId) {
    this.eventSetsObj[delEventSetId].ok = false
    delete this.eventSetsObj[delEventSetId]
  }
}

export default localFunctions
