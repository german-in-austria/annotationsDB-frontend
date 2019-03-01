<template>
  <div class="suchenundfiltern">
    <!-- <div class="btngroup" v-if="annotationsTool.aPK>0">
      <button @click="showSuche=!showSuche;" v-bind:class="{tfxbtn: true, open: showSuche}"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
      <button @click="showFilter=!showFilter;" v-bind:class="{tfxbtn: true, open: showFilter}"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>
      <button @click="showTagEbene=!showTagEbene;" v-bind:class="{tfxbtn: true, open: showFilter}"><span class="glyphicon glyphicon-list" aria-hidden="true"></span></button>
    </div>
    <div class="suchgroup" v-if="annotationsTool.aPK>0 && showSuche">
      {% include "AnnotationsDB/annotationssuche.html" %}
    </div>
    <div class="filtergroup" v-if="annotationsTool.aPK>0 && showFilter">
      <h4>Filter:<a href="#" v-on:click.prevent="showFilter=false" class="pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4>
      <b>Informanten:</b>
        <label v-for="(aInfVal, aInfKey) in aInformanten">${ ((aInfVal.i)?', ':'') }<input type="checkbox" @click="debouncedUpdateInfShow();focusFocusCatch();" v-model="aInfVal.show">&nbsp;${ aInfVal.k }</label>
      <hr>
    </div>
    <div class="taggroup" v-if="annotationsTool.aPK>0 && showTagEbene">
      <h4>Tagebene anzeigen:<a href="#" v-on:click.prevent="showTagEbene=false" class="pull-right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4>
      <select size="1" class="form-control" v-model="previewTagEbene" v-if="!tagCache.loadingBase">
        <option v-for="(aEbene, aEbeneKey) in tagCache.baseCache.tagebenen" :value="aEbene.pk">${ aEbene.t }</option>
      </select>
      <hr>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'SuchenUndFiltern',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
