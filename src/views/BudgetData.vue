<template>
  <history-data-manager class="budgete-data-wrap" :id="id" title="预算数据" :only-year-select="true" :total="total" :update-time="updateTime" @change="loadData">
    <budget-data-table ref="budgetTable" @loadedheader="setBaseData" @loadeddata="setData"></budget-data-table>
  </history-data-manager>
</template>

<script>
import HistoryDataManager from '@/components/HistoryDataManager'
import BudgetDataTable from '@/components/BudgetDataTable'
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
      this.$refs.budgetTable.reload()
    }
  },
  components: {
    BudgetDataTable,
    HistoryDataManager
  }
}
</script>

<style lang="scss" scoped>
.journal-data-wrap {
}
</style>
