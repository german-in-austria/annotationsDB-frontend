import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

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
    this.updateLists()
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
              aToken.svgLeft = aEvent.svgTidWidth[aInfKey]
              aEvent.svgTidWidth[aInfKey] += aToken.svgWidth
            } else {
              allFound = false
            }
          }, this)
          if (aEvent.svgWidth < aEvent.svgTidWidth[aInfKey]) {
            aEvent.svgWidth = aEvent.svgTidWidth[aInfKey]
          }
        }, this)
        if (allFound) {
          delete aEvent.svgUpdate
        } else {
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
        aEvent.et.forEach(function (aEventTier) {
          aEventTier.iObj = this.root.aInformanten.informantenObj[aEventTier.i]
          aEventTier.tiObj = this.root.aTranskript.tiersObj[aEventTier.ti]
        }, this)
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
  updateLists () {
    this.eventLists.time = []
    let lastTimeStart = null
    let lastTimeEnd = null
    let aKey = 0
    this.eventLists.all.forEach(function (aEvent) {
      if (lastTimeStart === aEvent.s && lastTimeEnd === aEvent.e) {
        this.eventLists.time[aKey].events.push(aEvent)
        if (aEvent.svgWidth > this.eventLists.time[aKey].svgWidth) {
          this.eventLists.time[aKey].svgWidth = aEvent.svgWidth
        }
      } else {
        let audioStart = AllgemeineFunktionen.durationToSeconds(aEvent.s)
        let audioEnd = AllgemeineFunktionen.durationToSeconds(aEvent.e)
        aKey = this.eventLists.time.push({events: [aEvent], svgWidth: aEvent.svgWidth, s: aEvent.s, e: aEvent.e, aS: audioStart, aE: audioEnd, aL: audioEnd - audioStart}) - 1
        lastTimeStart = aEvent.s
        lastTimeEnd = aEvent.e
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
