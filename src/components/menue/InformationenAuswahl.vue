<template>
  <div class="auswahl">
    <div class="infpanel open selpanel" v-if="(transcript.selectedTokenBereich.v && transcript.selectedTokenBereich.b)">
      <span><b>Auswahl Bereich:</b> {{ transcript.aSVG.selectedTokenList.length }} Token{{ ((transcript.aSVG.selectedTokenList.length !==1) ? 's' : '') }}<button @click="transcript.selectedTokenBereich={'v': null, 'b': null};" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ transcript.selectedTokenBereich.v.iObj.k }}<br>
        <b>Von Token:</b> <a href="#" v-on:click.prevent="transcript.selectedToken=vSelectedTokenBereich;focusFocusCatch();" :title="'ID: ' + vSelectedTokenBereich.pk">{{ vSelectedTokenBereich.t }}</a><br>
        <b>Bis Token:</b> <a href="#" v-on:click.prevent="transcript.selectedToken=bSelectedTokenBereich;focusFocusCatch();" :title="'ID: ' + bSelectedTokenBereich.pk">{{ bSelectedTokenBereich.t }}</a><br>
        <!-- <button @click="selToTokenSet()" class="lmfabc text-center">Auswahl in Token Set umwandeln</button> -->
      </div>
    </div>
    <!-- <div :class="{'infpanel': true, 'open': true, 'selpanel': true}" v-if="selTokenListe.length>0">
      <span><b>Auswahl Liste:</b> {{ svgSelTokenList.length }} Token{{ ((selTokenListe.length!==1)?'s':'') }}<button @click="selTokenListe=[];svgSelTokenList=[];" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ aInformanten[aTokens[selTokenListe[0]].i].k }}<br>
        <button @click="selToTokenSet()" class="lmfabc text-center">Auswahl in Token Set umwandeln</button>
        <div class="listtokens mit10">
          <a href="#" v-on:click.prevent="transcript.selectedToken=sTL;focusFocusCatch();" :class="{selected: transcript.selectedToken===sTL}" v-for="(sTL, i) in selTokenListe" :title="aTokens[sTL].t+' - ID: '+sTL">{{ aTokens[sTL].t }}</a>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'InformationenAuswahl',
  props: ['transcript'],
  data () {
    return {
    }
  },
  methods: {
    focusFocusCatch () {
      this.$root.$children[0].$refs.annotationstool.$refs.hauptfenster.setFocus()
    }
  },
  computed: {
    vSelectedTokenBereich () {
      if (this.transcript.selectedTokenBereich.v && this.transcript.aSVG.selectedTokenList.length > 0) {
        return this.transcript.aSVG.selectedTokenList[0]
      }
      return null
    },
    bSelectedTokenBereich () {
      if (this.transcript.selectedTokenBereich.b && this.transcript.aSVG.selectedTokenList.length > 0) {
        return this.transcript.aSVG.selectedTokenList[this.transcript.aSVG.selectedTokenList.length - 1]
      }
      return null
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
