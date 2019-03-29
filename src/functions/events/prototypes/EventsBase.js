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
    this.updateLength()
    console.log('Events Data updated', performance.now() - t1, 'ms')
  },
  updateObjects () {
    this.eventsObj = {}
    this.eventLists.all.forEach(function (val) {
      this.eventsObj[val.pk] = val
    }, this)
  },
  updateLength () {
    this.length = this.eventLists.all.length
    return this.length
  }
}

export default localFunctions
