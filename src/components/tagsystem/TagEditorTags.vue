<template>
  <div class="iblock">
    <div
      :class="{'r-tag-familie': true, 'r-tag-familie-pchilds': tagsData.data.tagsCache.tags[aTag.tag].c, 'error': (!tagsData.data.tagsCache.tags[aTag.tag].c && (aTag.tags && aTag.tags.length>0))}"
      v-for="(aTag, aTagIndex) in tags" :key="'e' + ebenenPK + 'p' + parents.join('-') + 'rtft' + aTagIndex"
    >
      <div class="iblock prel">
        <button v-bind:class="{'ant-ftag': !aTag, 'ant-tag': aTag, 'error': (aTag && (tagsData.data.tagsCache.tags[aTag.tag].tezt && tagsData.data.tagsCache.tags[aTag.tag].tezt.indexOf(ebenenPK) < 0))}" @click="seltags(aTag)">
          <!-- <span class="glyphicon glyphicon-plus" aria-hidden="true" v-if="!aTag"></span> -->
          {{ tagsData.data.tagsCache.tags[aTag.tag].t }}
        </button>
        <!-- <div class="tags seltags open" v-if="isOpen">
          <div class="tagscontrol" v-if="tag">
            <button class="ptagsbtn ptagsleft" title="Aktuellen Tag nach links verschieben" tabindex="-1" :disabled="tagindex<1" @click="movetagleft" v-on:blur="seltagsBlur"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
            <button class="ptagsbtn ptagsdel" data-pk="0" title="Aktuellen Tag löschen" tabindex="-1" @click="deltag()" v-on:blur="seltagsBlur"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
            <button class="ptagsbtn ptagsright" title="Aktuellen Tag nach rechts verschieben" tabindex="-1" :disabled="!(tagindex<tagindexmax)" @click="movetagright" v-on:blur="seltagsBlur"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
          </div>
          <tagsystemselecttag :generation="parseInt(generation)" agen=0 :ebene="ebene" :parents="aParents" :tags="aTags" :tag="tag" :tagindex="tagindex" @closePtagsbtn="closePtagsbtn()" @changetag="changeTag" />
        </div> -->
        <TagEditorTags :ebenenPK="ebenenPK" generation="parseInt(generation) + 1" :tags="aTag.tags" :parents="[...parents, aTag]" :edit="edit" :tagsData="tagsData" />
        <!-- <span>ToDo: Tag hinzufügen ...</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagEditorTags',
  props: ['tagsData', 'edit', 'ebenenPK', 'generation', 'tags', 'parents'],
  data () {
    return {
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    seltags (aTag) {
      console.log('seltags', aTag)
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style scoped>
</style>
