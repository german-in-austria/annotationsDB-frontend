import prototypeTranscriptBase from './prototypes/TranscriptBase'

const localFunctions = {
  TranscriptBase (lPk, vueObj) {
    this.ready = false              // Ist das Objekt bereit?
    this.loading = false            // Wird das Transcript noch geladen?
    this.vueObj = vueObj            // Aktuelles Vue Objekt
    this.pk = lPk                   // Aktuelle Transkript PK
    this.init()                     // Immer dirket initialisieren
  }
}

// Transcript Prototypen
localFunctions.TranscriptBase.prototype.init = prototypeTranscriptBase.init

export default localFunctions
