<template>
  <div :class="'tagsystem tagmode-' + mode">
    <template v-if="!tagsData.data.loadingBase && !tagsData.data.loadingTags">
      <template v-if="mode === 'text'">
        <div class="tagebene" v-for="(tagebene, tkey) in tags" :key="'tstek' + tkey">
          <span class="tagebene-name">{{ tagsData.data.baseCache.tagebenenObj[tagebene.e].t }}</span>
          <span class="tagebene-tags">{{ tagsData.data.tagsText(tagebene.tags) }}</span>
        </div>
      </template>
      <template v-else>
        Tagsystem
      </template>
    </template>
    <template v-else>
      Lade ...
    </template>
  </div>
</template>

<script>
import TagsystemObject from './functions/Tagsystem'

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
