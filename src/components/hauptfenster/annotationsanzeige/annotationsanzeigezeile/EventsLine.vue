<template>
  <g class="tEvent" :transform="'translate(' + transcript.aSVG.frmPadding + ',' + (transcript.aSVG.timerHeight + transcript.aSVG.infTop + aSvgInfLine.top + transcript.aSVG.frmPadding) + ')'">
    <AnnotationsAnzeigeZeileEventsLineInformanten :transcript="transcript" :aInf="aInf" :aSvgInfLine="aSvgInfLine" :selectedZeile="selectedZeile" />
    <!-- <AnnotationsAnzeigeZeileEventsTokenSets :transcript="transcript" :zeileData="zeileData" /> -->
    <g class="tEventLine" :transform="'translate(' + transcript.aSVG.infWidth + ',0)'">
      <AnnotationsAnzeigeZeileEventsLineEvent :transcript="transcript" :aInf="aInf" :aSvgInfLine="aSvgInfLine" :tEvent="tEvent"
        v-for="(tEvent, teKey) in zeileData.teObjs" :key="'tei' + aInf.pk + 'elex' + teKey"/>
    </g>
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileEventsLineInformanten from './EventsLineInformanten'
import AnnotationsAnzeigeZeileEventsLineEvent from './EventsLineEvent'
import AnnotationsAnzeigeZeileEventsTokenSets from './EventsTokenSets'

export default {
  name: 'AnnotationsAnzeigeZeileEventsLine',
  props: ['transcript', 'zeileData', 'aInf', 'selectedZeile'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    aSvgInfLine () {
      return this.zeileData.svgInfLine[this.aInf.pk]
    }
  },
  methods: {
  },
  watch: {
  },
  components: {
    AnnotationsAnzeigeZeileEventsLineInformanten,
    AnnotationsAnzeigeZeileEventsLineEvent,
    AnnotationsAnzeigeZeileEventsTokenSets
  }
}
</script>

<style scoped>
</style>
