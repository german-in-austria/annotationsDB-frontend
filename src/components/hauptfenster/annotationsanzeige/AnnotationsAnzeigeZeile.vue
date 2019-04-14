<template>
  <g :class="{eZeile: true}" :transform="'translate(0,' + zeileData.svgTop + ')'"> <!-- <g :class="{eZeile: true, selected: aZeile==svgZeileSelected}"> -->
    <rect x="0" y="0" :width="width" :height="height" />
    <text :transform="'translate(' + (width - 2) + ',-1)'">{{ zeile }}</text>
    <AnnotationsAnzeigeZeileEventsTimer :transcript="transcript" :zeileData="zeileData" />
    <AnnotationsAnzeigeZeileEventsLine :transcript="transcript" :zeileData="zeileData" :aInf="aInf" v-for="aInf in availableInfs" :key="'tei' + aInf.pk" />
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileEventsLine from './annotationsanzeigezeile/EventsLine'
import AnnotationsAnzeigeZeileEventsTimer from './annotationsanzeigezeile/EventsTimer'

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
        if (this.zeileData.iPks.indexOf(aInf.pk) > -1) {
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
    }
  },
  methods: {
  },
  watch: {
  },
  components: {
    AnnotationsAnzeigeZeileEventsLine,
    AnnotationsAnzeigeZeileEventsTimer
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
