<template>
  <g class="zInfs">
    <!-- <g :class="'zInf zInf'+aInfKey+((aInfKey==svgInfSelected)?' selected':'')" v-on:click="showaInfInfos(aInfKey)" :transform="'translate(5,'+((eEventHeight - 25) + eInfTop + zeilenTEvents[aZeile]['tsT'][aInfKey] + zeilenTEvents[aZeile]['tsH'][aInfKey] + aInfIndex * (eInfHeight + eInfTop))+')'" v-for="(aInfVal, aInfKey, aInfIndex) in objectKeyFilter(objectSubValueFilter(aInformanten,'show',true), zeilenTEvents[aZeile]['iId'])">
      <rect x="0" y="4.5" :width="zInfWidth" :height="eInfHeight - 9" />
      <line x1="0" y1="4.5" :x2="zInfWidth" y2="4.5" />
      <line x1="0" :y1="eInfHeight-4.5" :x2="zInfWidth" :y2="eInfHeight-4.5" />
      <text class="zInfI" x="5" :y="12+(eInfHeight-12)/2">${ aInfVal['k'] }</text>
      <text class="zInfLI" :x="zInfWidth-5" y="24">t</text>
      <text class="zInfLI" :x="zInfWidth-5" y="49">o</text>
    </g> -->
  </g>
</template>

<script>
export default {
  name: 'AnnotationsAnzeigeZeileInformanten',
  props: ['transcript', 'zeileData'],
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
  }
  text.zInfLI {
    font-size: 12px;
    fill: #999;
    text-anchor: end;
  }
</style>
