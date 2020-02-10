<template>
    <div class="suchgroup">
      <h4>Suchen:<a href="#" v-on:click.prevent="$emit('closeSuche')" class="pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4>
      <div class="lmfasff">
        <div class="iwdbtn">
          <input ref="suchtext" type="text" size="20" placeholder="Suchen ..."
            v-on:keyup="sucheCatchKeyUp"
            v-rt-ipa
            v-on:keydown="sucheCatchKeyDown"
            :class="'lmfasf' + (suchRegExError ? ' error' : '')"
            v-model="suchText"
          />
          <button class="idbtn" title="Eingabe loeschen!" @click="suchText=''"><span class="glyphicon glyphicon-erase" aria-hidden="true"></span></button>
        </div>
      </div>
      <div>
        <label
          v-for="(aTrack, aKey) in availableTracks" :key="'sufs-f' + aKey"
        >
          <input type="checkbox" v-model="suchOpt[aTrack.title]" @change="suche()">&nbsp;{{ aTrack.title }}&nbsp;
        </label>
      </div>
      <div>
        <b>Bereich:</b>&nbsp;
        <input type="radio" id="suchetoken" value="token" v-model="suchModus" @change="suche()">
        <label for="suchetoken">Token</label>&nbsp;
        <input type="radio" id="suchevolltext" value="volltext" v-model="suchModus" @change="suche()">
        <label for="suchevolltext">Volltext</label>&nbsp;
        <br>
        <b>Art:</b>&nbsp;
        <input type="radio" id="st-e" :value="1" v-model="suchModusArt" @change="suche()">
        <label for="st-e">Einfach</label>&nbsp;
        <input type="radio" id="st-w" :value="2" v-model="suchModusArt" @change="suche()" :disabled="suchModus !== 'volltext'">
        <label for="st-w">Wild</label>&nbsp;
        <input type="radio" id="st-r" :value="3" v-model="suchModusArt" @change="suche()" :disabled="suchModus !== 'volltext'">
        <label for="st-r">RegEx</label>&nbsp;
      </div>
      <select size="1" class="form-control" v-model="suchInf" @change="suche()">
        <option value="0">Alle Informanten</option>
        <option v-for="aInf in transcript.aInformanten.informantenList" :key="'stis' + aInf.pk" :value="aInf.pk">{{ aInf.k }}</option>
      </select>
      <div v-if="transcript.aTokens.foundTokensList.length" class="mit10">
        Gefunden: <b>{{ transcript.aTokens.foundTokensList.length }}</b> Token{{ ((transcript.aTokens.foundTokensList.length>1)?'s':'') }}<br>
        <!-- <a href="#" v-on:click.prevent="sucheZuAuswahlListe" v-if="suchInf > 0" class="lmfabc text-center">Alle Funde {{ selTokenListe.length > 0 ? 'in' : 'als' }} Auswahl Liste</a> -->
      </div>
      <hr>
    </div>
</template>

<script>
/* global _ */

export default {
  name: 'SuchenUndFilternSuche',
  props: ['transcript'],
  data () {
    return {
      suchText: '',
      suchOpt: {},
      suchModus: 'token',
      suchModusArt: 1,
      suchInf: 0,
      suchen: false,
      suchRegExError: false
    }
  },
  mounted () {
    console.log(this.transcript, this.transcript.aTokens)
    this.$nextTick(() => { this.$refs.suchtext.focus() })
    this.availableTracks.forEach(aTrack => {
      this.suchOpt[aTrack.title] = true
    })
  },
  methods: {
    sucheZuAuswahlListe () {
      // ToDo ...
    },
    suche () {
      if (!this.suchen) {
        this.suchen = true
        this.resetSuche()
        if (this.suchText.trim().length > 1) {  // Suche durchführen
          var t0 = performance.now()
          if (this.suchModus === 'token') {
            this.transcript.aTokens.tokenLists.all.forEach(aToken => {
              if (parseInt(this.suchInf) === 0 || aToken.i === parseInt(this.suchInf)) {
                let addToken = false
                this.availableTracks.some(aTrack => {
                  if (this.suchOpt[aTrack.title] && aToken[aTrack.field[0]] && aToken[aTrack.field[0]].toLowerCase().indexOf(this.suchText.toLowerCase()) >= 0) {
                    addToken = true
                    return true
                  }
                })
                if (addToken) {
                  this.transcript.aTokens.foundTokensList.push(aToken)
                }
              }
            })
          } else if (this.suchModus === 'volltext') {
            let sTxt = this.suchText.toLowerCase().replace(String.fromCharCode(160), ' ').trim()
            let sTxtLen = sTxt.length
            if (this.suchModusWild) {
              sTxt = new RegExp('\\b' + sTxt.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').split(/\*+/).join('[a-zäöüß]*') + '\\b', 'ig')
            }
            if (this.suchModusRegEx) {
              try {
                sTxt = new RegExp('' + this.suchText.replace(String.fromCharCode(160), ' ').trim() + '', 'ig')
                this.suchRegExError = false
              } catch (e) {
                console.log('suchModusRegEx', this.suchText.replace(String.fromCharCode(160)), e)
                sTxt = null
                this.suchRegExError = true
              }
            }
            console.log('sTxt', sTxt)
            if (sTxt) {
              Object.keys(this.transcript.aTokens.aTokenTextInf).forEach(function (aInfKey) {
                if (parseInt(this.suchInf) === 0 || parseInt(this.suchInf) === parseInt(aInfKey)) {
                  this.availableTracks.forEach(function (aTrack) {
                    if (this.suchOpt[aTrack.title]) {
                      let fPos = []
                      let aTxt = this.transcript.aTokens.aTokenTextInf[aInfKey][aTrack.title].toLowerCase()
                      if (this.suchModusWild || this.suchModusRegEx) {
                        let aMatch
                        let dg = 0
                        while ((aMatch = sTxt.exec(aTxt)) !== null && dg < 10000) {
                          fPos.push({'v': aMatch.index, 'b': aMatch.index + aMatch[0].length - 1})
                          dg += 1
                        }
                      } else {
                        let sTxtPos = aTxt.indexOf(sTxt, 0)
                        while (sTxtPos > -1) {
                          fPos.push({'v': sTxtPos, 'b': sTxtPos + sTxtLen - 1})
                          sTxtPos = aTxt.indexOf(sTxt, sTxtPos + sTxtLen - 1)
                        }
                      }
                      if (fPos.length > 0) {
                        Object.keys(this.transcript.aTokens.aTokenTextInf[aInfKey].tokens).forEach(function (aTokenId) {
                          let aToken = this.transcript.aTokens.tokensObj[aTokenId]
                          if (this.transcript.aTokens.foundTokensList.indexOf(aToken) === -1) {
                            let aTokenTxtInfo = this.transcript.aTokens.aTokenTextInf[aInfKey].tokens[aTokenId][aTrack.title]
                            fPos.forEach(function (aPos) {
                              if ((aPos.v <= aTokenTxtInfo.b && aPos.b >= aTokenTxtInfo.v)) {
                                this.transcript.aTokens.foundTokensList.push(aToken)
                              }
                            }, this)
                          }
                        }, this)
                      }
                    }
                  }, this)
                }
              }, this)
            }
          }
          console.log('suche (' + this.suchModus + '): ' + Math.ceil(performance.now() - t0) + ' ms', this.transcript.aTokens.foundTokensList)
        }
        this.suchen = false
      }
    },
    debouncedSuche: _.debounce(function () { this.suche() }, 500),
    sucheCatchKeyUp (e) {
      if (e.keyCode === 27) { // ESC
        e.preventDefault()
        this.$emit('closeSuche')
      } else if (e.keyCode === 13) { // Enter
        e.preventDefault()
        this.focusFocusCatch()
      }
    },
    sucheCatchKeyDown (e) {
      if (e.keyCode === 114) { // F3
        e.preventDefault()
        this.transcript.aTokens.naechsterSuchToken(!e.shiftKey)
        this.focusFocusCatch()
      }
    },
    focusFocusCatch () {
      this.$root.$children[0].$refs.annotationstool.$refs.hauptfenster.setFocus()
    },
    resetSuche () {
      console.log('Suche zurücksetzen ...')
      this.transcript.aTokens.foundTokensList = []
    }
  },
  beforeDestroy () {
    this.resetSuche()
  },
  computed: {
    suchModusWild () {
      return this.suchModusArt === 2
    },
    suchModusRegEx () {
      return this.suchModusArt === 3
    },
    availableTracks () {
      let availableTracks = []
      this.transcript.aTranskript.allTracks.forEach(aTrack => {
        if (aTrack.show) {
          availableTracks.push(aTrack)
        }
      })
      return availableTracks
    }
  },
  watch: {
    suchModusArt () {
      this.suchRegExError = false
    },
    suchModus: function (nVal) {
      if (nVal === 'token') {
        this.suchModusArt = 1
      }
    },
    suchText: function (nVal, oVal) {
      if (nVal.length > 0) {
        this.debouncedSuche()
      } else {
        this.resetSuche()
      }
    }
  }
}
</script>

<style scoped>
.lmfasf.error, .lmfasf-nf.error {
  background-color: #fee;
}
</style>
