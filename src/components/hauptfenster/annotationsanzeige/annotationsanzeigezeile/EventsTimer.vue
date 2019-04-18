<template>
  <g class="eTimerLine" :transform="'translate(' + (transcript.aSVG.frmPadding + transcript.aSVG.infWidth) + ',' + transcript.aSVG.frmPadding + ')'">
    <g class="eTimer" :transform="'translate(' + tEvent.svgLeft + ',0)'" v-for="(tEvent, teKey) in zeileData.teObjs" :key="'etmr' + teKey" @click="showTEventInfos($event, tEvent)">
      <rect x="0" y="0" :width="tEvent.svgWidth + 1" :height="tmrHeight" :class="{ past: (globals.audioPosition >= tEvent.aE) }" />
      <rect x="0" y="0" :width="(tEvent.svgWidth + 1) / tEvent.aL * (globals.audioPosition - tEvent.aS)" :height="tmrHeight" class="akt"
        v-if="globals.audioPosition > tEvent.aS && globals.audioPosition < tEvent.aE" />
      <line x1="0" y1="0" x2="0" :y2="tmrHeight" />
      <text x="4" :y="tmrHeight / 2 + 1">{{ startTime(tEvent) }}</text>
    </g>
  </g>
</template>

<script>
import Globals from '@/functions/globals'
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'

export default {
  name: 'EventsTimer',
  props: ['transcript', 'zeileData'],
  data () {
    return {
      globals: Globals
    }
  },
  mounted () {
  },
  computed: {
    tmrHeight () {
      return this.transcript.aSVG.timerHeight - 4
    }
  },
  methods: {
    showTEventInfos (e, tEvent) {
      if (e.ctrlKey) {
        let rect = e.target.getBoundingClientRect()
        let nZeit = tEvent.aS + ((tEvent.aE - tEvent.aS) / rect.width * (e.clientX - rect.left))
        if (nZeit === Infinity) { nZeit = tEvent.aS }
        console.log(tEvent.events[0].pk, nZeit)
        this.transcript.vueObj.$refs.audioplayer.setAudioPosBySec(nZeit)
        // ToDo: ctrlKey
      } else {
        this.transcript.vueObj.modalData = { type: 'event', data: {tEvent: tEvent} }
      }
    },
    startTime (tEvent) {
      return AllgemeineFunktionen.secondsToDuration(tEvent.aS, 3)
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  .eTimer {
    cursor: pointer;
  }
  .eTimer > text {
    font-size: 10px;
    fill: #666;
    dominant-baseline: middle!important;
  }
  .eTimer > rect {
    fill: #eee;
  }
  .eTimer > rect.past {
    fill: #eef;
  }
  .eTimer > rect.akt {
    fill: #efe;
  }
  .eTimer > line {
    stroke-width: 1px;
    stroke: #888;
  }
</style>
