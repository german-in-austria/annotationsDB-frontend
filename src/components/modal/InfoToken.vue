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
            <label for="aTokenText" class="col-sm-3 control-label">text</label>
            <div class="col-sm-9"><input type="text" class="form-control modal-focus" id="aTokenText" :spellcheck="globals.spellcheck" v-model="aToken.t"></div>
          </div>
          <div class="form-group">
            <label for="aTokenType" class="col-sm-3 control-label">token_type</label>
            <div class="col-sm-9">
              <select class="form-control" id="aTokenType" v-model="aToken.tt">
                <option v-for="(aTokenTypeVal, aTokenTypeKey) in transcript.aTokens.aTokenTypes" :value="parseInt(aTokenTypeKey)" :key="'aToTy' + aTokenTypeKey">{{ aTokenTypeVal.n }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="aTokenOrtho" class="col-sm-3 control-label">ortho</label>
            <div class="col-sm-9"><input type="text" class="form-control" id="aTokenOrtho" :spellcheck="globals.spellcheck" v-model="aToken.o"></div>
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
          <div class="form-group">
            <label for="aTokenTextInOrtho" class="col-sm-3 control-label">text_in_ortho</label>
            <div class="col-sm-9"><input type="text" class="form-control" id="aTokenTextInOrtho" :spellcheck="globals.spellcheck" v-model="aToken.to"></div>
          </div>
          <div class="form-group" v-if="transcript.aTokens.aTokenFragmenteObj[aToken.pk]"><label class="col-sm-3 control-label">Fragmente</label><div class="col-sm-9"><ul class="form-control-static hflist">
              <li v-for="aToFragKey in transcript.aTokens.aTokenFragmenteObj[aToken.pk]" :key="'aTFO' + aToFragKey">{{ transcript.aTokens.tokensObj[aToFragKey].t }} ({{ aToFragKey }})</li>
          </ul></div></div>
          <div class="form-group"><label class="col-sm-3 control-label">Antwort</label>
            <div class="col-sm-9">
              <p class="form-control-static" v-if="aToken.aId">{{ aToken.aId + (aToken.aId < 0 ? ' - Neu' : '') + (aToken.delAntwort ? ' - Wird gelöscht !!!' : '') }}
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
            <span :class="sv.class + ' tt' + sv.token.tt" v-for="(sv, svKey) in satzView" :key="'sv' + svKey">{{ transcript.aTokens.getTokenString(sv.token, 't') }}</span>
          </div>
        </template>
        <template v-if="aToken.aId && !aToken.delAntwort">
          <hr>
          <Tagsystem :tagsData="globals.tagsData" :tags="aAntwort.tags" :http="transcript.vueObj.$http" mode="edit"/>
        </template>
      <template v-slot:addButtons>
        <button type="button" class="btn btn-primary" :disabled="!changed" @click="updateTokenData">Ändern</button>
      </template>
      <template v-slot:closeButtonsText>{{ ((changed) ? 'Verwerfen' : 'Schließen') }}</template>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal'
import Tagsystem from '../tagsystem/Tagsystem'
import Globals from '@/functions/globals'
var _ = require('lodash')

export default {
  name: 'InfoToken',
  props: ['transcript', 'modalData'],
  data () {
    return {
      globals: Globals,
      aToken: {},
      oToken: {},
      aAntwort: {},
      oAntwort: {}
    }
  },
  watch: {
  },
  mounted () {
    this.transcript.aTokens.tokensObj[this.modalData.data.aToken.pk].viewed = true
    this.transcript.aTokens.svgLastView = this.modalData.data.aToken.pk
    this.aToken = _.clone(this.modalData.data.aToken)
    this.$set(this.aToken, 't', this.aToken.t || '')
    this.$set(this.aToken, 'le', this.aToken.le || false)
    this.$set(this.aToken, 'o', this.aToken.o || '')
    this.$set(this.aToken, 'to', this.aToken.to || '')
    this.oToken = _.clone(this.aToken)
    if (this.aToken.aId) {
      this.aAntwort = _.clone(this.transcript.aAntworten.antwortenObj[this.aToken.aId])
      if (!this.aAntwort.tags) {
        this.$set(this.aAntwort, 'tags', [])
      }
    }
    this.oAntwort = _.cloneDeep(this.aAntwort)
    console.log('InfoToken', this)
  },
  methods: {
    newAntwort () {
      this.$set(this.aToken, 'aId', '? - Neu')
      this.$set(this.aAntwort, 'tags', [])
    },
    updateTokenData () {
      this.$refs.modal.close()
      this.transcript.aTokens.updateTokenData(this.aToken, this.aAntwort)
    }
  },
  computed: {
    changed () {
      return !(_.isEqual(this.aToken, this.oToken) && _.isEqual(this.aAntwort, this.oAntwort))
    },
    satzView () {
      let aSatz = []
      let wordsBA = 20
      let aTLbInf = this.transcript.aTokens.tokenLists.byInf[this.aToken.i]
      // console.log(this.aToken.i, aTLbInf)
      if (aTLbInf) {
        let tLbIkey = 0
        let mLen = aTLbInf.length - 1
        aTLbInf.some((aToken, aKey) => {
          if (aToken.pk === this.aToken.pk) {
            tLbIkey = aKey
            return true
          }
        }, this)
        let vWord = tLbIkey - wordsBA
        let bWord = tLbIkey + wordsBA
        if (vWord < 0) {
          vWord = 0
          bWord = wordsBA * 2
        }
        if (bWord > mLen) {
          bWord = mLen
          vWord = mLen - wordsBA * 2
        }
        if (vWord < 0) {
          vWord = 0
        }
        let aClass = 'before'
        for (var i = vWord; i <= bWord; i++) {
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
    Tagsystem
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
