<template>
  <div class="hauptfenster h100">
    <div class="container" v-if="!transcript">
      <div class="alert alert-warning mt-5">Kein Transkript ausgewählt!</div>
        <!-- Test: <div><input type="text" v-rt-ipa :class="'form-control'" :spellcheck="globals.spellcheck" v-model="test"></div> -->
      </div>
    <div class="container" v-else-if="transcript.error"><div class="alert alert-danger mt-5">Fehler beim Laden des Transcripts: {{ transcript.pk }}!</div></div>
    <div class="container" v-else-if="!transcript.ready"><div class="alert alert-info mt-5">Transkript({{ transcript.pk }}) wird geladen!</div></div>
    <template v-else>
      <div id="svgscroller" class="h100 mcon vscroller" ref="viewElement" v-on:scroll="transcript.aSVG.scrolling()" @click="setFocus">
        <input ref="focusInput" @keyup="keyup" @keydown="keydown" id="focus-input" type="text" @focus="focus = true" @blur="focus = false" />
        <AnnotationsAnzeige :transcript="transcript" />
        <div id="mcon-focus" :class="focus ? 'focus' : ''" />
      </div>
      <div id="loadsym" v-if="transcript.loading">
        <span class="glyphicon glyphicon-refresh gly-spin" aria-hidden="true"></span>
        <div v-if="!transcript.loaded">{{ parseInt(99 / transcript.lMaxSet * transcript.lSet) }} %</div>
      </div>
      <div class="svgerror" v-if="transcript && ((transcript.errors && transcript.errors.length > 0) || (transcript.aSVG && transcript.aSVG.errors && transcript.aSVG.errors.length > 0))">
        <div class="svgerror-frm" v-if="transcript.errors && transcript.errors.length > 0">
         <b>Fehler beim verarbeiten der Transkript Daten! - Transkript id: {{ transcript.pk }}</b>
          <hr>
          <ul>
            <li v-for="aError in transcript.errors" :key="'transError-' + aError">
              {{ aError }}
            </li>
          </ul>
        </div>
        <div class="svgerror-frm" v-if="transcript.aSVG && transcript.aSVG.errors && transcript.aSVG.errors.length > 0">
          <b>Fehler beim verarbeiten der Daten für die Anzeige (SVG)! - Transkript id: {{ transcript.pk }}</b>
          <hr>
          <ul>
            <li v-for="aError in transcript.aSVG.errors" :key="'svgError-' + aError">
              {{ aError }}
            </li>
          </ul>
        </div>
      </div>
      <button @click="speichern()" id="saveit" v-bind:class="{ btn: true, 'btn-success': true, disabled: !(transcript && transcript.unsaved) || transcript.loading }"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Speichern</button>
    </template>
  </div>
</template>

<script>
/* global _ */
import AnnotationsAnzeige from './annotationsanzeige/AnnotationsAnzeige'
import Globals from '@/functions/globals'

export default {
  name: 'Hauptfenster',
  props: ['transcript'],
  data () {
    return {
      globals: Globals,
      focus: false,
      test: ''
    }
  },
  mounted () {
    console.log(this.globals)
    if (this.transcript && this.transcript.aSVG) {
      this.transcript.aSVG.setViewElement(this.transcript.ready ? this.$refs.viewElement : null)
    }
  },
  computed: {
    selectedTokenPk () {
      return (this.transcript && this.transcript.selectedToken) ? this.transcript.selectedToken.pk : null
    }
  },
  methods: {
    setFocus () {
      if (this.$refs.focusInput) {
        this.$refs.focusInput.focus()
      }
    },
    speichern () {
      if (this.transcript.unsaved) {
        this.transcript.save()
      }
    },
    keydown (e) {
      if (e.keyCode === 114) { // F3
        e.preventDefault()
        this.transcript.aTokens.naechsterSuchToken(!e.shiftKey)
      } else if (e.ctrlKey && e.keyCode === 70) { // Strg + F
        e.preventDefault()
        this.$root.$children[0].$refs.annotationstool.showSuchenUndFiltern()
        this.globals.ctrlUsed = true
      }
    },
    keyup (e) {
      // console.log('keyUp: ' + e.keyCode)
      if (this.transcript) {
        if (e.keyCode === 39) { // rechts
          e.preventDefault()
          if (e.shiftKey && !this.transcript.selectedTokenBereich.v) {
            this.transcript.selectedTokenBereich.v = this.transcript.selectedToken
          }
          if (e.ctrlKey && !this.globals.ctrlUsed) {
            this.transcript.toggleSelectedTokenListe(this.transcript.selectedToken)
          }
          this.transcript.selectedToken = this.transcript.aTokens.getNextPrev(this.transcript.selectedToken)
          if (e.shiftKey) {
            this.transcript.selectedTokenBereich.b = this.transcript.selectedToken
          } else {
            this.transcript.selectedTokenBereich = {'v': null, 'b': null}
          }
          if (e.ctrlKey) {
            this.transcript.toggleSelectedTokenListe(this.transcript.selectedToken)
            this.globals.ctrlUsed = true
          }
        } else if (e.keyCode === 37) { // links
          e.preventDefault()
          if (e.shiftKey && !this.transcript.selectedTokenBereich.v) {
            this.transcript.selectedTokenBereich.v = this.transcript.selectedToken
          }
          if (e.ctrlKey && !this.globals.ctrlUsed) {
            this.transcript.toggleSelectedTokenListe(this.transcript.selectedToken)
          }
          this.transcript.selectedToken = this.transcript.aTokens.getNextPrev(this.transcript.selectedToken, false)
          if (e.shiftKey) {
            this.transcript.selectedTokenBereich.b = this.transcript.selectedToken
          } else {
            this.transcript.selectedTokenBereich = {'v': null, 'b': null}
          }
          if (e.ctrlKey) {
            this.transcript.toggleSelectedTokenListe(this.transcript.selectedToken)
            this.globals.ctrlUsed = true
          }
        } else if (e.keyCode === 40) { // unten
          e.preventDefault()
          this.transcript.selectedTokenBereich = {'v': null, 'b': null}
          // this.selectNextInf()
        } else if (e.keyCode === 38) { // oben
          e.preventDefault()
          this.transcript.selectedTokenBereich = {'v': null, 'b': null}
          // this.selectPrevInf()
        } else if (e.ctrlKey && e.keyCode === 13) { // Strg. + Enter
          if (this.transcript.selectedTokenSet) {
            this.transcript.vueObj.modalData = { type: 'tokenSet', data: {aTokenSet: _.cloneDeep(this.transcript.selectedTokenSet)} }
          }
          this.globals.ctrlUsed = true
        } else if (e.keyCode === 13) { // Enter
          e.preventDefault()
          if (this.transcript.selectedToken) {
            this.transcript.vueObj.modalData = { type: 'token', data: {aToken: _.cloneDeep(this.transcript.selectedToken)} }
          }
        } else if (e.keyCode === 17) { // Strg
          if (!this.globals.ctrlUsed) {
            this.transcript.toggleSelectedTokenListe(this.transcript.selectedToken)
          }
          this.globals.ctrlUsed = false
        } else {
          console.log('keyUp: ' + e.keyCode)
        }
        e.target.value = ''
      }
    }
  },
  watch: {
    'transcript.ready' () {
      this.$nextTick(() => {
        if (this.transcript && this.transcript.aSVG) {
          this.transcript.aSVG.setViewElement(this.transcript.ready ? this.$refs.viewElement : null)
        }
        if (this.transcript && this.transcript.ready) {
          this.setFocus()
        }
      })
    },
    'transcript.selectedTokenBereich.v' () {
      if (this.transcript) this.transcript.selectedTokenBereichUpdate()
    },
    'transcript.selectedTokenBereich.b' () {
      if (this.transcript) this.transcript.selectedTokenBereichUpdate()
    },
    selectedTokenPk (nVal) {
      if (nVal) {
        // Zu aktuell ausgewählten Token scrollen
        this.transcript.aSVG.scrollToToken(this.transcript.selectedToken)
      }
    }
  },
  beforeDestroy () {
    if (this.transcript && this.transcript.aSVG) {
      this.transcript.aSVG.setViewElement(null)
    }
  },
  components: {
    AnnotationsAnzeige
  }
}
</script>

<style scoped>
  #saveit {
    position: absolute;
    right: 25px;
    bottom: 160px;
  }
  #loadsym {
    position: absolute;
    text-align: center;
    right: 30px;
    top: 10px;
    color: #00f;
    font-size: 24px;
  }
  #loadsym>div {
    background: #f9fdc6ad;
    font-size: 16px;
    min-width: 50px;
    border-radius: 3px;
    padding: 2px 5px;
  }
  #svgscroller {
    position: relative;
  }
  .mcon {
    padding-right: 8px;
  }
  #mcon-focus {
    position: sticky;
    bottom: 0;
    margin-right: -8px;
    height: calc(100% + -1px);
    border: 2px solid rgba(51, 122, 183, 0.45);
    /* box-shadow: inset 0 0 5px rgba(51, 122, 183, 0.5); */
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s;
  }
  #mcon-focus.focus {
    opacity: 1;
  }
  #focus-input {
    height: 0;
    width: 0;
    border: 0;
    padding: 0;
    display: block;
    position: fixed;
    right: 1px;
    bottom: 1px;
  }
  .svgerror-frm {
    padding-top: 10px;
  }
  .svgerror {
    position: absolute;
    left: 25px;
    top: 25px;
    right: 100px;
    background: #a00;
    color: #fff;
    padding: 10px 25px;
    max-height: 33vh;
    overflow: auto;
  }
  .svgerror hr {
    margin: 5px 0;
  }
  .svgerror ul {
    padding-left: 20px;
  }
</style>
