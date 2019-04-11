const localFunctions = {
  init () {
    this.eventLists.all = []
  },
  // Events setzen
  addMultiple (nEvents) {
    nEvents.forEach(function (val) {
      this.set(0, val, true)
    }, this)
    this.update()
  },
  // Event setzten
  set: function (index = 0, values, dontUpdate = false) {
    if (index === 0) {
      index = this.eventLists.all.push({}) - 1
    } else {
      index = parseInt(index)
    }
    this.eventLists.all[index] = values
    // this.setRerenderEvent(index)
    if (!dontUpdate) { this.update() }
  },
  update () {
    let t1 = performance.now()
    this.updateObjects()
    this.updateConnections()
    this.updateSVGData()
    console.log('Events Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateSVGData () {
    this.eventLists.all.forEach(function (aEvent) {
      if (aEvent.tcUpdated && (aEvent.svgUpdate || !aEvent.svgWidth)) {
        let allFound = true
        aEvent.svgTidWidth = {}
        aEvent.svgWidth = 0
        Object.keys(aEvent.tidObj).map(function (aInfKey) {
          aEvent.tidObj[aInfKey].forEach(function (aToken) {
            if (!aEvent.svgTidWidth[aInfKey]) {
              aEvent.svgTidWidth[aInfKey] = 0
            }
            if (aToken.svgWidth) {
              aEvent.svgTidWidth[aInfKey] += this.svgTokenWidthAdd + aToken.svgWidth
            } else {
              allFound = false
            }
          }, this)
          if (aEvent.svgWidth < aEvent.svgTidWidth[aInfKey]) {
            aEvent.svgWidth = aEvent.svgTidWidth[aInfKey]
          }
        }, this)
        if (!allFound) {
          delete aEvent.svgUpdate
          delete aEvent.svgWidth
          delete aEvent.svgTidWidth
        }
      }
    }, this)
  },
  updateConnections () {
    this.eventLists.all.forEach(function (aEvent) {
      if (!aEvent.tcUpdated) {
        let allFound = true
        aEvent.tidObj = {}
        aEvent.iPks = []
        aEvent.iObjs = []
        Object.keys(aEvent.tid).map(function (aInfKey) {
          if (aEvent.iPks.indexOf(aInfKey) < 0) {
            aEvent.iPks.push(aInfKey)
            aEvent.iObjs.push(this.root.aInformanten.informantenObj[aInfKey])
          }
          aEvent.tid[aInfKey].forEach(function (aTokenKey) {
            if (!aEvent.tidObj[aInfKey]) {
              aEvent.tidObj[aInfKey] = []
            }
            if (this.root.aTokens.tokensObj[aTokenKey]) {
              aEvent.tidObj[aInfKey].push(this.root.aTokens.tokensObj[aTokenKey])
              this.root.aTokens.tokensObj[aTokenKey].eObj = aEvent
            } else {
              allFound = false
            }
          }, this)
        }, this)
        if (allFound) {
          aEvent.tcUpdated = true
        }
      }
    }, this)
  },
  updateObjects () {
    this.eventsObj = {}
    this.eventLists.all.forEach(function (aEvent) {
      this.eventsObj[aEvent.pk] = aEvent
    }, this)
    this.updateLength()
  },
  updateLength () {
    this.length = this.eventLists.all.length
    return this.length
  }
}

export default localFunctions
