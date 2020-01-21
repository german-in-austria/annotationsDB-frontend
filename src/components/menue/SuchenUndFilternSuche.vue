<template>
    <div class="suchgroup">
      <h4>Suchen:<a href="#" v-on:click.prevent="$emit('closeSuche')" class="pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4>
      <div class="lmfasff">
        <div class="iwdbtn">
          <input v-on:keyup="sucheCatchKeyUp" v-on:keydown="sucheCatchKeyDown" ref="suchtext" type="text" size="20" class="lmfasf" placeholder="Suchen ..." v-model="suchText">
          <button class="idbtn" title="Eingabe loeschen!" @click="suchText=''"><span class="glyphicon glyphicon-erase" aria-hidden="true"></span></button>
        </div>
      </div>
      <div>
        <label><input type="checkbox" v-model="suchOptText" @change="suche()">&nbsp;Text</label>
        <label><input type="checkbox" v-model="suchOptOrtho" @change="suche()">&nbsp;Ortho</label>
        <label><input type="checkbox" v-model="suchOptTextInOrtho" @change="suche()">&nbsp;Text in Ortho</label>
      </div>
      <div>
        <b>Art:</b>&nbsp;
        <input type="radio" id="suchetoken" value="token" v-model="suchModus" @change="suche()">
        <label for="suchetoken">Token</label>&nbsp;
        <input type="radio" id="suchevolltext" value="volltext" v-model="suchModus" @change="suche()">
        <label for="suchevolltext">Volltext</label>&nbsp;
        <label><input type="checkbox" v-model="suchModusWild" @change="suche()" :disabled="suchModus !== 'volltext'">&nbsp;Wild</label>
      </div>
      <select size="1" class="form-control" v-model="suchInf" @change="suche()">
        <option value="0">Alle Informanten</option>
        <option v-for="aInf in transcript.aInformanten.informantenList" :key="'stis' + aInf.pk" :value="aInf.pk">{{ aInf.k }}</option>
      </select>
      <div v-if="transcript.aTokens.foundTokensList.length" class="mit10">
        Gefunden: <b>{{ transcript.aTokens.foundTokensList.length }}</b> Token{{ ((transcript.aTokens.foundTokensList.length>1)?'s':'') }}<br>
        <!-- <a href="#" v-on:click.prevent="sucheZuAuswahlListe" v-if="suchInf>0" class="lmfabc text-center">Alle Funde {{ ((selTokenListe.length>0) ? 'in' : 'als') }} Auswahl Liste</a> -->
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
      suchOptText: true,
      suchOptOrtho: true,
      suchOptTextInOrtho: false,
      suchModus: 'token',
      suchModusWild: false,
      suchInf: 0,
      suchen: false
    }
  },
  mounted () {
    console.log(this.transcript, this.transcript.aTokens)
    this.$nextTick(() => { this.$refs.suchtext.focus() })
  },
  methods: {
    suche () {
      if (!this.suchen) {
        this.suchen = true
        this.resetSuche()
        if (this.suchText.trim().length > 1) {  // Suche durchführen
          var t0 = performance.now()
          if (this.suchModus === 'token') {
            this.transcript.aTokens.tokenLists.all.forEach(aToken => {
              if (parseInt(this.suchInf) === 0 || aToken.i === parseInt(this.suchInf)) {
                let addToken = (
                  (this.suchOptText && aToken.t && aToken.t.toLowerCase().indexOf(this.suchText.toLowerCase()) >= 0) ||
                  (this.suchOptOrtho && aToken.o && aToken.o.toLowerCase().indexOf(this.suchText.toLowerCase()) >= 0) ||
                  (this.suchOptTextInOrtho && aToken.to && aToken.to.toLowerCase().indexOf(this.suchText.toLowerCase()) >= 0)
                )
                if (addToken) {
                  this.transcript.aTokens.foundTokensList.push(aToken)
                  this.transcript.aTokens.foundTokensInfoObj[aToken.pk] = { z: 0 }
                }
              }
            })
          } else if (this.suchModus === 'volltext') {
            let sTxt = this.suchText.toLowerCase().replace(String.fromCharCode(160), ' ').trim()
            let sTxtLen = sTxt.length
            if (this.suchModusWild) {
              sTxt = new RegExp('\\b' + sTxt.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').split(/\*+/).join('[a-zäöüß]*') + '\\b', 'ig')
            }
            Object.keys(this.transcript.aTokens.aTokenTextInf).forEach(function (aInfKey) {
              if (parseInt(this.suchInf) === 0 || parseInt(this.suchInf) === parseInt(aInfKey)) {
                [{'prop': 'text', 'opt': 'suchOptText'}, {'prop': 'ortho', 'opt': 'suchOptOrtho'}, {'prop': 'text_in_ortho', 'opt': 'suchOptTextInOrtho'}].forEach(function (aField) {
                  if (this[aField.opt]) {
                    let fPos = []
                    let aTxt = this.transcript.aTokens.aTokenTextInf[aInfKey][aField.prop].toLowerCase()
                    if (this.suchModusWild) {
                      let aMatch
                      while ((aMatch = sTxt.exec(aTxt)) !== null) {
                        fPos.push({'v': aMatch.index, 'b': aMatch.index + aMatch[0].length - 1})
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
                          let aTokenTxtInfo = this.transcript.aTokens.aTokenTextInf[aInfKey].tokens[aTokenId][aField.prop]
                          fPos.forEach(function (aPos) {
                            if ((aPos.v <= aTokenTxtInfo.b && aPos.b >= aTokenTxtInfo.v)) {
                              this.transcript.aTokens.foundTokensList.push(aToken)
                              this.transcript.aTokens.foundTokensInfoObj[aToken.pk] = { z: 0 }
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
          console.log('suche (' + this.suchModus + '): ' + Math.ceil(performance.now() - t0) + ' ms', [this.transcript.aTokens.foundTokensList, this.transcript.aTokens.foundTokensInfoObj])
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
        // this.naechsterSuchToken(!e.shiftKey)
        this.focusFocusCatch()
      }
    },
    focusFocusCatch () {
      this.$root.$children[0].$refs.annotationstool.$refs.hauptfenster.setFocus()
    },
    resetSuche () {
      console.log('Suche zurücksetzen ...')
      this.transcript.aTokens.foundTokensInfoObj = {}
      this.transcript.aTokens.foundTokensList = []
    }
  },
  beforeDestroy () {
    this.resetSuche()
  },
  computed: {
  },
  watch: {
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
</style>
