<template>
  <g class="tEvent" :transform="'translate(' + transcript.aSVG.frmPadding + ',' + (transcript.aSVG.timerHeight + transcript.aSVG.infTop + aSvgInfLine.top + transcript.aSVG.frmPadding) + ')'">
    <AnnotationsAnzeigeZeileEventsLineInformanten :transcript="transcript" :aInf="aInf" :aSvgInfLine="aSvgInfLine" />
    <!-- <AnnotationsAnzeigeZeileTokenSets :transcript="transcript" :zeileData="zeileData" /> -->
  <!-- <g class="tEvent" :transform="'translate('+(zInfWidth + 5 + tEvents[tEventId]['svgLeft'])+','+(eEventHeight-20)+')'" v-for="tEventId in zeilenTEvents[aZeile]['eId']"> -->
    <!-- <AnnotationsAnzeigeZeileEventsLineEvent :transcript="transcript" :zeile="zeile" :event="aEvent" /> -->  <!--  v-for="(aInfVal, aInfKey, aInfIndex) in objectKeyFilter(objectSubValueFilter(aInformanten,'show',true), zeilenTEvents[aZeile]['iId'])" -->
    <!-- <g class="zeit" v-on:click="showTEventInfos($event, tEventId)">
      <rect x="0" y="-15" :width="tEvents[tEventId]['svgWidth']+1" height="11" v-bind:class="{ past: audioPos >= tEvents[tEventId].ae }"/>
      <rect x="0" y="-15" :width="(tEvents[tEventId]['svgWidth']+1)/tEvents[tEventId].al*(audioPos-tEvents[tEventId].as)" height="11" class="akt" v-if="audioPos > tEvents[tEventId].as && audioPos < tEvents[tEventId].ae" />
      <line x1="0" y1="-15" x2="0" y2="-4" />
      <text x="4" y="-6">${ secondsToDuration(durationToSeconds(tEvents[tEventId]['s']), 3) }</text>
    </g> -->
  <!-- </g> -->
  </g>
</template>

<script>
import AnnotationsAnzeigeZeileEventsLineInformanten from './EventsLineInformanten'
import AnnotationsAnzeigeZeileEventsLineEvent from './EventsLineEvent'
import AnnotationsAnzeigeZeileTokenSets from './TokenSets'

export default {
  name: 'AnnotationsAnzeigeZeileEventsLine',
  props: ['transcript', 'zeileData', 'aInf'],
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    aSvgInfLine () {
      return this.zeileData.svgInfLine[this.aInf.pk]
    }
  },
  methods: {
  },
  watch: {
  },
  components: {
    AnnotationsAnzeigeZeileEventsLineInformanten,
    AnnotationsAnzeigeZeileEventsLineEvent,
    AnnotationsAnzeigeZeileTokenSets
  }
}
</script>

<style scoped>
  g.tEvent > .zeit {
    cursor: pointer;
  }
  g.tEvent > .zeit > text {
    font-size: 10px;
    fill: #666;
  }
  g.tEvent > .zeit > rect {
    fill: #eee;
  }
  g.tEvent > .zeit > rect.past {
    fill: #eef;
  }
  g.tEvent > .zeit > rect.akt {
    fill: #efe;
  }
  g.tEvent > .zeit > line {
    stroke-width: 1px;
    stroke: #888;
  }
</style>
