<template>
  <div :class="'tagsystem tagmode-' + mode">
    <template v-if="!tagsData.data.loadingBase && !tagsData.data.loadingTags">
      <template v-if="mode === 'text'">
        <div class="tagebene" v-for="(tagebene, tkey) in tags" :key="'tstek' + tkey">
          <span class="tagebene-name">{{ tagsData.data.baseCache.tagebenenObj[tagebene.e].t }}</span>
          <span class="tagebene-tags">{{ tagsData.data.tagsText(tagebene.tags) }}</span>
        </div>
      </template>
      <template v-else-if="mode === 'edit' || mode === 'view'">
        <TagEditor :tagsData="tagsData" :tags="tags" :mode="mode" />
      </template>
      <template v-else>
        Tagsystem {{ mode }}
      </template>
    </template>
    <template v-else>
      Lade ...
    </template>
  </div>
</template>

<script>
import TagsystemObject from './functions/Tagsystem'
import TagEditor from './TagEditor'

export default {
  name: 'Tagsystem',
  props: ['tagsData', 'tags', 'http', 'mode'],
  data () {
    return {
    }
  },
  mounted () {
    console.log('Tagsystem', this.tagsData, this.tags)
    if (!this.tagsData.data) {
      this.tagsData.data = new TagsystemObject.TagsystemBase(this.http)
    }
  },
  watch: {
  },
  methods: {
  },
  computed: {
  },
  components: {
    TagEditor
  }
}
</script>

<style>
  .pretagsbtn {
    display: block;
  }
  .reihung-tags {
    position: relative;
  }
  .iblock {
    display: inline-block;
  }
  .prel {
    position: relative;
  }

  .tags {
    display: none;
  }
  .tags.open {
    display: block;
  }
  .r-tag-familie > .iblock > button {
    background: #fff;
    border: 1px solid #ccc;
    padding: 2px 8px;
    margin-right: 2px;
    border-radius: 11px;
    text-decoration: none;
    color: #333;
  }

  .r-tag-familie-pchilds .r-tag-familie-pchilds .iblock > button {
    border: none;
    background: none;
    border-right: 1px solid rgba(0,0,0,0.2);
    border-radius: 11px;
    margin: -1px 0px;
    padding: 2px 6px;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5), -1px -1px 0px rgba(255, 255, 255, 0.5), 1px -1px 0px rgba(255, 255, 255, 0.5), -1px 1px 0px rgba(255, 255, 255, 0.5);
  }
  .r-tag-familie-pchilds .r-tag-familie-pchilds .r-tag-familie-pchilds > .iblock > button {
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
  }

  .ptagsbtn.selected {
    color: #fff;
    background: #333;
  }

  button.ant-ftag {
    background: #fff;
    border: 1px solid #ccc;
    padding: 2px 8px;
    margin-right: 2px;
    border-radius: 11px;
    text-decoration: none;
    color: #333;
    padding: 2px 5px;
    border-radius: 14px;
  }

  .r-tag-familie > .iblock > button.ant-ftag {
    padding: 2px 5px;
    border-radius: 14px;
  }

  .r-tag-familie.error {
    border: 1px solid #d33;
    padding: 1px;
    border-radius: 5px;
  }

  .tag-familie.hidden-parent > div > .tag-familie {
    margin-left: 10px;
  }

  .reihung-tags > .r-tag-familie > .iblock > .r-tag-familie-pchilds {
    margin-right: 5px;
  }

  .tagscontrol {
    margin-bottom: 5px;
    min-width: 110px;
  }
  .ptagsdel {
    padding-right: 8px;
  }
  .tagscontrol .ptagsbtn[disabled] {
    background: #ddd;
    color: #888;
  }
  .ant-tag.error {
    background: #f1bfbf !important;
    color: #e00 !important;
  }
  .tagmode-text .tagebene-name {
    margin-right: 5px;
  }
  .tagmode-text .tagebene-name:after {
    content: ':';
  }
  .tags.open {
    display: block;
  }
  .tags {
    display: none;
  }
  .pretagsbtn {
    display: block;
  }
</style>
