import prototypeTranscriptBase from './prototypes/TranscriptBase'
import InformantenObject from '@/functions/informanten/Informanten'
import TokensObject from '@/functions/tokens/Tokens'
import TokenSetsObject from '@/functions/tokensets/TokenSets'
import EventsObject from '@/functions/events/Events'
import AntwortenObject from '@/functions/antworten/Antworten'
import SvgObject from '@/functions/svg/Svg'

const localFunctions = {
  TranscriptBase (lPk, vueObj) {
    this.ready = false                  // Ist das Objekt bereit?
    this.loading = false                // Wird gerade geladen/gespeichert?
    this.loaded = false                 // Wird das Transcript noch geladen?
    this.vueObj = vueObj                // Aktuelles Vue Objekt
    this.timer = 0                      // Zeit der Initialisierung der TranscriptBase
    this.pk = lPk                       // Aktuelle Transkript PK
    this.lSet = 0                       // Aktueller Ladedurchgang
    this.lMaxSet = 1                    // Maxiamle Ladedurchgänge
    this.aTranskript = {}               // Model des Transkripts
    this.aEinzelErhebung = {}           // Model der EinzelErhebung
    this.aSaetze = {}                   // Model der Saetze
    this.aInformanten = new InformantenObject.InformantenBase(this)   // Akutelle Informanten (InformantenBase)
    this.aTokens = new TokensObject.TokensBase(this)                  // Aktuelle Tokens (TokensBase)
    this.aTokenSets = new TokenSetsObject.TokenSetsBase(this)         // Aktuelle TokenSets (TokenSetsBase)
    this.aEvents = new EventsObject.EventsBase(this)                  // Aktuelle Events (EventsBase)
    this.aAntworten = new AntwortenObject.AntwortenBase(this)         // Aktuelle Antworten (AntwortenBase)
    this.aSVG = new SvgObject.SvgBase(this)                           // SvgBase Objekt
    this.init()                         // Immer dirket initialisieren
  }
}

// Transcript Prototypen
localFunctions.TranscriptBase.prototype.init = prototypeTranscriptBase.init
localFunctions.TranscriptBase.prototype.getTranscript = prototypeTranscriptBase.getTranscript
localFunctions.TranscriptBase.prototype.setInformanten = prototypeTranscriptBase.setInformanten
localFunctions.TranscriptBase.prototype.addTokens = prototypeTranscriptBase.addTokens
localFunctions.TranscriptBase.prototype.updateToken = prototypeTranscriptBase.updateToken
localFunctions.TranscriptBase.prototype.updateTokenFragment = prototypeTranscriptBase.updateTokenFragment

export default localFunctions
