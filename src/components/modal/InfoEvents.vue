<template>
  <div v-if="modalData.type">
    <Modal :modalData="modalData">
      <template v-slot:title>Events</template>
        <div class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label">Zeit</label>
            <div class="col-sm-9"><p class="form-control-static">{{ tEvent.s }} -  {{ tEvent.e }}</p></div>
          </div>
        </div>
        <div v-for="aEvent in tEvent.events" :key="'medevents' + aEvent.pk">
          <hr>
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label">Informant</label>
              <div class="col-sm-9"><p class="form-control-static">
                <span v-for="(aInformant, aInfKey) in aEvent.iObjs" :key="'medevents' + aEvent.pk + 'i' + aInformant.pk">
                  {{ (aInfKey ? ',' : '') }}{{ aInformant.k }} ({{ aInformant.ka }} - ID: {{ aInformant.pk }})
                </span>
              </p></div>
            </div>
            <div class="form-group"><label class="col-sm-3 control-label">ID</label><div class="col-sm-9"><p class="form-control-static">{{ aEvent.pk }}</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Start</label><div class="col-sm-9"><p class="form-control-static">{{ aEvent.s }}</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Ende</label><div class="col-sm-9"><p class="form-control-static">{{ aEvent.e }}</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Layer</label><div class="col-sm-9"><p class="form-control-static">{{ aEvent.l }}</p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Token IDs</label><div class="col-sm-9"><p class="form-control-static">
              <span v-for="(aTokenVal, aTokenKey) in aEvent.tid" :key="'medevents' + aEvent.pk + 'inftok' + aTokenKey">
                <b>{{ aTokenKey }}:</b> {{ aTokenVal.join(', ') }}<br>
              </span>
            </p></div></div>
            <div class="form-group"><label class="col-sm-3 control-label">Transkript</label><div class="col-sm-9"><p class="form-control-static">{{ aEvent.trid || 'None' }}</p></div></div>
            <div class="form-group" v-if="aEvent.et && aEvent.et.length > 0"><label class="col-sm-3 control-label">Event Tiers</label><div class="col-sm-9"><div class="form-control-static">
              <div v-for="(aTier, aKey) in aEvent.et" :key="'medevents' + aEvent.pk + 'inftok' + aKey">
                <b :title="'Transkript Tier ID: ' + aTier.tiObj.pk">{{ aTier.tiObj.tier_name }}:</b> <span :title="'Event Tier ID: ' + aTier.pk">{{ aTier.txt }}</span><br>
              </div>
            </div></div></div>
          </div>
        </div>
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
  mounted () {
    console.log('InfoEvents', this.modalData, this.modalData.data.tEvent)
  },
  watch: {
  },
  methods: {
  },
  computed: {
    tEvent () {
      return this.modalData.data.tEvent
    }
  },
  components: {
    Modal
  }
}
</script>

<style scoped>
</style>
