<template>
  <div class="tags seltags open" ref="aSelElement">
    <div class="tagscontrol" v-if="!add">
      <button ref="ptagsbtnl" class="ptagsbtn ptagsleft" title="Aktuellen Tag nach links verschieben" tabindex="-1" :disabled="tagindex < 1" @click="moveTagLeft" @blur="blur"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
      <button ref="ptagsbtnd" class="ptagsbtn ptagsdel" data-pk="0" title="Aktuellen Tag löschen" tabindex="-1" @click="delTag()" @blur="blur"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
      <button ref="ptagsbtnr" class="ptagsbtn ptagsright" title="Aktuellen Tag nach rechts verschieben" tabindex="-1" :disabled="!(tagindex < tagindexmax)" @click="moveTagRight" @blur="blur"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
    </div>
    <div class="tagsparents" v-if="aTag && parents.length > 0">
      <div :style="'padding-left:' + (pIndex * shiftWidth) + 'px;'" v-for="(pTag, pIndex) in parents" :key="'ptag' + pIndex">
        <button
          :class="{'ptagsbtn': true, 'ptagsbtnhas': true, 'hasparent': cTags.tags[pTag.tag].p, 'haschild': cTags.tags[pTag.tag].c}"
          :title="cTags.tags[pTag.tag].tl + '\nPK: ' + cTags.tags[pTag.tag].pk"
          disabled
        >
          {{ cTags.tags[pTag.tag].t }}
        </button>
      </div>
    </div>
    <div class="tagsbtn-div" v-for="(tagBtn, tbtnKey) in tagsBtn" :key="'tbtn' + tbtnKey" :style="aTag && parents.length > 0 ? 'padding-left:' + (parents.length * shiftWidth) + 'px;' : ''">
      <button
        :class="{'ptagsbtn': true, 'ptagsbtnhas': true, 'hasparent': tagBtn.p, 'haschild': tagBtn.c, 'selected': !add && tagBtn.pk === aTag.tag}"
        :style="aTag && parents.length > 0 && tagBtn.g === null ? 'margin-left:' + -(parents.length * shiftWidth) + 'px;' : ''"
        :title="tagBtn.tl + '\nPK: ' + tagBtn.pk"
        ref="ptagsbtn"
        @blur="blur"
        @click="setTag(tagBtn.pk)"
      >
        {{ tagBtn.t }}
      </button>
    </div>
  </div>
</template>

<script>
/* global Popper _ */
// import Popper from 'popper.js'
// var _ = require('lodash')

export default {
  name: 'TagEditorTagsSelect',
  props: ['tagsData', 'ebenenPK', 'aTag', 'target', 'parents', 'generation', 'add', 'oTags'],
  data () {
    return {
      shiftWidth: 10,
      popper: null,
      cTags: this.tagsData.data.tagsCache
    }
  },
  mounted () {
    this.popper = new Popper(this.target, this.$refs.aSelElement, {
      placement: 'left-start',
      modifiers: {
        offset: { offset: '0,-100%' }
      }
    })
    console.log('TagEditorTagsSelect', this.tagsData, this.aTag, this.ebenenPK, this.parents, this.generation, this.add, this.oTags)
    console.log('x', this.parent, this.tagindex, this.tagindexmax)
    if (this.$refs.ptagsbtnd) {
      this.$refs.ptagsbtnd.focus()
    }
    if (this.$refs.ptagsbtn) {
      this.$refs.ptagsbtn.some(function (aElement) {
        if ((aElement.className.indexOf('selected') >= 0 && !this.add) || (this.add)) {
          this.$nextTick(() => aElement.focus())
          return true
        }
      }, this)
    }
  },
  watch: {
  },
  methods: {
    setTag (nTagPk) {
      if (this.add) {
        this.$emit('tagaction', 'add', nTagPk)
      } else {
        this.aTag.tag = nTagPk
      }
      this.close()
    },
    delTag () {
      this.$emit('tagaction', 'del')
    },
    moveTagLeft () {
      this.$emit('tagaction', 'mvl')
    },
    moveTagRight () {
      this.$emit('tagaction', 'mvr')
    },
    blur: _.debounce(function () {
      this.$nextTick(() => {
        let ptagsbtnRefs = [this.$refs.ptagsbtnl, this.$refs.ptagsbtnd, this.$refs.ptagsbtnr]
        if (this.$refs.ptagsbtn) {
          ptagsbtnRefs = [...ptagsbtnRefs, ...this.$refs.ptagsbtn]
        }
        if (ptagsbtnRefs.indexOf(document.activeElement) < 0) {
          this.close()
        }
      })
    }, 20),
    close () {
      this.$emit('close')
    }
  },
  computed: {
    parent () {
      return this.parents ? this.parents.slice(-1)[0] : null
    },
    tagindex () {
      return this.parent ? this.parent.tags.indexOf(this.aTag) : this.oTags ? this.oTags.indexOf(this.aTag) : 0
    },
    tagindexmax () {
      return this.parent ? this.parent.tags.length - 1 : this.oTags ? this.oTags.length - 1 : 0
    },
    tagsBtn () {
      let aTagsBtn = []
      if (this.generation === 0 || this.cTags.tags[this.parent.tag].c) {
        this.cTags.tagsReihung.forEach(cTagPk => {
          let cTag = this.cTags.tags[cTagPk]
          if (this.generation === 0 || (cTag.g === null)) {
            if ((cTag.g === null || cTag.g === this.generation) && (!cTag.tezt || (cTag.tezt && cTag.tezt.indexOf(this.ebenenPK) > -1)) && (!cTag.p)) {
              aTagsBtn.push(cTag)
            }
          } else if (this.cTags.tags[this.parent.tag].c) {
            if ((cTag.g === null || cTag.g === parseInt(this.generation)) &&
                (!cTag.tezt || (cTag.tezt && cTag.tezt.indexOf(this.ebenenPK) > -1)) &&
                this.cTags.tags[this.parent.tag].c.indexOf(cTagPk) > -1) {
              aTagsBtn.push(cTag)
            }
          }
        }, this)
        if (this.generation > 0) {
          aTagsBtn.sort((a, b) => (a.g === null && b.g !== null) ? 1 : ((a.g !== null && b.g === null) ? -1 : 0))
        }
      }
      return aTagsBtn
    }
  },
  beforeDestroy () {
    this.popper.destroy()
  },
  components: {
  }
}
</script>

<style scoped>
  .ptagsbtnhas {
    border-radius: 11px;
    padding-left: 8px;
    padding-right: 8px;
  }
  .ptagsbtnhas.hasparent {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    padding-left: 5px;
  }
  .ptagsbtnhas.haschild {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-right: 5px;
  }
  .tagsparents .ptagsbtn {
    background: #999;
    color: #eee;
  }
</style>
