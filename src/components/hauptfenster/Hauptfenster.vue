<template>
  <div class="hauptfenster h100">
    <div class="container" v-if="!transcript"><div class="alert alert-warning mt-5">Kein Transkript ausgewählt!</div></div>
    <div class="container" v-else-if="transcript.error"><div class="alert alert-danger mt-5">Fehler beim Laden des Transcripts: {{ transcript.pk }}!</div></div>
    <div class="container" v-else-if="!transcript.ready"><div class="alert alert-info mt-5">Transkript({{ transcript.pk }}) wird geladen!</div></div>
    <template v-else>
      <div id="svgscroller" class="h100 mcon vscroller" ref="viewElement" v-on:scroll="transcript.aSVG.scrolling()" @click="$refs.focusInput.focus()">
        <input ref="focusInput" id="focus-input" type="text" @focus="focus = true" @blur="focus = false" />
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

export default {
  name: 'Hauptfenster',
  props: ['transcript'],
  data () {
    return {
      unsaved: false,
      focus: false
    }
  },
  mounted () {
    console.log(this.$refs.focusInput)
  },
  computed: {
  },
  methods: {
    speichern () {
      console.log('ToDo: Transcript speichern ...')
    }
  },
  watch: {
    'transcript.ready' () {
      this.$nextTick(() => {
        if (this.transcript && this.transcript.aSVG) {
          this.transcript.aSVG.setViewElement(this.transcript.ready ? this.$refs.viewElement : null)
        }
      })
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
  }
</style>
