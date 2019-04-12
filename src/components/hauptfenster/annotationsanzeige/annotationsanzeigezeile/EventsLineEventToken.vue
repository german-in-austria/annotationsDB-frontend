<template>
  <g class="eTok">
  <!-- <g v-on:click="showaTokenInfos(aTokenId, false, $event)"
    :class="{
      'eTok': true,
      ['eTok' + aTokenId]: true,
      ['eTokT' + aTokens[aTokenId]['tt']]: true,
      'viewed': aTokens[aTokenId]['viewed'],
      'lastview': svgTokenLastView === aTokenId,
      'selectlist': svgSelTokenList.indexOf(aTokenId) > -1,
      'selected': selToken === aTokenId,
      'found': suchTokens.indexOf(aTokenId) >= 0,
      'hastags': (getValOfSubProp(aTokens[aTokenId], 'aId') && getValOfSubProp(aAntworten[aTokens[aTokenId].aId], 'tags.length') > 0)
    }"
    :transform="'translate('+(aTokens[aTokenId]['svgLeft']-1)+',1)'">
    <rect x="-0.5" y="0" :width="aTokens[aTokenId]['svgWidth']" :height="eInfHeight - 12" class="bg" />
    <rect x="-0.5" y="0" :width="aTokens[aTokenId]['svgWidth'] - 3" :height="eInfHeight - 12" class="fx" />
    <text x="0" y="18" :text-decoration="((getValOfSubProp(aTokens[aTokenId], 'aId') && getValOfSubProp(aAntworten[aTokens[aTokenId].aId], 'tags.length') > 0) ? 'underline' : '')">${ getTokenString(aTokenId, 't') }</text>
    <text x="0" y="43" :text-decoration="((getValOfSubProp(aTokens[aTokenId], 'aId') && getValOfSubProp(aAntworten[aTokens[aTokenId].aId], 'tags.length') > 0) ? 'underline' : '')">${ getTokenString(aTokenId, 'o', 't') }</text>
    <line x1="2" :y1="eInfHeight-4" :x2="aTokens[aTokenId]['svgWidth']-5" :y2="eInfHeight-4" class="visit" />
    <line x2="3" :y1="eInfHeight-10.5" :x1="aTokens[aTokenId]['svgWidth']-3" :y2="eInfHeight-10.5" class="blue" marker-end="url(#arrow-blue)" v-if="aTokens[aTokenId]['fo']" />
    <line x1="0" :y1="eInfHeight-10.5" :x2="aTokens[aTokenId]['svgWidth']-6" :y2="eInfHeight-10.5" class="green" marker-end="url(#arrow-green)" v-if="aTokenFragmente[aTokenId]" />
  </g> -->
  </g>
</template>

<script>
export default {
  name: 'AnnotationsAnzeigeZeileEventsLineEventToken',
  props: ['transcript', 'zeileData', 'event', 'token'],
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
  g.eTok, g.zTsVB, g.zTsTs {
    cursor: pointer;
  }
  g.eTok > rect.bg {
    fill: #fff;
  }
  g.eTok.eTokT3 > rect.bg, g.eTok.eTokT5 > rect.bg {
    fill: #fafaff;
  }
  g.eTok.eTokT4 > rect.bg {
    fill: #fffcfa;
  }
  g.eTok.eTokT7 > rect.bg {
    fill: #fffafa;
  }
  g.eTok.found > rect.bg {
    fill: #ccf !important;
  }
  g.eTok > rect.fx {
    fill: none;
  }
  g.eTok.hastags > rect.fx {
    stroke-width: 2px;
    stroke: #ccf;
  }
  g.eTok > line {
    stroke-width: 2;
  }
  g.eTok > line.blue {
    stroke: #00a;
  }
  g.eTok > line.green {
    stroke: #0a0;
  }
  g.eTok > line.visit {
    stroke: #ccc;
    stroke-width: 4px;
    stroke-linecap: round;
  }
  g.eTok.viewed > line.visit {
    stroke: #bbf;
  }
  g.eTok.lastview > line.visit {
    stroke: #99f;
  }
  g.eTok.selected > line.visit {
    stroke: #4b4;
  }
  g.eTok.selectlist > line.visit {
    stroke: #4b4;
  }
  g.eTok.selectlist.selected > line.visit {
    stroke: #292;
  }
  g.eTok:hover > line.visit {
    stroke: #9f9;
  }
</style>
