<template>
  <g class="tokensets">
  <!--     <g class="zTokenSets" :transform="'translate('+(zInfWidth + 5)+','+(eEventHeight-25 + eInfTop + zeilenTEvents[aZeile]['tsT'][aInfKey] + aInfIndex * (eInfHeight + eInfTop))+')'" v-for="(aInfVal, aInfKey, aInfIndex) in objectKeyFilter(objectSubValueFilter(aInformanten,'show',true), zeilenTEvents[aZeile]['iId'])">
      <g class="zTokenSetLine" :transform="'translate(0,'+(aTsI*aTokenSetHeight)+')'" v-for="aTokenSetIds, aTsI in zeilenTEvents[aZeile]['tsIdZ'][aInfKey]">
        <g @click="showaTokenSetInfos(aTokenSetId, false, $event)" :class="'zTokenSet'+((aTokenSetId===selTokenSet)?' selected':'')+((selToken > 0 && aTokens[selToken].tokenSets && aTokens[selToken].tokenSets.indexOf(aTokenSetId) > -1)?' active':'')" v-for="aTokenSetId in aTokenSetIds" v-if="zeilenTEvents[aZeile]['tsZi'][aInfKey][aTokenSetId]">
          <template  v-for="zeilenTEvent in [zeilenTEvents[aZeile]['tsZi'][aInfKey][aTokenSetId]]">
            <g class="zTsVB" v-if="aTokenSets[aTokenSetId].tx">
              <g :class="'zTsVBln dg'+dg" v-for="dg in [0,1]">
                <path :d="'M'+(((zeilenTEvent['sX']) ? zeilenTEvent['sX'] + 1 : 0))+' '+((zeilenTEvent['sX']) ? ((zeilenTEvents[aZeile]['tsIdZ'][aInfKey].length-aTsI)*aTokenSetHeight) : (aTokenSetHeight/2))
                        +((zeilenTEvent['sX']) ? ' V'+(aTokenSetHeight / 2 + 6)+ 'a6,6 0 0 1 6,-6 ' : '')
                        +' H'+((zeilenTEvent['eX']) ? zeilenTEvent['eX'] - 7 : (mWidth - zInfWidth - 15))
                        +((zeilenTEvent['eX'])?'a6,6 0 0 1 6,6 V'+((zeilenTEvents[aZeile]['tsIdZ'][aInfKey].length-aTsI)*aTokenSetHeight):'')"/>
              </g>
              <text :x="(((zeilenTEvent['eX']) ? zeilenTEvent['eX'] : (mWidth - zInfWidth - 15)) + ((zeilenTEvent['sX']) ? zeilenTEvent['sX'] : 0))/2"
                    :y="15"
                    style="text-anchor:middle;"  filter="url(#solid)"
                    :text-decoration="((getValOfSubProp(aTokenSets[aTokenSetId], 'aId') && getValOfSubProp(aAntworten[aTokenSets[aTokenSetId].aId], 'tags.length') > 0) ? 'underline' : '')"
                    :class="{'bold': (getValOfSubProp(aTokenSets[aTokenSetId], 'aId') && getValOfSubProp(aAntworten[aTokenSets[aTokenSetId].aId], 'tags.length') > 0)}">&nbsp;
                      ${
                        aTokenSetId
                        + ((showTagEbene && previewTagEbene > 0 && (getValOfSubProp(aTokenSets[aTokenSetId], 'aId') && getValOfSubProp(aAntworten[aTokenSets[aTokenSetId].aId], 'tags.length') > 0 && getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSets[aTokenSetId].aId].tags, 'e', previewTagEbene))) ?
                          ': ' + tagCache.tagsText(getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSets[aTokenSetId].aId].tags, 'e', previewTagEbene).tags)
                        : '')
                      }
                    &nbsp;</text>
            </g>
            <g class="zTsTs" v-else>
              <g :class="'zTsVBln dg'+dg" v-for="dg in [0,1]">
                <line :x1="parseInt((zeilenTEvent['sX']) ? zeilenTEvent['sX'] : 0)"
                      :y1="aTokenSetHeight/2"
                      :x2="parseInt((zeilenTEvent['eX']) ? zeilenTEvent['eX'] : (mWidth - zInfWidth - 15))"
                      :y2="aTokenSetHeight/2"/>
                <line :x1="parseInt(tX)"
                      :y1="aTokenSetHeight/2"
                      :x2="parseInt(tX)"
                      :y2="(zeilenTEvents[aZeile]['tsIdZ'][aInfKey].length - aTsI) * aTokenSetHeight - 2"
                      v-for="tX in zeilenTEvent['tX']" :marker-end="'url(#arrow-zTsTs'+dg+')'"/>
              </g>
              <text :x="(((zeilenTEvent['eX']) ? zeilenTEvent['eX'] : (mWidth - zInfWidth - 15)) + ((zeilenTEvent['sX']) ? zeilenTEvent['sX'] : 0))/2"
                    :y="15"
                    style="text-anchor:middle;"  filter="url(#solid)"
                    :text-decoration="((getValOfSubProp(aTokenSets[aTokenSetId], 'aId') && getValOfSubProp(aAntworten[aTokenSets[aTokenSetId].aId], 'tags.length') > 0) ? 'underline' : '')"
                    :class="{'bold': (getValOfSubProp(aTokenSets[aTokenSetId], 'aId') && getValOfSubProp(aAntworten[aTokenSets[aTokenSetId].aId], 'tags.length') > 0)}">&nbsp;
                      ${
                        aTokenSetId
                        + ((showTagEbene && previewTagEbene > 0 && (getValOfSubProp(aTokenSets[aTokenSetId], 'aId') && getValOfSubProp(aAntworten[aTokenSets[aTokenSetId].aId], 'tags.length') > 0 && getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSets[aTokenSetId].aId].tags, 'e', previewTagEbene))) ?
                          ': ' + tagCache.tagsText(getFirstObjectOfValueInPropertyOfArray(aAntworten[aTokenSets[aTokenSetId].aId].tags, 'e', previewTagEbene).tags)
                        : '')
                      }
                    &nbsp;</text>
            </g>
          </g>
        </template>
      </g>
    </g> -->
  </g>
</template>

<script>
export default {
  name: 'AnnotationsAnzeigeZeileTokenSets',
  props: ['transcript', 'zeile'],
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
  g.zTsVB > .zTsVBln > line, g.zTsVB > .zTsVBln > path {
    stroke-width: 2;
    stroke: #333;
    fill:none;
  }
  g.zTsTs > .zTsVBln > line {
    stroke-width: 1;
    stroke: #555;
  }
  .zTsVBln.dg0 > line, .zTsVBln.dg0 > path {
    stroke-width: 4px !important;
    stroke: #fff !important;
  }
  g.zTokenSet.active .zTsVBln.dg1 > line, g.zTokenSet.active .zTsVBln.dg1 > path {
    stroke: #99f;
  }
  g.zTokenSet.selected .zTsVBln.dg1 > line, g.zTokenSet.selected .zTsVBln.dg1 > path {
    stroke: #4b4;
  }
  g.zTokenSet:hover .zTsVBln.dg1 > line, g.zTokenSet:hover .zTsVBln.dg1 > path {
    stroke: #9f9;
  }
  g.zTokenSet.active  text, g.zTokenSet.active  text {
    fill: #5858a5;
  }
  g.zTokenSet.selected  text, g.zTokenSet.selected  text {
    fill: #2e842e;
  }
  g.zTokenSet:hover text, g.zTokenSet:hover text {
    fill: #4b4;
  }
</style>
