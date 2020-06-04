<template>
  <div class="filtergroup">
    <h4>Filter:<a href="#" v-on:click.prevent="$emit('closeFilter')" class="pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4>
    <div>
      <b>Informanten:</b><br>
      <label v-for="(aInfVal, aInfKey) in transcript.aInformanten.informantenList" :key="'suff-i' + aInfKey">
        &nbsp;<input type="checkbox" @click="changeFilter" v-model="aInfVal.show">&nbsp;{{ aInfVal.ka }}{{ ((transcript.aInformanten.informantenList.length - 1 > aInfVal.i) ? ',' : '') }}
      </label>
    </div>
    <div class="mit10">
      <b>Spuren:</b><br>
      <label :class="transcript.aTranskript.allTracks[aKey].show ? '' : 'normal'" v-for="(aSpur, aKey) in transcript.allTracks" :key="'suff-s' + aKey">
        &nbsp;<input type="checkbox" @click="changeFilter" v-model="aSpur.show">&nbsp;{{ aSpur.title }}{{ ((transcript.allTracks.length - 1 > aKey) ? ',' : '') }}
      </label>
    </div>
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
    changeFilter () {
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
