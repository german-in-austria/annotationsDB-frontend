<template>
  <div :class="{'selgroup': true, 'loading': transcripts.loading}" v-if="transcripts.ready">
    <h4>Transkript:</h4>
    <div class="input-group mit10 mib10">
      <select size="1" class="form-control" v-model="aInformant" :disabled="transcripts.loading">
        <option value="0">Informant</option>
        <option v-for="infWithTrans in infTransListFilteredAndSorted" :key="'i' + infWithTrans.pk"
          :value="infWithTrans.pk"
          :class="{'active': selectedInformantenPk.indexOf(infWithTrans.pk) > -1 }">
          {{infWithTrans.modelStr}} - {{infWithTrans.transcriptsPKs.length}} Transkripte
        </option>
      </select>
      <div class="input-group-addon np"><button @click="updateTranscriptsInfList()" :title="updateTime" class="uptrans" :disabled="transcripts.loading"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button></div>
    </div>
    <ul v-if="aInformant > 0" class="lmfa-l">
      <li v-for="aTranskriptPk in transcripts.infTransObj[aInformant].transcriptsPKs" :key="'t' + aTranskriptPk">
        <a href="#"
          @click.prevent="getTranskript(transcripts.transcriptsObj[aTranskriptPk].pk)"
          :class="'wb-all lmfabc' + ((selectedTranscriptPk === transcripts.transcriptsObj[aTranskriptPk].pk) ? ' open' : '')"
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
    infTransListFiltered () {
      return this.transcripts.infTransList.filter(aItl => aItl.transcriptsPKs.length > 0)
    },
    infTransListFilteredAndSorted () {
      let sortedList = this.infTransListFiltered.slice()
      return sortedList.sort(function (a, b) {
        var sigleA = a.modelStr.toLowerCase()
        var sigleB = b.modelStr.toLowerCase()
        return sigleA < sigleB ? -1 : sigleA > sigleB ? 1 : 0
      })
    },
    updateTime () {
      return (this.transcripts.time ? this.transcripts.time.toISOString() : '...')
    },
    selectedInformantenPk () {
      let aSelInfPk = []
      for (let aInfKey in this.transcripts.infTransList) {
        if (this.transcripts.infTransList.hasOwnProperty(aInfKey)) {
          let aInf = this.transcripts.infTransList[aInfKey]
          if (aInf.transcriptsPKs.indexOf(this.selectedTranscriptPk) > -1) {
            aSelInfPk.push(aInf.pk)
          }
        }
      }
      return aSelInfPk
    }
  },
  methods: {
    updateTranscriptsInfList () {
      if (!this.transcripts.loading) {
        this.transcripts.update()
      }
    },
    getTranskript (lTranscriptPk) {
      if (!this.transcripts.loading) {
        this.$emit('loadTranscript', lTranscriptPk)
      }
    }
  }
}
</script>

<style scoped>
  option.active {
    font-weight: bold;
    color: #000;
  }
  .selgroup.loading .lmfabc {
    color: #bbb !important;
    background-color: #eee !important;
    cursor: default;
  }
  .selgroup.loading .uptrans .glyphicon {
    -webkit-animation: spin 2s infinite linear;
    -moz-animation: spin 2s infinite linear;
    -o-animation: spin 2s infinite linear;
    animation: spin 2s infinite linear;
  }
  .lmfabc {
    position: relative;
  }
  .lmfabc.open {
    background: #555;
    color: #eee;
  }
  .lmfabc.open::before {
    content: '';
    position: absolute;
    top: 0;
    left: -4px;
    width: 2px;
    height: 100%;
    background: #999;
  }
</style>
