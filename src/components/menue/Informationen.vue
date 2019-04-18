<template>
  <div class="infgroup">
    <h4>Informationen:</h4>
    <InformationenTranskript :transcript="transcript" />
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
    <InformationenAktuellesToken :transcript="transcript" />
    <!-- <div :class="{'infpanel': true, 'open': showTokenSetInfo}" v-if="selTokenSet!==0">
      <a href="#" v-on:click.prevent="showTokenSetInfo=!showTokenSetInfo"><b>Akutelles Token Set</b> (ID: {{ selTokenSet+((selTokenSet<0)?' (Neu)':'') }})<span :class="'glyphicon glyphicon-' + ((showTokenSetInfo)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
      <div v-if="showTokenSetInfo">
        <div class="tokensets" v-if="aTokenSets[selTokenSet]">
          <template v-if="aTokenSets[selTokenSet].ivt">
            <b>Von Token:</b> <a href="#" v-on:click.prevent="selToken=aTokenSets[selTokenSet].ivt;focusFocusCatch();" :title="'ID: '+aTokenSets[selTokenSet].ivt">{{ aTokens[aTokenSets[selTokenSet].ivt].t }}</a>
            <a href="#" v-on:click.prevent="setATokenSetBereich(selTokenSet,selToken,'ivt')" class="pull-right" title="Ersetzen durch ausgewähltes Token." v-if="selToken && getValOfSubProp(aTokens[selToken], 'i') === aTokens[aTokenSets[selTokenSet].ivt].i && aTokenReihung.indexOf(aTokenSets[selTokenSet].ibt) > aTokenReihung.indexOf(selToken)"><span class="glyphicon glyphicon-screenshot pull-right" aria-hidden="true"></span></a>
            <br>
          </template>
          <template v-if="aTokenSets[selTokenSet].ibt">
            <b>Bis Token:</b> <a href="#" v-on:click.prevent="selToken=aTokenSets[selTokenSet].ibt;focusFocusCatch();" :title="'ID: '+aTokenSets[selTokenSet].ibt">{{ aTokens[aTokenSets[selTokenSet].ibt].t }}</a>
            <a href="#" v-on:click.prevent="setATokenSetBereich(selTokenSet,selToken,'ibt')" class="pull-right" title="Ersetzen durch ausgewähltes Token." v-if="selToken && getValOfSubProp(aTokens[selToken], 'i') === aTokens[aTokenSets[selTokenSet].ibt].i && aTokenReihung.indexOf(aTokenSets[selTokenSet].ivt) < aTokenReihung.indexOf(selToken)"><span class="glyphicon glyphicon-screenshot pull-right" aria-hidden="true"></span></a>
            <br>
          </template>
          <b>Tokens:</b> {{ (aTokenSets[selTokenSet].t||aTokenSets[selTokenSet].tx||[]).length.toLocaleString() }} {{ ((aTokenSets[selTokenSet].t)?'(Liste)':'(Bereich)') }}
            <a href="#" v-on:click.prevent="aTokenSets[selTokenSet].ipshow2=((aTokenSets[selTokenSet].ipshow2 || (aTokenSets[selTokenSet].ipshow2===undefined&&(aTokenSets[selTokenSet].t||aTokenSets[selTokenSet].tx||[]).length<=selTokenSetSTMax))?false:true);reRenderSelToken();" class="pull-right"><span :class="'glyphicon glyphicon-' + ((aTokenSets[selTokenSet].ipshow2 || (aTokenSets[selTokenSet].ipshow2===undefined&&(aTokenSets[selTokenSet].t||aTokenSets[selTokenSet].tx||[]).length<=selTokenSetSTMax))?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
            <a href="#" v-on:click.prevent="showaTokenSetInfos(selTokenSet, true);" class="pull-right mir5"><span class="glyphicon glyphicon-pencil pull-right" aria-hidden="true"></span></a>
            <a href="#" v-on:click.prevent="toggleATokenSetListe(selTokenSet,selToken)" class="pull-right mir5" title="Token hinzufügen/entfernen" v-if="aTokenSets[selTokenSet].t && selToken && getValOfSubProp(aTokens[selToken], 'i') === aTokens[aTokenSets[selTokenSet].t[0]].i && aTokenReihung.indexOf(aTokenSets[selTokenSet].ivt) < aTokenReihung.indexOf(selToken)"><span :class="'glyphicon glyphicon-'+((aTokenSets[selTokenSet].t.indexOf(selToken)<0)?'plus':'minus')+' pull-right'" aria-hidden="true"></span></a>
          <br>
          <div class="listtokens mit10" v-if="aTokenSets[selTokenSet].ipshow2 || (aTokenSets[selTokenSet].ipshow2===undefined&&(aTokenSets[selTokenSet].t||aTokenSets[selTokenSet].tx||[]).length<=selTokenSetSTMax)">
            <a href="#" v-on:click.prevent="selToken=sTL;focusFocusCatch();" :class="{selected: selToken===sTL}" v-for="(sTL, i) in (aTokenSets[selTokenSet].t||aTokenSets[selTokenSet].tx)" :title="aTokens[sTL].t+' - ID: '+sTL">{{ aTokens[sTL].t }}</a>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div :class="{'infpanel': true, 'open': showTokenSetInfos}" v-if="getValOfSubProp(aTokens[selToken], 'tokenSets')">
      <a href="#" v-on:click.prevent="showTokenSetInfos=!showTokenSetInfos"><b>Akutelle Token Sets</b> ({{ aTokens[selToken].tokenSets.length }})<span :class="'glyphicon glyphicon-' + ((showTokenSetInfos)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
      <div v-if="showTokenSetInfos">
        <div v-for="aTokenSet in aTokens[selToken].tokenSets" :class="{'tokensets': true, 'selected': (selTokenSet==aTokenSet)}" v-if="aTokenSets[aTokenSet]">
          <b>ID:</b> {{ aTokenSet+((aTokenSet<0)?' (Neu)':'') }} <a href="#" v-on:click.prevent="selTokenSet=aTokenSet" v-if="selTokenSet!==aTokenSet" class="pull-right"><span class="glyphicon glyphicon-copy pull-right" aria-hidden="true"></span></a><br>
          <template v-if="aTokenSets[aTokenSet].ivt"><b>Von Token:</b> <a href="#" v-on:click.prevent="selToken=aTokenSets[aTokenSet].ivt;focusFocusCatch();" :title="'ID: '+aTokenSets[aTokenSet].ivt">{{ aTokens[aTokenSets[aTokenSet].ivt].t }}</a><br></template>
          <template v-if="aTokenSets[aTokenSet].ibt"><b>Bis Token:</b> <a href="#" v-on:click.prevent="selToken=aTokenSets[aTokenSet].ibt;focusFocusCatch();" :title="'ID: '+aTokenSets[aTokenSet].ibt">{{ aTokens[aTokenSets[aTokenSet].ibt].t }}</a><br></template>
          <b>Tokens:</b> {{ (aTokenSets[aTokenSet].t||aTokenSets[aTokenSet].tx||[]).length.toLocaleString() }} {{ ((aTokenSets[aTokenSet].t)?'(Liste)':'(Bereich)') }}<a href="#" v-on:click.prevent="aTokenSets[aTokenSet].ipshow=((aTokenSets[aTokenSet].ipshow)?false:true);reRenderSelToken();" class="pull-right"><span :class="'glyphicon glyphicon-' + ((aTokenSets[aTokenSet].ipshow)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a><br>
          <div class="listtokens mit10" v-if="aTokenSets[aTokenSet].ipshow">
            <a href="#" v-on:click.prevent="selToken=sTL;focusFocusCatch();" :class="{selected: selToken===sTL}" v-for="(sTL, i) in (aTokenSets[aTokenSet].t||aTokenSets[aTokenSet].tx)" :title="aTokens[sTL].t+' - ID: '+sTL">{{ aTokens[sTL].t }}</a>
          </div>
        </div>
      </div>
    </div> -->
    <InformationenHilfe />
    <hr>
  </div>
</template>

<script>
import InformationenTranskript from './InformationenTranskript'
import InformationenAktuellesToken from './InformationenAktuellesToken'
import InformationenHilfe from './InformationenHilfe'

export default {
  name: 'Informationen',
  props: ['transcript'],
  data () {
    return {
      showTokenSetInfo: true,
      showTokenSetInfos: true
    }
  },
  methods: {
  },
  computed: {
  },
  components: {
    InformationenTranskript,
    InformationenAktuellesToken,
    InformationenHilfe
  }
}
</script>

<style scoped>
</style>
