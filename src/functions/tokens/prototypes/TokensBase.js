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
  getTokenString (aToken, field, bField = false) {
    var aTxt = this.getTokenFragment(aToken, field, bField)
    var space = ((aToken.tt === 2) || (aToken.fo > 0 || aTxt[0] === '_') ? '' : '\u00A0')
    if (aTxt[0] === '_') {
      aTxt = aTxt.substr(1)
    };
    return space + aTxt
  },
  getTokenFragment (aToken, field, bField = false) {
    let atTxt = ((bField && !aToken[field]) ? aToken[bField] : aToken[field])
    if (this.aTokenFragmenteObj[aToken.pk] && this.aTokenFragmenteObj[aToken.pk].length === 1) {
      this.aTokenFragmenteObj[aToken.pk].forEach(function (val) {
        let ntTxt = ((bField && !this.tokensObj[val][field]) ? this.tokensObj[val][bField] : this.tokensObj[val][field])
        let aPos = atTxt.lastIndexOf(ntTxt)
        if (aPos > 0) {
          atTxt = atTxt.substr(0, aPos)
        }
      }, this)
    }
    return atTxt
  },
  // Diverse Updates für weiterführende Daten durchführen
  update () {
    let t1 = performance.now()
    this.updateTokensLists()
    this.updateTokensSVGData()
    this.updateLength()
    console.log('Tokens Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateTokensSVGData () {
    this.tokenLists.all.forEach(function (val) {
      if (val.svgUpdate || !val.svgWidth) {
        let svgTsObj = this.root.vueObj.$refs.svgTextSize
        let t1W = this.root.aSVG.getTextWidth(this.getTokenString(val, 't'), svgTsObj, this.svgTwCache)
        let t2W = this.root.aSVG.getTextWidth(this.getTokenString(val, 'o', 't'), svgTsObj, this.svgTwCache)
        val.svgWidth = ((t1W > t2W) ? t1W : t2W) + 3.5
      }
    }, this)
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
  },
  setTokenTypes (nTokenTypes) {
    this.aTokenTypes = nTokenTypes
  }
}

export default localFunctions
