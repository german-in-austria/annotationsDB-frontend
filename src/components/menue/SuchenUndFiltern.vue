<template>
  <div class="suchenundfiltern">
    <div class="btngroup" v-if="transcript && transcript.ready">
      <button @click="showSuche=!showSuche" :class="{tfxbtn: true, open: showSuche}" title="Suche"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
      <button @click="showFilter=!showFilter" :class="{tfxbtn: true, open: showFilter}" title="Filter"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>
      <button @click="showTagEbene=!showTagEbene" :class="{tfxbtn: true, open: showTagEbene}"><span class="glyphicon glyphicon-list" aria-hidden="true"></span></button>
      <button @click="showStatisticModal=true" class="tfxbtn" style="float: right;" title="Statistik"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></button>
    </div>
    <SuchenUndFilternSuche ref="suchenUndFilternSuche" :transcript="transcript" @close-suche="showSuche=false" v-if="transcript && transcript.ready && showSuche"/>
    <SuchenUndFilternFilter ref="suchenUndFilternFilter" :transcript="transcript" @close-filter="showFilter=false" v-if="transcript && transcript.ready && showFilter"/>
    <SuchenUndFilternTagebene ref="suchenUndFilternTagebene" :transcript="transcript" @close-tagebene="showTagEbene=false" v-if="transcript && transcript.ready && showTagEbene"/>
    <Modal ref="modal" @close="showStatisticModal=false;showStatisticModalReady=false" @shown="showStatisticModalReady=true" v-if="showStatisticModal && transcript && transcript.ready">
      <template v-slot:title>Transkript Statistik</template>
      <div v-if="transcript.loading"><b>Transkript läd noch!</b></div>
      <div ref="transstat" :class="{transstat: true, loading: transcript.loading}">
        <span class="dnone">Transkript Statistik#br##br#</span>
        <div class="wb-all"><b>Name:</b> {{ transcript.aTranskript.n }}</div><span class="dnone">#br#</span>
        <div><b>Informanten:</b> <span v-for="(aInf, aInfKey) in transcript.aInformanten.informantenList" :key="aInfKey" :title="'Anonym: '+aInf.ka+' - ID: '+aInfKey">{{ ((aInf.i)?', ':'')+aInf.k }}</span></div><span class="dnone">#br#</span>
        <div><b>Events:</b> {{ transcript.aEvents.length.toLocaleString() }}</div><span class="dnone">#br#</span>
        <div>
          <b>Tokens:</b>
          <span :title="tokenCountByInf">{{ transcript.aTokens.length.toLocaleString() }}</span>
          <span v-if="transcript.aTokens.length < transcript.aTranskript.tokenCount">/ {{ transcript.aTranskript.tokenCount.toLocaleString() }}</span>
        </div><span class="dnone">#br#</span>
        <div><b>Default Spur:</b> {{ transcript.aTranskript.dt }}</div><span class="dnone">#br#</span>
        <div><b>Tiers:</b>
          <span v-for="(aTier, aKey) in transcript.aTranskript.tiers" :key="'it-t' + aKey" :title="'ID: ' + aTier.pk">{{ (aKey > 0 ? ', ' : '') + aTier.tier_name }}</span>
        </div><span class="dnone">#br#</span>
        <div v-for="(aInf, aInfKey) in transcript.aInformanten.informantenList" :key="'stat-' + aInfKey">
          <hr><span class="dnone">----------#br#</span>
          <div><b>Informant:</b> {{ aInf.k }}</div><span class="dnone">#br#</span>
          <div>
            <b>Tokens:</b> {{ transcript.aTokens.tokenLists.byInf[aInf.pk].length.toLocaleString() }}<span class="dnone">&nbsp;</span>
            <span v-for="(aSpur, aSpurKey) in tokensDataByInformant[aInf.pk].spuren" :key="'as' + aSpurKey"> - {{ aSpur.count.toLocaleString() }} <i>{{ aSpur.title }}</i></span>
          </div><span class="dnone">#br#</span>
          <div><b>Events:</b> {{ eventsByInformant[aInf.pk].events.length.toLocaleString() }}</div><span class="dnone">#br#</span>
          <div><b>Events Dauer:</b> {{ eventsByInformant[aInf.pk].durationStr }}</div><span class="dnone">#br#</span>
        </div>
      </div>
      <template v-slot:addButtons>
        <button @click="exportCsv" class="btn btn-primary" tabindex="9999" v-if="!transcript.loading">Export Token Statistik als XLSX</button>
        <a :href="exportTxtUrl" :download="'transkript_statistik_' + transcript.pk + '.txt'" target="_blank" @click="exportTxt" class="btn btn-primary" tabindex="9999" v-if="!transcript.loading && exportTxtUrl">Export Übersicht als TXT</a>
      </template>
    </Modal>
  </div>
</template>

<script>
import AllgemeineFunktionen from '@/functions/allgemein/Allgemein'
import SuchenUndFilternSuche from './SuchenUndFilternSuche'
import SuchenUndFilternFilter from './SuchenUndFilternFilter'
import SuchenUndFilternTagebene from './SuchenUndFilternTagebene'
import Modal from '../modal/Modal'

const XLSX = require('xlsx')

export default {
  name: 'SuchenUndFiltern',
  props: ['transcript'],
  data () {
    return {
      showSuche: false,
      showFilter: false,
      showTagEbene: false,
      showStatisticModal: false,
      showStatisticModalReady: false
    }
  },
  mounted () {
  },
  methods: {
    focusSuche () {
      this.showSuche = true
      this.$nextTick(() => { this.$refs.suchenUndFilternSuche.$refs.suchtext.focus() })
    },
    exportCsv () {
      if (this.showStatisticModalReady) {
        // console.log('exportCsvUrl', this.transcript)
        let aByInfs = this.transcript.aTokens.tokenLists.byInf
        let aTracks = {}
        let aTracksNames = []
        // let aDataByTrackAndInf = {}
        let aDataByTrackAndValAndInf = {}
        this.transcript.aTranskript.allTracks.forEach(t => {
          aTracks[t.field[0]] = t.title || t.field[0]
          aTracksNames.push(t.field[0])
          // aDataByTrackAndInf[t.field[0]] = {}
          aDataByTrackAndValAndInf[t.field[0]] = {}
        })
        let aDataByTrackAndValAndInfEmpty = { all: 0 }
        Object.keys(aByInfs).forEach(i => {
          aDataByTrackAndValAndInfEmpty[i] = 0
        })
        Object.keys(aByInfs).forEach(i => {
          // console.log(i, aByInfs[i])
          aTracksNames.forEach(t => {
            // aDataByTrackAndInf[t][i] = {}
            aByInfs[i].forEach(tok => {
              let aVal = tok[t] || 'empty'
              // if (!aDataByTrackAndInf[t][i][aVal]) {
              //   aDataByTrackAndInf[t][i][aVal] = 0
              // }
              // aDataByTrackAndInf[t][i][aVal] += 1
              if (!aDataByTrackAndValAndInf[t][aVal]) {
                aDataByTrackAndValAndInf[t][aVal] = Object.assign({}, aDataByTrackAndValAndInfEmpty)
              }
              aDataByTrackAndValAndInf[t][aVal][i] += 1
              aDataByTrackAndValAndInf[t][aVal].all += 1
            })
          })
        })
        // console.log(aDataByTrackAndValAndInf)
        var wb = XLSX.utils.book_new()
        wb.Props = {
          Title: 'Annotations DB Statistik für ' + this.transcript.aTranskript.n,
          Subject: 'ID: ' + this.transcript.pk,
          Author: 'DiÖ',
          CreatedDate: new Date()
        }
        Object.keys(aDataByTrackAndValAndInf).forEach(t => {
          wb.SheetNames.push(aTracks[t])
          var wsData = []
          wsData.push([aTracks[t], ...Object.keys(aDataByTrackAndValAndInfEmpty).map(i => (this.transcript.aInformanten.informantenObj[i] ? this.transcript.aInformanten.informantenObj[i].ka || this.transcript.aInformanten.informantenObj[i].k || i : i))])
          Object.keys(aDataByTrackAndValAndInf[t]).forEach(v => {
            let aLine = [v]
            Object.keys(aDataByTrackAndValAndInfEmpty).forEach(i => {
              aLine.push(aDataByTrackAndValAndInf[t][v][i])
            })
            wsData.push(aLine)
          })
          wb.Sheets[aTracks[t]] = XLSX.utils.aoa_to_sheet(wsData)
        })
        // console.log(this.transcript)
        // console.log(wb)
        let filename = 'transkript_statistik_' + this.transcript.pk + '.xlsx'
        XLSX.writeFile(wb, filename, {bookType: 'xlsx', type: 'binary', FS: ';'})
      }
    }
  },
  computed: {
    eventsByInformant () {
      let aData = {}
      this.transcript.aEvents.eventLists.all.forEach(aEvent => {
        aEvent.iPks.forEach(aInfPk => {
          if (!aData[aInfPk]) {
            aData[aInfPk] = {
              events: [],
              duration: 0.0
            }
          }
          if (aData[aInfPk].events.indexOf(aEvent) < 0) {
            aData[aInfPk].events.push(aEvent)
            aData[aInfPk].duration += AllgemeineFunktionen.durationToSeconds(aEvent.e) - AllgemeineFunktionen.durationToSeconds(aEvent.s)
          }
        })
      })
      Object.keys(aData).forEach(aKey => {
        aData[aKey].durationStr = AllgemeineFunktionen.secondsToDuration(aData[aKey].duration)
      })
      return aData
    },
    tokensDataByInformant () {
      let aData = {}
      this.transcript.aTokens.tokenLists.all.forEach(aToken => {
        if (!aData[aToken.i]) {
          aData[aToken.i] = {
            spuren: []
          }
        }
        this.transcript.allTracks.forEach(aTrack => {
          if (aTrack.title !== 'text_in_ortho' && aToken[aTrack.field[0]] && aToken[aTrack.field[0]].length > 0) {
            let aKey = -1
            aData[aToken.i].spuren.forEach(function (val, key) {
              if (val.title === aTrack.title) {
                aKey = key
              }
            })
            if (aKey < 0) {
              aData[aToken.i].spuren.push({title: aTrack.title, count: 1})
            } else {
              aData[aToken.i].spuren[aKey].count += 1
            }
          }
        })
      })
      Object.keys(aData).forEach(aKey => {
        aData[aKey].spuren.sort((a, b) => (a.count < b.count) ? 1 : -1)
      })
      return aData
    },
    exportTxtUrl () {
      if (this.showStatisticModalReady) {
        let aText = this.$refs.transstat.textContent
        aText = aText.replace(/(\r\n|\n|\r| {2,})/gm, '')
        aText = aText.replace(/#br#/gm, '\n')
        aText = aText.replace(/^ /gm, '')
        return 'data:text/csv;charset=utf-8,' + encodeURIComponent(aText)
      }
      return null
    }
  },
  components: {
    SuchenUndFilternSuche,
    SuchenUndFilternFilter,
    SuchenUndFilternTagebene,
    Modal
  }
}
</script>

<style scoped>
  .tfxbtn {
    background: #fff;
    margin: 5px 0px 0px 0px;
    padding-top: 5px;
    color: #2B5A84;
    border: none;
  }
  .tfxbtnt {
    margin-top: 0px;
    padding-top: 3px;
    padding-bottom: 3px;
    background: #eee;
  }
  .tfxbtn.open {
    background: #ddd;
    color: #272C31;
  }
  .tfxbtn:hover, .tfxbtn:focus {
    background: #555;
    color: #ddd;
    text-decoration: none;
  }
  .transstat.loading {
    opacity: 0.5;
  }
  .dnone {
    display: none;
  }
</style>
