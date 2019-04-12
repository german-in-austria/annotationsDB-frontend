<template>
  <g :class="{eZeile: true}" :transform="'translate(0,' + zeileData.svgTop + ')'"> <!-- <g :class="{eZeile: true, selected: aZeile==svgZeileSelected}"> -->
    <rect x="0" y="0" :width="width" :height="height" />
    <text :transform="'translate(' + (width - 2) + ',-1)'">{{ zeile }}</text>
    <!--
    <AnnotationsAnzeigeZeileEventsLine :transcript="transcript" :zeileData="zeileData" />
    <AnnotationsAnzeigeZeileInformanten :transcript="transcript" :zeileData="zeileData" />
    <AnnotationsAnzeigeZeileTokenSets :transcript="transcript" :zeileData="zeileData" />
    -->
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileInformanten from './annotationsanzeigezeile/Informanten'
import AnnotationsAnzeigeZeileTokenSets from './annotationsanzeigezeile/TokenSets'
import AnnotationsAnzeigeZeileEventsLine from './annotationsanzeigezeile/EventsLine'

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
    AnnotationsAnzeigeZeileInformanten,
    AnnotationsAnzeigeZeileTokenSets,
    AnnotationsAnzeigeZeileEventsLine
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
    dominant-baseline: text-after-edge;
    text-anchor: end;
  }
</style>
