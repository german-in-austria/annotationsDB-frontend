<template>
  <g class="tEvent" :transform="'translate(' + transcript.aSVG.frmPadding + ',' + (transcript.aSVG.timerHeight + transcript.aSVG.infTop + aSvgInfLine.top + transcript.aSVG.frmPadding) + ')'">
    <AnnotationsAnzeigeZeileEventsLineInformanten :transcript="transcript" :aInf="aInf" :aSvgInfLine="aSvgInfLine" />
    <!-- <AnnotationsAnzeigeZeileEventsTokenSets :transcript="transcript" :zeileData="zeileData" /> -->
  <!-- <g class="tEvent" :transform="'translate('+(zInfWidth + 5 + tEvents[tEventId]['svgLeft'])+','+(eEventHeight-20)+')'" v-for="tEventId in zeilenTEvents[aZeile]['eId']"> -->
    <!-- <AnnotationsAnzeigeZeileEventsLineEvent :transcript="transcript" :zeile="zeile" :event="aEvent" /> -->  <!--  v-for="(aInfVal, aInfKey, aInfIndex) in objectKeyFilter(objectSubValueFilter(aInformanten,'show',true), zeilenTEvents[aZeile]['iId'])" -->
  <!-- </g> -->
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileEventsLineInformanten from './EventsLineInformanten'
import AnnotationsAnzeigeZeileEventsLineEvent from './EventsLineEvent'
import AnnotationsAnzeigeZeileEventsTokenSets from './EventsTokenSets'

export default {
  name: 'AnnotationsAnzeigeZeileEventsLine',
  props: ['transcript', 'zeileData', 'aInf'],
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
