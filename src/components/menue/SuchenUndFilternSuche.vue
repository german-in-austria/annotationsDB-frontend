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
        <option v-for="(aInf, aInfKey) in transcript.aInformanten.informantenList" :key="'stis' + aInfKey" :value="aInfKey.pk">{{ aInf.k }}</option>
      </select>
      <!-- <div v-if="suchTokens.length" class="mit10">
        Gefunden: <b>{{ suchTokens.length }}</b> Token{{ ((suchTokens.length>1)?'s':'') }}<br>
        <a href="#" v-on:click.prevent="sucheZuAuswahlListe" v-if="suchInf>0" class="lmfabc text-center">Alle Funde {{ ((selTokenListe.length>0) ? 'in' : 'als') }} Auswahl Liste</a>
      </div> -->
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
    this.$nextTick(() => { this.$refs.suchtext.focus() })
  },
  methods: {
    suche () {
      if (!this.suchen) {
        this.suchen = true
        if (this.suchText.trim().length > 1) {  // Suche durchführen
          var t0 = performance.now()
          // ToDo: ...
          console.log('suche (' + this.suchModus + '): ' + Math.ceil(performance.now() - t0) + ' ms')
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
    }
  },
  computed: {
  },
  watch: {
    suchText: function (nVal, oVal) {
      if (nVal.length > 0) {
        this.debouncedSuche()
      } else {
        // this.suchTokens = []
        // this.suchTokensInfo = {}
      }
    }
  }
}
</script>

<style scoped>
</style>
