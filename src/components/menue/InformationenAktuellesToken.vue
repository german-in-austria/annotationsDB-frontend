<template>
  <div :class="{'infpanel': true, 'open': show}" v-if="selToken">
    <a href="#" v-on:click.prevent="show=!show"><b>Akutelles Token</b> (ID: {{ selToken.pk }})<span :class="'glyphicon glyphicon-' + (show ? 'eye-open' : 'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
    <div v-if="show">
      <div><b>Text:</b> {{ selToken.t }} <a href="#" @click.prevent="showaTokenInfos()" class="pull-right"><span class="glyphicon glyphicon-pencil pull-right" aria-hidden="true"></span></a></div>
      <div><b>Ortho:</b>  {{ selToken.o }}</div>
      <div><b title="Text in Ortho:">T. in Or.:</b>  {{ selToken.to }}</div>
      <div><b>Typ:</b> <span :title="'ID: ' + selToken.tt">{{ aTokens.aTokenTypes[selToken.tt].n }}</span></div>
      <div><b>likely_error:</b> {{ selToken.le ? 'Ja' : 'Nein' }}</div>
      <div v-if="selToken.s"><b>Satz:</b> <span :title="'ID: ' + selToken.s">{{ (transcript.aSaetze[selToken.s].t ? transcript.aSaetze[selToken.s].t : 'ID: ' + selToken.s) }}</span></div>
      <div v-if="selToken.s"><b>Satz Reihung:</b> {{ selToken.sr ? selToken.sr.toLocaleString() : 0 }}</div>
      <div v-if="selToken.fo"><b title="Fragment von:">Frag. von:</b> <span :title="'ID: ' + selToken.fo">{{ aTokens.tokensObj[selToken.fo] ? aTokens.tokensObj[selToken.fo].t : 'Token nicht geladen!' }}</span></div>
      <div v-if="aTokens.aTokenFragmenteObj[selToken.pk]">
        <b>Fragmente:</b>
        <span :title="'ID: ' + aToFragKey" v-for="(aToFragKey, aIndex) in aTokens.aTokenFragmenteObj[selToken.pk]" :key="'iat' + aToFragKey">
          {{ (aIndex ? ', ' : '') + (aTokens.tokensObj[aToFragKey] ? aTokens.tokensObj[aToFragKey].t : 'Token nicht geladen!') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationenAktuellesToken',
  props: ['transcript'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    showaTokenInfos () {
      console.log('showaTokenInfos', this.selToken)
    }
  },
  computed: {
    selToken () {
      return this.transcript.selectedToken
    },
    aTokens () {
      return this.transcript.aTokens
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
