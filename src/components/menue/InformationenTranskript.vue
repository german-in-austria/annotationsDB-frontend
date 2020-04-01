<template>
  <div :class="{'infpanel': true, 'open': show}" v-if="transcript && transcript.ready">
    <a href="#" v-on:click.prevent="show=!show"><b>Transkript</b> (ID: {{ transcript.pk }})<span :class="'glyphicon glyphicon-' + ((show)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
    <div v-if="show">
      <div class="wb-all"><b>Name:</b> {{ transcript.aTranskript.n }}</div>
      <div><b>Update Zeit:</b> {{ transcript.aTranskript.ut }}</div>
      <div><b>Informanten:</b> <span v-for="(aInf, aInfKey) in transcript.aInformanten.informantenList" :key="aInfKey" :title="'Anonym: '+aInf.ka+' - ID: '+aInfKey">{{ ((aInf.i)?', ':'')+aInf.k }}</span></div>
      <div><b>Events:</b> {{ transcript.aEvents.length.toLocaleString() }}</div>
      <div>
        <b>Tokens:</b>
        <span :title="tokenCountByInf">{{ transcript.aTokens.length.toLocaleString() }}</span>
        <span v-if="transcript.aTokens.length < transcript.aTranskript.tokenCount">/ {{ transcript.aTranskript.tokenCount.toLocaleString() }}</span>
      </div>
      <div><b>Default Spur:</b> {{ transcript.aTranskript.dt }}</div>
      <div><b>Tiers:</b>
        <span v-for="(aTier, aKey) in transcript.aTranskript.tiers" :key="'it-t' + aKey" :title="'ID: ' + aTier.pk">{{ (aKey > 0 ? ', ' : '') + aTier.tier_name }}</span>
      </div>
      <button @click="resetTranskriptTokenReihung" v-if="resetTranskriptTokenReihungDone !== transcript.pk && (true || transcript && ((transcript.errors && transcript.errors.length > 0) || (transcript.aSVG && transcript.aSVG.errors && transcript.aSVG.errors.length > 0)))" :disabled="resetTranskriptTokenReihungLoading">Reihung aktuallisieren</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationenTranskript',
  props: ['transcript'],
  data () {
    return {
      show: true,
      resetTranskriptTokenReihungLoading: false,
      resetTranskriptTokenReihungDone: -1
    }
  },
  methods: {
    resetTranskriptTokenReihung () {
      console.log('resetTranskriptTokenReihung', this.transcript.pk)
      this.resetTranskriptTokenReihungLoading = true
      this.transcript.vueObj.$http.post('', {
        getTranskript: this.transcript.pk,
        resetTranskriptTokenReihung: 1
      })
        .then((response) => {
          console.log('resetTranskriptTokenReihung', response.data)
          this.resetTranskriptTokenReihungLoading = false
          this.resetTranskriptTokenReihungDone = this.transcript.pk
        })
        .catch((err) => {
          console.log(err)
          alert('Fehler!')
          this.resetTranskriptTokenReihungLoading = false
        })
    }
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
