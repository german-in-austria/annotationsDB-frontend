<template>
  <div class="auswahl">
    <div class="infpanel open selpanel" v-if="(transcript.selectedTokenBereich.v && transcript.selectedTokenBereich.b)">
      <span><b>Auswahl Bereich:</b> <!-- {{ svgSelTokenList.length }} Token{{ ((svgSelTokenList.length!==1)?'s':'') }} --><button @click="transcript.selectedTokenBereich={'v': null, 'b': null};" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ transcript.selectedTokenBereich.v.iObj.k }}<br>
        <b>Von Token:</b> <a href="#" v-on:click.prevent="transcript.selectedToken=transcript.selectedTokenBereich.v;focusFocusCatch();" :title="'ID: '+transcript.selectedTokenBereich.v.i">{{ transcript.selectedTokenBereich.v.t }}</a><br>
        <b>Bis Token:</b> <a href="#" v-on:click.prevent="transcript.selectedToken=transcript.selectedTokenBereich.b;focusFocusCatch();" :title="'ID: '+transcript.selectedTokenBereich.b.i">{{ transcript.selectedTokenBereich.b.t }}</a><br>
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
  },
  components: {
  }
}
</script>

<style scoped>
</style>
