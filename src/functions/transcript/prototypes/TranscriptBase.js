const localFunctions = {
  init () {
    console.log('init TranscriptBase', this.pk)
    console.log(this)
    this.timer = performance.now()
    return this.getTranscript()
  },
  // Transkipt Daten laden
  getTranscript () {
    // console.log('getTranscript', this.pk, this.lSet, this.lMaxSet)
    if (!this.loaded) {
      this.loading = true
      this.vueObj.$http
        .post('', {
          getTranskript: this.pk,
          aType: (this.lSet === 0 ? 'start' : null),
          aNr: this.lSet
        })
        .then((response) => {
          if (this.vueObj.selTranscriptPk === this.pk) {
            let t1 = performance.now()
            if (this.lSet === 0) {    // Einmalige Daten aus erster Abfrage laden
              // console.log(response)
              this.lMaxSet = response.data['aTmNr']
              this.aTranskript = response.data['aTranskript']
              this.aEinzelErhebung = response.data['aEinzelErhebung']
              this.aTokenTypes = response.data['aTokenTypes']   // ToDo: in TokensBase !!!
              this.aSaetze = response.data['aSaetze']
              this.aInformanten.set(response.data['aInformanten'])
            }
            this.aTokens.addMultiple(response.data['aTokens'])
            this.aEvents.addMultiple(response.data['aEvents'])
            this.aTokenSets.addMultiple(response.data['aTokenSets'])
            this.aAntworten.addMultiple(response.data['aAntworten'])
            console.log('getTranscript', this.pk, this.lSet, this.lMaxSet, '- Daten verarbeitet', (performance.now() - t1).toFixed(2), 'ms')
            this.loading = false
            this.ready = true
            if (this.lSet === response.data['nNr']) {
              this.lSet = response.data['nNr']
              this.loaded = true
              console.log('Alle Datensätze geladen.', this.pk, '-', (performance.now() - this.timer).toFixed(2), 'ms', this)
            } else if (this.loaded === false) {
              this.lSet = response.data['nNr']
              this.getTranscript()
            }
          } else {
            console.log('Ladevorgang für', this.pk, 'abgebrochen!')
          }
        })
        .catch((err) => {
          console.log(err)
          alert('Fehler!')
          this.loading = false
          this.error = true
        })
    }
    return !this.loaded
  }
}

export default localFunctions
