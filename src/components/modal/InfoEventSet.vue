<template>
  <div v-if="modalData.type">
    <Modal ref="modal" :modalData="modalData" :blocked="changed">
      <template v-slot:title>Event Set</template>
        <div class="form-horizontal">
          <div class="form-group"><label class="col-sm-3 control-label">ID</label><div class="col-sm-9"><p class="form-control-static">{{ aEventSet.id }}</p></div></div>
          <div class="form-group"><label class="col-sm-3 control-label">von Event</label><div class="col-sm-9"><p class="form-control-static">{{ aEventSet.id_von_event_id }} ({{ allEventsObj[aEventSet.id_von_event_id] ? allEventsObj[aEventSet.id_von_event_id].s : '?' }} - {{ allEventsObj[aEventSet.id_von_event_id] ? allEventsObj[aEventSet.id_von_event_id].e : '?' }})</p></div></div>
          <div class="form-group"><label class="col-sm-3 control-label">bis Event</label><div class="col-sm-9"><p class="form-control-static">{{ aEventSet.id_bis_event_id }} ({{ allEventsObj[aEventSet.id_bis_event_id] ? allEventsObj[aEventSet.id_bis_event_id].s : '?' }} - {{ allEventsObj[aEventSet.id_bis_event_id] ? allEventsObj[aEventSet.id_bis_event_id].e : '?' }})</p></div></div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Antwort</label>
            <div class="col-sm-9">
              <p class="form-control-static" v-if="aEventSet.aId">{{ aEventSet.aId+((0 > aEventSet.aId) ? ' - Neu' : '') + ((aEventSet.delAntwort) ? ' - Wird gelöscht !!!' : '') }}
                <template v-if="!(aAntwort.tags && aAntwort.tags.length > 0) && (aEventSet.aId !== 0)">
                  <button type="button" @click="$set(aEventSet, 'delAntwort', true)" class="btn btn-danger" v-if="!aEventSet.delAntwort"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                  <button type="button" @click="$set(aEventSet, 'delAntwort', false)" class="btn btn-danger" v-else><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                </template>
              </p>
              <template v-else>
                <button type="button" @click="newAntwort()" class="btn btn-primary">Antwort erstellen</button>
              </template>
            </div>
          </div>
        </div>
        <template v-if="aEventSet.aId && !aEventSet.delAntwort">
          <hr>
          <div class="form-horizontal">
            <div class="form-group">
              <label for="aInformant" class="col-sm-3 control-label">Informant</label>
              <div class="col-sm-9">
                <select class="form-control" id="aInformant" v-model="aAntwort.vi">
                  <option v-for="(aInf, iKey) in transcript.aInformanten.informantenList" :key="'i' + iKey"
                    :value="parseInt(aInf.pk)">{{ aInf.ka }}</option>
                </select>
              </div>
            </div>
          </div>
          <hr>
          <Tagsystem :tagsData="globals.tagsData" :tags="aAntwort.tags" :http="transcript.vueObj.$http" mode="edit"/>
        </template>
      <template v-slot:addButtons>
        <button type="button" @click="deleteAEventSet" class="btn btn-danger" tabindex="9999">Löschen</button>
        <button type="button" class="btn btn-primary" :disabled="!changed" @click="updateEventSetData">Ändern</button>
      </template>
      <template v-slot:closeButtonsText>{{ ((changed) ? 'Verwerfen' : 'Schließen') }}</template>
    </Modal>
  </div>
</template>

<script>
/* global _ tagsystem */
// import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'
import Modal from './Modal'
// import Tagsystem from '../tagsystem/Tagsystem'
import Globals from '@/functions/globals'
// var _ = require('lodash')

export default {
  name: 'InfoEventSet',
  props: ['transcript', 'modalData'],
  data () {
    return {
      globals: Globals,
      aEventSet: {},
      oEventSet: {},
      aAntwort: {},
      oAntwort: {}
    }
  },
  mounted () {
    this.$set(this.modalData.data.aEventSet, 'viewed', true)
    this.aEventSet = _.cloneDeep(this.modalData.data.aEventSet)
    this.oEventSet = _.cloneDeep(this.aEventSet)
    if (this.aEventSet.aId) {
      this.aAntwort = _.cloneDeep(this.transcript.aAntworten.antwortenObj[this.aEventSet.aId])
      if (!this.aAntwort.tags) {
        this.$set(this.aAntwort, 'tags', [])
      }
    }
    this.oAntwort = _.cloneDeep(this.aAntwort)
    console.log('InfoEventSet', this, this.modalData.data.aEventSet)
  },
  watch: {
  },
  methods: {
    updateEventSetData () {
      // Änderungen am EventSet anwenden.
      this.$refs.modal.close()
      this.transcript.aEventSets.updateEventSetData(this.aEventSet, this.aAntwort)
      this.transcript.unsaved = true
    },
    deleteAEventSet () {
      console.log('deleteAEventSet')
      if (this.transcript.aEventSets.deleteAEventSet(this.aEventSet)) {
        this.transcript.unsaved = true
        this.$refs.modal.close()
      }
    },
    newAntwort () {
      // Neue Antwort erstellen.
      this.$set(this.aEventSet, 'aId', '? - Neu')
      this.$set(this.aAntwort, 'tags', [])
      this.$set(this.aAntwort, 'vi', this.transcript.aInformanten.informantenList[0].pk)
      console.log(this.aAntwort)
    }
  },
  computed: {
    allEventsObj () {
      return this.transcript.aEvents.eventsObj
    },
    changed () {
      let ieEvent = _.isEqual(
        [this.aEventSet.delAntwort, this.aEventSet.aId],
        [this.oEventSet.delAntwort, this.oEventSet.aId]
      )
      let ieAntwort = _.isEqual(this.aAntwort, this.oAntwort)
      return !(ieEvent && ieAntwort)
    },
    satzView () {
      return null
    }
  },
  components: {
    Modal,
    Tagsystem: tagsystem.TagsystemVue
  }
}
</script>

<style scoped>
  .satzview {
    padding-left: 50px;
    padding-right: 50px;
  }
  .satzview > span {
    display: inline-block;
    cursor: pointer;
  }
  .satzview > span:hover {
    text-decoration: underline;
  }

  .satzview > span.active, .satzview > span.fragment {
    font-weight: bold;
  }
  .satzview > span.before, .satzview > span.after {
    color: #888;
  }
  .satzview > span.tt3 {
    font-style: italic;
  }
  .satzview > span.ellipsis{
    padding: 0 1rem;
    margin: 0 0.75rem;
    background: #ddd;
    color: #666;
    border-radius: 1rem;
    cursor: default;
    text-decoration: none!important;
  }
</style>
