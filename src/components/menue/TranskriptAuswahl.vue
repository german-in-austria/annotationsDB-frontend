<template>
  <div :class="{'selgroup': true, 'loading': transcripts.loading}" v-if="transcripts.ready">
    <h4>Transkript:</h4>
    <div class="input-group mit10 mib10">
      <select size="1" class="form-control" v-model="aInformant">
        <option value="0">Informant</option>
        <option v-for="informantMitTranskripte in transcripts.infTransList" :key="'i' + informantMitTranskripte.pk"
          :value="informantMitTranskripte.pk"
          :class="{'active': selectedInformantenPk.indexOf(informantMitTranskripte.pk) > -1 }">
          {{informantMitTranskripte.modelStr}} - {{informantMitTranskripte.transcriptsPk.length}} Transkripte
        </option>
      </select>
      <div class="input-group-addon np"><button @click="updateTranscripts()" :title="updateTime"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></div>
    </div>
    <ul v-if="aInformant > 0" class="lmfa-l">
      <li v-for="aTranskriptPk in transcripts.infTransObj[aInformant].transcriptsPk" :key="'t' + aTranskriptPk">
        <a href="#"
          v-on:click.prevent="getTranskript(transcripts.transcriptsObj[aTranskriptPk].pk)"
          v-bind:class="{ lmfabc: true, open: (selectedTranscriptPk === transcripts.transcriptsObj[aTranskriptPk].pk) }"
          :title="'PK: ' + transcripts.transcriptsObj[aTranskriptPk].pk + '\nUpdate: ' + transcripts.transcriptsObj[aTranskriptPk].updateTime + ' Uhr'"
        >{{ transcripts.transcriptsObj[aTranskriptPk].name }}<span>{{ transcripts.transcriptsObj[aTranskriptPk].tokenCount.toLocaleString() }}</span></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TranskriptAuswahl',
  props: ['transcripts', 'selectedTranscriptPk'],
  data () {
    return {
      aInformant: 0
    }
  },
  computed: {
    updateTime () {
      return (this.transcripts.time ? this.transcripts.time.toISOString() : '...')
    },
    selectedInformantenPk () {
      let aSelInfPk = []
      for (let aInfKey in this.transcripts.infTransList) {
        if (this.transcripts.infTransList.hasOwnProperty(aInfKey)) {
          let aInf = this.transcripts.infTransList[aInfKey]
          if (aInf.transcriptsPk.indexOf(this.selectedTranscriptPk) > -1) {
            aSelInfPk.push(aInf.pk)
          }
        }
      }
      return aSelInfPk
    }
  },
  methods: {
    updateTranscripts () {
      this.transcripts.update()
    },
    getTranskript (lTranscriptPk) {
      this.$emit('loadTranscript', lTranscriptPk)
    }
  }
}
</script>

<style scoped>
  div.loading {
  }
  option.active {
    font-weight: bold;
    color: #000;
  }
</style>
