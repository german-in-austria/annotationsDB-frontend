const localFunctions = {
  init () {
    this.getBase()
  },
  getBase () {
    if (!this.baseCache) {
      this.http
        .post('/db/tagsystemvue', {
          getBase: 1
        })
        .then((response) => {
          console.log('Tagsystem - getBase', response.data)
          this.baseCache = response.data
          this.loadingBase = false
          this.getTags()
        })
        .catch((err) => {
          console.log(err)
          alert('Fehler!')
          this.loadingBase = false
        })
    } else {
      this.loadingBase = false
      this.getTags()
    }
  },
  getTags () {
    if (!this.tagsCache) {
      this.http
        .post('/db/tagsystemvue', {
          getTags: 1
        })
        .then((response) => {
          console.log('Tagsystem - getTags', response.data)
          this.tagsCache = response.data['tags']
          this.loadingTags = false
          this.getPresets()
        })
        .catch((err) => {
          console.log(err)
          alert('Fehler!')
        })
    } else {
      this.loadingTags = false
      this.getPresets()
    }
  },
  getPresets () {
    if (!this.presetsCache) {
      this.http
        .post('/db/tagsystemvue', {
          getPresets: 1
        })
        .then((response) => {
          console.log('Tagsystem - getPresets', response.data)
          this.presetsCache = response.data['presets']
          this.loadingPresets = false
        })
        .catch((err) => {
          console.log(err)
          alert('Fehler!')
        })
    } else {
      this.loadingPresets = false
    }
  }
}

export default localFunctions
