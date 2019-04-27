<template>
  <div class="tags seltags open" ref="aSelElement">
    <div class="tagscontrol" v-if="aTag">
      <button ref="ptagsbtnl" class="ptagsbtn ptagsleft" title="Aktuellen Tag nach links verschieben" tabindex="-1" :disabled="tagindex < 1" @click="movetagleft" v-on:blur="blur"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
      <button ref="ptagsbtnd" class="ptagsbtn ptagsdel" data-pk="0" title="Aktuellen Tag löschen" tabindex="-1" @click="deltag()" v-on:blur="blur"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
      <button ref="ptagsbtnr" class="ptagsbtn ptagsright" title="Aktuellen Tag nach rechts verschieben" tabindex="-1" :disabled="!(tagindex < tagindexmax)" @click="movetagright" v-on:blur="blur"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
    </div>
    <!-- <tagsystemselecttag :generation="generation" agen=0 :ebene="ebene" :parents="aParents" :tags="aTags" :tag="tag" :tagindex="tagindex" @closePtagsbtn="closePtagsbtn()" @changetag="changeTag" /> -->
  </div>
</template>

<script>
import Popper from 'popper.js'
var _ = require('lodash')

export default {
  name: 'TagEditorTagsSelect',
  props: ['tagsData', 'aTag', 'target'],
  data () {
    return {
      tagindex: 5,
      tagindexmax: 10,
      popper: null
    }
  },
  mounted () {
    this.popper = new Popper(this.target, this.$refs.aSelElement, {
      placement: 'left-start',
      modifiers: {
        offset: { offset: '0px,-100%' }
      }
    })
    console.log('TagEditorTagsSelect', this.tagsData, this.aTag)
    if (this.$refs.ptagsbtnd) {
      this.$refs.ptagsbtnd.focus()
    }
    if (this.$refs.ptagsbtn) {
      this.$refs.ptagsbtn.some(function (aElement) {
        if ((aElement.className.indexOf('selected') >= 0 && this.aTag) || (aElement.className.indexOf('parent') < 0 && !this.aTag)) {
          this.$nextTick(() => aElement.focus())
          return true
        }
      }, this)
    }
  },
  watch: {
  },
  methods: {
    deltag () {
    },
    movetagleft () {
    },
    movetagright () {
    },
    blur: _.debounce(function () {
      this.$nextTick(() => {
        let ptagsbtnRefs = [this.$refs.ptagsbtnl, this.$refs.ptagsbtnd, this.$refs.ptagsbtnr]
        if (this.$refs.ptagsbtn) {
          ptagsbtnRefs = [...ptagsbtnRefs, ...this.$refs.ptagsbtn]
        }
        console.log(ptagsbtnRefs, document.activeElement, ptagsbtnRefs.indexOf(document.activeElement))
        if (ptagsbtnRefs.indexOf(document.activeElement) < 0) {
          this.close()
        }
      })
    }, 20),
    close () {
      console.log('close')
      this.$emit('close')
    }
  },
  computed: {
  },
  beforeDestroy () {
    this.popper.destroy()
  },
  components: {
  }
}
</script>

<style scoped>
</style>
