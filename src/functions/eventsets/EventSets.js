import prototypeEventSetsBase from './prototypes/EventSetsBase'

const localFunctions = {
  EventSetsBase (root) {
    this.ready = false                  // Ist das Objekt bereit?
    this.root = root                    // Verbindung zum Transkript Objekt
    this.eventSetsObj = {}              // EventSets Objekte
    this.eventSetsLists = {}            // EventSet Listen (all)
    this.delEventSetsObj = {}           // Objekte der zu löschenden EventSets
    this.length = 0                     // Anzahl der EventSets
  }
}

// Tokens Prototypen
localFunctions.EventSetsBase.prototype.add = prototypeEventSetsBase.add
localFunctions.EventSetsBase.prototype.addMultiple = prototypeEventSetsBase.addMultiple
localFunctions.EventSetsBase.prototype.update = prototypeEventSetsBase.update
localFunctions.EventSetsBase.prototype.updateEventSetsLists = prototypeEventSetsBase.updateEventSetsLists
localFunctions.EventSetsBase.prototype.updateEventSetsData = prototypeEventSetsBase.updateEventSetsData
localFunctions.EventSetsBase.prototype.updateLength = prototypeEventSetsBase.updateLength
localFunctions.EventSetsBase.prototype.sortEventSets = prototypeEventSetsBase.sortEventSets
localFunctions.EventSetsBase.prototype.updateEventSetData = prototypeEventSetsBase.updateEventSetData
localFunctions.EventSetsBase.prototype.deleteAEventSet = prototypeEventSetsBase.deleteAEventSet
localFunctions.EventSetsBase.prototype.directDeleteAEventSet = prototypeEventSetsBase.directDeleteAEventSet
localFunctions.EventSetsBase.prototype.getNextUnusedPk = prototypeEventSetsBase.getNextUnusedPk

export default localFunctions
