<template>
  <div class="info-token-audioplayer-at">
    <div v-bind:class="{ 'info-token-audioplayer': true, loading: !loaded, paused: paused, playing: playing }">
      <div>
        <div class="audiobtn">
          <button @click="backward"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></button>
          <button @click="togglePlayPause"><span :class="'glyphicon glyphicon-' + ((paused) ? 'play' : 'pause')" aria-hidden="true"></span></button>
          <button @click="forward"><span class="glyphicon glyphicon-forward" aria-hidden="true"></span></button>
          <select v-model="audioArea" @change="setAudioStartEndPositions" class="audio-area-select">
            <option value="event">event</option>
            <option value="token" v-if="tokenAvaiable">token</option>
            <option value="extra">Extra 2 S.</option>
            <option value="extraP">Extra 30 S.</option>
            <option value="alles">Alles</option>
          </select>
          <input type="checkbox" v-model="loop" id="loopcheck" /> <label for="loopcheck">Loop</label>
          <select v-model="audioSpeed" @change="setAudioRate" class="audio-area-select">
            <option :value="speed" v-for="speed in [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5]" :key="'s' + speed">x {{ speed }}</option>
          </select>
        </div>
        <div>
          <div id="gesamtprogress" class="progress audioprogress" v-on:click="setAudioPos">
            <div v-bind:class="{ 'progress-bar': true, 'progress-bar-striped': true, active: playing }" role="progressbar" :style="'width: ' + aPosProz.toFixed(2) + '%;'"></div>
            <span class="pb-timer pb-starttime">{{ starttime }}</span>
            <span class="pb-timer pb-akttime">{{ akttime }}</span>
            <span class="pb-timer pb-endtime">{{ enditme }}</span>
          </div>
        </div>
      </div>
    </div>
    <audio><source :src="audiodirC + audiofileC" type="audio/ogg" v-if="audiofile"></audio>
  </div>
</template>

<script>
/* global audiodir */
import Globals from '@/functions/globals'
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

export default {
  name: 'InfoTokenAudioplayer',
  props: ['transcript', 'token'],
  data () {
    return {
      audio: undefined,
      audioInterval: undefined,
      loaded: false,
      globals: Globals,
      lPos: -1,
      aPosRel: 0,
      aPosProz: 0,
      loop: true,
      paused: true,
      playing: false,
      audiodir: '',
      audiofile: '',
      audioStartPosition: 0,
      audioEndPosition: 0,
      audioPosition: 0,
      audioDuration: 0,
      audioArea: 'event',
      audioSpeed: 1
    }
  },
  computed: {
    eventStartTime () {
      return this.token.eObj ? AllgemeineFunktionen.durationToSeconds(this.token.eObj.s) : 0
    },
    eventEndTime () {
      return this.token.eObj ? AllgemeineFunktionen.durationToSeconds(this.token.eObj.e) : 0
    },
    tokenStartTime () {
      return (this.token && this.token.stp) ? AllgemeineFunktionen.durationToSeconds(this.token.stp) : 0
    },
    tokenEndTime () {
      return (this.token && this.token.etp) ? AllgemeineFunktionen.durationToSeconds(this.token.etp) : 0
    },
    tokenAvaiable () {
      return this.tokenStartTime > 0 && this.tokenEndTime > 0 && this.tokenStartTime < this.tokenEndTime
    },
    audiofileC () {
      let aFile = AllgemeineFunktionen.cleanFilePart(this.audiofile)
      if (aFile.indexOf('.') < 0) {
        aFile = aFile + '.ogg'
      }
      return aFile
    },
    audiodirC () {
      return AllgemeineFunktionen.cleanDirPart(this.audiodir)
    },
    starttime () {
      return AllgemeineFunktionen.secondsToDuration(this.audioStartPosition)
    },
    akttime () {
      return AllgemeineFunktionen.secondsToDuration(this.audioPosition)
    },
    enditme () {
      return AllgemeineFunktionen.secondsToDuration(this.audioEndPosition)
    }
  },
  methods: {
    /* Steuerung */
    play () {
      if ((this.playing && !this.paused) || !this.loaded) return
      this.paused = false
      this.playing = true
      this.audio.play()
    },
    pause () {
      if ((!this.playing && this.paused) || !this.loaded) return
      this.paused = true
      this.playing = false
      this.audio.pause()
    },
    togglePlayPause () {
      if (this.paused) {
        this.play()
      } else {
        this.pause()
      }
    },
    setAudioPos (e) {
      var pos = e.target.getBoundingClientRect()
      var seekPos = (e.clientX - pos.left) / pos.width
      this.audio.currentTime = this.audioStartPosition + ((this.audioEndPosition - this.audioStartPosition) * seekPos)
    },
    setAudioPosBySec (sec) {
      this.audio.currentTime = sec
    },
    setAudioRate () {
      this.audio.playbackRate = this.audioSpeed
    },
    forward () {
      if (!this.loaded) return
      this.audio.currentTime = this.audio.currentTime + 10
    },
    backward () {
      if (!this.loaded) return
      this.audio.currentTime = this.audio.currentTime - 10
    },
    /* Tastatur */
    keyUp (e) {
      let keyCodes = {
        32: this.togglePlayPause,   // ctrl+space
        50: this.backward,          // ctrl+2
        51: this.forward,           // ctrl+3
        49: null,                   // ctrl+1 (N/A, Step Backward)
        52: null                    // ctrl+4 (N/A, Step Forward)
      }
      if ((e.ctrlKey || e.metaKey) && keyCodes.hasOwnProperty(e.keyCode)) {
        e.preventDefault()
        if (keyCodes[e.keyCode]) keyCodes[e.keyCode]()
        this.globals.ctrlUsed = true
      }
    },
    /* Funktionen */
    audioPlayPause (e) {
      if (e.type === 'pause') {
        this.paused = true
        this.playing = false
      }
    },
    audioPlayingUI (e) {
      if (this.loaded) {
        this.audioPosition = this.audio.currentTime
        if (this.audioPosition !== this.lPos) {
          if (this.audioPosition < this.audioStartPosition) {
            this.audioPosition = this.audioStartPosition
            this.setAudioPosBySec(this.audioPosition)
          }
          if (this.audioPosition > this.audioEndPosition) {
            this.audioPosition = this.audioStartPosition
            this.setAudioPosBySec(this.audioPosition)
            if (!this.loop) {
              this.pause()
            }
          }
          this.aPosRel = ((this.audioPosition - this.audioStartPosition) / (this.audioEndPosition - this.audioStartPosition))
          this.aPosProz = this.aPosRel * 100
          this.lPos = this.audioPosition
        }
      }
    },
    audioLoaded () {
      if (this.audio.readyState >= 2) {
        this.loaded = true
        this.audioDuration = this.audio.duration
        this.setAudioStartEndPositions()
      } else {
        this.playing = false
        this.paused = true
        this.loaded = false
        throw new Error('Audiodatei konnte nicht geladen werden!')
      }
    },
    setAudioStartEndPositions () {
      if (this.tokenAvaiable && this.audioArea === 'token') {
        this.audioStartPosition = this.tokenStartTime
        this.audioEndPosition = this.tokenEndTime
      } else if (this.audioArea === 'extra') {
        this.audioStartPosition = this.eventStartTime - 2
        this.audioEndPosition = this.eventEndTime + 2
      } else if (this.audioArea === 'extraP') {
        this.audioStartPosition = this.eventStartTime - 30
        this.audioEndPosition = this.eventEndTime + 30
      } else if (this.audioArea === 'event') {
        this.audioStartPosition = this.eventStartTime
        this.audioEndPosition = this.eventEndTime
      } else {
        this.audioStartPosition = 0
        this.audioEndPosition = this.audioDuration
      }
      if (this.audioStartPosition < 0) {
        this.audioStartPosition = 0
      }
      if (this.audioEndPosition > this.audioDuration) {
        this.audioEndPosition = this.audioDuration
      }
    }
  },
  watch: {
    eventStartTime () { this.setAudioStartEndPositions() },
    eventEndTime () { this.setAudioStartEndPositions() },
    tokenStartTime () { this.setAudioStartEndPositions() },
    tokenEndTime () { this.setAudioStartEndPositions() }
  },
  mounted () {
    this.audiodir = audiodir
    this.audiofile = this.transcript.aEinzelErhebung.dp + '/' + this.transcript.aEinzelErhebung.af
    this.globals.audioAltPlayer = true
    this.audio = this.$el.querySelectorAll('audio')[0]
    this.audio.addEventListener('loadeddata', this.audioLoaded)
    this.audio.addEventListener('pause', this.audioPlayPause)
    this.audio.addEventListener('play', this.audioPlayPause)
    this.audioInterval = setInterval(this.audioPlayingUI, 100)
    window.addEventListener('keyup', this.keyUp)
  },
  beforeDestroy () {
    this.globals.audioAltPlayer = false
    clearInterval(this.audioInterval)
    this.audio.removeEventListener('loadeddata', this.audioLoaded)
    this.audio.removeEventListener('pause', this.audioPlayPause)
    this.audio.removeEventListener('play', this.audioPlayPause)
    window.removeEventListener('keyup', this.keyUp)
  },
  components: {
  }
}
</script>

<style scoped>
  audio {
    display: block;
    width: 1px;
    height: 1px;
  }
  .info-token-audioplayer {
    display: table;
    width: 100%;
    margin-top: 5px;
  }
  .info-token-audioplayer > div {
    display: table-row;
  }
  .info-token-audioplayer > div > div {
    display: table-cell;
    vertical-align: top;
  }
  .audiobtn {
    width: 10%;
    white-space: nowrap;
    padding: 0 15px 0 0;
  }
  #gesamtprogress {
    margin-top: 3px;
  }
  .audio-area-select, #loopcheck {
    margin-left: 10px;
  }
</style>
