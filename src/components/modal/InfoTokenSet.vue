<template>
  <div v-if="modalData.type">
    <Modal ref="modal" :modalData="modalData" :blocked="changed">
      <template v-slot:title>Token Set</template>
        <div class="form-horizontal">
          <div class="form-group"><label class="col-sm-3 control-label">ID</label><div class="col-sm-9"><p class="form-control-static">{{ aTokenSet.pk }}</p></div></div>
          <div class="form-group" v-if="aTokenSet.ivt"><label class="col-sm-3 control-label">von Token</label><div class="col-sm-9"><p class="form-control-static">{{ aTokenSet.ivt }}</p></div></div>
          <div class="form-group" v-if="aTokenSet.ibt"><label class="col-sm-3 control-label">bis Token</label><div class="col-sm-9"><p class="form-control-static">{{ aTokenSet.ibt }}</p></div></div>
          <div class="form-group" v-if="aTokenSet.t"><label class="col-sm-3 control-label">Token to Set</label>
            <div class="col-sm-9">
              <div class="form-control-static listtokens">
                <a href="#"
                  v-on:click.prevent="" :class="{selected: selToken===aToken}"
                  v-for="(aToken, i) in aTokenSet.tObj" :title="aToken.t + ' - ID: ' + aToken.pk"
                  :key="'aToken' + i"
                >{{ aToken.t }}</a>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Antwort</label>
            <div class="col-sm-9">
              <p class="form-control-static" v-if="aTokenSet.aId">{{ aTokenSet.aId+((0 > aTokenSet.aId) ? ' - Neu' : '') + ((aTokenSet.delAntwort) ? ' - Wird gelöscht !!!' : '') }}
                <template v-if="!(aAntwort.tags && aAntwort.tags.length > 0) && (aTokenSet.aId !== 0)">
                  <button type="button" @click="$set(aTokenSet, 'delAntwort', true)" class="btn btn-danger" v-if="!aTokenSet.delAntwort"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                  <button type="button" @click="$set(aTokenSet, 'delAntwort', false)" class="btn btn-danger" v-else><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                </template>
                <button type="button" @click="selectAntwort" :class="'btn ' + (transcript.aAntworten.moveAntwortId === aAntwort.pk ? ' btn-success' : ' btn-primary')" style="margin-left: 10px;" title="Ausschneiden" v-if="aTokenSet.aId > 0 && !aTokenSet.delAntwort" :disabled="error"><span class="glyphicon glyphicon-copy" aria-hidden="true"></span></button>
              </p>
              <template v-else>
                <button type="button" @click="newAntwort()" class="btn btn-primary">Antwort erstellen</button>
                <button type="button" @click="moveAntwort()" class="btn btn-primary" v-if="transcript.aAntworten.moveAntwortId > 0">Antwort "{{ transcript.aAntworten.moveAntwortId }}" verschieben</button>
              </template>
            </div>
          </div>
        </div>
        <template v-if="satzView">
          <hr/>
          <div class="satzview">
            <span
              :class="sv.class + (sv.ellipsis ? '' : ' tt' + sv.token.tt)"
              v-for="(sv, svKey) in satzView"
              :key="'sv' + svKey"
              :title="sv.ellipsis ? sv.ellipsis.toLocaleString() + ' Tokens ausgeblendet!' : ''"
            >{{ sv.ellipsis ? '...' : transcript.aTokens.getTokenStringArray(sv.token, ['t', 'o']) }}</span>
          </div>
        </template>
        <template v-if="aTokenSet.aId && !aTokenSet.delAntwort">
          <hr>
          <Tagsystem :tagsData="globals.tagsData" :tags="aAntwort.tags" :http="transcript.vueObj.$http" mode="edit"/>
        </template>
      <template v-slot:addButtons>
        <button type="button" @click="deleteATokenSet" class="btn btn-danger" tabindex="9999">Löschen</button>
        <button type="button" class="btn btn-primary" :disabled="!changed" @click="updateTokenSetData">Ändern</button>
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
  name: 'InfoTokenSet',
  props: ['transcript', 'modalData'],
  data () {
    return {
      globals: Globals,
      aTokenSet: {},
      oTokenSet: {},
      aAntwort: {},
      oAntwort: {}
    }
  },
  mounted () {
    this.$set(this.modalData.data.aTokenSet, 'viewed', true)
    this.aTokenSet = _.cloneDeep(this.modalData.data.aTokenSet)
    this.oTokenSet = _.cloneDeep(this.aTokenSet)
    if (this.aTokenSet.aId) {
      this.aAntwort = _.cloneDeep(this.transcript.aAntworten.antwortenObj[this.aTokenSet.aId])
      if (!this.aAntwort.tags) {
        this.$set(this.aAntwort, 'tags', [])
      }
    }
    this.oAntwort = _.cloneDeep(this.aAntwort)
    console.log('InfoTokenSet', this, this.modalData.data.aTokenSet)
  },
  watch: {
  },
  methods: {
    updateTokenSetData () {
      // Änderungen am TokenSet anwenden.
      this.$refs.modal.close()
      this.transcript.aTokenSets.updateTokenSetData(this.aTokenSet, this.aAntwort)
      this.transcript.unsaved = true
    },
    deleteATokenSet () {
      console.log('deleteATokenSet')
      if (this.transcript.aTokenSets.deleteATokenSet(this.aTokenSet)) {
        this.transcript.unsaved = true
        this.$refs.modal.close()
      }
    },
    newAntwort () {
      // Neue Antwort erstellen.
      this.$set(this.aTokenSet, 'aId', '? - Neu')
      this.$set(this.aAntwort, 'tags', [])
      let aTokensInTokenSet = this.aTokenSet.tObj || this.aTokenSet.tx
      this.$set(this.aAntwort, 'vi', aTokensInTokenSet && aTokensInTokenSet[0] ? aTokensInTokenSet[0].i : this.allTokensObj[this.aTokenSet.ivt].i)
      console.log(this.aAntwort)
    },
    moveAntwort () {
      if (this.transcript.aAntworten.moveAntwortId > 0) {
        this.aAntwort = _.cloneDeep(this.transcript.aAntworten.antwortenObj[this.transcript.aAntworten.moveAntwortId])
        if (!this.aAntwort.tags) {
          this.$set(this.aAntwort, 'tags', [])
        }
        this.$set(this.aTokenSet, 'aId', this.transcript.aAntworten.moveAntwortId)
        let aTokensInTokenSet = this.aTokenSet.tObj || this.aTokenSet.tx
        this.$set(this.aAntwort, 'vi', aTokensInTokenSet && aTokensInTokenSet[0] ? aTokensInTokenSet[0].i : this.allTokensObj[this.aTokenSet.ivt].i)
        console.log('moveAntwort', this.transcript.aAntworten.antwortenObj[this.transcript.aAntworten.moveAntwortId], this.aAntwort)
      }
    },
    selectAntwort () {
      console.log(this.transcript.aAntworten.moveAntwortId)
      if (this.transcript.aAntworten.moveAntwortId === this.aAntwort.pk) {
        this.$set(this.transcript.aAntworten, 'moveAntwortId', null)
      } else {
        this.$set(this.transcript.aAntworten, 'moveAntwortId', this.aAntwort.pk)
      }
    }
  },
  computed: {
    allTokensObj () {
      return this.transcript.aTokens.tokensObj
    },
    changed () {
      let ieToken = _.isEqual(
        [this.aTokenSet.delAntwort, this.aTokenSet.aId],
        [this.oTokenSet.delAntwort, this.oTokenSet.aId]
      )
      let ieAntwort = _.isEqual(this.aAntwort, this.oAntwort)
      return !(ieToken && ieAntwort)
    },
    satzView () {
      // Liste der Tokens um das aktuelle TokenSet. Für Satzvorschau.
      let t0 = performance.now()
      let aSatz = []
      let tokensBA = 10     // Anzahl der Tokens die vor und nach dem aktuellen TokenSet angezeigt werden sollen.
      let tokensMax = 100    // Maximale Tokens am Anfang und Ende.
      let aTokensInTokenSet = this.aTokenSet.tObj || this.aTokenSet.tx
      if (aTokensInTokenSet) {
        let aTLbInf = this.transcript.aTokens.tokenLists.byInf[aTokensInTokenSet[0].i]
        // console.log(this.aToken.i, aTLbInf)
        if (aTLbInf) {
          // Position des Aktuellen Token ermitteln.
          let tLbIkey = 0
          let tLbIkey2 = 0
          let mLen = aTLbInf.length - 1
          aTLbInf.some((aToken, aKey) => {
            if (aToken.pk === aTokensInTokenSet[0].pk) {
              tLbIkey = aKey
            } else if (aToken.pk === aTokensInTokenSet[aTokensInTokenSet.length - 1].pk) {
              tLbIkey2 = aKey
            }
          }, this)
          // Von/Bis Position des Tokenberiechs ermitteln.
          let vToken = tLbIkey - tokensBA
          let bToken = tLbIkey2 + tokensBA
          // console.log(vToken, bToken)
          if (vToken < 0) {
            vToken = 0
            bToken = tLbIkey2 + tokensBA * 2
          }
          if (bToken > mLen) {
            bToken = mLen
            vToken = tLbIkey - tokensBA * 2
          }
          if (vToken < 0) {
            vToken = 0
          }
          console.log('sv', vToken, bToken, bToken - vToken)
          // Tokens als Liste umsetzen und Klasse des Tokens bestimmen.
          let tokenLen = bToken - vToken
          let aClass = 'before'
          for (var i = vToken; i <= bToken; i++) {
            let tp = i - vToken
            if (tp <= tokensMax || tp >= tokenLen - tokensMax) {
              let fxClass = ''
              if (AllgemeineFunktionen.getFirstObjectOfValueInPropertyOfArray(aTokensInTokenSet, 'pk', aTLbInf[i].pk)) {
                aClass = 'active'
                if (this.transcript.aTokens.aTokenFragmenteObj[aTLbInf[i].pk]) {
                  fxClass += ' has-fragments'
                }
              } else if (aClass === 'active') {
                aClass = 'after'
              }
              aSatz.push({class: aClass + fxClass, token: aTLbInf[i]})
            } else if (tp === tokensMax + 1) {
              aSatz.push({class: 'ellipsis', ellipsis: tokenLen - tokensMax * 2})
            }
          }
        }
      }
      console.log('satzView', parseInt(performance.now() - t0), 'ms')
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
