<template>
  <div class="auswahl">
    <div class="infpanel open selpanel" v-if="transcript.selectedTokenBereich.v && transcript.selectedTokenBereich.b">
      <span><b>Auswahl Bereich:</b> {{ transcript.aSVG.selectedTokenList.length }} Token{{ ((transcript.aSVG.selectedTokenList.length !== 1) ? 's' : '') }}<button @click="transcript.selectedTokenBereich={'v': null, 'b': null}; focusFocusCatch();" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ transcript.selectedTokenBereich.v.iObj.k }}<br>
        <b>Von Token:</b> <a href="#" v-on:click.prevent="transcript.selectedToken=vSelectedTokenBereich; focusFocusCatch();" :title="'ID: ' + vSelectedTokenBereich.pk">{{ vSelectedTokenBereich.t }}</a><br>
        <b>Bis Token:</b> <a href="#" v-on:click.prevent="transcript.selectedToken=bSelectedTokenBereich; focusFocusCatch();" :title="'ID: ' + bSelectedTokenBereich.pk">{{ bSelectedTokenBereich.t }}</a><br>
        <button @click="sel2TokenSet()" class="lmfabc text-center">Auswahl in Token Set umwandeln</button>
      </div>
    </div>
    <div :class="{'infpanel': true, 'open': true, 'selpanel': true}" v-if="transcript.selectedTokenListe && transcript.selectedTokenListe.length > 0">
      <span><b>Auswahl Liste:</b> {{ transcript.aSVG.selectedTokenList.length }} Token{{ ((transcript.selectedTokenListe.length !== 1) ? 's' : '') }}<button @click="transcript.selectedTokenListe=[]; transcript.aSVG.selectedTokenList=[]; focusFocusCatch();" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ transcript.selectedTokenListe[0].iObj.k }}<br>
        <button @click="sel2TokenSet()" class="lmfabc text-center">Auswahl in Token Set umwandeln</button>
        <div class="listtokens mit10">
          <a href="#"
            v-on:click.prevent="transcript.selectedToken=sTL; focusFocusCatch();"
            :class="{selected: transcript.selectedToken === sTL}"
            :title="sTL.t + ' - ID: ' + sTL.pk"
            v-for="(sTL, i) in transcript.selectedTokenListe"
            :key="'aispT' + i"
          >{{ sTL.t || sTL.o }}</a>
        </div>
      </div>
    </div>
    <div class="infpanel open selpanel" v-if="transcript.selectedEventBereich.v && transcript.selectedEventBereich.b">
      <span><b>Auswahl Bereich:</b> {{ transcript.aSVG.selectedEventList.length }} Event{{ ((transcript.aSVG.selectedEventList.length !== 1) ? 's' : '') }}<button @click="transcript.selectedEventBereich={'v': null, 'b': null}; focusFocusCatch();" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Von Event:</b> <a href="#" v-on:click.prevent="transcript.selectedEvent=vSelectedEventBereich; focusFocusCatch();" :title="'ID: ' + vSelectedEventBereich.pk">{{ vSelectedEventBereich.s }}</a><br>
        <b>Bis Event:</b> <a href="#" v-on:click.prevent="transcript.selectedEvent=bSelectedEventBereich; focusFocusCatch();" :title="'ID: ' + bSelectedEventBereich.pk">{{ bSelectedEventBereich.e }}</a><br>
        <button @click="sel2EventSet()" class="lmfabc text-center">Auswahl in Event Set umwandeln</button>
      </div>
    </div>
    <!-- <div :class="{'infpanel': true, 'open': true, 'selpanel': true}" v-if="transcript.selectedEventListe && transcript.selectedEventListe.length > 0">
      <span><b>Auswahl Liste:</b> {{ transcript.aSVG.selectedEventList.length }} Event{{ ((transcript.selectedEventListe.length !== 1) ? 's' : '') }}<button @click="transcript.selectedEventListe=[]; transcript.aSVG.selectedEventList=[]; focusFocusCatch();" class="close"><span aria-hidden="true">×</span></button></span>
      <div>
        <b>Informant:</b> {{ transcript.selectedEventListe[0].iObj.k }}<br>
        <button @click="sel2EventSet()" class="lmfabc text-center">Auswahl in Event Set umwandeln</button>
        <div class="listtokens mit10">
          <a href="#"
            v-on:click.prevent="transcript.selectedEvent=sTL; focusFocusCatch();"
            :class="{selected: transcript.selectedEvent === sTL}"
            :title="sTL.t + ' - ID: ' + sTL.pk"
            v-for="(sTL, i) in transcript.selectedEventListe"
            :key="'aispT' + i"
          >{{ sTL.t || sTL.o }}</a>
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
    },
    sel2TokenSet () {
      if (this.transcript.selectedTokenListe && this.transcript.selectedTokenListe.length > 0) {
        let selectedTokenPkListe = this.transcript.selectedTokenListe.map(stl => stl.pk)
        this.transcript.aTokenSets.add('new', { t: selectedTokenPkListe }, false, true)
        console.log('sel2TokenSet - Liste', selectedTokenPkListe)
        this.transcript.selectedTokenListe = []
        this.transcript.aSVG.updateZeilen()
        this.transcript.unsaved = true
      } else if (this.transcript.selectedTokenBereich.v && this.transcript.selectedTokenBereich.b) {
        this.transcript.aTokenSets.add('new', { ivt: this.vSelectedTokenBereich.pk, ibt: this.bSelectedTokenBereich.pk }, false, true)
        console.log('sel2TokenSet - Bereich', this.vSelectedTokenBereich.pk, this.bSelectedTokenBereich.pk, this.transcript.aSVG.selectedTokenList, this.transcript.aTokenSets)
        this.transcript.selectedTokenBereich = {'v': null, 'b': null}
        this.transcript.aSVG.updateZeilen()
        this.transcript.unsaved = true
      } else {
        alert('Fehler! - Konnte kein TokenSet erstellen!')
      }
    },
    sel2EventSet () {
      if (this.transcript.selectedEventBereich.v && this.transcript.selectedEventBereich.b) {
        this.transcript.aEventSets.add('new', { id_von_event_id: this.vSelectedEventBereich.pk, id_bis_event_id: this.bSelectedEventBereich.pk }, false, true)
        console.log('sel2EventSet - Bereich', this.vSelectedEventBereich.pk, this.bSelectedEventBereich.pk, this.transcript.aSVG.selectedEventList, this.transcript.aEventSets)
        this.transcript.selectedEventBereich = {'v': null, 'b': null}
        this.transcript.selectedEvent = null
        this.transcript.aSVG.updateZeilen()
        this.transcript.unsaved = true
      } else {
        alert('Fehler! - Konnte kein EventSet erstellen!')
      }
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
    },
    vSelectedEventBereich () {
      if (this.transcript.selectedEventBereich.v && this.transcript.aSVG.selectedEventList.length > 0) {
        return this.transcript.aSVG.selectedEventList[0]
      }
      return null
    },
    bSelectedEventBereich () {
      if (this.transcript.selectedEventBereich.b && this.transcript.aSVG.selectedEventList.length > 0) {
        return this.transcript.aSVG.selectedEventList[this.transcript.aSVG.selectedEventList.length - 1]
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
