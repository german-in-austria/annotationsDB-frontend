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
    this.infHeight = 50                 // Höhe pro Informanten Zeile
    this.infWidth = 100                 // Breite der Informanten Spalte
    this.zeilen = {}                    // Zeilen mit Events
  }
}

// Informanten Prototypen
localFunctions.SvgBase.prototype.setViewElement = prototypeSvgBase.setViewElement
localFunctions.SvgBase.prototype.setAnnotationsSVG = prototypeSvgBase.setAnnotationsSVG
localFunctions.SvgBase.prototype.updateDimensionen = prototypeSvgBase.updateDimensionen
localFunctions.SvgBase.prototype.scrolling = prototypeSvgBase.scrolling
localFunctions.SvgBase.prototype.getTextWidth = prototypeSvgFunktionen.getTextWidth
localFunctions.SvgBase.prototype.updateZeilen = prototypeSvgBase.updateZeilen

export default localFunctions
