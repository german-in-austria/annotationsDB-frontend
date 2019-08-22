<template>
  <div class="tokensets">
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
    <div :class="{'infpanel': true, 'open': showTokenSetInfos}" v-if="selToken && selToken.tokenSetsList">
      <a href="#" v-on:click.prevent="showTokenSetInfos=!showTokenSetInfos"><b>Akutelle Token Sets</b> ({{ selToken.tokenSetsList.length }})<span :class="'glyphicon glyphicon-' + ((showTokenSetInfos)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
      <div v-if="showTokenSetInfos">
        <div
          :class="{'tokensets': true, 'selected': (selTokenSet == aTokenSet)}"
          v-for="aTokenSet in selToken.tokenSetsList"
          :key="'tsi' + aTokenSet.pk"
        >
          <b>ID:</b> {{ aTokenSet.pk + ((0 > aTokenSet.p) ? ' (Neu)' : '') }} <a href="#" v-on:click.prevent="selTokenSet = aTokenSet" v-if="selTokenSet !== aTokenSet" class="pull-right"><span class="glyphicon glyphicon-copy pull-right" aria-hidden="true"></span></a><br>
          <template v-if="aTokenSet.ivt"><b>Von Token:</b> <a href="#" v-on:click.prevent="selectToken(aTokenSet.ivt)" :title="'ID: ' + aTokenSet.ivt">{{ transcript.aTokens.tokensObj[aTokenSet.ivt].t }}</a><br></template>
          <template v-if="aTokenSet.ibt"><b>Bis Token:</b> <a href="#" v-on:click.prevent="selectToken(aTokenSet.ibt)" :title="'ID: ' + aTokenSet.ibt">{{ transcript.aTokens.tokensObj[aTokenSet.ibt].t }}</a><br></template>
          <b>Tokens:</b> {{ (aTokenSet.t || aTokenSet.tx || []).length.toLocaleString() }} {{ ((aTokenSet.t) ? '(Liste)' : '(Bereich)') }}<a href="#" v-on:click.prevent="ipShow(aTokenSet.pk)" class="pull-right"><span :class="'glyphicon glyphicon-' + ((showTokensList[aTokenSet.pk]) ? 'eye-open' : 'eye-close') + ' pull-right'" aria-hidden="true"></span></a><br>
          <div class="listtokens mit10" v-if="showTokensList[aTokenSet.pk]">
            <a href="#"
              v-on:click.prevent="selectToken(sTL.pk)"
              :class="{selected: selToken === sTL}"
              :title="sTL.t + ' - ID: ' + sTL.pk"
              v-for="(sTL, i) in (aTokenSet.tObj || aTokenSet.tx)"
              :key="'tl' + i"
            >{{ sTL.t }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationenAktuelleTokenSets',
  props: ['transcript'],
  data () {
    return {
      showTokenSetInfo: true,
      showTokenSetInfos: true,
      showTokensList: {}
    }
  },
  mounted () {
    // console.log(this.transcript)
    // console.log(this.selToken.tokenSetsList)
  },
  methods: {
    selectToken (sTok) {
      this.transcript.selectedToken = this.transcript.aTokens.tokensObj[sTok]
      // ToDo: focusFocusCatch()
    },
    ipShow (aTsPk) {
      this.$set(this.showTokensList, aTsPk, !this.showTokensList[aTsPk])
      // ToDo: reRenderSelToken() ?
    }
  },
  computed: {
    selToken () {
      return this.transcript.selectedToken
    },
    selTokenSet () {
      // Todo ...
      return null
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
