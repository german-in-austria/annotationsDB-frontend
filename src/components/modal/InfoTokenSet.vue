<template>
  <div v-if="modalData.type">
    <Modal :modalData="modalData">
      <template v-slot:title>Token Set</template>
        <!-- <div class="form-horizontal">
          <div class="form-group"><label class="col-sm-3 control-label">ID</label><div class="col-sm-9"><p class="form-control-static">${ aTokenSetInfo.pk }</p></div></div>
          <div class="form-group" v-if="aTokenSetInfo.ivt"><label class="col-sm-3 control-label">von Token</label><div class="col-sm-9"><p class="form-control-static">${ aTokenSetInfo.ivt }</p></div></div>
          <div class="form-group" v-if="aTokenSetInfo.ibt"><label class="col-sm-3 control-label">bis Token</label><div class="col-sm-9"><p class="form-control-static">${ aTokenSetInfo.ibt }</p></div></div>
          <div class="form-group" v-if="aTokenSetInfo.t"><label class="col-sm-3 control-label">Token to Set</label><div class="col-sm-9">
            <div class="form-control-static listtokens">
              <a href="#" v-on:click.prevent="" :class="{selected: selToken===sTL}" v-for="(sTL, i) in aTokenSetInfo.t" :title="aTokens[sTL].t+' - ID: '+sTL">${ aTokens[sTL].t }</a>
            </div>
          </div></div>
          <div class="form-group"><label class="col-sm-3 control-label">Antwort</label><div class="col-sm-9">
            <p class="form-control-static" v-if="aTokenSetInfo.aId">${ aTokenSetInfo.aId+((aTokenSetInfo.aId<0)?' - Neu':'')+((aTokenSetInfo.delAntwort)?' - Wird gelöscht !!!':'') }
              <template v-if="!(aTokenSetInfo['tags'] && aTokenSetInfo['tags'].length > 0) && (aTokenSetInfo.aId > 0)">
                <button type="button" @click="$set(aTokenSetInfo, 'delAntwort', true); $set(aTokenSetInfo, 'changed', true);" class="btn btn-danger" v-if="!aTokenSetInfo.delAntwort"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                <button type="button" @click="$set(aTokenSetInfo, 'delAntwort', false); $set(aTokenSetInfo, 'changed', true);" class="btn btn-danger" v-else><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
              </template>
            </p>
            <button type="button" @click="$set(aTokenSetInfo, 'aId', '? - Neu');" class="btn btn-primary" v-else>Antwort erstellen</button>
          </div></div>
        </div>
        <template v-if="aTokenSetInfo['satzView']">
          <hr/>
          <div class="satzview">
            <span :class="sv.class" v-for="sv in aTokenSetInfo['satzView']">${ sv.text }</span>
          </div>
        </template>
        <template v-if="aTokenSetInfo.aId && !aTokenSetInfo.delAntwort">
          <hr/>
          <tagsystem cols="3" :tags="aTokenSetInfo['tags']" @tags="setATokenSetInfo($event, 'tags')" />
        </template> -->
      <template v-slot:addButtons>
        <!-- <button type="button" @click="deleteATokenSet(aTokenSetInfo.pk)" class="btn btn-danger" tabindex="9999">Löschen</button>
        <button type="button" class="btn btn-primary" :disabled="!aTokenSetInfo.changed" @click="updateTokenSetData">Ändern</button> -->
      </template>
      <template v-slot:closeButtonsText>Verwerfen/Schließen</template> <!-- {{ ((aTokenSetInfo.changed) ? 'Verwerfen' : 'Schließen') }} -->
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'InfoTokenSet',
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
