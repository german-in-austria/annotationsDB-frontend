<template>
  <g @click="showaTokenInfos($event)" :transform="'translate('+(aToken.svgLeft-1)+',1)'"
    :class="{
      'eTok': true,
      ['eTokT' + aToken.tt]: true,
      'viewed': aToken.viewed,
      'selected': this.transcript.selectedToken === aToken,
    }">
    <!-- ToDo:  :class="{
      'lastview': svgTokenLastView === aTokenId,
      'selectlist': svgSelTokenList.indexOf(aTokenId) > -1,
      'found': suchTokens.indexOf(aTokenId) >= 0,
      'hastags': (getValOfSubProp(aTokens[aTokenId], 'aId') && getValOfSubProp(aAntworten[aTokens[aTokenId].aId], 'tags.length') > 0)
    }" -->
    <rect x="1" y="0" :width="width" :height="height" class="bg" />
    <!-- <rect x="1" y="0" :width="width - 3" :height="height" class="fx" /> ToDo: Anzeigen wenn "hastags" -->
    <text x="1" y="2">{{ transcript.aTokens.getTokenString(aToken, 't') }}</text>
    <text x="1" y="26">{{ transcript.aTokens.getTokenString(aToken, 'o', 't') }}</text>
    <!-- ToDo:  :text-decoration="((getValOfSubProp(aTokens[aTokenId], 'aId') && getValOfSubProp(aAntworten[aTokens[aTokenId].aId], 'tags.length') > 0) ? 'underline' : '')" -->
    <line x1="2" :y1="height + 7" :x2="width - 5" :y2="height + 7" class="visit" />
    <line x2="3" :y1="height + 0.5" :x1="width - 3" :y2="height + 1" class="blue" marker-end="url(#arrow-blue)" v-if="aToken.fo" />
    <line x1="0" :y1="height + 0.5" :x2="width - 5" :y2="height + 1" class="green" marker-end="url(#arrow-green)" v-if="transcript.aTokens.aTokenFragmenteObj[aToken.pk]" />
  </g>
</template>

<script>
export default {
  name: 'AnnotationsAnzeigeZeileEventsLineEventToken',
  props: ['transcript', 'zeileData', 'aToken'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    width () {
      return this.aToken.svgWidth
    },
    height () {
      return this.transcript.aSVG.infHeight - 1
    }
  },
  methods: {
    showaTokenInfos (e) {
      if (e.ctrlKey) {
        // ToDo: TokenSet select
        // ToDo: ctrlKey
      } else {
        if (this.transcript.selectedToken === this.aToken) {
          // ToDo: Modal anzeigen
        } else {
          this.transcript.selectedToken = this.aToken
          console.log('showaTokenInfos', this.aToken)
        }
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  g.eTok {
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
