const localFunctions = {
  init (vueObj) {
    console.log('init')
    this.ready = true
    return this.update()
  },
  update () {
    console.log('update')
    this.loading = true
    this.vueObj.$http.post('', { getTranscripts: 1 })
      .then((response) => {
        this.infTransList = response.data['informanten']
        this.infTransObj = {}
        for (let aInfKey in this.infTransList) {
          if (this.infTransList.hasOwnProperty(aInfKey)) {
            let aInf = this.infTransList[aInfKey]
            this.infTransObj[aInf.pk] = aInf
          }
        }
        this.transcripts = response.data['transcripts']
        this.transcriptsObj = {}
        for (let aTransKey in this.transcripts) {
          if (this.transcripts.hasOwnProperty(aTransKey)) {
            let aTrans = this.transcripts[aTransKey]
            this.transcriptsObj[aTrans.pk] = aTrans
          }
        }
        this.time = new Date()
        this.loading = false
      })
      .catch((err) => {
        console.log(err)
        alert('Fehler!')
        this.loading = false
      })
    return true
  }
}

export default localFunctions
