<template>
  <history-data-manager class="journal-data-wrap" :id="id" title="序时账数据" :total="total" :update-time="updateTime" @change="loadData">
    <journal-data-table ref="journalTable" @loadedheader="setBaseData" @loadeddata="setData"></journal-data-table>
  </history-data-manager>
</template>

<script>
import HistoryDataManager from '@/components/HistoryDataManager'
import JournalDataTable from '@/components/JournalDataTable'
export default {
  data () {
    return {
      id: null,
      clearDataDialogDisplay: false,
      addDataDialogDisplay: false,
      total: 0,
      updateTime: new Date()
    }
  },
  methods: {
    setBaseData (data) {
      this.id = data.id
      this.updateTime = new Date(data.utime * 1000)
    },
    setData (data) {
      this.total = data.total
    },
    loadData () {
      this.$refs.journalTable.reload()
    }
  },
  components: {
    JournalDataTable,
    HistoryDataManager
  }
}
</script>

<style lang="scss" scoped>
.journal-data-wrap {
}
</style>
