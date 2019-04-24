<template>
  <div class="tagsystem">
    Tagsystem
  </div>
</template>

<script>
import TagsystemObject from './functions/Tagsystem'

export default {
  name: 'Tagsystem',
  props: ['tagsData', 'tags', 'http'],
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
</style>
