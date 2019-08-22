import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

const localFunctions = {
  // TokenSets setzen
  addMultiple (nTokenSets) {
    Object.keys(nTokenSets).map(function (key, i) {
      this.add(key, nTokenSets[key], true)
    }, this)
    this.update()
  },
  // TokenSet setzten
  add (nPk, nTokenSet, dontUpdate = false) {
    this.tokenSetsObj[nPk] = nTokenSet
    if (!this.tokenSetsObj[nPk].pk) {
      this.tokenSetsObj[nPk].pk = parseInt(nPk)
    }
    if (this.tokenSetsObj[nPk].t) {
    } else {

    }
    if (!dontUpdate) { this.update() }
  },
  // Diverse Updates für weiterführende Daten durchführen
  update () {
    let t1 = performance.now()
    this.updateTokenSetsLists()
    this.updateTokenSetsData()
    this.updateLength()
    console.log('TokenSets Data updated', (performance.now() - t1).toFixed(2), 'ms')
  },
  updateTokenSetsLists () {
    this.tokenSetsLists = {}
    // Alle TokenSets in Liste hinzufügen
    this.tokenSetsLists.all = []
    Object.keys(this.tokenSetsObj).map(function (key) {
      this.tokenSetsLists.all.push(this.tokenSetsObj[key])
    }, this)
  },
  updateTokenSetsData () {
    // ToDo:
    // Verbindung bei Tokens zu TokenSets überprüfen ob die Tokens noch verwendet werden
    // Object.keys(this.aTokens).map(function (tId, iI) {
    //   if (this.aTokens[tId].tokenSets) {
    //     _.remove(this.aTokens[tId].tokenSets, (n) => {
    //       return (!this.aTokenSets[n] || !this.aTokenSets[n].ok);
    //     });
    //     if (this.aTokens[tId].tokenSets.length < 1) {
    //       delete this.aTokens[tId].tokenSets;
    //     }
    //   }
    // }, this);
    // TokenSets aktuallisieren/berechnen
    this.tokenSetsLists.all.forEach(function (aTokSet) {
      if (!aTokSet.ok) {
        if (aTokSet.ivt) {  // Von/Bis Tokens ermitteln ...
          let aInf = this.root.aTokens.tokensObj[aTokSet.ivt].i
          let aTokListByInf = this.root.aTokens.tokenLists.byInf[aInf];
          [aTokSet.ivt, aTokSet.ibt] = [aTokSet.ivt, aTokSet.ibt].sort()
          let ivtIdx = AllgemeineFunktionen.searchByKey(aTokSet.ivt, 'pk', aTokListByInf)
          let ibtIdx = AllgemeineFunktionen.searchByKey(aTokSet.ibt, 'pk', aTokListByInf)
          if (ivtIdx > -1 && ibtIdx > -1) {
            aTokSet.tx = aTokListByInf.slice(ivtIdx, ibtIdx + 1)
            aTokSet.ok = aTokSet.tx.length > 0
          }
        } else if (aTokSet.t && AllgemeineFunktionen.listeWerteInListe(aTokSet.t, this.root.aTokens.tokenLists.all, 'pk')) {
          aTokSet.tObj = []
          let missToken = false
          aTokSet.t.some(function (tId) {
            if (this.root.aTokens.tokensObj[tId]) {
              aTokSet.tObj.push(this.root.aTokens.tokensObj[tId])
            } else {
              missToken = true
              return true
            }
          }, this)
          // ToDo: Tokens sortieren!
          if (!missToken) {
            // ToDo:
            // aTokSet.t = this.sortEventIdListe(aTokSet.t)
            aTokSet.ok = aTokSet.tObj.length > 0
          }
        }
        // Verwendeten Tokens aktuelles TokenSet zuweisen
        var xt = aTokSet.tObj || aTokSet.tx
        if (xt && aTokSet.ok) {
          xt.forEach(function (tId) {
            if (this.root.aTokens.tokensObj[tId.pk]) {
              if (!this.root.aTokens.tokensObj[tId.pk].tokenSetsList) {
                this.root.aTokens.tokensObj[tId.pk].tokenSetsList = []
              }
              if (this.root.aTokens.tokensObj[tId.pk].tokenSetsList.indexOf(aTokSet) < 0) {
                this.root.aTokens.tokensObj[tId.pk].tokenSetsList.push(aTokSet)
              }
              // ToDo:
              // this.root.aTokens.tokensObj[tId.pk].tokenSetsList = this.sortTokenSets(this.root.aTokens.tokensObj[tId.pk].tokenSetsList)
            }
          }, this)
        }
      }
    }, this)
  },
  // Anzahl der TokenSets setzen
  updateLength () {
    this.length = Object.keys(this.tokenSetsObj).length
    return this.length
  }
}

export default localFunctions
