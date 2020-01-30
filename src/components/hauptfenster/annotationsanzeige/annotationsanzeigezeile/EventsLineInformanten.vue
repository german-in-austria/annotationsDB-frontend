<template>
  <g :class="{zInf: true, selected: selected}" :transform="'translate(0,' + aSvgInfLine.tsHeight + ')'" @click="showaInfInfos()">
    <rect x="0" y="0" :width="transcript.aSVG.infWidth" :height="transcript.aSVG.infHeight" />
    <line x1="0" y1="0" :x2="transcript.aSVG.infWidth" y2="0" />
    <line x1="0" :y1="transcript.aSVG.infHeight" :x2="transcript.aSVG.infWidth" :y2="transcript.aSVG.infHeight" />
    <text class="zInfI" x="5" :y="transcript.aSVG.infHeight / 2">{{ aInf.k }}</text>
    <text class="zInfLI"
      :x="transcript.aSVG.infWidth - 5"
      :y="6 + 22 * aKey"
       v-for="(aSpur, aKey) in transcript.aSVG.shownTracks" :key="'aazeli-t' + aKey"
    >
    {{ aSpur.field[0] }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'AnnotationsAnzeigeZeileEventsLineInformanten',
  props: ['transcript', 'zeileData', 'aInf', 'aSvgInfLine', 'selectedZeile'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    selected () {
      return this.selectedZeile && this.aInf.pk === this.transcript.selectedToken.i
    }
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
  g.zInf.selected > rect {
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
