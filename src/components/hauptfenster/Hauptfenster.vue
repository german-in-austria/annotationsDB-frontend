<template>
  <div class="hauptfenster h100">
    <div class="container" v-if="!transcript"><div class="alert alert-warning mt-5">Kein Transkript ausgewählt!</div></div>
    <div class="container" v-else-if="transcript.error"><div class="alert alert-danger mt-5">Fehler beim Laden des Transcripts: {{ transcript.pk }}!</div></div>
    <div class="container" v-else-if="!transcript.ready"><div class="alert alert-info mt-5">Transkript({{ transcript.pk }}) wird geladen!</div></div>
    <div id="svgscroller" class="h100 mcon vscroller" v-else>
      <!--   {% include "AnnotationsDB/annotationsvg.html" %} -->
      <button @click="speichern()" id="saveit" v-bind:class="{ btn: true, 'btn-success': true, disabled: !unsaved }"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Speichern</button>
      <div id="loadsym" v-if="transcript.loading">
        <span class="glyphicon glyphicon-refresh gly-spin" aria-hidden="true"></span>
        <div v-if="!transcript.loaded">{{ parseInt(99 / transcript.lMaxSet * transcript.lSet) }} %</div>
      </div>
    </div>
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
  #loadsym {
    position: absolute;
    text-align: center;
    right: 25px;
    top: 5px;
    color: #00f;
    font-size: 24px;
  }
  #loadsym>div {
    background: #f9fdc6ad;
    font-size: 16px;
    min-width: 50px;
    border-radius: 3px;
    padding: 2px 5px;
  }
</style>
