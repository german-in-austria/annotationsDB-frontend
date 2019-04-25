<template>
  <div class="tageditor form-horizontal">
    <div class="form-group tag-line" v-for="(ebenenTags, etKey) in tags" :key="'teet' + etKey">
      <label class="col-sm-3 control-label">
        <select class="tagebene w100" v-model="ebenenTags.e">
          <option :value="0">Ebene auswählen (Löschen)</option>
          <option v-for="tagebene in tagsData.data.baseCache.tagebenenList" :key="'teet' + etKey + 'tesel' + tagebene.pk"
                  :value="tagebene.pk"
                  :disabled="(ebenenTags.e !== tagebene.pk) && ebeneVorhanden(tagebene.pk)">
                    {{ tagebene.t }}
          </option>
        </select>
      </label>
      <!-- <div :class="col-sm-9">
        <div class="form-control-static reihung-tags" v-if="aEbene['e']>0">
          <div class="r-tag-familie r-tag-familie-pchilds">
            <tagsystemtags :ebene="aEbene['e']" generation=0 :tags="aEbene['tags']" :parents="[]" :tagindex="aEbeneIndex" @changetag="changeTag" />
            <tagsystemselecttags :ebene="aEbene['e']" generation=0 :tags="aEbene['tags']" tagindex="-1" :parents="[]" :tagindex="aEbeneIndex" @changetag="changeTag" />
          </div>
          <div class="iblock prel" v-if="cache && cache.baseCache && cache.baseCache.tagebenen && getFirstObjectOfValueInPropertyOfArray(cache.baseCache.tagebenen, 'pk', aEbene.e) && getFirstObjectOfValueInPropertyOfArray(cache.baseCache.tagebenen, 'pk', aEbene.e).hasPresets">
            <button class="ant-ctag" :disabled="loadingPresets" @click="togglePreset(aEbeneIndex)"><span class="glyphicon glyphicon-star" aria-hidden="true"></span></button>
            <div class="tags seltags open" v-if="!loadingPresets && showPresets[aEbeneIndex]">
              <button v-for="(preset, pIndex) in cache.presetsCache" v-if="(preset.tf.length > 0) && (!preset.ze || (preset.ze && preset.ze.indexOf(aEbene['e']) > -1))" @click="addPreset(aEbeneIndex, pIndex)" v-on:blur="selPresetBlur" class="pretagsbtn" :title="(pIndex + 1) + '. ' + preset.tokenText">${ (pIndex + 1) + '. ' + preset.tokenText }</button>
            </div>
          </div>
        </div>
        <p class="form-control-static" v-else><b>Ebene auswählen!</b></p>
      </div> -->
    </div>
    <div class="form-group add-tag-line-line">
      <div class="col-sm-3"><button class="add-tag-line" @click="addEbene"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Tag-Ebene</button></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TagEditor',
  props: ['tagsData', 'tags', 'mode'],
  data () {
    return {
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    ebeneVorhanden (eId) {
      let vorhanden = false
      this.tags.some(function (aEbene) {
        if (aEbene.e === eId) {
          vorhanden = true
          return true
        }
      }, this)
      return vorhanden
    },
    addEbene () {
      this.tags.push({'e': 0, 'tags': []})
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style scoped>
  .tagmode-text .tagebene-name {
    margin-right: 5px;
  }
  .tagmode-text .tagebene-name:after {
    content: ':';
  }
</style>
