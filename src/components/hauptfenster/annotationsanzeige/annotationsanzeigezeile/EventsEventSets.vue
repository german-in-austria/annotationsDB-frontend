<template>
  <g class="zEventSets"
    :transform="
      'translate(' +
        (transcript.aSVG.frmPadding + transcript.aSVG.infWidth) +
      ',' +
        (transcript.aSVG.frmPadding + transcript.aSVG.timerHeight) +
      ')'"
  >
    <g class="zEventSetLine"
      :transform="'translate(0,0)'"
      v-for="(aEventSetDeep, aEsdI) in eventSetsDeepList"
      :key="'zesl' + aEsdI"
    >
      <g :class="'zEventSet' + (transcript.hoveredEventSet === aEventSet.id ? ' hover' : '') + ((aEventSet === transcript.selectedEventSet) ? ' selected' : '') /* ToDo: + ((transcript.selectedToken && transcript.selectedToken.tokenSetsList && transcript.selectedToken.tokenSetsList.indexOf(aEventSet) > -1) ? ' active' : '')*/"
        v-for="(aEventSet, aTsI) in aEventSetDeep"
        :key="aTsI"
        :transform="'translate(0,' + (aEventSetMaxHeight - aEsdI * aEventSetHeight) + ')'"
        @click="showaEventSetInfos(aEventSet, false, $event)"
        @mouseover="transcript.hoveredEventSet = aEventSet.id"
        @mouseleave="transcript.hoveredEventSet = null"
      >
        <!-- Eventsets anzeigen -->
        <g class="zEsVB">
          <g :class="'zEsVBln dg' + dg" v-for="dg in [0,1]" :key="'zEsVBlndg' + dg">
            <path :d="'M' + (((typeof eventSetsSvgData[aEventSet.id].startX === 'number') ? eventSetsSvgData[aEventSet.id].startX + 1 : 0)) + ' ' +
                            ((typeof eventSetsSvgData[aEventSet.id].startX === 'number') ? (-(eventSetsDeepList.length - 1 - aEsdI) * aEventSetHeight) : (aEventSetHeight / 2)) +
                      ((typeof eventSetsSvgData[aEventSet.id].startX === 'number')
                        ? ' V' + (aEventSetHeight / 2 - 6) + 'a6,6 0 0 0 6,6 '
                        : '') +
                      ' H' + ((eventSetsSvgData[aEventSet.id].endX) ? eventSetsSvgData[aEventSet.id].endX - 7 : svgWidth) +
                      ((eventSetsSvgData[aEventSet.id].endX) ? 'a6,6 0 0 0 6,-6 V' + (-(eventSetsDeepList.length - 1 - aEsdI) * aEventSetHeight) : '')" />
          </g>
          <text :x="(((eventSetsSvgData[aEventSet.id].endX) ? eventSetsSvgData[aEventSet.id].endX : svgWidth) + ((eventSetsSvgData[aEventSet.id].startX) ? eventSetsSvgData[aEventSet.id].startX : 0)) / 2"
                :y="0"
                style="text-anchor:middle;" filter="url(#solid)"
                :class="(getValOfSubProp(aEventSet, 'aId') && getValOfSubProp(aAntworten[aEventSet.aId], 'tags.length') > 0) ? 'hasTags' : ''"
          >&nbsp;
            {{
                transcript.previewTagEbene > 0 && getValOfSubProp(aEventSet, 'aId') && getValOfSubProp(aAntworten[aEventSet.aId], 'tags.length') > 0
                && getFirstObjectOfValueInPropertyOfArray(aAntworten[aEventSet.aId].tags, 'e', transcript.previewTagEbene)
              ? (transcript.showEventSetIds ? aEventSet.id + ': ' : '') + globals.tagsData.data.tagsText(getFirstObjectOfValueInPropertyOfArray(aAntworten[aEventSet.aId].tags, 'e', transcript.previewTagEbene).tags)
              : (
                transcript.previewTagEbene == -2 && getValOfSubProp(aEventSet, 'aId') && getValOfSubProp(aAntworten[aEventSet.aId], 'tags.length') > 0
                ? (transcript.showEventSetIds ? aEventSet.id + ': ' : '') + getUsedTagEbenen(aAntworten[aEventSet.aId].tags)
                : (transcript.showEventSetIds ? aEventSet.id : ''))
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
  name: 'AnnotationsAnzeigeZeileEventsEventSets',
  props: ['transcript', 'zeileData', 'aSvgInfLine'],
  data () {
    return {
      globals: Globals
    }
  },
  mounted () {
    // console.log(this.transcript.aSVG)
    // console.log(this.zeileData)
    // console.log(this.eventSetsSvgData)
  },
  methods: {
    showaEventSetInfos (eEveSet, direkt = false, e = undefined) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        // ToDo: EventSet select
        // ToDo: ctrlKey
      } else {
        if (this.transcript.selectedEventSet === eEveSet) {
          this.transcript.vueObj.modalData = { type: 'eventSet', data: {aEventSet: _.cloneDeep(eEveSet)} }
        } else {
          this.transcript.selectedEventSet = eEveSet
          console.log('showaEventSetInfos', eEveSet)
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
    eventSetsDeepList () {
      return this.zeileData.eventSetsDeepList
    },
    eventSetsSvgData () {
      return this.zeileData.eventSetsSvgData
    },
    aEventSetHeight () {
      return this.transcript.aSVG.eventSetsHeight
    },
    aEventSetMaxHeight () {
      return this.transcript.aSVG.eventSetsHeight * (this.eventSetsDeepList.length - 1)
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
  g.zEsVB > .zEsVBln > line, g.zEsVB > .zEsVBln > path {
    stroke-width: 2;
    stroke: #333;
    fill: none;
    stroke-dasharray: 4 3;
    stroke-linecap: round;
  }
  g.zEsVB > text.hasTags {
    text-decoration: underline;
    font-weight: bold;
  }
  g.zEsTs > .zEsVBln > line {
    stroke-width: 1;
    stroke: #555;
  }
  .zEsVBln.dg0 > line, .zEsVBln.dg0 > path {
    stroke-width: 4px !important;
    stroke: #fff !important;
  }
  g.zEventSet {
    cursor: pointer;
  }
  g.zEventSet.active .zEsVBln.dg1 > line, g.zEventSet.active .zEsVBln.dg1 > path {
    stroke: #99f;
  }
  g.zEventSet.selected .zEsVBln.dg1 > line, g.zEventSet.selected .zEsVBln.dg1 > path {
    stroke: #4b4;
  }
  g.zEventSet.hover .zEsVBln.dg1 > line, g.zEventSet.hover .zEsVBln.dg1 > path {
    stroke: #9f9;
  }
  g.zEventSet.active  text, g.zEventSet.active  text {
    fill: #5858a5;
  }
  g.zEventSet.selected  text, g.zEventSet.selected  text {
    fill: #2e842e;
  }
  g.zEventSet.hover text, g.zEventSet.hover text {
    fill: #4b4;
  }
</style>
