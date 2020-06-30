<template>
  <g class="zTokenSets"
    :transform="
      'translate(' +
        transcript.aSVG.infWidth +
      ',' +
        -7 +
      ')'"
  >
    <g class="zTokenSetLine"
      :transform="'translate(0,0)'"
      v-for="(aTokenSetDeep, aTsdI) in tokenSetsDeepList"
      :key="'ztsl' + aTsdI"
    >
      <g :class="'zTokenSet' + (transcript.hoveredTokenSet === aTokenSet.pk ? ' hover' : '') + ((aTokenSet === transcript.selectedTokenSet) ? ' selected' : '') + ((transcript.selectedToken && transcript.selectedToken.tokenSetsList && transcript.selectedToken.tokenSetsList.indexOf(aTokenSet) > -1) ? ' active' : '')"
        v-for="(aTokenSet, aTsI) in aTokenSetDeep"
        :key="aTsI"
        :transform="'translate(0,' + (aTsdI * aTokenSetHeight) + ')'"
        @click="showaTokenSetInfos(aTokenSet, false, $event)"
        @mouseover="transcript.hoveredTokenSet = aTokenSet.pk"
        @mouseleave="transcript.hoveredTokenSet = null"
      >
       <!-- Tokensets anzeigen -->
        <g class="zTsVB" v-if="aTokenSet.tx">
          <g :class="'zTsVBln dg' + dg" v-for="dg in [0,1]" :key="'zTsVBlndg' + dg">
            <path :d="'M' + (((typeof tokenSetsSvgData[aTokenSet.pk].startX === 'number') ? tokenSetsSvgData[aTokenSet.pk].startX + 1 : 0)) + ' ' +
                            ((typeof tokenSetsSvgData[aTokenSet.pk].startX === 'number') ? ((tokenSetsDeepList.length - aTsdI) * aTokenSetHeight) : (aTokenSetHeight / 2)) +
                      ((typeof tokenSetsSvgData[aTokenSet.pk].startX === 'number')
                        ? ' V' + (aTokenSetHeight / 2 + 6) + 'a6,6 0 0 1 6,-6 '
                        : '') +
                      ' H' + ((tokenSetsSvgData[aTokenSet.pk].endX) ? tokenSetsSvgData[aTokenSet.pk].endX - 7 : svgWidth) +
                      ((tokenSetsSvgData[aTokenSet.pk].endX) ? 'a6,6 0 0 1 6,6 V' + ((tokenSetsDeepList.length - aTsdI) * aTokenSetHeight) : '')" />
          </g>
          <text :x="(((tokenSetsSvgData[aTokenSet.pk].endX) ? tokenSetsSvgData[aTokenSet.pk].endX : svgWidth) + ((tokenSetsSvgData[aTokenSet.pk].startX) ? tokenSetsSvgData[aTokenSet.pk].startX : 0)) / 2"
                :y="0"
                style="text-anchor:middle;" filter="url(#solid)"
                :class="(getValOfSubProp(aTokenSet, 'aId') && getValOfSubProp(aAntworten[aTokenSet.aId], 'tags.length') > 0) ? 'hasTags' : ''"
          >&nbsp;
            {{
                transcript.previewTagEbene > 0 && getValOfSubProp(aTokenSet, 'aId') && getValOfSubProp(aAntworten[aTokenSet.aId], 'tags.length') > 0
                && getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSet.aId].tags, 'e', transcript.previewTagEbene)
              ? (transcript.showTokenSetIds ? aTokenSet.pk + ': ' : '') + globals.tagsData.data.tagsText(getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSet.aId].tags, 'e', transcript.previewTagEbene).tags)
              : (
                transcript.previewTagEbene == -2 && getValOfSubProp(aTokenSet, 'aId') && getValOfSubProp(aAntworten[aTokenSet.aId], 'tags.length') > 0
                ? (transcript.showTokenSetIds ? aTokenSet.pk + ': ' : '') + getUsedTagEbenen(aAntworten[aTokenSet.aId].tags)
                : (transcript.showTokenSetIds ? aTokenSet.pk : ''))
            }}
          &nbsp;</text>
        </g>
        <g class="zTsTs" v-else>
          <g :class="'zTsVBln dg' + dg" v-for="dg in [0,1]" :key="'zTsVBlndg' + dg">
            <line :x1="parseInt((tokenSetsSvgData[aTokenSet.pk].startX) ? tokenSetsSvgData[aTokenSet.pk].startX : 0)"
                  :y1="aTokenSetHeight / 2"
                  :x2="parseInt((tokenSetsSvgData[aTokenSet.pk].endX) ? tokenSetsSvgData[aTokenSet.pk].endX : svgWidth)"
                  :y2="aTokenSetHeight / 2"/>
            <line :x1="parseInt(tokenX)"
                  :y1="aTokenSetHeight / 2"
                  :x2="parseInt(tokenX)"
                  :y2="(tokenSetsDeepList.length - aTsdI) * aTokenSetHeight - 2"
                  v-for="(tokenX, txKey) in tokenSetsSvgData[aTokenSet.pk].tokensX" :marker-end="'url(#arrow-zTsTs' + dg + ')'"
                  :key="'ztsts' + txKey"/>
          </g>
          <text :x="(((tokenSetsSvgData[aTokenSet.pk].endX) ? tokenSetsSvgData[aTokenSet.pk].endX : svgWidth) + ((tokenSetsSvgData[aTokenSet.pk].startX) ? tokenSetsSvgData[aTokenSet.pk].startX : 0))/2"
                :y="0"
                :class="(getValOfSubProp(aTokenSet, 'aId') && getValOfSubProp(aAntworten[aTokenSet.aId], 'tags.length') > 0) ? 'hasTags' : ''"
                style="text-anchor:middle;"  filter="url(#solid)"
          >&nbsp;
            {{
                transcript.previewTagEbene > 0 && getValOfSubProp(aTokenSet, 'aId') && getValOfSubProp(aAntworten[aTokenSet.aId], 'tags.length') > 0
                && getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSet.aId].tags, 'e', transcript.previewTagEbene)
              ? (transcript.showTokenSetIds ? aTokenSet.pk + ': ' : '') + globals.tagsData.data.tagsText(getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSet.aId].tags, 'e', transcript.previewTagEbene).tags)
              : (
                transcript.previewTagEbene == -2 && getValOfSubProp(aTokenSet, 'aId') && getValOfSubProp(aAntworten[aTokenSet.aId], 'tags.length') > 0
                ? (transcript.showTokenSetIds ? aTokenSet.pk + ': ' : '') + getUsedTagEbenen(aAntworten[aTokenSet.aId].tags)
                : (transcript.showTokenSetIds ? aTokenSet.pk : ''))
            }}
          &nbsp;</text>
        </g>
      </g>
    </g>
  </g>
</template>

<script>
/* global _ */
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'
import Globals from '@/functions/globals'

export default {
  name: 'AnnotationsAnzeigeZeileEventsTokenSets',
  props: ['transcript', 'aInf', 'zeileData', 'aSvgInfLine'],
  data () {
    return {
      globals: Globals
    }
  },
  mounted () {
    // console.log(this.transcript.aSVG)
    // console.log(this.zeileData)
    // console.log(this.tokenSetsSvgData)
  },
  methods: {
    showaTokenSetInfos (eTokSet, direkt = false, e = undefined) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        // ToDo: TokenSet select
        // ToDo: ctrlKey
      } else {
        if (this.transcript.selectedTokenSet === eTokSet) {
          this.transcript.vueObj.modalData = { type: 'tokenSet', data: {aTokenSet: _.cloneDeep(eTokSet)} }
        } else {
          this.transcript.selectedTokenSet = eTokSet
          console.log('showaTokenSetInfos', eTokSet)
        }
      }
    },
    objectKeyFilter: AllgemeineFunktionen.objectKeyFilter,
    objectSubValueFilter: AllgemeineFunktionen.objectSubValueFilter,
    getValOfSubProp: AllgemeineFunktionen.getValOfSubProp,
    getFirstObjectOfValueInPropertyOfArray: AllgemeineFunktionen.getFirstObjectOfValueInPropertyOfArray,
    getUsedTagEbenen (aTags) {
      return aTags.map(aTag => this.globals.tagsData.data.baseCache.tagebenenObj[aTag.e].t).join(', ')
    }
  },
  computed: {
    aAntworten () {
      return this.transcript.aAntworten.antwortenObj
    },
    tokenSetsDeepList () {
      return this.zeileData.tokenSetsDeepList[this.aInf.pk]
    },
    tokenSetsSvgData () {
      return this.zeileData.tokenSetsSvgData[this.aInf.pk]
    },
    aTokenSetHeight () {
      return this.transcript.aSVG.tokenSetsHeight
    },
    svgWidth () {
      return this.transcript.aSVG.width - this.transcript.aSVG.infWidth - this.transcript.aSVG.frmPadding * 2 - 15
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  g.zTsVB > .zTsVBln > line, g.zTsVB > .zTsVBln > path {
    stroke-width: 2;
    stroke: #333;
    fill:none;
  }
  g.zTsVB > text.hasTags {
    text-decoration: underline;
    font-weight: bold;
  }
  g.zTsTs > .zTsVBln > line {
    stroke-width: 1;
    stroke: #555;
  }
  .zTsVBln.dg0 > line, .zTsVBln.dg0 > path {
    stroke-width: 4px !important;
    stroke: #fff !important;
  }
  g.zTokenSet {
    cursor: pointer;
  }
  g.zTokenSet.active .zTsVBln.dg1 > line, g.zTokenSet.active .zTsVBln.dg1 > path {
    stroke: #99f;
  }
  g.zTokenSet.selected .zTsVBln.dg1 > line, g.zTokenSet.selected .zTsVBln.dg1 > path {
    stroke: #4b4;
  }
  g.zTokenSet.hover .zTsVBln.dg1 > line, g.zTokenSet.hover .zTsVBln.dg1 > path {
    stroke: #9f9;
  }
  g.zTokenSet.active  text, g.zTokenSet.active  text {
    fill: #5858a5;
  }
  g.zTokenSet.selected  text, g.zTokenSet.selected  text {
    fill: #2e842e;
  }
  g.zTokenSet.hover text, g.zTokenSet.hover text {
    fill: #4b4;
  }
</style>
