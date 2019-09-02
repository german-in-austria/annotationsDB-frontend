import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

const localFunctions = {
  // Antworten setzen
  addMultiple (nAntworten) {
    Object.keys(nAntworten).map(function (key, i) {
      this.add(key, nAntworten[key], true)
    }, this)
    this.update()
  },
  // Antwort setzen
  add (nPk, nAntwort, dontUpdate = false) {
    if (nAntwort.pt) {
      nAntwort.tags = []
      nAntwort.pt.forEach(function (val) {
        nAntwort.tags.push({'e': val.e, 'tags': AllgemeineFunktionen.processTags(val.t).tags})
      }, this)
      delete nAntwort.pt
    }
    if (!nAntwort.pk) {
      nAntwort.pk = parseInt(nPk)
    }
    this.set(nPk, nAntwort, true)
    if (!dontUpdate) { this.update() }
  },
  // Antwort löschen
  del (nPk, dontUpdate = false) {
    if (!isNaN(nPk)) {
      this.set(nPk, null, true)
    }
    if (!dontUpdate) { this.update() }
  },
  // Antwort setzen
  set (nPk, nAntwort = null, dontUpdate = false) {
    if (nAntwort === null) { // Antwort Löschen
      if (this.antwortenObj[nPk]) {
        if (this.antwortenObj[nPk].its && this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its]) {
          delete this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its].aId
        }
        if (this.antwortenObj[nPk].it && this.root.aTokens.tokensObj[this.antwortenObj[nPk].it]) {
          delete this.root.aTokens.tokensObj[this.antwortenObj[nPk].it].aId
        }
        if (nPk > 0) {
          this.delAntworten[nPk] = this.antwortenObj[nPk]
        }
        delete this.antwortenObj[nPk]
      }
    } else { // Antwort setzen
      if (nPk === 0 || isNaN(nPk)) { // Neue Antwort
        nPk = -1
        while (this.antwortenObj[nPk]) {
          nPk -= 1
        }
        nAntwort.changed = true
      }
      this.antwortenObj[nPk] = nAntwort
      if (this.antwortenObj[nPk].its && this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its]) {
        this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its].aId = nAntwort.pk
      }
      if (this.antwortenObj[nPk].it && this.root.aTokens.tokensObj[this.antwortenObj[nPk].it]) {
        this.root.aTokens.tokensObj[this.antwortenObj[nPk].it].aId = nAntwort.pk
      }
    }
    if (!dontUpdate) { this.update() }
    return nPk
  },
  // Diverse Updates für weiterführende Daten durchführen
  update () {
    let t1 = performance.now()
    this.updateAntwortenLists()
    this.updateLength()
    console.log('Antworten Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateAntwortenLists () {
    this.antwortLists = {}
    // Alle Antworten in Liste hinzufügen
    this.antwortLists.all = []
    Object.keys(this.antwortenObj).map(function (key) {
      this.antwortLists.all.push(this.antwortenObj[key])
    }, this)
  },
  // Anzahl der Antworten setzen
  updateLength () {
    this.length = Object.keys(this.antwortenObj).length
    return this.length
  }
}

export default localFunctions
