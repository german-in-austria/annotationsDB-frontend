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
    this.height = 0
    this.viewWidth = this.viewElement.clientWidth
    this.viewHeight = this.viewElement.clientHeight
    if (oWidth !== this.width) {
      console.log('ToDo: Zeilen updaten', this.width)
    }
    this.updateZeilen()
  },
  updateZeilen () {
    function zeilenObj () {
      return {
        'eObjs': [],
        'zTop': 0,
        'zHeight': 0
      }
    }
    if (this.svgElement && this.viewElement) {
      this.zeilen = {}
      this.zeilen.all = []
      this.height = 0
      let zKey = 0
      let zWidth = 0
      this.root.aEvents.eventLists.all.forEach(function (aEvent) {
        if (aEvent.svgWidth) {
          if (!this.zeilen.all[zKey]) {
            this.zeilen.all[zKey] = zeilenObj()
            this.zeilen.all[zKey].zHeight = this.infHeight * 2    // ToDo !!!!
          }
          zWidth += aEvent.svgWidth + 0.5
          if (zWidth < this.width - this.infWidth || (zKey === 0 && this.zeilen.all[zKey].eObjs.length < 1)) {
            this.zeilen.all[zKey].eObjs.push(aEvent)
          } else {
            this.height += this.zeilen.all[zKey].zHeight
            zKey++
            if (!this.zeilen.all[zKey]) {
              this.zeilen.all[zKey] = zeilenObj()
              this.zeilen.all[zKey].zHeight = this.infHeight * 2    // ToDo !!!!
            }
            zWidth = aEvent.svgWidth + 0.5
            this.zeilen.all[zKey].zTop = this.zeilen.all[zKey - 1].zTop + this.zeilen.all[zKey - 1].zHeight
            this.zeilen.all[zKey].eObjs.push(aEvent)
          }
        }
      }, this)
      if (this.zeilen.all[zKey] && this.zeilen.all[zKey].zHeight) {
        this.height += this.zeilen.all[zKey].zHeight
      }
      console.log('Höhe', this.height)
      this.scrolling()
    }
  },
  scrolling () {
    let aTop = this.viewElement.scrollTop
    let aBottom = aTop + this.viewHeight
    console.log('Scrolling', aTop, '-', aBottom)
  }
}

export default localFunctions
