const localFunctions = {
  // Tokens setzen
  addMultiple (nTokens) {
    Object.keys(nTokens).map(function (key, i) {
      this.add(key, nTokens[key], true)
    }, this)
    this.update()
  },
  // Token setzten
  add (nPk, nToken, dontUpdate = false) {
    this.tokensObj[nPk] = nToken
    if (!this.tokensObj[nPk].pk) {
      this.tokensObj[nPk].pk = parseInt(nPk)
    }
    if (this.tokensObj[nPk]['fo']) {
      this.updateTokenFragment(nPk, this.tokensObj[nPk]['fo'])
    }
    if (!dontUpdate) { this.update() }
  },
  updateTokenFragment: function (pkFo, foPk) {
    if (this.aTokenFragmenteObj[foPk]) {
      if (this.aTokenFragmenteObj[foPk].indexOf(pkFo) < 0) {
        this.aTokenFragmenteObj[foPk].push(pkFo)
      }
    } else {
      this.aTokenFragmenteObj[foPk] = [pkFo]
    }
  },
  // Diverse Updates für weiterführende Daten durchführen
  update () {
    let t1 = performance.now()
    this.updateTokensLists()
    this.updateLength()
    console.log('Tokens Data updated', performance.now() - t1, 'ms')
  },
  updateTokensLists () {
    this.tokenLists = {}
    // Alle Tokens in Liste hinzufügen
    this.tokenLists.all = []
    Object.keys(this.tokensObj).map(function (key) {
      this.tokenLists.all.push(this.tokensObj[key])
    }, this)
    // Tokens nach Reihung sortieren
    this.tokenLists.all.sort((a, b) => { return ((a.tr > b.tr) ? 1 : ((a.tr < b.tr) ? -1 : 0)) })
    // Tokens nach Informanten filtern
    this.tokenLists.byInf = {}
    this.tokenLists.all.forEach(function (val) {
      if (this.tokenLists.byInf[val.i]) {
        this.tokenLists.byInf[val.i].push(val)
      } else {
        this.tokenLists.byInf[val.i] = [val]
      }
    }, this)
  },
  // Anzahl der Tokens setzen
  updateLength () {
    this.length = Object.keys(this.tokensObj).length
    return this.length
  }
}

export default localFunctions
