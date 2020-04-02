<template>
  <div class="audioplayer-at">
    <div v-bind:class="{ annotationsaudioplayer: true, loading: !loaded, paused: paused, playing: playing }">
      <div class="mib20 mit20"></div>
      <div class="row">
        <div class="col-xs-12 mib10 text-center">
          <div class="audiobtn">
            <button @click="fastBackward"><span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span></button>
            <button @click="backward"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></button>
            <button @click="togglePlayPause"><span :class="'glyphicon glyphicon-' + ((paused) ? 'play' : 'pause')" aria-hidden="true"></span></button>
            <button @click="forward"><span class="glyphicon glyphicon-forward" aria-hidden="true"></span></button>
            <button @click="fastForward"><span class="glyphicon glyphicon-fast-forward" aria-hidden="true"></span></button>
          </div>
        </div>
        <div class="col-xs-12">
          <div id="gesamtprogress" class="progress audioprogress" v-on:click="setAudioPos">
            <div v-bind:class="{ 'progress-bar': true, 'progress-bar-striped': true, active: playing }" role="progressbar" :style="'width: ' + aPosProz.toFixed(2) + '%;'"></div>
            <span class="pb-timer pb-starttime">{{ starttime }}</span>
            <span class="pb-timer pb-akttime">{{ akttime }}</span>
            <span class="pb-timer pb-endtime">{{ enditme }}</span>
          </div>
        </div>
      </div>
      <audio><source :src="audiodirC + audiofileC" type="audio/ogg" v-if="audiofile"></audio>
    </div>
  </div>
</template>

<script>
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'
import Globals from '@/functions/globals'

export default {
  name: 'Audioplayer',
  props: ['audiofile', 'audiodir'],
  data () {
    return {
      audio: undefined,
      audioInterval: undefined,
      loaded: false,
      globals: Globals,
      lPos: -1,
      aPosRel: 0,
      aPosProz: 0,
      paused: true,
      playing: false
    }
  },
  computed: {
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
      return AllgemeineFunktionen.secondsToDuration(0)
    },
    akttime () {
      return AllgemeineFunktionen.secondsToDuration(this.globals.audioPosition)
    },
    enditme () {
      return AllgemeineFunktionen.secondsToDuration(this.globals.audioDuration)
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
      this.audio.currentTime = this.globals.audioDuration * seekPos
    },
    setAudioPosBySec (sec) {
      this.audio.currentTime = sec
    },
    fastForward () {
      if (!this.loaded) return
      this.audio.currentTime = this.globals.audioDuration
    },
    fastBackward () {
      if (!this.loaded) return
      this.audio.currentTime = 0
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
      if (!this.globals.audioAltPlayer) {
        // console.log(e.keyCode)
        let keyCodes = {
          32: this.togglePlayPause,   // ctrl+space
          89: this.fastBackward,      // ctrl+y
          88: this.fastForward,       // ctrl+x
          50: this.backward,          // ctrl+2
          51: this.forward,           // ctrl+3
          49: null,                   // ctrl+1 (N/A, Step Backward)
          52: null                    // ctrl+4 (N/A, Step Forward)
        }
        if (e.ctrlKey && keyCodes.hasOwnProperty(e.keyCode)) {
          e.preventDefault()
          if (keyCodes[e.keyCode]) keyCodes[e.keyCode]()
          this.globals.ctrlUsed = true
        }
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
        this.globals.audioPosition = this.audio.currentTime
        if (this.globals.audioPosition !== this.lPos) {
          this.lPos = this.globals.audioPosition
          this.aPosRel = (this.globals.audioPosition / this.globals.audioDuration)
          this.aPosProz = this.aPosRel * 100
        }
      }
    },
    audioLoaded () {
      if (this.audio.readyState >= 2) {
        this.loaded = true
        this.globals.audioDuration = this.audio.duration
      } else {
        this.playing = false
        this.paused = true
        this.loaded = false
        throw new Error('Audiodatei konnte nicht geladen werden!')
      }
    }
  },
  watch: {
    'globals.audioAltPlayer' (nVal) {
      if (nVal) {
        this.pause()
      }
    }
  },
  mounted () {
    this.audio = this.$el.querySelectorAll('audio')[0]
    this.audio.addEventListener('loadeddata', this.audioLoaded)
    this.audio.addEventListener('pause', this.audioPlayPause)
    this.audio.addEventListener('play', this.audioPlayPause)
    // this.audio.addEventListener('timeupdate', this.audioPlayingUI)
    this.audioInterval = setInterval(this.audioPlayingUI, 100)
    window.addEventListener('keyup', this.keyUp)
  },
  beforeDestroy () {
    clearInterval(this.audioInterval)
    // this.audio.removeEventListener('timeupdate', this.audioPlayingUI)
    this.audio.removeEventListener('loadeddata', this.audioLoaded)
    this.audio.removeEventListener('pause', this.audioPlayPause)
    this.audio.removeEventListener('play', this.audioPlayPause)
    window.removeEventListener('keyup', this.keyUp)
  }
}
</script>

<style scoped>
  .audioplayer-at {
    position: absolute;
    border-top: 1px solid #e7e7e7;
    width: 100%;
    height: 150px;
    bottom: 0;
    left: 0;
    padding: 10px 15px;
  }
</style>
