<template>
  <div id="annotationsTool" v-bind:class="{ loading: loading, bgloading: false, unsaved: selTranscript && selTranscript.unsaved }">
    <div class="row h100">
      <div class="col-md-2 h100 mh200px vscroller lmfa">
        <div class="lmfa-frm">
          <SuchenUndFiltern ref="suchenUndFiltern" :transcript="selTranscript" v-if="selTranscriptPk > 0" />
          <Informationen :transcript="selTranscript" v-if="selTranscriptPk > 0" />
          <TranskriptAuswahl :transcripts="transcripts" :selectedTranscriptPk="selTranscriptPk" @load-transcript="loadTranscript" />
          <div class="at-version">AnnotationsTool v{{ version }}</div>
        </div>
      </div>
      <div class="col-md-10 h100 mh600px" style="border-right:1px solid #eee;padding:0px;padding-bottom:150px;">
        <Hauptfenster ref="hauptfenster" :transcript="selTranscript" />
        <Audioplayer :audiofile="selTranscript.aEinzelErhebung.dp + '/' + selTranscript.aEinzelErhebung.af" :audiodir="audiodir" ref="audioplayer" v-if ="selTranscript && selTranscript.ready" />
      </div>
    </div>
    <Modale :transcript="selTranscript" :modalData="modalData" @prev-next-token="prevNextToken" />
    <div id="loading" v-if="loading">Lade ...</div>
    <svg style="position:absolute;right:0px;bottom:0px;width:1px;height:1px;font-family:HKGrotesk,sans-serif;"><text ref="svgTextSize" x="-100" y="-100"></text></svg>
    <div class="saving" v-if="selTranscript && selTranscript.saving">
      Speichere ...
    </div>
  </div>
</template>

<script>
/* global _ csrf audiodir tagsystem */
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

// import socketIo from 'socket.io-client'

export default {
  name: 'AnnotationsTool',
  http: {
    root: '/annotationsdb/annotool',
    headers: {
      'X-CSRFToken': csrf
    },
    emulateJSON: true
  },
  data () {
    return {
      loading: false,
      audiodir: '',
      transcripts: {},
      selTranscriptPk: null,
      selTranscript: null,
      modalData: { type: null, data: null },
      modalInfoTokenReOpen: null,
      globals: Globals,
      version: '',
      socket: null
    }
  },
  mounted () {
    this.version = require('../../package.json').version
    this.audiodir = audiodir
    this.transcripts = new TranscriptsInfListObject.TranscriptsInfListBase(this)
    this.globals.tagsData.data = new tagsystem.TagsystemObject.TagsystemBase(this.$http)
    console.log(this.audiodir)
    console.log(this.transcripts)
    // this.socket = socketIo('https://dioedb.dioe.at', { path: '/updates' })
    // var aThisAT = this
    // this.socket.on('message', (m) => {
    //   console.log('socket - message', m, aThisAT)
    // })
    // console.log('socket', this.socket)
  },
  methods: {
    loadTranscript (lTranscript) {
      if (this.selTranscriptPk < 1 || !this.selTranscript.unsaved || confirm('Es gibt noch ungespeicherte Veränderungen! Sollen diese wirklich verworfen werden?')) {
        if (this.selTranscriptPk === lTranscript) {
          this.selTranscriptPk = 0
          this.$nextTick(() => {
            this.selTranscriptPk = lTranscript
          })
        } else {
          this.selTranscriptPk = lTranscript
        }
      }
    },
    showSuchenUndFiltern () {
      if (this.selTranscriptPk > 0 && this.selTranscript && this.selTranscript.ready) {
        this.$refs.suchenUndFiltern.focusSuche()
      }
    },
    prevNextToken (tId, way, s) {
      this.modalInfoTokenReOpen = [tId, way, s]
    }
  },
  watch: {
    'modalData.type' (nType, oType) {
      if (oType === 'token' && nType === null && this.modalInfoTokenReOpen && this.modalInfoTokenReOpen[0] > 0) {
        // console.log(this.modalInfoTokenReOpen[0], (this.modalInfoTokenReOpen[1] < 0 ? 'prev' : 'next'))
        if (this.modalInfoTokenReOpen[2]) {
          this.selTranscript.aTokens.naechsterSuchToken(this.modalInfoTokenReOpen[1] > 0)
        } else {
          this.selTranscript.selectedToken = this.selTranscript.aTokens.getNextPrev(this.selTranscript.selectedToken, this.modalInfoTokenReOpen[1] > 0)
        }
        this.modalInfoTokenReOpen = null
        this.$nextTick(() => {
          this.modalData = { type: 'token', data: {aToken: _.cloneDeep(this.selTranscript.selectedToken)} }
        })
      }
    },
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
  .saving {
    position: absolute;
    left: -1.5rem;
    top: 0;
    width: 100%;
    width: calc(100% + 3rem);
    height: 100%;
    text-align: center;
    padding-top: 26%;
    background: #ddd;
    background: rgba(0,0,0,0.4);
    z-index: 9999999;
    color: #fff;
    font-size: 4rem;
  }
  .lmfa {
    padding-top: 0;
    padding-bottom: 0;
  }
  .lmfa-frm {
    position: relative;
    padding-top: 5px;
    padding-bottom: 75px;
    min-height: 100%;
  }
  .at-version {
    position: absolute;
    left: 10px;
    bottom: 5px;
    font-size: 12px;
    color: #888;
  }
</style>
