const localFunctions = {
  init () {
    console.log('init TranscriptBase', this.pk)
    console.log(this)
    return this.getTranscript()
  },
  // Transkipt Daten laden
  getTranscript () {
    console.log('getTranscript', this.pk, this.lSet, this.lMaxSet)
    if (!this.loaded) {
      this.loading = true
      this.vueObj.$http
        .post('', {
          getTranskript: this.pk,
          aType: (this.lSet === 0 ? 'start' : null),
          aNr: this.lSet
        })
        .then((response) => {
          if (this.lSet === 0) {    // Einmalige Daten aus erster Abfrage laden
            // console.log(response)
            this.lMaxSet = response.data['aTmNr']
            this.aTranskript = response.data['aTranskript']
            this.aEinzelErhebung = response.data['aEinzelErhebung']
            this.aTokenTypes = response.data['aTokenTypes']
            this.aSaetze = response.data['aSaetze']
            this.aInformanten.set(response.data['aInformanten'])
          }
          // this.addTokens(response.data['aTokens'])
          // this.addEvents(response.data['aEvents'])
          // this.addTokenSets(response.data['aTokenSets'])
          // this.addAntworten(response.data['aAntworten'])
          this.loading = false
          this.ready = true
          if (this.lSet === response.data['nNr']) {
            this.lSet = response.data['nNr']
            this.loaded = true
            console.log('Alle Datensätze geladen.', this)
          } else if (this.loaded === false) {
            this.lSet = response.data['nNr']
            this.getTranscript()
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
  // // Tokens hinzufügen
  // addTokens: function (nTokens) {
  //   Object.keys(nTokens).map(function (key, i) {
  //     this.updateToken(key, nTokens[key])
  //   }, this)
  // },
  // updateToken: function (key, values) {
  //   this.aTokens[key] = values
  //   if (this.aTokens[key]['fo']) {
  //     this.updateTokenFragment(key, this.aTokens[key]['fo'])
  //   }
  //   if (this.aEvents[this.aTokens[key]['e']]) {
  //     // this.setRerenderEvent(this.aTokens[key]['e'])
  //   }
  // },
  // updateTokenFragment: function (key, fo) {
  //   if (this.aTokenFragmente[fo]) {
  //     if (this.aTokenFragmente[fo].indexOf(key) < 0) {
  //       this.aTokenFragmente[fo].push(key)
  //     }
  //   } else {
  //     this.aTokenFragmente[fo] = [key]
  //   }
  // }
}

export default localFunctions
