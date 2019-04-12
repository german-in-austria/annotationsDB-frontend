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
        'iPks': [],
        'svgTop': 0,
        'svgHeight': 0
      }
    }
    if (this.svgElement && this.viewElement) {
      this.zeilen = {}
      this.zeilen.all = []
      this.height = 0
      let zKey = 0
      let zWidth = 0
      this.root.aEvents.eventLists.time.forEach(function (tEvent) {
        if (tEvent.svgWidth) {
          if (!this.zeilen.all[zKey]) {
            this.zeilen.all[zKey] = zeilenObj()
            this.zeilen.all[zKey].svgHeight = this.infHeight * 2    // ToDo !!!!
          }
          zWidth += tEvent.svgWidth + 0.5
          if (!(zWidth < this.width - this.infWidth || (zKey === 0 && this.zeilen.all[zKey].eObjs.length < 1))) {
            zKey++
            this.height += this.zeilen.all[zKey - 1].svgHeight
            if (!this.zeilen.all[zKey]) {
              this.zeilen.all[zKey] = zeilenObj()
              this.zeilen.all[zKey].svgHeight = this.infHeight * 2    // ToDo !!!!
            }
            zWidth = tEvent.svgWidth + 0.5
            this.zeilen.all[zKey].svgTop = this.zeilen.all[zKey - 1].svgTop + this.zeilen.all[zKey - 1].svgHeight
          }
          this.zeilen.all[zKey].eObjs.push(tEvent)
          tEvent.events.forEach(function (aEvent) {
            aEvent.iPks.forEach(function (iPk) {
              if (this.zeilen.all[zKey].iPks.indexOf(iPk) < 0) {
                this.zeilen.all[zKey].iPks.push(iPk)
              }
            }, this)
          }, this)
        }
      }, this)
      if (this.zeilen.all[zKey] && this.zeilen.all[zKey].svgHeight) {
        this.height += this.zeilen.all[zKey].svgHeight
      }
      console.log('Höhe', this.height)
      this.scrolling()
    }
  },
  scrolling () {
    let aTop = this.viewElement.scrollTop
    let aBottom = aTop + this.viewHeight
    this.renderZeilen = []
    this.zeilen.all.some(function (zeile, key) {
      if ((zeile.svgTop + zeile.svgHeight > aTop) && (zeile.svgTop < aBottom)) {
        this.renderZeilen.push(key)
      }
    }, this)
    // console.log('Scrolling', aTop, '-', aBottom, this.renderZeilen)
  }
}

export default localFunctions
