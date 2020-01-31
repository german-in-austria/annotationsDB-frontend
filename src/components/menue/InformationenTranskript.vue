<template>
  <div :class="{'infpanel': true, 'open': show}" v-if="transcript && transcript.ready">
    <a href="#" v-on:click.prevent="show=!show"><b>Transkript</b> (ID: {{ transcript.pk }})<span :class="'glyphicon glyphicon-' + ((show)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
    <div v-if="show">
      <div><b>Name:</b> {{ transcript.aTranskript.n }}</div>
      <div><b>Update Zeit:</b> {{ transcript.aTranskript.ut }}</div>
      <div><b>Informanten:</b> <span v-for="(aInf, aInfKey) in transcript.aInformanten.informantenList" :key="aInfKey" :title="'Anonym: '+aInf.ka+' - ID: '+aInfKey">{{ ((aInf.i)?', ':'')+aInf.k }}</span></div>
      <div><b>Events:</b> {{ transcript.aEvents.length.toLocaleString() }}</div>
      <div><b>Tokens:</b> <span :title="tokenCountByInf">{{ transcript.aTokens.length.toLocaleString() }}</span></div>
      <div><b>Tiers:</b>
        <span v-for="(aTier, aKey) in transcript.aTranskript.tiers" :key="'it-t' + aKey" :title="'ID: ' + aTier.pk">{{ (aKey > 0 ? ', ' : '') + aTier.tier_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationenTranskript',
  props: ['transcript'],
  data () {
    return {
      show: true
    }
  },
  methods: {
  },
  computed: {
    tokenCountByInf () {
      var out = ''
      if (this.transcript && this.transcript.ready) {
        this.transcript.aInformanten.informantenList.forEach(function (val) {
          out += val.k + ': ' + ((this.transcript.aTokens.tokenLists.byInf[val.pk]) ? this.transcript.aTokens.tokenLists.byInf[val.pk].length.toLocaleString() : '0') + '\n'
        }, this)
      }
      return out
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
