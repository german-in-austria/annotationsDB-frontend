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
          console.log('Tagsystem - getBase', response.data, this)
          this.baseCache = {
            phaenomeneList: [],
            phaenomeneObj: response.data.phaenomene,
            tagebenenList: response.data.tagebenen,
            tagebenenObj: {}
          }
          Object.keys(this.baseCache.phaenomeneObj).map(function (iKey) {
            this.baseCache.phaenomeneObj[iKey].pk = iKey
            this.baseCache.phaenomeneList.push(this.baseCache.phaenomeneObj[iKey])
          }, this)
          this.baseCache.tagebenenList.forEach(tagebene => {
            this.baseCache.tagebenenObj[tagebene.pk] = tagebene
          })
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
          console.log('Tagsystem - getTags', response.data, this)
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
          console.log('Tagsystem - getPresets', response.data, this)
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
  },
  tagsText (aTags) {
    var aText = ''
    var aDg = 0
    if (aTags) {
      aTags.forEach(function (val) {
        if (val.tag) {
          var sTags = this.tagsText(val.tags)
          aText += ((aDg === 0) ? ((aText.slice(-1) === ')') ? ' ' : '') : ', ') + this.tagsCache.tags[val.tag].t + ((sTags) ? '(' + sTags + ')' : '')
          aDg += 1
        } else {
          aText += this.tagsText(val.tags)
        }
      }, this)
    }
    return aText
  }
}

export default localFunctions
