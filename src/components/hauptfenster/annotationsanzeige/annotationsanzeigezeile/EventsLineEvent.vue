<template>
  <g class="eInf" :transform="'translate(' + tEvent.svgLeft + ',0)'">
    <rect x="0" y="0" :width="tEvent.svgWidth + 1" :height="transcript.aSVG.infHeight" />
    <AnnotationsAnzeigeZeileEventsLineEventToken :transcript="transcript" :zeileData="zeileData" :aToken="aToken" v-for="aToken in aTokens" :key="'at' + aToken.pk" />
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
    aTokens () {
      let aTokens = []
      this.tEvent.events.forEach(event => {
        if (event.tidObj[this.aInf.pk]) {
          aTokens.push(...event.tidObj[this.aInf.pk])
        }
      }, this)
      return aTokens
    }
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
