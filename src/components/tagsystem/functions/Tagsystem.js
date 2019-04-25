import prototypeTagsystemBase from './prototypes/TagsystemBase'

const localFunctions = {
  TagsystemBase (http) {
    this.ready = false                  // Ist das Objekt bereit?
    this.loading = false                // Wird gerade geladen/gespeichert?
    this.http = http                    // Objekt für HTTP-Anfragen
    this.baseCache = null               // Basisdaten (Phänomene und Tagebenen)
    this.tagsCache = null               // Tags
    this.presetsCache = null            // Presets
    this.loadingBase = true             // Basisdaten laden?
    this.loadingTags = true             // Tags laden?
    this.loadingPresets = true          // Presets laden?
    // Init
    this.init()                         // Immer dirket initialisieren
  }
}

// Transcript Prototypen
localFunctions.TagsystemBase.prototype.init = prototypeTagsystemBase.init
localFunctions.TagsystemBase.prototype.getBase = prototypeTagsystemBase.getBase
localFunctions.TagsystemBase.prototype.getTags = prototypeTagsystemBase.getTags
localFunctions.TagsystemBase.prototype.getPresets = prototypeTagsystemBase.getPresets
localFunctions.TagsystemBase.prototype.tagsText = prototypeTagsystemBase.tagsText
localFunctions.TagsystemBase.prototype.processTags = prototypeTagsystemBase.processTags

export default localFunctions
