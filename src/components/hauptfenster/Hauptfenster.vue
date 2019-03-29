<template>
  <div class="hauptfenster h100">
    <div class="container" v-if="!transcript"><div class="alert alert-warning mt-5">Kein Transkript ausgewählt!</div></div>
    <div class="container" v-else-if="!transcript.ready"><div class="alert alert-info mt-5">Transkript({{ transcript.pk }}) wird geladen!</div></div>
    <div id="svgscroller" class="h100 mcon vscroller" v-else>
    <!--   {% include "AnnotationsDB/annotationsvg.html" %} -->
      <button @click="speichern()" id="saveit" v-bind:class="{ btn: true, 'btn-success': true, disabled: !unsaved }"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Speichern</button>
    </div>
    <!-- <svg style="position:absolute;right:0px;bottom:0px;width:1px;height:1px;"><text id="svg-text-textsize" x="-100" y="-100"></text></svg> -->
  </div>
</template>

<script>
export default {
  name: 'Hauptfenster',
  props: ['transcript'],
  data () {
    return {
      unsaved: false
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    speichern () {
      console.log('ToDo: Transcript speichern ...')
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  #saveit {
    position: absolute;
    right: 35px;
    bottom: 160px;
  }
</style>
