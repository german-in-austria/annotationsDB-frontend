import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

const localFunctions = {
  addMultiple (nAntworten) {
    // Antworten setzen
    Object.keys(nAntworten).map(function (key, i) {
      this.add(key, nAntworten[key], true)
    }, this)
    this.update()
  },
  add (nPk, nAntwort, dontUpdate = false) {
    // Antwort setzen
    if (nAntwort.pt) {
      nAntwort.tags = nAntwort.pt.map(val => { return {'e': val.e, 'tags': AllgemeineFunktionen.processTags(val.t).tags} })
      delete nAntwort.pt
    }
    if (!nAntwort.pk) {
      nAntwort.pk = parseInt(nPk)
    }
    this.set(nPk, nAntwort, true)
    if (!dontUpdate) { this.update() }
  },
  del (nPk, dontUpdate = false) {
    // Antwort löschen
    if (!isNaN(nPk)) {
      this.set(nPk, null, true)
    }
    if (!dontUpdate) { this.update() }
  },
  set (nPk, nAntwort = null, dontUpdate = false) {
    // Antwort setzen
    if (nAntwort === null) { // Antwort Löschen
      if (this.antwortenObj[nPk]) {
        if (this.antwortenObj[nPk].its && this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its]) {
          delete this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its].aId
        }
        if (this.antwortenObj[nPk].ies && this.root.aEventSets.eventSetsObj[this.antwortenObj[nPk].ies]) {
          delete this.root.aEventSets.eventSetsObj[this.antwortenObj[nPk].ies].aId
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
        nAntwort.pk = nPk
        nAntwort.changed = true
      }
      this.antwortenObj[nPk] = nAntwort
      if (this.antwortenObj[nPk].its && this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its]) {
        this.root.aTokenSets.tokenSetsObj[this.antwortenObj[nPk].its].aId = nAntwort.pk
      }
      if (this.antwortenObj[nPk].ies && this.root.aEventSets.eventSetsObj[this.antwortenObj[nPk].ies]) {
        this.root.aEventSets.eventSetsObj[this.antwortenObj[nPk].ies].aId = nAntwort.pk
      }
      if (this.antwortenObj[nPk].it && this.root.aTokens.tokensObj[this.antwortenObj[nPk].it]) {
        this.root.aTokens.tokensObj[this.antwortenObj[nPk].it].aId = nAntwort.pk
      }
    }
    if (!dontUpdate) { this.update() }
    return nPk
  },
  update () {
    // Diverse Updates für weiterführende Daten durchführen
    let t1 = performance.now()
    this.updateAntwortenLists()
    this.updateAntwortenData()
    this.updateLength()
    console.log('Antworten Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateAntwortenData () {
    this.antwortLists.all.map(function (aAntwort) {
      if (aAntwort.its && this.root.aTokenSets.tokenSetsObj[aAntwort.its]) {
        this.root.aTokenSets.tokenSetsObj[aAntwort.its].aId = aAntwort.pk
      }
      if (aAntwort.it && this.root.aTokens.tokensObj[aAntwort.it]) {
        this.root.aTokens.tokensObj[aAntwort.it].aId = aAntwort.pk
      }
    }, this)
  },
  updateAntwortenLists () {
    this.antwortLists = {}
    // Alle Antworten in Liste hinzufügen
    this.antwortLists.all = []
    Object.keys(this.antwortenObj).map(function (key) {
      this.antwortLists.all.push(this.antwortenObj[key])
    }, this)
  },
  updateLength () {
    // Anzahl der Antworten setzen
    this.length = Object.keys(this.antwortenObj).length
    return this.length
  }
}

export default localFunctions
