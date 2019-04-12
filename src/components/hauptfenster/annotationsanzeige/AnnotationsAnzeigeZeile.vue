<template>
  <g :class="{eZeile: true}" :transform="'translate(0,' + zeileData.svgTop + ')'">
    <rect x="0" y="0" width="100" :height="90" />
    <text transform="translate(10,20)">{{ zeile }}</text>
  <!-- <g :class="{eZeile: true, selected: aZeile==svgZeileSelected}">
    <rect x="0" y="0" :width="mWidth-10" :height="zeilenTEvents[aZeile]['eH']-18" />
    <AnnotationsAnzeigeZeileInformanten :transcript="transcript" :zeile="zeile" />
    <AnnotationsAnzeigeZeileTokenSets :transcript="transcript" :zeile="zeile" />
    <AnnotationsAnzeigeZeileEventsLine :transcript="transcript" :zeile="zeile" />
  </g> -->
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
</style>
