<template>
  <div class="iblock">
    <div
      :class="{'r-tag-familie': true, 'r-tag-familie-pchilds': tagsData.data.tagsCache.tags[aTag.tag].c, 'error': (!tagsData.data.tagsCache.tags[aTag.tag].c && (aTag.tags && aTag.tags.length>0))}"
      v-for="(aTag, aTagIndex) in tags" :key="'e' + ebenenPK + 'p' + parents.join('-') + 'rtft' + aTagIndex"
    >
      <div class="iblock prel">
        <button
          :class="{'ant-ftag': !aTag, 'ant-tag': aTag, 'error': (aTag && (tagsData.data.tagsCache.tags[aTag.tag].tezt && tagsData.data.tagsCache.tags[aTag.tag].tezt.indexOf(ebenenPK) < 0))}"
          :title="'PK: ' + aTag.tag + '\nGeneration: ' + generation"
          @click="selTag($event, aTag)"
        >
          {{ tagsData.data.tagsCache.tags[aTag.tag].t }}
        </button>
        <TagEditorTags :ebenenPK="ebenenPK" :generation="generation + 1" :tags="aTag.tags" :parents="[...parents, aTag]" :edit="edit" :tagsData="tagsData" />
        <button
          class="ant-ftag"
          :title="'Kind von `' + tagsData.data.tagsCache.tags[aTag.tag].t + '` hinzufügen.\nGeneration: ' + (generation + 1)"
          @click="addTag($event, aTag)"
          v-if="tagsData.data.tagsCache.tags[aTag.tag].c"
        >
          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <button class="ant-ftag" title="Tag hinzufügen." @click="addTag($event)" v-if="generation === 0"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
    <TagEditorTagsSelect :tagsData="tagsData" :aTag="TagEditorTagsSelectTag" :target="TagEditorTagsSelectTarget" @close="TagEditorTagsSelectClose" v-if="TagEditorTagsSelectShow"/>
  </div>
</template>

<script>
import TagEditorTagsSelect from './TagEditorTagsSelect'

export default {
  name: 'TagEditorTags',
  props: ['tagsData', 'edit', 'ebenenPK', 'generation', 'tags', 'parents'],
  data () {
    return {
      TagEditorTagsSelectShow: false,
      TagEditorTagsSelectTarget: null,
      TagEditorTagsSelectTag: null
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    addTag (e, aTag) {
      this.TagEditorTagsSelectShow = true
      this.TagEditorTagsSelectTarget = e.target
      this.TagEditorTagsSelectTag = aTag
    },
    selTag (e, aTag) {
      this.TagEditorTagsSelectShow = true
      this.TagEditorTagsSelectTarget = e.target
      this.TagEditorTagsSelectTag = aTag
    },
    TagEditorTagsSelectClose () {
      this.TagEditorTagsSelectShow = false
    }
  },
  computed: {
  },
  components: {
    TagEditorTagsSelect
  }
}
</script>

<style scoped>
  button > span {
    pointer-events: none;
  }
</style>
