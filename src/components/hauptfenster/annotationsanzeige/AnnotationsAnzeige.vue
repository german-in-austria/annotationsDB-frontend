<template>
  <div class="annotationsanzeige">
    <svg id="annotationsvg" :style="'height:' + transcript.aSVG.height + 'px;'" ref="annotationsSVG">
      <defs>
        <marker id="arrow-blue" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,1 L0,5 L5,3 z" fill="#00a"/>
        </marker>
        <marker id="arrow-green" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,1 L0,5 L5,3 z" fill="#0a0"/>
        </marker>
        <marker id="arrow-zTsTs0" markerWidth="3" markerHeight="3" refX="1" refY="2" orient="auto" markerUnits="strokeWidth">
          <path d="M0,1 L0,3 L2,2 z" fill="#fff"/>
        </marker>
        <marker id="arrow-zTsTs1" markerWidth="6" markerHeight="8" refX="3" refY="4" orient="auto" markerUnits="strokeWidth">
          <path d="M0,1 L0,7 L5,4 z" fill="#555"></path>
        </marker>
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood flood-color="#ffffffe3"/>
          <feComposite in="SourceGraphic"/>
        </filter>
      </defs>
      <g id="svg-g-transcript">
        <g id="svg-g-events" :transform="'translate(' + transcript.aSVG.svgPadding + ',' + transcript.aSVG.svgPadding + ')'" v-if="renderZeilen">
          <AnnotationsAnzeigeZeile :transcript="transcript" :zeile="aZeile" :key="'rz' + key" v-for="(aZeile, key) in renderZeilen"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import AnnotationsAnzeigeZeile from './AnnotationsAnzeigeZeile'
var _ = require('lodash')

export default {
  name: 'AnnotationsAnzeige',
  props: ['transcript'],
  data () {
    return {
      // renderZeilen: this.transcript.aSVG.renderZeilen
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeWindow)
    this.$nextTick(() => {
      this.transcript.aSVG.setAnnotationsSVG(this.$refs.annotationsSVG)
    })
  },
  computed: {
    renderZeilen () {
      if (this.transcript.aSVG.renderZeilen) {
        return this.transcript.aSVG.renderZeilen
      } else {
        return null
      }
    }
  },
  methods: {
    resizeWindow: _.debounce(function () {
      if (this.transcript.aSVG.ready) {
        this.transcript.aSVG.updateDimensionen()
      }
    }, 500)
  },
  watch: {
  },
  beforeDestroy () {
    this.transcript.aSVG.setAnnotationsSVG(null)
    window.removeEventListener('resize', this.resizeWindow)
  },
  components: {
    AnnotationsAnzeigeZeile
  }
}
</script>

<style scoped>
  #annotationsvg {
    width: 100%;
    height: 93%;
    margin-top: 30px;
  }

  #svg-g-events rect.ebg {
    fill: #eee;
  }
  #svg-g-events rect.ibg {
    fill: #fbfbfb;
  }
  test.bold {
    font-weight: bold;
  }
</style>
