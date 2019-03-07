<template>
  <div id="annotationsTool" v-bind:class="{ loading: loading, bgloading: false, unsaved: unsaved }">
    <div class="row h100">
      <div class="col-md-2 h100 mh200px vscroller lmfa">
        <!-- <SuchenUndFiltern v-if="annotationsTool.aPK>0"/>
        <Informationen v-if="annotationsTool.aPK>0"/> -->
        <TranskriptAuswahl :transcripts="transcripts" :selectedTranscriptPk="testSelectedTranscriptPk" @loadTranscript="loadTranscript" />
      </div>
      <div class="col-md-10 h100 mh600px" style="border-right:1px solid #eee;padding:0px;padding-bottom:150px;">
        <Hauptfenster />
        <Audioplayer />
      </div>
    </div>
    <div id="loading">Lade ...</div>
  </div>
</template>

<script>
import SuchenUndFiltern from './menue/SuchenUndFiltern'
import Informationen from './menue/Informationen'
import TranskriptAuswahl from './menue/TranskriptAuswahl'
import Hauptfenster from './hauptfenster/Hauptfenster'
import Audioplayer from './audioplayer/Audioplayer'

import TranscriptsObject from '@/functions/transcripts/Transcripts'

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
      testSelectedTranscriptPk: null
    }
  },
  mounted () {
    this.audiodir = audiodir
    this.transcripts = new TranscriptsObject.TranscriptsBase(this)
    console.log(this.audiodir)
    console.log(this.transcripts)
  },
  methods: {
    loadTranscript (lTranscript) {
      this.testSelectedTranscriptPk = lTranscript
      console.log(lTranscript)
    }
  },
  components: {
    SuchenUndFiltern,
    Informationen,
    TranskriptAuswahl,
    Hauptfenster,
    Audioplayer
  }
}
</script>

<style scoped>
</style>
