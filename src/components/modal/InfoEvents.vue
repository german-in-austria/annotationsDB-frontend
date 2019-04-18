<template>
  <div v-if="modalData.type">
    <Modal :modalData="modalData">
      <template v-slot:title>Events</template>
        <!-- <div class="form-horizontal">
          <div class="form-group"><label class="col-sm-3 control-label">Zeit</label><div class="col-sm-9"><p class="form-control-static">${ tEvents[tEventInfo]['s'] } -  ${ tEvents[tEventInfo]['e'] }</p></div></div>
        </div>
        <div v-for="(aInfVal, aInfKey) in aInformanten" v-if="tEvents[tEventInfo]['eId'][aInfKey] >= 0">
          <hr>
          <div class="form-horizontal" v-for="aEventKey in [tEvents[tEventInfo]['eId'][aInfKey]]">
            <div class="form-group"><label class="col-sm-3 control-label">Informant</label><div class="col-sm-9"><p class="form-control-static">${ aInfVal['k'] } (${ aInfVal['ka'] } - ID: ${ aInfKey })</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">ID</label><div class="col-sm-9"><p class="form-control-static">${ aEvents[aEventKey]['pk'] }</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Start</label><div class="col-sm-9"><p class="form-control-static">${ aEvents[aEventKey]['s'] }</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Ende</label><div class="col-sm-9"><p class="form-control-static">${ aEvents[aEventKey]['e'] }</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Layer</label><div class="col-sm-9"><p class="form-control-static">${ aEvents[aEventKey]['l'] }</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Token IDs</label><div class="col-sm-9"><p class="form-control-static">
              <span v-for="(aTokenVal, aTokenKey) in aEvents[aEventKey]['tid']">
                <b>${ aTokenKey }:</b> ${ aTokenVal.join(', ') }<br>
              </span>
            </p></div></div></div>
        </div> -->
      <template v-slot:addButtons></template>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'InfoEvents',
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
