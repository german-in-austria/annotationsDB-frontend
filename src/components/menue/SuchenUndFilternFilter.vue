<template>
  <div class="filtergroup">
    <h4>Filter:<a href="#" v-on:click.prevent="$emit('closeFilter')" class="pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4>
    <b>Informanten:</b>
      <label v-for="(aInfVal, aInfKey) in transcript.aInformanten.informantenList" :key="'suff-i' + aInfKey">
        &nbsp;<input type="checkbox" @click="changeInformantenShow" v-model="aInfVal.show">&nbsp;{{ aInfVal.ka }}{{ ((transcript.aInformanten.informantenList.length - 1 > aInfVal.i) ? ',' : '') }}
      </label>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'SuchenUndFilternFilter',
  props: ['transcript'],
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.transcript)
  },
  methods: {
    changeInformantenShow () {
      this.$nextTick(() => {
        this.transcript.aSVG.updateZeilen()
        this.focusFocusCatch()
      })
    },
    focusFocusCatch () {
      this.$root.$children[0].$refs.annotationstool.$refs.hauptfenster.setFocus()
    }
  },
  beforeDestroy () {
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style scoped>
</style>
