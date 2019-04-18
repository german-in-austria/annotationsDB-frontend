<template>
  <div v-if="modalData.type">
    <Modal :modalData="modalData">
      <template v-slot:title>Informant</template>
      <!-- <div class="form-horizontal">
        <div class="form-group"><label class="col-sm-3 control-label">ID</label><div class="col-sm-9"><p class="form-control-static">${ aInfInfo }</p></div></div>
        <div class="form-group"><label class="col-sm-3 control-label">Kürzel</label><div class="col-sm-9"><p class="form-control-static">${ aInformanten[aInfInfo]['k'] }</p></div></div>
        <div class="form-group"><label class="col-sm-3 control-label">Kürzel Anonym</label><div class="col-sm-9"><p class="form-control-static">${ aInformanten[aInfInfo]['ka'] }</p></div></div>
      </div> -->
      <template v-slot:addButtons></template>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'InfoInformant',
  props: ['transcript', 'modalData'],
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  },
  computed: {
  },
  components: {
    Modal
  }
}
</script>

<style scoped>
</style>
