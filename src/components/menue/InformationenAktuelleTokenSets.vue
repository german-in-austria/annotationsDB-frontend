<template>
  <div class="tokensets">
    <div :class="{'infpanel': true, 'open': showTokenSetInfo}" v-if="selTokenSet">
      <a href="#" v-on:click.prevent="showTokenSetInfo = !showTokenSetInfo"><b>Akutelles Token Set</b> (ID: {{ selTokenSet.pk + ((0 > selTokenSet.pk) ? ' (Neu)' : '') }})<span :class="'glyphicon glyphicon-' + ((showTokenSetInfo)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
      <div v-if="showTokenSetInfo">
        <div class="tokensets">
          <template v-if="selTokenSet.ivt">
            <b>Von Token:</b> <a href="#" v-on:click.prevent="selectToken(selTokenSet.ivt)" :title="'ID: ' + selTokenSet.ivt">{{ allTokensObj[selTokenSet.ivt].t }}</a>
            <!-- <a href="#" v-on:click.prevent="setATokenSetBereich(selTokenSet, selToken, 'ivt')" class="pull-right" title="Ersetzen durch ausgewähltes Token."
              v-if="selToken && getValOfSubProp(aTokens[selToken], 'i') === allTokensObj[selTokenSet.ivt].i && aTokenReihung.indexOf(selTokenSet.ibt) > aTokenReihung.indexOf(selToken)"
            ><span class="glyphicon glyphicon-screenshot pull-right" aria-hidden="true"></span></a> -->
            <br>
          </template>
          <template v-if="selTokenSet.ibt">
            <b>Bis Token:</b> <a href="#" v-on:click.prevent="selectToken(selTokenSet.ibt)" :title="'ID: ' + selTokenSet.ibt">{{ allTokensObj[selTokenSet.ibt].t }}</a>
            <!-- <a href="#" v-on:click.prevent="setATokenSetBereich(selTokenSet,selToken,'ibt')" class="pull-right" title="Ersetzen durch ausgewähltes Token."
              v-if="selToken && getValOfSubProp(aTokens[selToken], 'i') === aTokens[selTokenSet.ibt].i && aTokenReihung.indexOf(selTokenSet.ivt) < aTokenReihung.indexOf(selToken)"
            ><span class="glyphicon glyphicon-screenshot pull-right" aria-hidden="true"></span></a> -->
            <br>
          </template>
          <b>Tokens:</b> {{ (selTokenSet.t||selTokenSet.tx||[]).length.toLocaleString() }} {{ ((selTokenSet.t) ? '(Liste)' : '(Bereich)') }}
            <a href="#" v-on:click.prevent="ipShow2(selTokenSet.pk)" class="pull-right"><span :class="'glyphicon glyphicon-' + ((showTokensList2[selTokenSet.pk]) ? 'eye-open' : 'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
            <!-- <a href="#" v-on:click.prevent="selTokenSet.ipshow2=((selTokenSet.ipshow2 || (selTokenSet.ipshow2===undefined&&(selTokenSet.t||selTokenSet.tx||[]).length<=selTokenSetSTMax))?false:true);reRenderSelToken();" class="pull-right"><span :class="'glyphicon glyphicon-' + ((selTokenSet.ipshow2 || (selTokenSet.ipshow2===undefined&&(selTokenSet.t||selTokenSet.tx||[]).length<=selTokenSetSTMax))?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a> -->
            <!-- <a href="#" v-on:click.prevent="showaTokenSetInfos(selTokenSet, true);" class="pull-right mir5"><span class="glyphicon glyphicon-pencil pull-right" aria-hidden="true"></span></a>
            <a href="#" v-on:click.prevent="toggleATokenSetListe(selTokenSet,selToken)" class="pull-right mir5" title="Token hinzufügen/entfernen" v-if="selTokenSet.t && selToken && getValOfSubProp(aTokens[selToken], 'i') === aTokens[selTokenSet.t[0]].i && aTokenReihung.indexOf(selTokenSet.ivt) < aTokenReihung.indexOf(selToken)"><span :class="'glyphicon glyphicon-'+((selTokenSet.t.indexOf(selToken)<0)?'plus':'minus')+' pull-right'" aria-hidden="true"></span></a> -->
          <br>
          <div class="listtokens mit10" v-if="showTokensList2[selTokenSet.pk]">
            <a href="#"
              v-on:click.prevent="selectToken(sTL.pk)"
              :class="{selected: selToken === sTL}"
              :title="sTL.t + ' - ID: ' + sTL.pk"
              v-for="(sTL, i) in (selTokenSet.tObj || selTokenSet.tx)"
              :key="'tl' + i"
            >{{ sTL.t }}</a>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'infpanel': true, 'open': showTokenSetInfos}" v-if="selToken && selToken.tokenSetsList">
      <a href="#" v-on:click.prevent="showTokenSetInfos=!showTokenSetInfos"><b>Akutelle Token Sets</b> ({{ selToken.tokenSetsList.length }})<span :class="'glyphicon glyphicon-' + ((showTokenSetInfos)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
      <div v-if="showTokenSetInfos">
        <div
          :class="{'tokensets': true, 'selected': (selTokenSet === aTokenSet)}"
          v-for="aTokenSet in selToken.tokenSetsList"
          :key="'tsi' + aTokenSet.pk"
        >
          <b>ID:</b> {{ aTokenSet.pk + ((0 > aTokenSet.p) ? ' (Neu)' : '') }} <a href="#" v-on:click.prevent="selTokenSet = aTokenSet" v-if="selTokenSet !== aTokenSet" class="pull-right"><span class="glyphicon glyphicon-copy pull-right" aria-hidden="true"></span></a><br>
          <template v-if="aTokenSet.ivt">
            <b>Von Token:</b> <a href="#" v-on:click.prevent="selectToken(aTokenSet.ivt)" :title="'ID: ' + aTokenSet.ivt">{{ allTokensObj[aTokenSet.ivt].t }}</a><br>
          </template>
          <template v-if="aTokenSet.ibt">
            <b>Bis Token:</b> <a href="#" v-on:click.prevent="selectToken(aTokenSet.ibt)" :title="'ID: ' + aTokenSet.ibt">{{ allTokensObj[aTokenSet.ibt].t }}</a><br>
          </template>
          <b>Tokens:</b> {{ (aTokenSet.t || aTokenSet.tx || []).length.toLocaleString() }} {{ ((aTokenSet.t) ? '(Liste)' : '(Bereich)') }}
            <a href="#" v-on:click.prevent="ipShow(aTokenSet.pk)" class="pull-right"><span :class="'glyphicon glyphicon-' + ((showTokensList[aTokenSet.pk]) ? 'eye-open' : 'eye-close') + ' pull-right'" aria-hidden="true"></span></a><br>
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
      showTokensList: {},
      showTokensList2: {}
    }
  },
  mounted () {
    // console.log(this.transcript)
    // console.log(this.selToken.tokenSetsList)
    // console.log(this.selToken, this.selToken.tokenSetsList)
  },
  methods: {
    setATokenSetBereich (aTokenSetId, aTokenId, feld, direkt = false) {
      // ToDo: TokenSet Bereich neu setzen
      console.log('setATokenSetBereich', aTokenSetId, aTokenId, feld, direkt)
    },
    selectToken (sTok) {
      this.transcript.selectedToken = this.allTokensObj[sTok]
      // ToDo: focusFocusCatch()
    },
    ipShow (aTsPk) {
      this.$set(this.showTokensList, aTsPk, !this.showTokensList[aTsPk])
      // ToDo: reRenderSelToken() ?
    },
    ipShow2 (aTsPk) {
      this.$set(this.showTokensList2, aTsPk, !this.showTokensList2[aTsPk])
      // ToDo: reRenderSelToken() ?
    }
  },
  computed: {
    selToken () {
      return this.transcript.selectedToken
    },
    selTokenSet () {
      return this.transcript.selectedTokenSet
    },
    allTokensObj () {
      return this.transcript.aTokens.tokensObj
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
