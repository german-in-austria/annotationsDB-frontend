import prototypeTranscriptsInfListBase from './prototypes/TranscriptsInfListBase'

const localFunctions = {
  TranscriptsInfListBase (vueObj) {
    this.ready = false              // Ist das Objekt bereit?
    this.loading = false            // Wird eine Liste geladen?
    this.infTransList = []          // Liste der Informanten mit Transkripten
    this.infTransObj = {}           // Objekt aller Informanten min pk als Property
    this.transcripts = []           // Liste aller Transkripte
    this.transcriptsObj = {}        // Objekt aller Transkripte min pk als Property
    this.time = null                // Stand der Liste
    this.vueObj = vueObj            // Aktuelles Vue Objekt
    this.init()                     // Immer dirket initialisieren
  }
}

// TranscriptsInfList Prototypen
localFunctions.TranscriptsInfListBase.prototype.init = prototypeTranscriptsInfListBase.init
localFunctions.TranscriptsInfListBase.prototype.update = prototypeTranscriptsInfListBase.update

export default localFunctions
