import prototypeSvgBase from './prototypes/SvgBase'
import prototypeSvgFunktionen from './prototypes/SvgFunktionen'

const localFunctions = {
  SvgBase (root) {
    this.ready = false                  // Ist das Objekt bereit?
    this.root = root                    // Verbindung zum Transkript Objekt
    this.svgElement = null              // SVG Element
    this.width = null                   // Breite des SVG Elements
    this.height = null                  // Höhe des SVG Elements
    this.viewElement = null             // Element des Sichtbereichs (Scroller)
    this.viewWidth = null               // Breite des Sichtbereichs
    this.viewHeight = null              // Höhe des Sichtbereichs
    this.svgPadding = 10                // Breite des Abstands im SVG Elements
    this.frmPadding = 5                 // Breite des Abstandes der Zeilen Rahmen
    this.timerHeight = 15               // Höhe der Zeitleiste
    this.shownTracks = []               // Sichtbare Spuren
    this.infTop = 8                     // Oberer Abstand über infZeile
    this.infHeight = 50                 // Höhe pro Informanten Zeile
    this.infWidth = 100                 // Breite der Informanten Spalte
    this.selHeight = 10                 // Höhe des Auswahlbereichs
    this.zeilenAbstand = 15             // Abstand zwischen den Zeilen
    this.tokenSetsHeight = 20           // Höhe eines Tokensets
    this.eventSetsHeight = 20           // Höhe eines Tokensets
    this.eventTierHeight = 13           // Höhe von EventTiers
    this.zeilen = {}                    // Zeilen mit Events
    this.renderZeilen = []              // Zu rendernde Zeilen
    this.selectedTokenList = []         // Liste der ausgewählten Tokens für Token Liste und Bereich
    this.update = false                 // Neu rendern
    this.errors = []                    // Fehler beim verarbeiten der Daten
  }
}

// Informanten Prototypen
localFunctions.SvgBase.prototype.setViewElement = prototypeSvgBase.setViewElement
localFunctions.SvgBase.prototype.setAnnotationsSVG = prototypeSvgBase.setAnnotationsSVG
localFunctions.SvgBase.prototype.updateDimensionen = prototypeSvgBase.updateDimensionen
localFunctions.SvgBase.prototype.scrolling = prototypeSvgBase.scrolling
localFunctions.SvgBase.prototype.scrollToToken = prototypeSvgBase.scrollToToken
localFunctions.SvgBase.prototype.getTextWidth = prototypeSvgFunktionen.getTextWidth
localFunctions.SvgBase.prototype.updateZeilen = prototypeSvgBase.updateZeilen
localFunctions.SvgBase.prototype.getTEventOfAEvent = prototypeSvgBase.getTEventOfAEvent
localFunctions.SvgBase.prototype.updateShownTracks = prototypeSvgBase.updateShownTracks

export default localFunctions
