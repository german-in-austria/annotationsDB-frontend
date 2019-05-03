<template>
  <div class="iblock">
    <div
      :class="{'r-tag-familie': true, 'r-tag-familie-pchilds': tagsData.data.tagsCache.tags[aTag.tag].c, 'error': familyError(aTag)}"
      v-for="(aTag, aTagIndex) in tags" :key="'e' + ebenenPK + 'p' + parents.join('-') + 'rtft' + aTagIndex"
    >
      <div class="iblock prel">
        <button
          :class="{'ant-ftag': !aTag, 'ant-tag': aTag, 'error': tagError(aTag)}"
          :title="tagsData.data.tagsCache.tags[aTag.tag].tl + '\nPK: ' + aTag.tag + '\nGeneration: ' + generation"
          @click="selTag($event, aTag, parents, generation)"
        >
          {{ tagsData.data.tagsCache.tags[aTag.tag].t }}
        </button>
        <TagEditorTags :ebenenPK="ebenenPK" :generation="generation + 1" :tags="aTag.tags" :parents="[...parents, aTag]" :edit="edit" :tagsData="tagsData" />
        <button
          class="ant-ftag"
          :title="'Kind von `' + tagsData.data.tagsCache.tags[aTag.tag].t + '` hinzufügen.\nGeneration: ' + (generation + 1)"
          @click="addTag($event, aTag, [...parents, aTag], generation + 1)"
          v-if="tagsData.data.tagsCache.tags[aTag.tag].c"
        >
          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <button class="ant-ftag" title="Tag hinzufügen." @click="addTag($event, null, parents, generation)" v-if="generation === 0"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
    <TagEditorTagsSelect
      :tagsData="tagsData"
      :target="TagEditorTagsSelectTarget"
      :aTag="TagEditorTagsSelectTag"
      :parents="TagEditorTagsSelectParents"
      :generation="TagEditorTagsSelectGeneration"
      :add="TagEditorTagsSelectAdd"
      :ebenenPK="ebenenPK"
      :oTags="tags"
      @close="tagEditorTagsSelectClose"
      @tagaction="tagAction"
      v-if="TagEditorTagsSelectShow"/>
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
      TagEditorTagsSelectTag: null,
      TagEditorTagsSelectParents: null,
      TagEditorTagsSelectGeneration: null,
      TagEditorTagsSelectAdd: false
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    addTag (e, aTag, aParents, aGeneration) {
      this.TagEditorTagsSelectShow = true
      this.TagEditorTagsSelectTarget = e.target
      this.TagEditorTagsSelectTag = aTag
      this.TagEditorTagsSelectParents = aParents
      this.TagEditorTagsSelectGeneration = aGeneration
      this.TagEditorTagsSelectAdd = true
    },
    selTag (e, aTag, aParents, aGeneration) {
      this.TagEditorTagsSelectShow = true
      this.TagEditorTagsSelectTarget = e.target
      this.TagEditorTagsSelectTag = aTag
      this.TagEditorTagsSelectParents = aParents
      this.TagEditorTagsSelectGeneration = aGeneration
      this.TagEditorTagsSelectAdd = false
    },
    tagEditorTagsSelectClose () {
      this.TagEditorTagsSelectShow = false
    },
    tagAction (mode, data = null) {
      console.log('tagAction', mode)
      let aTag = this.TagEditorTagsSelectTag
      let aParentTags = this.TagEditorTagsSelectParents.slice(-1)[0]
      if (!aParentTags) {
        aParentTags = this.tags
      } else {
        aParentTags = aParentTags.tags
      }
      if (mode === 'add') {
        console.log('add', data, aParentTags)
        aParentTags.push({id: 0, tag: data, tags: []})
      } else {
        let aTagIndex = aParentTags.indexOf(aTag)
        if (aTagIndex > -1) {
          if (mode === 'del') {
            if (confirm('Sollen die "Children" tatsächlich gelöscht werden?')) {
              aParentTags.splice(aTagIndex, 1)
            }
            this.TagEditorTagsSelectShow = false
          } else if (mode.substr(0, 2) === 'mv') {
            let aDir = mode === 'mvl' ? -1 : 1
            if (aTagIndex + aDir > -1 && aTagIndex + aDir < aParentTags.length) {
              [aParentTags[aTagIndex], aParentTags[aTagIndex + aDir]] = [aParentTags[aTagIndex + aDir], aParentTags[aTagIndex]]
              this.TagEditorTagsSelectShow = false
            }
          }
        }
      }
    },
    familyError (aTag) {
      return !this.tagsData.data.tagsCache.tags[aTag.tag].c && (aTag.tags && aTag.tags.length > 0)
    },
    tagError (aTag) {
      return (aTag && (this.tagsData.data.tagsCache.tags[aTag.tag].tezt && this.tagsData.data.tagsCache.tags[aTag.tag].tezt.indexOf(this.ebenenPK) < 0)) ||
             (this.tagsData.data.tagsCache.tags[aTag.tag].g !== null &&
              (this.parent && (!this.tagsData.data.tagsCache.tags[this.parent.tag].c || this.tagsData.data.tagsCache.tags[this.parent.tag].c.indexOf(aTag.tag) === -1)))
    }
  },
  computed: {
    parent () {
      return this.parents.length > 0 ? this.parents.slice(-1)[0] : null
    }
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
