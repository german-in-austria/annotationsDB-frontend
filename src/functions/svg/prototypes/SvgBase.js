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
        'teObjs': [],
        'iPks': [],
        'svgTop': 0,
        'svgHeight': 0,
        'svgInfLine': {}
      }
    }
    if (this.svgElement && this.viewElement) {
      this.zeilen = {}
      this.zeilen.all = []
      this.height = 0
      let zKey = 0
      let zWidth = 0
      let aWidth = this.width - this.infWidth - this.svgPadding * 2 - this.frmPadding * 2
      this.root.aEvents.eventLists.time.forEach(function (tEvent) {
        if (tEvent.svgWidth) {
          if (!this.zeilen.all[zKey]) {
            this.zeilen.all[zKey] = zeilenObj()
          }
          zWidth += tEvent.svgWidth + 0.5
          if (!(zWidth < aWidth || (zKey === 0 && this.zeilen.all[zKey].teObjs.length < 1))) {
            zKey++
            if (!this.zeilen.all[zKey]) {
              this.zeilen.all[zKey] = zeilenObj()
            }
            zWidth = tEvent.svgWidth + 0.5
          }
          this.zeilen.all[zKey].teObjs.push(tEvent)
          tEvent.events.forEach(function (aEvent) {
            aEvent.iPks.forEach(function (iPk) {
              let aIPk = parseInt(iPk)
              if (this.zeilen.all[zKey].iPks.indexOf(aIPk) < 0) {
                this.zeilen.all[zKey].iPks.push(aIPk)
              }
            }, this)
          }, this)
        }
      }, this)
      this.zeilen.all.forEach(function (aZeile) {
        // Horizontal
        let teLeft = 0
        aZeile.teObjs.forEach(function (tEvent) {
          tEvent.svgLeft = teLeft
          teLeft += tEvent.svgWidth
        }, this)
        // Vertikal
        let zHeight = 0
        this.root.aInformanten.informantenList.forEach(aInf => {
          if (aZeile.iPks.indexOf(aInf.pk) > -1) {
            let aTokenSetsListPk = []
            let aTokenSetsList = []
            aZeile.teObjs.forEach(function (tEvent) {
              // console.log(tEvent)
              tEvent.events.forEach(function (aEvent) {
                if (aEvent.tidObj && aEvent.tidObj[aInf.pk]) {
                  aEvent.tidObj[aInf.pk].forEach(function (aToken) {
                    if (aToken.tokenSetsList) {
                      // console.log(aToken.tokenSetsList)
                      aToken.tokenSetsList.forEach(function (aTokenSet) {
                        if (aTokenSetsListPk.indexOf(aTokenSet.pk) < 0) {
                          aTokenSetsListPk.push(aTokenSet.pk)
                          aTokenSetsList.push(aTokenSet)
                        }
                      }, this)
                    }
                  }, this)
                }
              }, this)
            }, this)
            if (aTokenSetsList.length > 0) {
              console.log(aTokenSetsList)
              // ToDo: TokenSets sortieren
            }
            let tsHeight = this.tokenSetsHeight * aTokenSetsList.length
            aZeile.svgInfLine[aInf.pk] = {top: zHeight, tsHeight: tsHeight}
            zHeight += this.infHeight + this.selHeight + this.infTop + tsHeight
          }
        }, this)
        aZeile.svgTop = this.height
        aZeile.svgHeight = zHeight + this.zeilenAbstand + this.timerHeight + this.frmPadding * 2
        this.height += aZeile.svgHeight
      }, this)
      this.scrolling()
    }
    this.update = true
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
