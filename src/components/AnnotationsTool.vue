<template>
  <div id="annotationsTool" v-bind:class="{ loading: loading, bgloading: false, unsaved: selTranscript && selTranscript.unsaved }">
    <div class="row h100">
      <div class="col-md-2 h100 mh200px vscroller lmfa">
        <SuchenUndFiltern v-if="selTranscriptPk > 0" />
        <Informationen :transcript="selTranscript" v-if="selTranscriptPk > 0" />
        <TranskriptAuswahl :transcripts="transcripts" :selectedTranscriptPk="selTranscriptPk" @loadTranscript="loadTranscript" />
      </div>
      <div class="col-md-10 h100 mh600px" style="border-right:1px solid #eee;padding:0px;padding-bottom:150px;">
        <Hauptfenster ref="hauptfenster" :transcript="selTranscript" />
        <Audioplayer :audiofile="selTranscript.aEinzelErhebung.dp + selTranscript.aEinzelErhebung.af" :audiodir="audiodir" ref="audioplayer" v-if ="selTranscript && selTranscript.ready" />
      </div>
    </div>
    <Modale :transcript="selTranscript" :modalData="modalData" />
    <div id="loading" v-if="loading">Lade ...</div>
    <svg style="position:absolute;right:0px;bottom:0px;width:1px;height:1px;"><text ref="svgTextSize" x="-100" y="-100"></text></svg>
  </div>
</template>

<script>
/* global csrf audiodir tagsystem */
import SuchenUndFiltern from './menue/SuchenUndFiltern'
import Informationen from './menue/Informationen'
import TranskriptAuswahl from './menue/TranskriptAuswahl'
import Hauptfenster from './hauptfenster/Hauptfenster'
import Audioplayer from './audioplayer/Audioplayer'
import Modale from './modal/Modale'

import Globals from '@/functions/globals'
import TranscriptsInfListObject from '@/functions/transcriptsinflist/TranscriptsInfList'
import TranscriptObject from '@/functions/transcript/Transcript'
// import TagsystemObject from './tagsystem/functions/Tagsystem'

export default {
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
      modalData: { type: null, data: null },
      globals: Globals
    }
  },
  mounted () {
    this.audiodir = audiodir
    this.transcripts = new TranscriptsInfListObject.TranscriptsInfListBase(this)
    this.globals.tagsData.data = new tagsystem.TagsystemObject.TagsystemBase(this.$http)
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
        this.$set(this.selTranscript, 'selectedToken', null)
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
  #loading {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.25);
    color: #fff;
    font-size: 50px;
    text-align: center;
    line-height: 70vh;
    text-shadow: 2px 3px 4px #000;
    margin-left: -15px;
    margin-right: -15px;
    z-index: 1000000;
  }
</style>
