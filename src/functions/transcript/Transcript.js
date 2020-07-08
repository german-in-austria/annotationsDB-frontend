import prototypeTranscriptBase from './prototypes/TranscriptBase'
import InformantenObject from '@/functions/informanten/Informanten'
import TokensObject from '@/functions/tokens/Tokens'
import TokenSetsObject from '@/functions/tokensets/TokenSets'
import EventsObject from '@/functions/events/Events'
import EventSetsObject from '@/functions/eventsets/EventSets'
import AntwortenObject from '@/functions/antworten/Antworten'
import SvgObject from '@/functions/svg/Svg'

const localFunctions = {
  TranscriptBase (lPk, vueObj) {
    this.ready = false                  // Ist das Objekt bereit?
    this.loading = false                // Wird gerade geladen/gespeichert?
    this.saving = false                 // Wird gerade gespeichert?
    this.loaded = false                 // Wird das Transcript noch geladen?
    this.vueObj = vueObj                // Aktuelles Vue Objekt
    this.timer = 0                      // Zeit der Initialisierung der TranscriptBase
    this.unsaved = false                // Gibt es ungespeicherte Änderungen?
    // Transkript Daten
    this.allTracks = []                 // Alle Spuren
    this.aTranskript = {}               // Model des Transkripts
    this.aEinzelErhebung = {}           // Model der EinzelErhebung
    this.aSaetze = {}                   // Model der Saetze
    this.aInformanten = new InformantenObject.InformantenBase(this)   // Aktuelle Informanten (InformantenBase)
    this.aTokens = new TokensObject.TokensBase(this)                  // Aktuelle Tokens (TokensBase)
    this.aTokenSets = new TokenSetsObject.TokenSetsBase(this)         // Aktuelle TokenSets (TokenSetsBase)
    this.aEvents = new EventsObject.EventsBase(this)                  // Aktuelle Events (EventsBase)
    this.aEventSets = new EventSetsObject.EventSetsBase(this)         // Aktuelle EventSets (EventSetsBase)
    this.aAntworten = new AntwortenObject.AntwortenBase(this)         // Aktuelle Antworten (AntwortenBase)
    this.aSVG = new SvgObject.SvgBase(this)                           // SvgBase Objekt
    // System Daten
    this.pk = lPk                       // Aktuelle Transkript PK
    this.lSet = 0                       // Aktueller Ladedurchgang
    this.lMaxSet = 1                    // Maxiamle Ladedurchgänge
    this.changed = false                // Gab es Änderungen?
    this.selectedToken = null           // Aktuell ausgewählter Token
    this.selectedTokenSet = null        // Aktuell ausgewähltes TokenSet
    this.selectedEventSet = null        // Aktuell ausgewähltes EventSet
    this.selectedTokenBereich = {'v': null, 'b': null}  // Aktuell ausgewählter Token Bereich
    this.selectedTokenListe = []        // Liste der aktuell ausgewählten Tokens
    this.hoveredTokenSet = null         // TokenSet über dem der Mauszeiger ist
    this.previewTagEbene = -2           // Suchen und Filtern Tagebene anzeigen
    this.showEventTiers = false         // Event Tiers anzeigen
    this.showTokenSetIds = false        // Token Set Ids anzeigen
    this.errors = []                    // Fehler beim verarbeiten der Daten
    // Init
    this.init()                         // Immer dirket initialisieren
  }
}

// Transcript Prototypen
localFunctions.TranscriptBase.prototype.init = prototypeTranscriptBase.init
localFunctions.TranscriptBase.prototype.getTranscript = prototypeTranscriptBase.getTranscript
localFunctions.TranscriptBase.prototype.update = prototypeTranscriptBase.update
localFunctions.TranscriptBase.prototype.selectedTokenBereichUpdate = prototypeTranscriptBase.selectedTokenBereichUpdate
localFunctions.TranscriptBase.prototype.toggleSelectedTokenListe = prototypeTranscriptBase.toggleSelectedTokenListe
localFunctions.TranscriptBase.prototype.getChangedData = prototypeTranscriptBase.getChangedData
localFunctions.TranscriptBase.prototype.save = prototypeTranscriptBase.save

export default localFunctions
