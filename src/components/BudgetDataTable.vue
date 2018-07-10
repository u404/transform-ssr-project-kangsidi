<template>
  <div class="table-wrap">
    <base-table class="budget-data-table" v-bind="$attrs" :list="dataList">
      <template slot="header" slot-scope="i">
        <th v-for="item in thList" :key="item">{{item}}</th>
      </template>
      <template slot-scope="iData">
        <td v-for="(val,key) of iData.item" :key="'td-'+key">{{val && (key==='e'?val.formatCurrency():val) }}</td>
      </template>
    </base-table>
    <base-pager ref="pager" :count="pageCount" :default="defaultPage" @pagechange="loadDataList"></base-pager>
  </div>

</template>
<script>
export default {
  inheritAttrs: false,
  props: {},
  data () {
    return {
      thList: [],
      dataList: [],
      defaultPage: 1,
      pageCount: 1,
      id: null
    }
  },
  beforeMount () {
    this.$services.manage.getBudgetDataHeader().then(res => {
      this.$emit('loadedheader', res.data[0])
      this.thList = res.data[0].column_names.split(',')
      this.id = res.data[0].id
      this.loadDataList(this.defaultPage)
    })
  },
  methods: {
    loadDataList (page) {
      this.$loading({
        title: '正在加载',
        msg: '正在加载数据，请稍后...'
      })
      this.$services.manage
        .getPreviewDataList({
          config_id: this.id,
          page: page
        })
        .then(res => {
          this.$loading.close()
          this.pageCount = res.data.last_page
          this.dataList = res.data.data
          this.$emit('loadeddata', res.data)
        })
        .catch(err => {
          this.$loading.close()
          this.$dialog.alert({
            type: 'error',
            msg: err.msg
          })
        })
    },
    reload () {
      this.$refs.pager.reset(true)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
