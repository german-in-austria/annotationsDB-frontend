<template>
  <div class="hauptfenster">
    <!-- <div id="svgscroller" class="h100 mcon vscroller">
      {% include "AnnotationsDB/annotationsvg.html" %}
      <button @click="speichern()" id="saveit" v-bind:class="{ btn: true, 'btn-success': true, disabled: !unsaved }" v-if="annotationsTool.aPK>0"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Speichern</button>
    </div>
    <svg style="position:absolute;right:0px;bottom:0px;width:1px;height:1px;"><text id="svg-text-textsize" x="-100" y="-100"></text></svg> -->
  </div>
</template>

<script>
export default {
  name: 'Hauptfenster',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
