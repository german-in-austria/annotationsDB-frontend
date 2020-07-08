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
    this.eventSetsLists.all = Object.keys(this.eventSetsObj).map((key) => this.eventSetsObj[key])
  },
  updateEventSetsData () {
    // Verbindung bei Events zu EventSets überprüfen ob die Events noch verwendet werden
    Object.keys(this.root.aEvents.eventsObj).map(function (eId, iI) {
      let aEvent = this.root.aEvents.eventsObj[eId]
      if (aEvent.eventSetsList) {
        _.remove(aEvent.eventSetsList, (n) => {
          return (!n || !n.ok)
        })
        if (aEvent.eventSetsList.length < 1) {
          delete aEvent.eventSetsList
        }
      }
    }, this)
    // EventSets aktualisieren/berechnen
    this.eventSetsLists.all.forEach(function (aEveSet) {
      if (!aEveSet.ok) {
        // Events aus Bereich laden ...
        let evtIdx = AllgemeineFunktionen.searchByKey(aEveSet.id_von_event_id, 'pk', this.root.aEvents.eventLists.all)
        let ebtIdx = AllgemeineFunktionen.searchByKey(aEveSet.id_bis_event_id, 'pk', this.root.aEvents.eventLists.all)
        if (evtIdx > ebtIdx) {
          console.log('EventSet Reihenfolge korrigieren', aEveSet)
          let tmp = aEveSet.id_von_event_id
          aEveSet.id_von_event_id = aEveSet.id_bis_event_id
          aEveSet.id_bis_event_id = tmp
          aEveSet.changed = true
          this.root.changed = true
          this.root.unsaved = true
        }
        aEveSet.ex = this.root.aEvents.eventLists.all.slice(evtIdx, ebtIdx + 1)
        aEveSet.ok = aEveSet.ex.length > 0
        // Verwendeten Events aktuelles EventSet zuweisen
        var xt = aEveSet.ex
        if (xt && aEveSet.ok) {
          xt.forEach(function (eId) {
            if (this.root.aEvents.eventsObj[eId.pk]) {
              if (!this.root.aEvents.eventsObj[eId.pk].eventSetsList) {
                this.root.aEvents.eventsObj[eId.pk].eventSetsList = []
              }
              if (this.root.aEvents.eventsObj[eId.pk].eventSetsList.indexOf(aEveSet) < 0) {
                this.root.aEvents.eventsObj[eId.pk].eventSetsList.push(aEveSet)
              }
              this.root.aEvents.eventsObj[eId.pk].eventSetsList = this.sortEventSets(this.root.aEvents.eventsObj[eId.pk].eventSetsList)
            }
          }, this)
        }
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
      var xa = this.root.aEvents.eventLists.all.indexOf((a.ex)[0])
      var xb = this.root.aEvents.eventLists.all.indexOf((b.ex)[0])
      if (xa > xb) { return 1 }
      if (xa < xb) { return -1 }
      var aTSa = a.ex
      var aTSb = b.ex
      xa = this.root.aEvents.eventLists.all.indexOf(aTSa[aTSa.length - 1])
      xb = this.root.aEvents.eventLists.all.indexOf(aTSb[aTSb.length - 1])
      if (xa < xb) { return 1 }
      if (xa > xb) { return -1 }
      if (a.t && b.ex) { return 1 }
      if (a.ex && b.t) { return -1 }
      return 0
    })
  },
  updateEventSetData (nEventSet, nAntwort) {
    // EventSet ändern
    nEventSet = _.cloneDeep(nEventSet)
    nAntwort = _.cloneDeep(nAntwort)
    let aESPK = nEventSet.pk
    if (!nEventSet.delAntwort && nEventSet.aId) {
      nAntwort.ies = aESPK
      this.eventSetsObj[aESPK].aId = this.root.aAntworten.set(parseInt(nEventSet.aId), nAntwort)
      this.root.aAntworten.antwortenObj[this.eventSetsObj[aESPK].aId].changed = true
    }
    if (nEventSet.delAntwort && nEventSet.aId) {
      console.log('del', nEventSet.aId)
      this.root.aAntworten.del(nEventSet.aId)
      delete nEventSet.delAntwort
    }
    this.eventSetsObj[aESPK].ok = false
    this.root.changed = true
    console.log('updateEventSetData', nEventSet, '->', this.eventSetsObj[aESPK], '|', nAntwort, '->', this.root.aAntworten.antwortenObj[this.eventSetsObj[aESPK].aId])
    this.root.update()
  },
  deleteAEventSet: function (delEventSet, direkt = false, aDirekt = false) {
    // EventSet löschen
    let aESPK = delEventSet.pk
    if (direkt || confirm('Soll das EventSet ID ' + aESPK + ' gelöscht werden?')) {
      if ((delEventSet.aId && this.root.aAntworten.antwortenObj[delEventSet.aId]) && ((aDirekt) || confirm('Soll die dazugehörige Antwort auch gelöscht werden?'))) {
        this.root.aAntworten.set(delEventSet.aId)
      }
      this.eventSetsObj[aESPK].ok = false
      this.delEventSetsObj[aESPK] = delEventSet
      delete this.eventSetsObj[aESPK]
      this.root.changed = true
      this.root.update()
      console.log('EventSet ID ' + aESPK + ' gelöscht!')
      return true
    }
  },
  directDeleteAEventSet: function (delEventSetId) {
    this.eventSetsObj[delEventSetId].ok = false
    delete this.eventSetsObj[delEventSetId]
  }
}

export default localFunctions
