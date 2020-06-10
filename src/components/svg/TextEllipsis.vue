<template>
  <text ref="txt">
    {{ sText }}
  </text>
</template>

<script>
export default {
  name: 'TextEllipsis',
  props: ['maxWidth', 'text'],
  data () {
    return {
      sText: ''
    }
  },
  mounted () {
    this.updateText()
  },
  computed: {
  },
  methods: {
    updateText () {
      this.sText = this.text
      let svgObj = this.$refs.txt
      svgObj.textContent = this.sText
      if (svgObj.getBBox().width > this.maxWidth) {
        let maxDg = 99999
        while (maxDg > 0 && svgObj.getBBox().width > this.maxWidth && this.sText.length > 1) {
          this.sText = this.sText.slice(0, -1)
          svgObj.textContent = this.sText + '...'
          maxDg -= 1
        }
        this.sText = this.sText + '...'
      }
    }
  },
  watch: {
    text () {
      this.updateText()
    }
  }
}
</script>

<style scoped>
</style>
