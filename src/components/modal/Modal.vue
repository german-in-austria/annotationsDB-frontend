<template>
  <div ref="modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Schließen" v-if="!blocked"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title"><slot name="title">title</slot></h4>
        </div>
        <div class="modal-body"><slot>body</slot></div>
        <div class="modal-footer"><slot name="addButtons" /><button type="button" class="btn btn-default" data-dismiss="modal" ref="closeButton" @keydown.esc="escKey"><slot name="closeButtonsText">Schließen</slot></button></div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'Modal',
  props: ['modalData', 'blocked'],
  data () {
    return {
      forceClose: false
    }
  },
  mounted () {
    // console.log('Modal', this.modalData)
    var aModalThis = this
    $(this.$refs.modal).on('shown.bs.modal', function (e) {
      $(aModalThis.$refs.modal).find('.modal-focus').focus()
      aModalThis.$emit('shown')
    })
    $(this.$refs.modal).on('hidden.bs.modal', function (e) {
      if (aModalThis.modalData) {
        aModalThis.modalData.type = null
        aModalThis.modalData.data = null
      }
      aModalThis.$root.$children[0].$refs.annotationstool.$refs.hauptfenster.setFocus()
      aModalThis.$emit('close')
    })
    $(this.$refs.modal).on('hide.bs.modal', function (e) {
      return !aModalThis.blocked || document.activeElement === aModalThis.$refs.closeButton || aModalThis.forceClose
    })
    $(this.$refs.modal).modal('show')
  },
  watch: {
  },
  methods: {
    close () {
      console.log('close')
      this.forceClose = true
      this.$refs.closeButton.click()
    },
    escKey () {
      this.$refs.modal.focus()
    }
  },
  computed: {
  },
  beforeDestroy () {
    $('.modal-backdrop').remove()
  },
  components: {
  }
}
</script>

<style scoped>
</style>
