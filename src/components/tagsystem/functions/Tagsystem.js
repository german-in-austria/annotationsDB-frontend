import prototypeTagsystemBase from './prototypes/TagsystemBase'

const localFunctions = {
  TagsystemBase (http) {
    this.ready = false                  // Ist das Objekt bereit?
    this.loading = false                // Wird gerade geladen/gespeichert?
    this.http = http                    // Objekt für HTTP-Anfragen
    // Init
    this.init()                         // Immer dirket initialisieren
  }
}

// Transcript Prototypen
localFunctions.TagsystemBase.prototype.init = prototypeTagsystemBase.init

export default localFunctions
