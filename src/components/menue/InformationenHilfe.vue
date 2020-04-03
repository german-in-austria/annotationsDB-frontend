<template>
  <div v-bind:class="{'infpanel': true, 'open': showAllgeInfo}">
    <a href="#" v-on:click.prevent="showAllgeInfo=!showAllgeInfo"><b>Allgemeine Informationen</b><span :class="'glyphicon glyphicon-' + ((showAllgeInfo)?'eye-open':'eye-close') + ' pull-right'" aria-hidden="true"></span></a>
    <div v-if="showAllgeInfo">
      <b>Navigation:</b><br>
      <dl>
        <dt>Pfeil links/rechts</dt><dd>Vorherigen/Nächsten Token auswählen</dd>
        <dt>Pfeil hoch/runter</dt><dd>Vorherigen/Nächsten Informanten/Zeile auswählen</dd>
        <dt>Enter</dt><dd>Aktuellen Token öffnen</dd>
        <dt>Strg + A</dt><dd>TokenSet durchwählen.</dd>
        <dt>Strg + Shift + A</dt><dd>TokenSet rückwärts durchwählen.</dd>
        <dt>Strg + Q</dt><dd>TokenSet Auswahl aufheben.</dd>
        <dt>Strg + Enter</dt><dd>Aktuelles TokenSet öffnen</dd>
      </dl>
      <b>Auswahl:</b><br>
      <dl>
        <dt>Shift</dt><dd>Auswahlbereich</dd>
        <dt>Strg</dt><dd>Auswahlliste</dd>
        <dt>Strg + D</dt><dd>Auswahl aufheben</dd>
      </dl>
      <b>Suche:</b><br>
      <dl>
        <dt>Strg + F</dt><dd>Suchfeld öffnen/auswählen</dd>
        <dt>F3</dt><dd>Nächstes Suchergebniss</dd>
        <dt>Shift + F3</dt><dd>Vorheriges Suchergebniss</dd>
      </dl>
      <b>Audioplayer:</b><br>
      <dl>
        <dt>Strg + leer</dt><dd>Abspielen/Pause</dd>
        <dt>Strg + Y</dt><dd>Zum Anfang springen</dd>
        <dt>Strg + X</dt><dd>Zum Ende springen</dd>
        <dt>Strg + 2</dt><dd>10 Sekunden weiter</dd>
        <dt>Strg + 3</dt><dd>10 Sekunden zurück</dd>
        <dt>Strg + 1</dt><dd>na</dd>
        <dt>Strg + 4</dt><dd>na</dd>
        <dt>Strg + Links Klick</dt><dd>Zu Position springen</dd>
      </dl>
      <b>Allgemein:</b><br>
      <dl>
        <dt>⌘ Command / ⊞ Windows</dt><dd>Können als Alternative zur Strg-Taste verwendet werden!</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationenHilfe',
  data () {
    return {
      showAllgeInfo: false
    }
  }
}
</script>

<style scoped>
</style>
