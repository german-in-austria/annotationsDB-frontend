const localFunctions = {
  // Informanten setzten
  set (nInformanten) {
    this.informantenObj = {}
    this.informantenList = []
    Object.keys(nInformanten).map(function (key, i) {
      this.informantenObj[key] = nInformanten[key]
      this.informantenObj[key]['i'] = i
      this.informantenObj[key]['show'] = true
      this.informantenObj[key]['pk'] = key
      this.informantenList.push(this.informantenObj[key])
    }, this)
    this.length = Object.keys(nInformanten).length
  }
}

export default localFunctions
