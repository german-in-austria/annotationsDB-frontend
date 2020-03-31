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
        // console.log('TranscriptInfListBase', 'update', response.data)
        this.infTransList = response.data['informanten']
        this.infTransObj = {}
        for (let aInfKey in this.infTransList) {
          this.infTransList[aInfKey].transcriptsPKs = []
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
            aTrans.infPKs.forEach(aInfPk => {
              if (aInfPk != null && this.infTransObj[aInfPk]) {
                this.infTransObj[aInfPk].transcriptsPKs.push(aTrans.pk)
              }
            })
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
