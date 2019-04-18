<template>
  <div v-if="modalData.type">
    <Modal :modalData="modalData">
      <template v-slot:title>Token</template>
        <!-- <div class="form-horizontal">
          <div class="form-group"><label for="aTokenID" class="col-sm-3 control-label">ID</label><div class="col-sm-9"><p class="form-control-static" id="aTokenID">${ aTokenInfo['pk'] }</p></div></div>
          <div class="form-group"><label for="aTokenText" class="col-sm-3 control-label">text</label><div class="col-sm-9"><input type="text" class="form-control" id="aTokenText" v-model="aTokenInfo['t']"></div></div>
          <div class="form-group"><label for="aTokenType" class="col-sm-3 control-label">token_type</label><div class="col-sm-9">
            <select class="form-control" id="aTokenType" v-model="aTokenInfo['tt']">
              <option v-for="(aTokenTypeVal, aTokenTypeKey) in aTokenTypes" :value="aTokenTypeKey">${ aTokenTypeVal['n'] }</option>
            </select>
          </div></div>
          <div class="form-group"><label for="aTokenOrtho" class="col-sm-3 control-label">ortho</label><div class="col-sm-9"><input type="text" class="form-control" id="aTokenOrtho" v-model="aTokenInfo['o']"></div></div>
          <div class="form-group"><label for="aTokenIDInf" class="col-sm-3 control-label">ID_Inf</label><div class="col-sm-9"><p class="form-control-static" id="aTokenIDInf">${ aInformanten[aTokenInfo['i']]['k'] } (${ aInformanten[aTokenInfo['i']]['ka'] } - ID: ${ aTokenInfo['i'] })</p></div></div>
          <div class="form-group" v-if="aTokenInfo['fo']"><label for="aTokenfragmentof" class="col-sm-3 control-label">fragment_of</label><div class="col-sm-9"><p class="form-control-static" id="aTokenfragmentof">${ aTokens[aTokenInfo['fo']]['t'] } - ID: ${ aTokenInfo['fo'] }</p></div></div>
          <div class="form-group"><label for="aTokenReihung" class="col-sm-3 control-label">token_reihung</label><div class="col-sm-9"><p class="form-control-static" id="aTokenReihung">${ aTokenInfo['tr'] }</p></div></div>
          <div class="form-group"><label for="aTokenEventID" class="col-sm-3 control-label">event_id</label><div class="col-sm-9"><p class="form-control-static" id="aTokenEventID">${ aTokenInfo['e-txt'] } - ID: ${ aTokenInfo['e'] }</p></div></div>
          <div class="form-group"><label for="aTokenLikelyError" class="col-sm-3 control-label">likely_error</label><div class="col-sm-9"><label class="checkbox-inline"><input type="checkbox" id="aTokenLikelyError" value="1" v-model="aTokenInfo['le']"> Ja</label></div></div>
          <div class="form-group" v-if="aTokenInfo['s']"><label for="aTokenSentenceID" class="col-sm-3 control-label">sentence_id</label><div class="col-sm-9"><p class="form-control-static" id="aTokenSentenceID">${ aSaetze[aTokenInfo['s']]['t'] } - ID: ${ aTokenInfo['s'] }</p></div></div>
          <div class="form-group" v-if="aTokenInfo['sr']"><label for="aTokenSequenceInSentence" class="col-sm-3 control-label">sequence_in_sentence</label><div class="col-sm-9"><p class="form-control-static" id="aTokenSequenceInSentence">${ aTokenInfo['sr'] }</p></div></div>
          <div class="form-group"><label for="aTokenTextInOrtho" class="col-sm-3 control-label">text_in_ortho</label><div class="col-sm-9"><input type="text" class="form-control" id="aTokenTextInOrtho" v-model="aTokenInfo['to']"></div></div>
          <div class="form-group" v-if="aTokenFragmente[aTokenInfo['pk']]"><label class="col-sm-3 control-label">Fragmente</label><div class="col-sm-9"><ul class="form-control-static hflist">
              <li v-for="aToFragKey in aTokenFragmente[aTokenInfo['pk']]">${ aTokens[aToFragKey]['t'] } (${ aToFragKey })</li>
          </ul></div></div>
          <div class="form-group"><label class="col-sm-3 control-label">Antwort</label><div class="col-sm-9">
            <p class="form-control-static" v-if="aTokenInfo.aId">${ aTokenInfo.aId+((aTokenInfo.aId<0)?' - Neu':'')+((aTokenInfo.delAntwort)?' - Wird gelöscht !!!':'') }
              <template v-if="!(aTokenInfo['tags'] && aTokenInfo['tags'].length > 0) && (aTokenInfo.aId > 0)">
                <button type="button" @click="$set(aTokenInfo, 'delAntwort', true); $set(aTokenInfo, 'changed', true);" class="btn btn-danger" v-if="!aTokenInfo.delAntwort"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                <button type="button" @click="$set(aTokenInfo, 'delAntwort', false); $set(aTokenInfo, 'changed', true);" class="btn btn-danger" v-else><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
              </template>
            </p>
            <button type="button" @click="$set(aTokenInfo, 'aId', '? - Neu');" class="btn btn-primary" v-else>Antwort erstellen</button>
          </div></div>
        </div>
        <template v-if="aTokenInfo['satzView']">
          <hr/>
          <div class="satzview">
            <span :class="sv.class" v-for="sv in aTokenInfo['satzView']">${ sv.text }</span>
          </div>
        </template>
        <template v-if="aTokenInfo.aId && !aTokenInfo.delAntwort">
          <hr>
          <tagsystem cols="3" :tags="aTokenInfo['tags']" @tags="setATokenInfo($event, 'tags')" />
        </template> -->
      <template v-slot:addButtons>
        <!-- <button type="button" class="btn btn-primary" :disabled="!aTokenInfo.changed" @click="updateTokenData">Ändern</button> -->
      </template>
      <template v-slot:closeButtonsText>Verwerfen/Schließen</template> <!-- {{ ((aTokenInfo.changed) ? 'Verwerfen' : 'Schließen') }} -->
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'InfoToken',
  props: ['transcript', 'modalData'],
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  },
  computed: {
  },
  components: {
    Modal
  }
}
</script>

<style scoped>
</style>
