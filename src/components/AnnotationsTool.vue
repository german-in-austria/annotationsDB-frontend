<template>
  <div id="annotationsTool" v-bind:class="{ loading: loading, bgloading: false, unsaved: unsaved }">
    <div class="row h100">
      <div class="col-md-2 h100 mh200px vscroller lmfa">
        <SuchenUndFiltern v-if="selTranscriptPk > 0" />
        <Informationen :transcript="selTranscript" v-if="selTranscriptPk > 0" />
        <TranskriptAuswahl :transcripts="transcripts" :selectedTranscriptPk="selTranscriptPk" @loadTranscript="loadTranscript" />
      </div>
      <div class="col-md-10 h100 mh600px" style="border-right:1px solid #eee;padding:0px;padding-bottom:150px;">
        <Hauptfenster :transcript="selTranscript" />
        <Audioplayer :audiofile="selTranscript.aEinzelErhebung.dp + selTranscript.aEinzelErhebung.af" :audiodir="audiodir" ref="audioplayer" v-if ="selTranscript && selTranscript.ready" />
      </div>
    </div>
    <Modale :transcript="selTranscript" :modalData="modalData" />
    <div id="loading" v-if="loading">Lade ...</div>
    <svg style="position:absolute;right:0px;bottom:0px;width:1px;height:1px;"><text ref="svgTextSize" x="-100" y="-100"></text></svg>
  </div>
</template>

<script>
import SuchenUndFiltern from './menue/SuchenUndFiltern'
import Informationen from './menue/Informationen'
import TranskriptAuswahl from './menue/TranskriptAuswahl'
import Hauptfenster from './hauptfenster/Hauptfenster'
import Audioplayer from './audioplayer/Audioplayer'
import Modale from './modal/Modale'

import TranscriptsInfListObject from '@/functions/transcriptsinflist/TranscriptsInfList'
import TranscriptObject from '@/functions/transcript/Transcript'

export default {
  /* global csrf audiodir */
  name: 'AnnotationsTool',
  http: {
    root: '/annotationsdb/startvue',
    headers: {
      'X-CSRFToken': csrf
    },
    emulateJSON: true
  },
  data () {
    return {
      loading: false,
      unsaved: false,
      audiodir: '',
      transcripts: {},
      selTranscriptPk: null,
      selTranscript: null,
      modalData: { type: null, data: null }
    }
  },
  mounted () {
    this.audiodir = audiodir
    this.transcripts = new TranscriptsInfListObject.TranscriptsInfListBase(this)
    console.log(this.audiodir)
    console.log(this.transcripts)
  },
  methods: {
    loadTranscript (lTranscript) {
      this.selTranscriptPk = lTranscript
    }
  },
  watch: {
    'selTranscriptPk' (nPk, oPk) {
      if (nPk > 0) {
        this.selTranscript = new TranscriptObject.TranscriptBase(nPk, this)
      } else {
        this.selTranscript = null
      }
    }
  },
  components: {
    SuchenUndFiltern,
    Informationen,
    TranskriptAuswahl,
    Hauptfenster,
    Audioplayer,
    Modale
  }
}
</script>

<style scoped>
</style>
