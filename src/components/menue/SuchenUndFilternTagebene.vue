<template>
  <div class="taggroup">
    <h4>Anzeige:<a href="#" v-on:click.prevent="$emit('closeTagebene')" class="pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4>
    <label>&nbsp;<input type="checkbox" @change="changeSVG" v-model="transcript.showEventTiers">&nbsp;Event Tiers anzeigen</label>
    <label>&nbsp;<input type="checkbox" v-model="transcript.showTokenSetIds">&nbsp;Token Set ID anzeigen</label>
    <h5>Tagebene anzeigen:</h5>
    <select size="1" class="form-control" v-model="transcript.previewTagEbene" v-if="!globals.tagsData.data.loadingBase">
      <option value="-1">Keine</option>
      <option value="-2">Benutzte Tagebenen anzeigen</option>
      <option v-for="(aEbene, aEbeneKey) in globals.tagsData.data.baseCache.tagebenenList" :value="aEbene.pk" :key="'sftete' + aEbeneKey">{{ aEbene.t }}</option>
    </select>
    <hr>
  </div>
</template>

<script>
import Globals from '@/functions/globals'

export default {
  name: 'SuchenUndFilternTagebene',
  props: ['transcript'],
  data () {
    return {
      globals: Globals
    }
  },
  mounted () {
    console.log(this.transcript, this.globals.tagsData.data)
  },
  methods: {
    changeSVG () {
      this.$nextTick(() => {
        this.transcript.aSVG.updateZeilen()
      })
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
