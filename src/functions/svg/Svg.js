import prototypeSvgBase from './prototypes/SvgBase'
import prototypeSvgFunktionen from './prototypes/SvgFunktionen'

const localFunctions = {
  SvgBase () {
    this.ready = false                  // Ist das Objekt bereit?
    this.svgElement = null              // SVG Element
    this.width = null                   // Breite des SVG Elements
    this.height = null                  // Höhe des SVG Elements
    this.viewElement = null             // Element des Sichtbereichs (Scroller)
    this.viewWidth = null               // Breite des Sichtbereichs
    this.viewHeight = null              // Höhe des Sichtbereichs
  }
}

// Informanten Prototypen
localFunctions.SvgBase.prototype.setViewElement = prototypeSvgBase.setViewElement
localFunctions.SvgBase.prototype.setAnnotationsSVG = prototypeSvgBase.setAnnotationsSVG
localFunctions.SvgBase.prototype.updateDimensionen = prototypeSvgBase.updateDimensionen
localFunctions.SvgBase.prototype.scrolling = prototypeSvgBase.scrolling
localFunctions.SvgBase.prototype.getTextWidth = prototypeSvgFunktionen.getTextWidth

export default localFunctions
