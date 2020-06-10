<template>
  <g :class="{eZeile: true, selected: svgZeileSelected}" :transform="'translate(0,' + zeileData.svgTop + ')'">
    <rect x="0" y="0" :width="width" :height="height" />
    <text :transform="'translate(' + (width - 2) + ',-1)'">{{ zeile }}</text>
    <AnnotationsAnzeigeZeileEventsTimer
      :transcript="transcript" :zeileData="zeileData"
    />
    <!-- EventSpan -->
    <AnnotationsAnzeigeZeileEventsLine
      :transcript="transcript" :zeileData="zeileData" :aInf="aInf" :selectedZeile="svgZeileSelected"
      v-for="aInf in availableInfs"
      :key="'tei' + aInf.pk"
    />
    <AnnotationsAnzeigeZeileEventsTiers
      :transcript="transcript" :zeileData="zeileData"
      v-if="transcript.showEventTiers && zeileData.eventTiers > 0"
    />
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileEventsTimer from './annotationsanzeigezeile/EventsTimer'
import AnnotationsAnzeigeZeileEventsLine from './annotationsanzeigezeile/EventsLine'
import AnnotationsAnzeigeZeileEventsTiers from './annotationsanzeigezeile/EventsTiers'

export default {
  name: 'AnnotationsAnzeigeZeile',
  props: ['transcript', 'zeile'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    availableInfs () {
      let availableInfs = []
      this.transcript.aInformanten.informantenList.forEach(aInf => {
        if (this.zeileData.iPks.indexOf(aInf.pk) > -1 && aInf.show) {
          availableInfs.push(aInf)
        }
      }, this)
      return availableInfs
    },
    zeileData () {
      return this.transcript.aSVG.zeilen.all[this.zeile]
    },
    width () {
      return this.transcript.aSVG.width - this.transcript.aSVG.svgPadding * 2
    },
    height () {
      return this.zeileData.svgHeight - this.transcript.aSVG.zeilenAbstand
    },
    svgZeileSelected () {
      let found = false
      if (this.transcript.selectedToken) {
        this.zeileData.teObjs.some(tEvent => {
          tEvent.events.some(aEvent => {
            if (aEvent.pk === this.transcript.selectedToken.e) {
              found = true
            }
            return found
          }, this)
          return found
        }, this)
      }
      return found
    }
  },
  methods: {
  },
  watch: {
  },
  components: {
    AnnotationsAnzeigeZeileEventsTimer,
    AnnotationsAnzeigeZeileEventsLine,
    AnnotationsAnzeigeZeileEventsTiers
  }
}
</script>

<style scoped>
  g.eZeile > rect {
    fill: none;
    outline: 1px solid #ccc;
  }
  g.eZeile.selected > rect {
    outline: 2px solid #999;
  }
  g.eZeile > text {
    font-size: 8px;
    fill: #bbb;
    dominant-baseline: text-after-edge!important;
    text-anchor: end;
  }
</style>
