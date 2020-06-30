/* global $ */

const localFunctions = {
  setViewElement (nViewElement) {
    this.viewElement = nViewElement
  },
  setAnnotationsSVG (nSvgObj) {
    this.svgElement = nSvgObj
    if (this.svgElement && this.viewElement) {
      this.ready = true
      this.updateDimensionen()
    } else {
      this.ready = false
    }
    console.log('SvgBase', this)
  },
  updateDimensionen () {
    this.width = this.svgElement.clientWidth
    this.height = 0
    this.viewWidth = this.viewElement.clientWidth
    this.viewHeight = this.viewElement.clientHeight
    this.updateZeilen()
  },
  updateShownTracks () {
    this.shownTracks = this.root.allTracks.filter(aSpur => aSpur.show)
  },
  updateZeilen () {
    // Alle Zeilen neu berechnen
    function zeilenObj () { // Leeres Zeilen Objekt
      return {
        'teObjs': [],
        'iPks': [],
        'svgTop': 0,
        'svgHeight': 0,
        'svgInfLine': {},
        'tokenListByInf': {},
        'tokenSetsListByInf': {},
        'tokenSetsDeepList': [],
        'tokenSetsSvgData': {}
      }
    }
    // Informanten Höhe ermitteln
    this.updateShownTracks()
    this.root.aTokens.updateTokensSVGData()
    this.infHeight = 6 + 22 * this.shownTracks.length
    if (this.svgElement && this.viewElement) {
      // Zeilen mit Events erstellen
      this.zeilen = {}
      this.zeilen.all = []
      this.height = 0
      let zKey = 0
      let zWidth = 0
      let aWidth = this.width - this.infWidth - this.svgPadding * 2 - this.frmPadding * 2
      this.root.aEvents.eventLists.time.forEach(function (tEvent) {
        if (tEvent.svgWidth) {
          if (!this.zeilen.all[zKey]) {
            this.zeilen.all[zKey] = zeilenObj()
          }
          zWidth += tEvent.svgWidth + 0.5
          if (!(zWidth < aWidth || (zKey === 0 && this.zeilen.all[zKey].teObjs.length < 1))) {
            zKey++
            if (!this.zeilen.all[zKey]) {
              this.zeilen.all[zKey] = zeilenObj()
            }
            zWidth = tEvent.svgWidth + 0.5
          }
          this.zeilen.all[zKey].teObjs.push(tEvent)
          tEvent.events.forEach(function (aEvent) {
            aEvent.iPks.forEach(function (iPk) {
              let aIPk = parseInt(iPk)
              if (this.zeilen.all[zKey].iPks.indexOf(aIPk) < 0) {
                this.zeilen.all[zKey].iPks.push(aIPk)
              }
            }, this)
          }, this)
        }
      }, this)
      // SVG Koordinaten Berechnungen
      this.zeilen.all.forEach(function (aZeile) {
        // Horizontal
        aZeile.eventTiers = 0
        let teLeft = 0
        aZeile.teObjs.forEach(function (tEvent) {
          tEvent.svgLeft = teLeft
          tEvent.eventTiers = []
          teLeft += tEvent.svgWidth
          // Tokens der Zeile ermitteln.
          tEvent.hasEventTiers = false
          tEvent.events.forEach(function (aEvent) {
            if (aEvent.et && aEvent.et.length > 0) {
              tEvent.hasEventTiers = true
              if (aZeile.eventTiers < aEvent.et.length) {
                aZeile.eventTiers = aEvent.et.length
              }
              aEvent.et.forEach((aEt) => {
                tEvent.eventTiers.push(aEt.tiObj.tier_name + ': ' + aEt.txt)
              })
            }
            if (aEvent.tidObj) {
              Object.keys(aEvent.tidObj).forEach(function (aInfPk) {
                if (!aZeile.tokenListByInf[aInfPk]) {
                  aZeile.tokenListByInf[aInfPk] = []
                }
                aZeile.tokenListByInf[aInfPk] = [...aZeile.tokenListByInf[aInfPk], ...aEvent.tidObj[aInfPk]]
              }, this)
            }
          }, this)
        }, this)
        // Vertikal
        let zHeight = 0
        this.root.aInformanten.informantenList.forEach(aInf => {
          // Verwendete TokenSets ermitteln
          if (aInf.show) {
            let tsHeight = 0
            let aZteStart = aZeile.tokenListByInf[aInf.pk] ? this.root.aTokens.tokenLists.all.indexOf(aZeile.tokenListByInf[aInf.pk][0]) : -1
            let aZteEnde = aZeile.tokenListByInf[aInf.pk] ? this.root.aTokens.tokenLists.all.indexOf(aZeile.tokenListByInf[aInf.pk][aZeile.tokenListByInf[aInf.pk].length - 1]) : -1
            if (aZeile.iPks.indexOf(aInf.pk) > -1) {
              let aTokenSetsListPk = []
              let aTokenSetsList = []
              aZeile.teObjs.forEach(function (tEvent) {
                tEvent.events.forEach(function (aEvent) {
                  if (aEvent.tidObj && aEvent.tidObj[aInf.pk]) {
                    aEvent.tidObj[aInf.pk].forEach(function (aToken) {
                      if (aToken.tokenSetsList) {
                        aToken.tokenSetsList.forEach(function (aTokenSet) {
                          if (aTokenSetsListPk.indexOf(aTokenSet.pk) < 0) {
                            aTokenSetsListPk.push(aTokenSet.pk)
                            aTokenSetsList.push(aTokenSet)
                          }
                        }, this)
                      }
                    }, this)
                  }
                }, this)
              }, this)
              let aTokenSetsDeepList = []
              let tokenSetsSvgData = {}
              if (aTokenSetsList.length > 0) {
                aTokenSetsList = this.root.aTokenSets.sortTokenSets(aTokenSetsList)
                // TokenSets in Zeilen laden:
                aTokenSetsList.some(function (aTokenSet) {
                  // TokenSets sortieren:
                  let aSetT = (aTokenSet.tObj || aTokenSet.tx)
                  let atSetStart = this.root.aTokens.tokenLists.all.indexOf(aSetT[0])
                  let atSetEnde = this.root.aTokens.tokenLists.all.indexOf(aSetT[aSetT.length - 1])
                  // Aktuelle Tiefe ermitteln
                  let aDeep = aTokenSetsDeepList.length
                  aTokenSetsDeepList.some(function (adTokenSets, i) {
                    let aOk = true
                    adTokenSets.forEach(function (adTokenSet) {
                      let tSet = (adTokenSet.tObj || adTokenSet.tx)
                      if (atSetStart <= this.root.aTokens.tokenLists.all.indexOf(tSet[tSet.length - 1]) && atSetEnde >= this.root.aTokens.tokenLists.all.indexOf(tSet[0])) {
                        aOk = false
                        return true
                      }
                    }, this)
                    if (aOk) {
                      aDeep = i
                      return true
                    }
                  }, this)
                  if (!aTokenSetsDeepList[aDeep]) {
                    aTokenSetsDeepList[aDeep] = []
                  }
                  aTokenSetsDeepList[aDeep].push(aTokenSet)
                  // Zusätzliche Daten für SVG Darstellung der Token Sets hinzufügen:
                  tokenSetsSvgData[aTokenSet.pk] = {}
                  tokenSetsSvgData[aTokenSet.pk]['startToken'] = (
                    (atSetStart < aZteStart)
                      ? undefined
                      : aSetT[0])
                  tokenSetsSvgData[aTokenSet.pk]['endToken'] = (
                    (atSetEnde > aZteEnde)
                      ? undefined
                      : aSetT[aSetT.length - 1])
                  if (aTokenSet.tx) {
                    // console.log(aTokenSet, aSetT[0].eObj, aZeile.teObjs, this.getTEventOfAEvent(aSetT[0].eObj, aZeile.teObjs), aSetT[0])
                    try {
                      tokenSetsSvgData[aTokenSet.pk]['startX'] = (
                        (atSetStart < aZteStart)
                          ? undefined
                          : (this.getTEventOfAEvent(aSetT[0].eObj, aZeile.teObjs).svgLeft + aSetT[0].svgLeft)
                      )
                      tokenSetsSvgData[aTokenSet.pk]['endX'] = (
                        (atSetEnde > aZteEnde)
                          ? undefined
                          : this.getTEventOfAEvent(aSetT[aSetT.length - 1].eObj, aZeile.teObjs).svgLeft + aSetT[aSetT.length - 1].svgLeft + aSetT[aSetT.length - 1].svgWidth
                      )
                    } catch (err) {
                      let aError = 'Fehler beim verarbeiten des Tokensets! id: ' + aTokenSet.pk
                      console.log('---- Fehler beim verarbeiten des Tokensets! ----', aTokenSet.pk, aTokenSet.tx[0].o + '/' + aTokenSet.tx[0].t, aTokenSet.tx[aTokenSet.tx.length - 1].o + '/' + aTokenSet.tx[aTokenSet.tx.length - 1].t)
                      console.log({
                        'aError': aError,
                        'aTokenSet': aTokenSet,
                        'aSetT[0]': aSetT[0],
                        'aSetT[aSetT.length - 1]': aSetT[aSetT.length - 1],
                        'error': err
                      })
                      if (this.errors.indexOf(aError) < 0) {
                        this.errors.push(aError)
                      }
                    }
                  } else {
                    tokenSetsSvgData[aTokenSet.pk]['startX'] = (
                      (atSetStart < aZteStart)
                        ? undefined
                        : this.getTEventOfAEvent(aSetT[0].eObj, aZeile.teObjs).svgLeft + aSetT[0].svgLeft + (aSetT[0].svgWidth / 2)
                    )
                    tokenSetsSvgData[aTokenSet.pk]['endX'] = (
                      (atSetEnde > aZteEnde)
                        ? undefined
                        : this.getTEventOfAEvent(aSetT[aSetT.length - 1].eObj, aZeile.teObjs).svgLeft + aSetT[aSetT.length - 1].svgLeft + (aSetT[aSetT.length - 1].svgWidth / 2)
                    )
                    tokenSetsSvgData[aTokenSet.pk]['tokensX'] = []
                    aSetT.forEach(function (aToken) {
                      let aTEvent = this.getTEventOfAEvent(aToken.eObj, aZeile.teObjs)
                      if (aTEvent) {
                        tokenSetsSvgData[aTokenSet.pk]['tokensX'].push(aTEvent.svgLeft + aToken.svgLeft + (aToken.svgWidth / 2))
                      }
                    }, this)
                  }
                  // Sortierung optimieren:
                  let dChange = true
                  for (let m = 0; (m < 10 && dChange); m++) {
                    dChange = false
                    for (let i = aTokenSetsDeepList.length - 2; i >= 0; i--) {
                      aTokenSetsDeepList[i].forEach(function (aTokenSets, aIndex) {
                        let aSetT = (aTokenSets.tObj || aTokenSets.tx)
                        let atSetStart = this.root.aTokens.tokenLists.all.indexOf(aSetT[0])
                        let atSetEnde = this.root.aTokens.tokenLists.all.indexOf(aSetT[aSetT.length - 1])
                        let aOk = true
                        aTokenSetsDeepList[i + 1].some(function (bTokenSets) {
                          let nSetT = (bTokenSets.tObj || bTokenSets.tx)
                          if (atSetStart <= this.root.aTokens.tokenLists.all.indexOf(nSetT[nSetT.length - 1]) && atSetEnde >= this.root.aTokens.tokenLists.all.indexOf(nSetT[0])) {
                            aOk = false
                            return true
                          }
                        }, this)
                        if (aOk) {
                          dChange = true
                          aTokenSetsDeepList[i + 1].push(aTokenSetsDeepList[i].splice(aIndex, 1)[0])
                        }
                      }, this)
                    }
                  }
                }, this)
              }
              aZeile.tokenSetsListByInf[aInf.pk] = aTokenSetsList
              aZeile.tokenSetsDeepList[aInf.pk] = aTokenSetsDeepList
              aZeile.tokenSetsSvgData[aInf.pk] = tokenSetsSvgData
              tsHeight = this.tokenSetsHeight * aTokenSetsDeepList.length
              // Koordinaten setzen
              aZeile.svgInfLine[aInf.pk] = {top: zHeight, tsHeight: tsHeight}
              zHeight += this.infHeight + this.selHeight + this.infTop + tsHeight
            }
          }
        }, this)
        aZeile.svgTop = this.height
        aZeile.svgHeight = zHeight + this.zeilenAbstand + this.timerHeight + this.frmPadding * 2
        if (this.root.showEventTiers) {
          aZeile.svgHeight += (this.eventTierHeight * aZeile.eventTiers) + (aZeile.eventTiers > 0 ? this.frmPadding : 0)
        }
        this.height += aZeile.svgHeight
      }, this)
      this.scrolling()
    }
    this.update = true
  },
  getTEventOfAEvent (sEvent, tEvents) {
    // Gibt das tEvent zu einem Event zurück.
    let nObj = null
    tEvents.some(function (aTEvent) {
      if (aTEvent.events.indexOf(sEvent) > -1) {
        nObj = aTEvent
        return true
      }
    }, this)
    return nObj
  },
  scrolling () {
    // Zeilen im Sichtbreich ermitteln
    let aTop = this.viewElement.scrollTop
    let aBottom = aTop + this.viewHeight
    this.renderZeilen = []
    this.zeilen.all.some(function (zeile, key) {
      if ((zeile.svgTop + zeile.svgHeight > aTop) && (zeile.svgTop < aBottom)) {
        this.renderZeilen.push(key)
      }
    }, this)
    // console.log('Scrolling', aTop, '-', aBottom, this.renderZeilen)
  },
  scrollToToken (aToken) {
    let sTop = this.viewElement.scrollTop
    let sBottom = sTop + this.viewHeight - 75
    let aZTE = null
    this.zeilen.all.some(aZeile => {
      if (aZeile.tokenListByInf[aToken.i]) {
        if (aZeile.tokenListByInf[aToken.i].indexOf(aToken) > -1) {
          aZTE = aZeile
          return true
        }
      }
    })
    let sTo = -1
    if (aZTE) {
      if (aZTE.svgTop < sTop) {
        sTo = aZTE.svgTop - 20
        if (sTo < 0) sTo = 0
      } else if ((aZTE.svgTop + aZTE.svgHeight) > sBottom) {
        sTo = (aZTE.svgTop + aZTE.svgHeight + 20) - (this.viewHeight + 75) * 0.8
        if (sTo < 0) sTo = 0
      }
      if (sTo > -1) $(this.viewElement).stop().animate({scrollTop: sTo}, 250)
    }
  }
}

export default localFunctions
