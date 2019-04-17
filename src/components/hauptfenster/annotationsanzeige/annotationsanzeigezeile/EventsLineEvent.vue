<template>
  <g class="eInf" :transform="'translate(' + tEvent.svgLeft + ',0)'">
    <rect x="0" y="0" :width="tEvent.svgWidth + 1" :height="transcript.aSVG.infHeight" />
    <!--
      <AnnotationsAnzeigeZeileEventsLineEventToken  :transcript="transcript" :zeile="zeile" :event="event" :token="aToken" v-if="aEvents[tEvents[tEventId].eId[aInfKey]]" v-for="aTokenId in aEvents[tEvents[tEventId].eId[aInfKey]]['tid'][aInfKey]" />
    -->
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileEventsLineEventToken from './EventsLineEventToken'

export default {
  name: 'AnnotationsAnzeigeZeileEventsLineEvent',
  props: ['transcript', 'zeileData', 'aInf', 'aSvgInfLine', 'tEvent'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  components: {
    AnnotationsAnzeigeZeileEventsLineEventToken
  }
}
</script>

<style scoped>
  g.eInf > rect {
    fill: #fcfcfc;
    outline: 1px solid #ccc;
  }
  g.eInf:hover > rect {
    outline: 1px solid #777;
  }
</style>
