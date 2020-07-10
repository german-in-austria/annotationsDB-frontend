<template>
  <div class="eventsets">
    <div :class="{'infpanel': true, 'open': showEventSetInfo}" v-if="selEventSet">
      <a href="#" class="mw-20" v-on:click.prevent="showEventSetInfo = !showEventSetInfo">
        <span class="mw-20-el" :title="'Aktuelles Event Set ID: ' + selEventSet.id + ((0 > selEventSet.id) ? ' (Neu)' : '')"><b>Aktuelles Event Set</b> (ID: {{ selEventSet.id + ((0 > selEventSet.id) ? ' (Neu)' : '') }})</span>
        <span :class="'mw-20-icon glyphicon glyphicon-' + ((showEventSetInfo) ? 'eye-open' : 'eye-close') + ' pull-right'" aria-hidden="true"></span>
      </a>
      <div v-if="showEventSetInfo">
        <div class="eventsets">
          <b>Von Event:</b> <a href="#" v-on:click.prevent="selectEvent(selEventSet.id_von_event_id)" :title="'ID: ' + selEventSet.id_von_event_id">{{ allEventsObj[selEventSet.id_von_event_id].s }}</a>
          <a href="#" v-on:click.prevent="setAEventSetBereich(selEventSet, selEvent, 'id_von_event_id')" class="pull-right" title="Ersetzen durch ausgewähltes Event."
            v-if="selEvent && selEventSet.id_von_event_id !== selEvent.id"
          ><span class="glyphicon glyphicon-screenshot pull-right" aria-hidden="true"></span></a>
          <br>
          <b>Bis Event:</b> <a href="#" v-on:click.prevent="selectEvent(selEventSet.id_bis_event_id)" :title="'ID: ' + selEventSet.id_bis_event_id">{{ allEventsObj[selEventSet.id_bis_event_id].s }}</a>
          <a href="#" v-on:click.prevent="setAEventSetBereich(selEventSet, selEvent, 'id_bis_event_id')" class="pull-right" title="Ersetzen durch ausgewähltes Event."
            v-if="selEvent && selEventSet.id_bis_event_id !== selEvent.id"
          ><span class="glyphicon glyphicon-screenshot pull-right" aria-hidden="true"></span></a>
          <br>
          <b>Events:</b> {{ (selEventSet.ex||[]).length.toLocaleString() }} (Bereich)
            <a href="#" v-on:click.prevent="ipShow(selEventSet.id)" class="pull-right"><span :class="'glyphicon glyphicon-' + ((showEventsList[selEventSet.id]) ? 'eye-open' : 'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
            <a href="#" v-on:click.prevent="showaEventSetInfos()" class="pull-right mir5"><span class="glyphicon glyphicon-pencil pull-right" aria-hidden="true"></span></a>
          <br>
          <div class="listevents mit10" v-if="showEventsList[selEventSet.id]">
            <a href="#"
              v-on:click.prevent="selectEvent(sTL.pk)"
              :class="{selected: selEvent === sTL}"
              :title="sTL.t + ' - ID: ' + sTL.pk"
              v-for="(sTL, i) in selEventSet.ex"
              :key="'tl' + i"
            >{{ sTL.s }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global _ */

export default {
  name: 'InformationenAktuelleEventSets',
  props: ['transcript'],
  data () {
    return {
      showEventSetInfo: true,
      showEventSetInfos: true,
      showEventsList: {}
    }
  },
  mounted () {
    // console.log(this.transcript)
    // console.log(this.selEvent.eventSetsList)
    // console.log(this.selEvent, this.selEvent.eventSetsList)
  },
  methods: {
    showaEventSetInfos () {
      this.transcript.vueObj.modalData = { type: 'eventSet', data: {aEventSet: _.cloneDeep(this.selEventSet)} }
    },
    setAEventSetBereich (aEventSetId, aEventId, feld, direkt = false) {
      // ToDo: EventSet Bereich neu setzen
      console.log('setAEventSetBereich', aEventSetId, aEventId, feld, direkt)
      aEventSetId[feld] = aEventId.pk
      aEventSetId.changed = true
      aEventSetId.ok = false
      this.transcript.aEventSets.update()
      this.transcript.aEventSets.update()
      this.transcript.aSVG.updateZeilen()
      this.transcript.unsaved = true
      this.focusFocusCatch()
    },
    selectEvent (sEve) {
      this.transcript.selectedEvent = this.allEventsObj[sEve]
      this.transcript.selectedEventBereich = {'v': null, 'b': null}
      this.focusFocusCatch()
    },
    ipShow (aTsPk) {
      this.$set(this.showEventsList, aTsPk, !this.showEventsList[aTsPk])
      // ToDo: reRenderSelEvent() ?
    },
    focusFocusCatch () {
      this.$root.$children[0].$refs.annotationstool.$refs.hauptfenster.setFocus()
    }
  },
  computed: {
    selEvent () {
      return this.transcript.selectedEvent
    },
    selEventSet () {
      return this.transcript.selectedEventSet
    },
    allEventsObj () {
      return this.transcript.aEvents.eventsObj
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
