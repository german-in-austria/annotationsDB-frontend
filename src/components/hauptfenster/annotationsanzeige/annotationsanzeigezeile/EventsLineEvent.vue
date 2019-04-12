<template>
  <g class="eInf">
  <!-- <g :class="'eInf eInf'+aInfKey" :transform="'translate(0,'+(eInfTop + zeilenTEvents[aZeile]['tsT'][aInfKey] + zeilenTEvents[aZeile]['tsH'][aInfKey] + aInfIndex * (eInfHeight + eInfTop))+')'">
    <rect x="0" y="0" :width="tEvents[tEventId]['svgWidth']+1" :height="eInfHeight-10" />
    <AnnotationsAnzeigeZeileEventsLineEventToken  :transcript="transcript" :zeile="zeile" :event="event" :token="aToken" v-if="aEvents[tEvents[tEventId].eId[aInfKey]]" v-for="aTokenId in aEvents[tEvents[tEventId].eId[aInfKey]]['tid'][aInfKey]" />
  </g> -->
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileEventsLineEventToken from './EventsLineEventToken'

export default {
  name: 'AnnotationsAnzeigeZeileEventsLine',
  props: ['transcript', 'zeileData', 'event'],
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
