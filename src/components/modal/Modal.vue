<template>
  <div ref="modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Schließen"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title"><slot name="title">title</slot></h4>
        </div>
        <div class="modal-body"><slot>body</slot></div>
        <div class="modal-footer"><slot name="addButtons" /><button type="button" class="btn btn-default" data-dismiss="modal"><slot name="closeButtonsText">Schließen</slot></button></div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'Modal',
  props: ['modalData'],
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.modalData)
    var aModalThis = this
    $(this.$refs.modal).on('hidden.bs.modal', function (e) {
      aModalThis.modalData.type = null
      aModalThis.modalData.data = null
    })
    $(this.$refs.modal).modal('show')
  },
  watch: {
  },
  methods: {
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
