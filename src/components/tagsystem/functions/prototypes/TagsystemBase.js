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
            this.baseCache.phaenomeneObj[iKey].pk = parseInt(iKey)
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
          Object.keys(this.tagsCache.tags).map(function (iKey) {
            this.tagsCache.tags[iKey].pk = parseInt(iKey)
          }, this)
          this.loadingTags = false
          this.ready = true
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
          this.presetsCache = {
            presetsList: response.data['presets']
          }
          this.presetsCache.presetsList.forEach(function (preset) {
            preset.tags = this.processTags(preset.tf).tags
            preset.tokenText = this.tagsText(preset.tags)
            preset.ze = []
            preset.tf.forEach(function (tVal) {
              if (this.tagsCache.tags[tVal.t].tezt) {
                this.tagsCache.tags[tVal.t].tezt.forEach(function (eVal) {
                  if (preset.ze.indexOf(eVal) < 0) {
                    preset.ze.push(eVal)
                    if (!this.baseCache.tagebenenObj[eVal].presets) {
                      this.baseCache.tagebenenObj[eVal].presets = []
                    }
                    this.baseCache.tagebenenObj[eVal].presets.push(preset)
                  }
                }, this)
              }
            }, this)
          }, this)
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
    let aText = ''
    let aDg = 0
    if (aTags) {
      aTags.forEach(function (val) {
        if (val.tag) {
          let sTags = this.tagsText(val.tags)
          aText += ((aDg === 0) ? ((aText.slice(-1) === ')') ? ' ' : '') : ', ') + this.tagsCache.tags[val.tag].t + ((sTags) ? '(' + sTags + ')' : '')
          aDg += 1
        } else {
          aText += this.tagsText(val.tags)
        }
      }, this)
    }
    return aText
  },
  processTags (pTags, pPos = 0, gen = 0) {
    let xTags = []
    let xPos = pPos
    let xClose = 0
    while (xPos < pTags.length && xClose < 1) {
      if (pTags[xPos].c > 0) {
        xClose = pTags[xPos].c
        pTags[xPos].c -= 1
        xPos = xPos - 1
      } else {
        let prData = this.processTags(pTags, xPos + 1)
        xTags.push({'id': 0, 'tag': pTags[xPos].t, 'tags': prData.tags})
        xPos = prData.pos + 1
      }
    }
    return {'tags': xTags, 'pos': xPos}
  }
}

export default localFunctions
