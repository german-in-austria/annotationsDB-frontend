<template>
  <div v-if="modalData.type">
    <Modal ref="modal" :modalData="modalData" :blocked="changed">
      <template v-slot:title>Token</template>
      <div class="form-horizontal">
        <div class="form-group">
          <label for="aTokenID" class="col-sm-3 control-label">ID</label>
          <div class="col-sm-9"><p class="form-control-static" id="aTokenID">{{ aToken.pk }}</p></div>
        </div>
        <div class="form-group">
          <label for="aTokenLikelyError" class="col-sm-3 control-label">Spuren</label>
          <div class="col-sm-9"><label class="checkbox-inline"><input type="checkbox" id="aTokenLikelyError" v-model="showAllTracks"> Alle Anzeigen</label></div>
        </div>
        <div class="form-group" v-for="(aTrack, aKey) in aShownTracks" :key="'at' + aKey">
          <label :for="'aToken-' + aKey" class="col-sm-3 control-label">{{ aTrack.title }}</label>
          <div class="col-sm-9"><input type="text" v-rt-ipa :class="'form-control' + (aKey === 0 ? ' modal-focus' : '')" :id="'aToken-' + aKey" :spellcheck="globals.spellcheck" v-model="aToken[aTrack.field[0]]"></div>
        </div>
        <div class="form-group">
          <label for="aTokenType" class="col-sm-3 control-label">token_type</label>
          <div class="col-sm-9">
            <select class="form-control" id="aTokenType" v-model="aToken.tt">
              <option v-for="(aTokenTypeVal, aTokenTypeKey) in transcript.aTokens.aTokenTypes" :value="parseInt(aTokenTypeKey)" :key="'aToTy' + aTokenTypeKey">{{ aTokenTypeVal.n }}</option>
            </select>
          </div>
        </div>
        <div :class="'form-group' + (error_stp ? ' has-error' : '')">
          <label for="aTokenStartTimepoint" class="col-sm-3 control-label">start_timepoint</label>
          <div class="col-sm-9"><input @change="updateDuration('stp')" type="text" class="form-control" id="aTokenStartTimepoint" :spellcheck="globals.spellcheck" v-model="aToken.stp"></div>
        </div>
        <div :class="'form-group' + (error_etp ? ' has-error' : '')">
          <label for="aTokenEndTimepoint" class="col-sm-3 control-label">end_timepoint</label>
          <div class="col-sm-9"><input @change="updateDuration('etp')" type="text" class="form-control" id="aTokenEndTimepoint" :spellcheck="globals.spellcheck" v-model="aToken.etp"></div>
        </div>
        <div class="form-group" v-if="aToken.iObj">
          <label for="aTokenIDInf" class="col-sm-3 control-label">ID_Inf</label>
          <div class="col-sm-9"><p class="form-control-static" id="aTokenIDInf">{{ aToken.iObj.k }} ({{ aToken.iObj.ka }} - ID: {{ aToken.i }})</p></div>
        </div>
        <div class="form-group" v-if="aToken.fo">
          <label for="aTokenfragmentof" class="col-sm-3 control-label">fragment_of</label>
          <div class="col-sm-9"><p class="form-control-static" id="aTokenfragmentof">{{ transcript.aTokens.tokensObj[aToken.fo].t }} - ID:  {{ aToken.fo }}</p></div>
        </div>
        <div class="form-group">
          <label for="aTokenReihung" class="col-sm-3 control-label">token_reihung</label>
          <div class="col-sm-9"><p class="form-control-static" id="aTokenReihung">{{ aToken.tr }}</p></div>
        </div>
        <div class="form-group" v-if="aToken.eObj">
          <label for="aTokenEventID" class="col-sm-3 control-label">event_id</label>
          <div class="col-sm-9"><p class="form-control-static" id="aTokenEventID">{{ aToken.eObj.s }} - {{ aToken.eObj.e }} - ID: {{ aToken.e }}</p></div>
        </div>
        <div class="form-group">
          <label for="aTokenLikelyError" class="col-sm-3 control-label">likely_error</label>
          <div class="col-sm-9"><label class="checkbox-inline"><input type="checkbox" id="aTokenLikelyError" value="1" v-model="aToken.le"> Ja</label></div>
        </div>
        <div class="form-group" v-if="aToken.s">
          <label for="aTokenSentenceID" class="col-sm-3 control-label">sentence_id</label>
          <div class="col-sm-9"><p class="form-control-static" id="aTokenSentenceID">{{ transcript.aSaetze[aToken.s].t }} - ID: {{ aToken.s }}</p></div>
        </div>
        <div class="form-group" v-if="aToken.sr">
          <label for="aTokenSequenceInSentence" class="col-sm-3 control-label">sequence_in_sentence</label>
          <div class="col-sm-9"><p class="form-control-static" id="aTokenSequenceInSentence">{{ aToken.sr }}</p></div>
        </div>
        <div class="form-group" v-if="transcript.aTokens.aTokenFragmenteObj[aToken.pk]"><label class="col-sm-3 control-label">Fragmente</label><div class="col-sm-9"><ul class="form-control-static hflist">
            <li v-for="aToFragKey in transcript.aTokens.aTokenFragmenteObj[aToken.pk]" :key="'aTFO' + aToFragKey">{{ transcript.aTokens.tokensObj[aToFragKey].t }} ({{ aToFragKey }})</li>
        </ul></div></div>
        <div class="form-group"><label class="col-sm-3 control-label">Antwort</label>
          <div class="col-sm-9">
            <p class="form-control-static" v-if="aToken.aId">{{ aToken.aId + (0 > aToken.aId ? ' - Neu' : '') + (aToken.delAntwort ? ' - Wird gelöscht !!!' : '') }}
              <template v-if="!(aAntwort.tags && aAntwort.tags.length > 0) && (aToken.aId !== 0)">
                <button type="button" @click="$set(aToken, 'delAntwort', true);" class="btn btn-danger" v-if="!aToken.delAntwort"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                <button type="button" @click="$set(aToken, 'delAntwort', false);" class="btn btn-danger" v-else><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
              </template>
            </p>
            <button type="button" @click="newAntwort()" class="btn btn-primary" v-else>Antwort erstellen</button>
          </div>
        </div>
      </div>
      <template v-if="satzView">
        <hr/>
        <div class="satzview">
          <span
            :class="sv.class + ' tt' + sv.token.tt"
            v-for="(sv, svKey) in satzView"
            :key="'sv' + svKey"
          >{{ transcript.aTokens.getTokenStringArray(sv.token, ['t', 'o']) }}</span>
        </div>
      </template>
      <template v-if="aToken.aId && !aToken.delAntwort">
        <hr>
        <Tagsystem :tagsData="globals.tagsData" :tags="aAntwort.tags" :http="transcript.vueObj.$http" mode="edit"/>
      </template>
      <template v-slot:addButtons>
        <button type="button" :class="'btn' + (error ? ' btn-danger' : ' btn-primary')" :disabled="!changed || error" @click="updateTokenData">Ändern</button>
      </template>
      <template v-slot:closeButtonsText>{{ ((changed) ? 'Verwerfen' : 'Schließen') }}</template>
    </Modal>
  </div>
</template>

<script>
/* global _ tagsystem */

import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'
import Modal from './Modal'
// import Tagsystem from '../tagsystem/Tagsystem'
import Globals from '@/functions/globals'
// var _ = require('lodash')

export default {
  name: 'InfoToken',
  props: ['transcript', 'modalData'],
  data () {
    return {
      globals: Globals,
      aToken: {},
      oToken: {},
      aAntwort: {},
      oAntwort: {},
      showAllTracks: false
    }
  },
  watch: {
  },
  mounted () {
    this.transcript.aTokens.tokensObj[this.modalData.data.aToken.pk].viewed = true
    this.transcript.aTokens.svgLastView = this.modalData.data.aToken.pk
    this.aToken = _.cloneDeep(this.modalData.data.aToken)
    this.transcript.allTracks.forEach(aTrack => {
      this.$set(this.aToken, aTrack.field[0], this.aToken[aTrack.field[0]] || '')
    })
    this.$set(this.aToken, 'le', this.aToken.le || false)
    this.$set(this.aToken, 'stp', this.aToken.stp || '')
    this.$set(this.aToken, 'etp', this.aToken.etp || '')
    this.oToken = _.cloneDeep(this.aToken)
    if (this.aToken.aId) {
      this.aAntwort = _.cloneDeep(this.transcript.aAntworten.antwortenObj[this.aToken.aId])
      if (!this.aAntwort.tags) {
        this.$set(this.aAntwort, 'tags', [])
      }
    }
    this.oAntwort = _.cloneDeep(this.aAntwort)
    console.log('InfoToken', this)
  },
  methods: {
    updateDuration (atp) {
      console.log(atp, this.aToken[atp])
      if (this.aToken[atp] && this.aToken[atp].length > 0) {
        let aSec = AllgemeineFunktionen.durationToSeconds(this.aToken[atp])
        if (aSec > 0) {
          this.aToken[atp] = AllgemeineFunktionen.secondsToDuration(aSec)
        } else {
          this.aToken[atp] = ''
        }
      }
    },
    newAntwort () {
      // Neue Antwort erstellen.
      this.$set(this.aToken, 'aId', '? - Neu')
      this.$set(this.aAntwort, 'tags', [])
      this.$set(this.aAntwort, 'vi', this.aToken.i)
    },
    updateTokenData () {
      // Änderungen am Token anwenden.
      this.$refs.modal.close()
      this.transcript.aTokens.updateTokenData(this.aToken, this.aAntwort)
      this.transcript.unsaved = true
    }
  },
  computed: {
    changed () {
      let aIeToken = [this.aToken.tt, this.aToken.le, this.aToken.delAntwort, this.aToken.stp, this.aToken.etp]
      let oIeToken = [this.oToken.tt, this.oToken.le, this.oToken.delAntwort, this.oToken.stp, this.oToken.etp]
      this.transcript.allTracks.forEach(aTrack => {
        aIeToken.push(this.aToken[aTrack.field[0]])
        oIeToken.push(this.oToken[aTrack.field[0]])
      })
      let ieToken = _.isEqual(aIeToken, oIeToken)
      let ieAntort = _.isEqual(this.aAntwort, this.oAntwort)
      return !(ieToken && ieAntort)
    },
    error () {
      return this.error_stp || this.error_etp
    },
    error_stp () {
      if (this.aToken.stp && this.aToken.stp.length > 0) {
        let aSec = AllgemeineFunktionen.durationToSeconds(this.aToken.stp)
        return aSec === 0 || aSec < AllgemeineFunktionen.durationToSeconds(this.aToken.eObj.s) || aSec >= AllgemeineFunktionen.durationToSeconds(this.aToken.eObj.e)
      } else {
        return this.aToken.etp && this.aToken.etp.length > 0
      }
    },
    error_etp () {
      if (this.aToken.etp && this.aToken.etp.length > 0) {
          let aSec = AllgemeineFunktionen.durationToSeconds(this.aToken.etp)
        if (aSec === 0) {
          return true
        } else {
          return aSec <= AllgemeineFunktionen.durationToSeconds(this.aToken.stp) || aSec <= AllgemeineFunktionen.durationToSeconds(this.aToken.eObj.s) || aSec > AllgemeineFunktionen.durationToSeconds(this.aToken.eObj.e)
        }
      } else {
        return (this.aToken.stp && this.aToken.stp.length > 0)
      }
    },
    aShownTracks () {
      if (!this.showAllTracks) {
        let ast = []
        this.transcript.allTracks.forEach(aTrack => {
          if (aTrack.show) {
            ast.push(aTrack)
          }
        })
        return ast
      }
      return this.transcript.allTracks
    },
    satzView () {
      // Liste der Tokens um den aktuellen Token. Für Satzvorschau.
      let aSatz = []
      let tokensBA = 20     // Anzahl der Tokens die vor und nach dem aktuellen Token angezeigt werden sollen.
      let aTLbInf = this.transcript.aTokens.tokenLists.byInf[this.aToken.i]
      // console.log(this.aToken.i, aTLbInf)
      if (aTLbInf) {
        // Position des Aktuellen Token ermitteln.
        let tLbIkey = 0
        let mLen = aTLbInf.length - 1
        aTLbInf.some((aToken, aKey) => {
          if (aToken.pk === this.aToken.pk) {
            tLbIkey = aKey
            return true
          }
        }, this)
        // Von/Bis Position des Tokenberiechs ermitteln.
        let vToken = tLbIkey - tokensBA
        let bToken = tLbIkey + tokensBA
        if (vToken < 0) {
          vToken = 0
          bToken = tokensBA * 2
        }
        if (bToken > mLen) {
          bToken = mLen
          vToken = mLen - tokensBA * 2
        }
        if (vToken < 0) {
          vToken = 0
        }
        // Tokens als Liste umsetzen und Klasse des Tokens bestimmen.
        let aClass = 'before'
        for (var i = vToken; i <= bToken; i++) {
          let fxClass = ''
          if (i === tLbIkey) {
            aClass = 'active'
            if (this.transcript.aTokens.aTokenFragmenteObj[aTLbInf[i].pk]) {
              fxClass += ' has-fragments'
            }
          } else if (aClass === 'active') {
            aClass = 'after'
          }
          if (aTLbInf[i].fo === this.aToken.pk || (aTLbInf[i].fo && aTLbInf[i].fo === this.aToken.fo) || aTLbInf[i].pk === this.aToken.fo) {
            fxClass += ' fragment'
          }
          aSatz.push({class: aClass + fxClass, token: aTLbInf[i]})
        }
      }
      return aSatz.length > 0 ? aSatz : false
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
</style>
