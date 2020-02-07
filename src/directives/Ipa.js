/* global ipaKeys */
import Vue from 'vue'

const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
const elIpa = '__rt_ipa__'

var uIpaKeys = {
  'a': ['a', 'ɑ', 'ɐ', 'ɒ'],
  'b': ['b', 'b̥', 'β', 'β̥'],
  'p': ['p', 'pʰ', 'p̚'],
  'd': ['d', 'd̥'],
  't': ['t', 'tʰ', 't̚'],
  'e': ['e', 'ɛ', 'ə'],
  'ä': ['ɛː', 'æ'],
  'f': ['f', 'v̥'],
  'g': ['g', 'g̥'],
  'k': ['k', 'kʰ', 'k͡χ', 'k̚'],
  'h': ['ʰ'],
  'i': ['i', 'ɪ'],
  'l': ['l', 'ɭ', 'ɫ'],
  'm': ['m', 'ɱ'],
  'n': ['n', 'ŋ', 'ⁿ', 'n̩'],
  'o': ['o', 'ɔ'],
  'oa': ['ɔɐ̯', 'ɔo̯'],
  'ö': ['ø', 'œ'],
  'r': ['ʁ', 'ʀ', 'ɹ', 'ɾ'],
  'z': ['z', 'z̥'],
  'sch': ['ʃ', 'ʒ̥', 'ʒ'],
  'u': ['u', 'ʊ', 'ue̯'],
  'ü': ['y', 'ʏ', 'ʏɐ̯'],
  'w': ['v', 'β', 'β̥'],
  'ch': ['ç', 'x', 'χ', 'ɣ̥', 'ʝ̥'],
  'ei': ['aɛ̯', 'æe̯', 'æː'],
  'au': ['aɔ̯', 'ao̯', 'ɒ'],
  'eu': ['ɔe̯'],
  'ie': ['ɪɐ̯'],
  'ia': ['ɪɐ̯'],
  'pf': ['p͡f', 'b̥͡f'],
  'ts': ['t͡s', 'd̥͡s'],
  '1': ['̯', '̃', '͡', '̚', '̥'],
  '0': ['̯', 'ʰ', 'ⁿ', '̃', 'ː', '͡', '̝', '̞', 'ʔ'],
  ':': ['ː'],
  '.': ['̩', '̥', '̝', '̞'],
  '?': ['?', 'ʔ']
}
if (typeof ipaKeys !== 'undefined' && ipaKeys) {
  uIpaKeys = ipaKeys
  console.log('Global ipaKeys!')
}

console.log('ipaKeys', uIpaKeys)

function insertAfter (parentNode, newNode, referenceNode) {
  if (parentNode) {
    parentNode.insertBefore(newNode, referenceNode ? referenceNode.nextSibling : parentNode.firstChild)
  }
}

function applyElIpa (el, bindings, vNode) {
  if (!inBrowser) {
    return
  }
  // console.log(el, el.parentNode, bindings, vNode)
  if (!el[elIpa]) {
    el[elIpa] = new ExtIpa().$mount()
    el[elIpa].aElement = el
    // console.log(uIpaKeys)
  } else {
    el.parentNode.style.position = 'relative'
    insertAfter(el.parentNode, el[elIpa].$el, el)
    el.style.fontFamily = 'arial'
    el.style.fontSize = '17px'
  }
}
function removeElIpa (el) {
  if (!inBrowser) {
    return
  }
  if (el[elIpa]) {
    if (el[elIpa].destroy) {
      el[elIpa].destroy()
    }
    el[elIpa] = null
    delete el[elIpa]
  }
}

var ExtIpa = Vue.extend({
  template: '<div :style="\'position: fixed; z-index: 10000; margin-top: \' + aTop + \'px; max-height: 130px; overflow-y: auto; background: #fff; padding: 10px; padding-bottom: 5px; border: 1px solid #eee; border-radius: 5px; min-width: 250px; font-family: arial; font-size: 20px;\'" v-if="ready && aKeys.length > 0">' +
            '  <div style="margin-bottom: 5px; white-space: nowrap;" v-for="(aKey, aI) in aKeys" :key="\'ipa\' + aI">' +
            '    <span style="display: inline-block; width: 31px; text-align: center;">{{ aKey.k }}</span>' +
            '    <button @click="setKey(aKey.k, pKey)" @keyup.esc="unsetKeys()" @blur="blur" ref="aBtns" class="btn btn-grey btn-sm" style="display: inline-block; margin-right: 5px; min-width: 35px;" v-for="pKey in aKey.a">{{ pKey }}</button>' +
            '  </div>' +
            '</div>',
  data () {
    return {
      aKeys: [],
      aElement: null,
      ready: false,
      lastPosition: null,
      aTop: 0
    }
  },
  mounted () {
    // console.log('ExtIpa', this)
  },
  watch: {
    aKeys () {
      this.$nextTick(() => {
        if (this.ready && this.aKeys.length > 0) {
          this.aTop = -(this.aElement.getBoundingClientRect().height + this.$el.getBoundingClientRect().height)
        }
      })
    },
    aElement (nVal, oVal) {
      if (oVal) {
        oVal.removeEventListener('keyup', this.keyUp)
        oVal.removeEventListener('blur', this.blur)
      }
      if (nVal) {
        this.ready = true
        nVal.addEventListener('keyup', this.keyUp)
        nVal.addEventListener('blur', this.blur)
      }
    }
  },
  methods: {
    blur (e) {
      this.$nextTick(() => {
        if (this.aKeys.length > 0) {
          let aEl = e.relatedTarget || document.activeElement
          if (aEl !== this.aElement && this.$refs.aBtns.indexOf(aEl) === -1) {
            this.aKeys = []
          }
        }
      })
    },
    unsetKeys () {
      if (this.aKeys.length > 0) {
        this.aKeys = []
        if (this.lastPosition || this.lastPosition === 0) {
          this.aElement.focus()
          this.aElement.selectionStart = this.lastPosition
          this.aElement.selectionEnd = this.lastPosition
        }
      }
    },
    setKey (aKey, nKey) {
      this.aElement.value = this.aElement.value.substring(0, this.lastPosition - aKey.length) + nKey + this.aElement.value.substring(this.lastPosition, this.aElement.value.length)
      this.lastPosition = this.lastPosition - aKey.length + nKey.length
      this.unsetKeys()
    },
    keyUp (e) {
      if (e.key !== 'Tab' && e.key !== 'Shift') {
        this.aKeys = []
        this.lastPosition = e.srcElement.selectionStart
        if (e.key.length === 1 && e.srcElement.selectionStart === e.srcElement.selectionEnd) {
          if (e.key === '!') {
            for (var key in uIpaKeys) {
              if (!uIpaKeys.hasOwnProperty(key)) continue
              this.aKeys.push({'k': key, 'a': uIpaKeys[key]})
            }
          } else {
            let alKey = ''
            if (e.srcElement.selectionStart > 2) {
              alKey = this.aElement.value.substring(e.srcElement.selectionStart - 3, e.srcElement.selectionStart)
              if (uIpaKeys[alKey]) {
                this.aKeys.push({'k': alKey, 'a': uIpaKeys[alKey]})
              }
            }
            if (e.srcElement.selectionStart > 1) {
              alKey = this.aElement.value.substring(e.srcElement.selectionStart - 2, e.srcElement.selectionStart)
              if (uIpaKeys[alKey]) {
                this.aKeys.push({'k': alKey, 'a': uIpaKeys[alKey]})
              }
            }
            let aKey = this.aElement.value.substring(e.srcElement.selectionStart - 1, e.srcElement.selectionStart)
            if (aKey && uIpaKeys[aKey]) {
              this.aKeys.push({'k': aKey, 'a': uIpaKeys[aKey]})
            }
          }
        }
      }
    }
  },
  beforeDestroy () {
    if (this.aElement) {
      this.aElement.removeEventListener('keyup', this.keyUp)
      this.aElement.removeEventListener('blur', this.blur)
    }
  }
})

export default {
  bind (el, bindings, vNode) {
    applyElIpa(el, bindings, vNode)
  },
  inserted (el, bindings, vNode) {
    applyElIpa(el, bindings, vNode)
  },
  update (el, bindings, vNode) {
    if (bindings.value !== bindings.oldValue) {
      applyElIpa(el, bindings, vNode)
    }
  },
  componentUpdated (el, bindings, vNode) {
    if (bindings.value !== bindings.oldValue) {
      applyElIpa(el, bindings, vNode)
    }
  },
  unbind (el) {
    removeElIpa(el)
  }
}
