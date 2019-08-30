<template>
  <div v-if="modalData.type">
    <InfoInformant :transcript="transcript" :modalData="modalData" v-if="modalData.type === 'informant'" />
    <InfoEvents :transcript="transcript" :modalData="modalData" v-else-if="modalData.type === 'event'" />
    <InfoToken :transcript="transcript" :modalData="modalData" v-else-if="modalData.type === 'token'" />
    <InfoTokenSet :transcript="transcript" :modalData="modalData" v-else-if="modalData.type === 'tokenSet'" />
  </div>
</template>

<script>
import InfoInformant from './InfoInformant'
import InfoEvents from './InfoEvents'
import InfoToken from './InfoToken'
import InfoTokenSet from './InfoTokenSet'

export default {
  name: 'Modale',
  props: ['transcript', 'modalData'],
  data () {
    return {
    }
  },
  mounted () {
    console.log('Modale', this.modalData)
  },
  watch: {
  },
  methods: {
  },
  computed: {
  },
  components: {
    InfoInformant,
    InfoEvents,
    InfoToken,
    InfoTokenSet
  }
}
</script>

<style scoped>
</style>
