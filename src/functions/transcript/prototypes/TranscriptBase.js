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
            let tmpLSet = this.lSet
            this.loading = false
            if (this.lSet === response.data['nNr']) {
              this.lSet = response.data['nNr']
              this.loaded = true
            } else if (this.loaded === false) {
              this.lSet = response.data['nNr']
              this.getTranscript()
            }
            if (tmpLSet === 0) {    // Einmalige Daten aus erster Abfrage laden
              // console.log(response)
              this.lMaxSet = response.data['aTmNr']
              this.aTranskript = response.data['aTranskript']
              this.aEinzelErhebung = response.data['aEinzelErhebung']
              this.aTokens.setTokenTypes(response.data['aTokenTypes'])
              this.aSaetze = response.data['aSaetze']
              this.aInformanten.set(response.data['aInformanten'])
            }
            this.aTokens.addMultiple(response.data['aTokens'])
            this.aEvents.addMultiple(response.data['aEvents'])
            this.aTokenSets.addMultiple(response.data['aTokenSets'])
            this.aAntworten.addMultiple(response.data['aAntworten'])
            this.aSVG.updateZeilen()
            console.log('getTranscript', this.pk, tmpLSet, this.lMaxSet, '- Daten verarbeitet', (performance.now() - t1).toFixed(2), 'ms')
            this.ready = true
            if (tmpLSet === response.data['nNr']) {
              this.update()
              console.log('Alle Datensätze geladen.', this.pk, '-', (performance.now() - this.timer).toFixed(2), 'ms', this)
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
  },
  update () {
    this.aTokens.update()
    this.aEvents.update()
    this.aTokenSets.update()
    this.aAntworten.update()
    this.aSVG.updateZeilen()
  },
  selectedTokenBereichUpdate () {
    if (this.selectedTokenBereich.v && this.selectedTokenBereich.b) {
      if ((this.selectedTokenBereich.v.iObj !== this.selectedTokenBereich.b.iObj) || this.selectedTokenBereich.v === this.selectedTokenBereich.b) {
        this.selectedTokenBereich = {'v': null, 'b': null}
        this.aSVG.selectedTokenList = []
        return true
      }
      this.selectedTokenListe = []
      let tokenList = this.aTokens.tokenLists.byInf[this.selectedTokenBereich.v.iObj.pk]
      if (tokenList) {
        let vListPos = tokenList.indexOf(this.selectedTokenBereich.v)
        let bListPos = tokenList.indexOf(this.selectedTokenBereich.b)
        if (vListPos > bListPos) { var temp = vListPos; vListPos = bListPos; bListPos = temp }
        this.aSVG.selectedTokenList = tokenList.slice(vListPos, bListPos + 1)
      } else {
        this.aSVG.selectedTokenList = []
      }
    } else {
      if (this.selectedTokenListe.length < 1) {
        this.aSVG.selectedTokenList = []
      }
    }
  },
  toggleSelectedTokenListe (eTok = undefined) {
    if (eTok !== undefined) {
      this.selTokenBereich = {'v': null, 'b': null}
      if (this.selectedTokenListe.indexOf(eTok) > -1) {
        this.selectedTokenListe.splice(this.selectedTokenListe.indexOf(eTok), 1)
      } else {
        if (this.selectedTokenListe.length < 1 || eTok.iObj === this.selectedTokenListe[0].iObj) {
          this.selectedTokenListe.push(eTok)
        } else {
          this.selectedTokenListe = []
        }
      }
    }
    this.aSVG.selectedTokenList = this.selectedTokenListe
  }
}

export default localFunctions
