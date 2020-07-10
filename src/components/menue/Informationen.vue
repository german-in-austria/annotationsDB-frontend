<template>
  <div class="infgroup">
    <h4>Informationen:</h4>
    <InformationenTranskript :transcript="transcript" />
    <InformationenAuswahl :transcript="transcript" />
    <InformationenAktuellesToken :transcript="transcript" />
    <InformationenAktuelleTokenSets :transcript="transcript" />
    <InformationenAktuelleEventSets :transcript="transcript" />
    <InformationenHilfe />
    <hr>
  </div>
</template>

<script>
import InformationenTranskript from './InformationenTranskript'
import InformationenAuswahl from './InformationenAuswahl'
import InformationenAktuellesToken from './InformationenAktuellesToken'
import InformationenAktuelleTokenSets from './InformationenAktuelleTokenSets'
import InformationenAktuelleEventSets from './InformationenAktuelleEventSets'
import InformationenHilfe from './InformationenHilfe'

export default {
  name: 'Informationen',
  props: ['transcript'],
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  components: {
    InformationenTranskript,
    InformationenAuswahl,
    InformationenAktuellesToken,
    InformationenAktuelleTokenSets,
    InformationenAktuelleEventSets,
    InformationenHilfe
  }
}
</script>

<style scoped>
</style>
