const localFunctions = {
  setViewElement (nViewElement) {
    this.viewElement = nViewElement
  },
  setAnnotationsSVG (nSvgObj) {
    this.svgElement = nSvgObj
    if (this.svgElement && this.viewElement) {
      this.ready = true
      this.updateDimensionen()
    } else {
      this.ready = false
    }
    console.log('SvgBase', this)
  },
  updateDimensionen () {
    let oWidth = this.width
    this.width = this.svgElement.clientWidth
    this.height = 5000  // ToDo
    this.viewWidth = this.viewElement.clientWidth
    this.viewHeight = this.viewElement.clientHeight
    if (oWidth !== this.width) {
      console.log('ToDo: Zeilen updaten', this.width)
    }
    this.scrolling()
  },
  scrolling () {
    let aTop = this.viewElement.scrollTop
    let aBottom = aTop + this.viewHeight
    console.log('Scrolling', aTop, '-', aBottom)
  }
}

export default localFunctions
