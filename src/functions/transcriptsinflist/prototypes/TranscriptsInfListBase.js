const localFunctions = {
  init () {
    console.log('init')
    this.ready = true
    return this.update()
  },
  // Informanten mit Transkript PKs laden
  update () {
    console.log('update')
    this.loading = true
    this.vueObj.$http.post('', { getTranscriptsInfList: 1 })
      .then((response) => {
        this.infTransList = response.data['informanten']
        this.infTransObj = {}
        for (let aInfKey in this.infTransList) {
          this.infTransList[aInfKey].transcriptsPKs = this.infTransList[aInfKey].transcriptsPKs.filter(function (el) { return el != null })   // Null Werte filtern!
          // Objekt mit PK als Property erstellen
          if (this.infTransList.hasOwnProperty(aInfKey)) {
            let aInf = this.infTransList[aInfKey]
            this.infTransObj[aInf.pk] = aInf
          }
        }
        this.transcripts = response.data['transcripts']
        this.transcriptsObj = {}
        for (let aTransKey in this.transcripts) {
          // Objekt mit PK als Property erstellen
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
