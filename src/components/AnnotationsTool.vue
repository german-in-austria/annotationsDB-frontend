<template>
  <div id="annotationsTool" v-bind:class="{ loading: loading, bgloading: false, unsaved: unsaved }">
    <div class="row h100">
      <div class="col-md-2 h100 mh200px vscroller lmfa">
        <!-- <SuchenUndFiltern v-if="annotationsTool.aPK>0"/>
        <Informationen v-if="annotationsTool.aPK>0"/> -->
        <TranskriptAuswahl />
      </div>
      <div class="col-md-10 h100 mh600px" style="border-right:1px solid #eee;padding:0px;padding-bottom:150px;">
        <Hauptfenster />
        <Audioplayer />
      </div>
    </div>
    <div id="loading">Lade ...</div>
  </div>
</template>

<script>
import SuchenUndFiltern from './menue/SuchenUndFiltern'
import Informationen from './menue/Informationen'
import TranskriptAuswahl from './menue/TranskriptAuswahl'
import Hauptfenster from './hauptfenster/Hauptfenster'
import Audioplayer from './audioplayer/Audioplayer'

export default {
  name: 'AnnotationsTool',
  data () {
    return {
      loading: false,
      unsaved: false
    }
  },
  components: {
    SuchenUndFiltern,
    Informationen,
    TranskriptAuswahl,
    Hauptfenster,
    Audioplayer
  }
}
</script>

<style scoped>
</style>
