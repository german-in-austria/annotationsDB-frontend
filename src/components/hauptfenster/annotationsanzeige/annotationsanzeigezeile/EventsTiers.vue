<template>
  <g class="eTiers" :transform="'translate(' + (transcript.aSVG.frmPadding + transcript.aSVG.infWidth) + ',' + (zeileData.svgHeight - transcript.aSVG.frmPadding * 4) + ')'">
    <g class="eTier" :transform="'translate(' + tEvent.svgLeft + ',-4)'" v-for="(tEvent, teKey) in zeileData.teObjs" :key="'etier' + teKey">
      <TextEllipsis x="5" :y="0 - transcript.aSVG.eventTierHeight * eTKey" :max-width="tEvent.svgWidth - 10"
        :text="'x' + eT"
        v-for="(eT, eTKey) in tEvent.eventTiers" :key="'etier' + teKey + '-' + eTKey"
      />
    </g>
  </g>
</template>

<script>
import TextEllipsis from '@/components/svg/TextEllipsis'

export default {
  name: 'EventsTiers',
  props: ['transcript', 'zeileData'],
  data () {
    return {
    }
  },
  mounted () {
    // console.log(this.zeileData, this.zeileData.svgHeight)
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  components: {
    TextEllipsis
  }
}
</script>

<style scoped>
  .eTier > text {
    font-size: 10px;
    fill: #444;
    dominant-baseline: middle!important;
  }
</style>
