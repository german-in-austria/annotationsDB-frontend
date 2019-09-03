<template>
  <div class="hauptfenster h100">
    <div class="container" v-if="!transcript"><div class="alert alert-warning mt-5">Kein Transkript ausgewählt!</div></div>
    <div class="container" v-else-if="transcript.error"><div class="alert alert-danger mt-5">Fehler beim Laden des Transcripts: {{ transcript.pk }}!</div></div>
    <div class="container" v-else-if="!transcript.ready"><div class="alert alert-info mt-5">Transkript({{ transcript.pk }}) wird geladen!</div></div>
    <template v-else>
      <div id="svgscroller" class="h100 mcon vscroller" ref="viewElement" v-on:scroll="transcript.aSVG.scrolling()" @click="setFocus">
        <input ref="focusInput" @keyup="keyup" id="focus-input" type="text" @focus="focus = true" @blur="focus = false" />
        <AnnotationsAnzeige :transcript="transcript" />
        <div id="loadsym" v-if="transcript.loading">
          <span class="glyphicon glyphicon-refresh gly-spin" aria-hidden="true"></span>
          <div v-if="!transcript.loaded">{{ parseInt(99 / transcript.lMaxSet * transcript.lSet) }} %</div>
        </div>
        <div id="mcon-focus" :class="focus ? 'focus' : ''" />
      </div>
      <button @click="speichern()" id="saveit" v-bind:class="{ btn: true, 'btn-success': true, disabled: !unsaved }"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Speichern</button>
    </template>
  </div>
</template>

<script>
import AnnotationsAnzeige from './annotationsanzeige/AnnotationsAnzeige'
import Globals from '@/functions/globals'

export default {
  name: 'Hauptfenster',
  props: ['transcript'],
  data () {
    return {
      globals: Globals,
      unsaved: false,
      focus: false
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
      this.$refs.focusInput.focus()
    },
    speichern () {
      console.log('ToDo: Transcript speichern ...')
    },
    keyup (e) {
      if (e.keyCode === 39) { // rechts
        e.preventDefault()
        // if (e.shiftKey && this.selTokenBereich.v === -1) {
        //   this.selTokenBereich.v = this.selToken
        // }
        if (e.ctrlKey && !this.globals.ctrlUsed === false) {
          // this.updateSelTokenListe(this.selToken)
        }
        this.transcript.selectedToken = this.transcript.aTokens.getNextPrev(this.transcript.selectedToken)
        // if (e.shiftKey) {
        //   this.selTokenBereich.b = this.selToken
        // } else {
        //   this.selTokenBereich = {'v': -1, 'b': -1}
        // }
        if (e.ctrlKey) {
          // this.updateSelTokenListe(this.selToken);
          this.globals.ctrlUsed = true
        }
      } else if (e.keyCode === 37) { // links
        e.preventDefault()
        // if (e.shiftKey && this.selTokenBereich.v === -1) {
        //   this.selTokenBereich.v = this.selToken
        // }
        if (e.ctrlKey && !this.globals.ctrlUsed) {
          // this.updateSelTokenListe(this.selToken)
        }
        this.transcript.selectedToken = this.transcript.aTokens.getNextPrev(this.transcript.selectedToken, false)
        // if (e.shiftKey) {
        //   this.selTokenBereich.b = this.selToken
        // } else {
        //   this.selTokenBereich = {'v': -1, 'b': -1}
        // }
        if (e.ctrlKey) {
          // this.updateSelTokenListe(this.selToken)
          this.globals.ctrlUsed = true
        }
      } else if (e.keyCode === 40) { // unten
        e.preventDefault()
        // this.selTokenBereich = {'v': -1, 'b': -1}
        // this.selectNextInf()
      } else if (e.keyCode === 38) { // oben
        e.preventDefault()
        // this.selTokenBereich = {'v': -1, 'b': -1}
        // this.selectPrevInf()
      } else if (e.ctrlKey && e.keyCode === 13) { // Strg. + Enter
        // if (this.selTokenSet !== 0) {
        //   this.showaTokenSetInfos(this.selTokenSet, true)
        // }
        this.globals.ctrlUsed = true
      } else if (e.keyCode === 13) { // Enter
        e.preventDefault()
        // if (this.selToken > -1) {
        //   this.showaTokenInfos(this.selToken, true)
        // }
      } else if (e.keyCode === 17) { // Strg
        // if (!this.globals.ctrlUsed) {
        //   this.updateSelTokenListe(this.selToken)
        // }
        this.globals.ctrlUsed = false
      } else {
        console.log('focusCatchKeyUp: ' + e.keyCode)
      }
      e.target.value = ''
    }
  },
  watch: {
    'transcript.ready' () {
      this.$nextTick(() => {
        if (this.transcript && this.transcript.aSVG) {
          this.transcript.aSVG.setViewElement(this.transcript.ready ? this.$refs.viewElement : null)
        }
      })
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
    right: 35px;
    bottom: 160px;
  }
  #loadsym {
    position: absolute;
    text-align: center;
    right: 25px;
    top: 5px;
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
    bottom: -75px;
    margin-left: -15px;
    margin-right: -8px;
    height: calc(100% + 74px);
    border: 2px solid rgba(51, 122, 183, 0.45);
    /* box-shadow: inset 0 0 5px rgba(51, 122, 183, 0.5); */
    pointer-events: none;
    margin-bottom: -75px;
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
</style>
