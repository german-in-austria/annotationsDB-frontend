<template>
  <g class="zInf" :transform="'translate(0,' + aSvgInfLine.tsHeight + ')'" @click="showaInfInfos()">   <!-- class="((aInfKey==svgInfSelected)?' selected':'')" -->
    <rect x="0" y="0" :width="transcript.aSVG.infWidth" :height="transcript.aSVG.infHeight" />
    <line x1="0" y1="0" :x2="transcript.aSVG.infWidth" y2="0" />
    <line x1="0" :y1="transcript.aSVG.infHeight" :x2="transcript.aSVG.infWidth" :y2="transcript.aSVG.infHeight" />
    <text class="zInfI" x="5" :y="transcript.aSVG.infHeight / 2">{{ aInf.k }}</text>
    <text class="zInfLI" :x="transcript.aSVG.infWidth - 5" y="6">t</text>
    <text class="zInfLI" :x="transcript.aSVG.infWidth - 5" y="28">o</text>
  </g>
</template>

<script>
export default {
  name: 'AnnotationsAnzeigeZeileEventsLineInformanten',
  props: ['transcript', 'zeileData', 'aInf', 'aSvgInfLine'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    showaInfInfos () {
      this.transcript.vueObj.modalData = { type: 'informant', data: {aInf: this.aInf} }
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  g.zInf {
    cursor: pointer;
  }
  g.zInf > rect {
    fill: #fff;
  }
  g.eZeile.selected g.zInf.selected > rect {
    fill: #fcfcff;
  }
  g.zInf:hover > rect {
    fill: #eef !important;
  }
  g.zInf>line {
    stroke-width: 1px;
    stroke: #aaa;
  }
  text.zInfI {
    font-weight: bold;
    dominant-baseline: middle!important;
  }
  text.zInfLI {
    font-size: 12px;
    fill: #999;
    text-anchor: end;
  }
</style>
