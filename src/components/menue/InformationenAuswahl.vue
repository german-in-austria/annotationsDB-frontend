<template>
  <div class="auswahl">
    <!-- <div :class="{'infpanel': true, 'open': true, 'selpanel': true}" v-if="(selTokenBereich.v>-1 && selTokenBereich.b>-1)">
      <span><b>Auswahl Bereich:</b> {{ svgSelTokenList.length }} Token{{ ((svgSelTokenList.length!==1)?'s':'') }}<button @click="selTokenBereich={'v': -1, 'b': -1};" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ aInformanten[aTokens[selTokenBereich.v].i].k }}<br>
        <b>Von Token:</b> <a href="#" v-on:click.prevent="selToken=selTokenBereich.v;focusFocusCatch();" :title="'ID: '+selTokenBereich.v">{{ aTokens[selTokenBereich.v].t }}</a><br>
        <b>Bis Token:</b> <a href="#" v-on:click.prevent="selToken=selTokenBereich.b;focusFocusCatch();" :title="'ID: '+selTokenBereich.b">{{ aTokens[selTokenBereich.b].t }}</a><br>
        <button @click="selToTokenSet()" class="lmfabc text-center">Auswahl in Token Set umwandeln</button>
      </div>
    </div> -->
    <!-- <div :class="{'infpanel': true, 'open': true, 'selpanel': true}" v-if="selTokenListe.length>0">
      <span><b>Auswahl Liste:</b> {{ svgSelTokenList.length }} Token{{ ((selTokenListe.length!==1)?'s':'') }}<button @click="selTokenListe=[];svgSelTokenList=[];" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ aInformanten[aTokens[selTokenListe[0]].i].k }}<br>
        <button @click="selToTokenSet()" class="lmfabc text-center">Auswahl in Token Set umwandeln</button>
        <div class="listtokens mit10">
          <a href="#" v-on:click.prevent="selToken=sTL;focusFocusCatch();" :class="{selected: selToken===sTL}" v-for="(sTL, i) in selTokenListe" :title="aTokens[sTL].t+' - ID: '+sTL">{{ aTokens[sTL].t }}</a>
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
  },
  computed: {
  },
  components: {
  }
}
</script>

<style scoped>
</style>
