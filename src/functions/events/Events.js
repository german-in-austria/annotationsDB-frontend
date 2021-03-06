import prototypeEventsBase from './prototypes/EventsBase'

const localFunctions = {
  EventsBase (root) {
    this.ready = false                  // Ist das Objekt bereit?
    this.root = root                    // Verbindung zum Transkript Objekt
    this.eventsObj = {}                 // Event Objekte
    this.eventLists = {}                // Event Listen (all, byInf)
    this.length = 0                     // Anzahl der Events
    this.init()                         // Immer dirket initialisieren
  }
}

// Events Prototypen
localFunctions.EventsBase.prototype.init = prototypeEventsBase.init
localFunctions.EventsBase.prototype.addMultiple = prototypeEventsBase.addMultiple
localFunctions.EventsBase.prototype.set = prototypeEventsBase.set
localFunctions.EventsBase.prototype.update = prototypeEventsBase.update
localFunctions.EventsBase.prototype.updateLists = prototypeEventsBase.updateLists
localFunctions.EventsBase.prototype.updateObjects = prototypeEventsBase.updateObjects
localFunctions.EventsBase.prototype.updateConnections = prototypeEventsBase.updateConnections
localFunctions.EventsBase.prototype.updateSVGData = prototypeEventsBase.updateSVGData
localFunctions.EventsBase.prototype.updateLength = prototypeEventsBase.updateLength

export default localFunctions
