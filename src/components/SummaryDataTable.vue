<template>
  <div class="table-wrap">
    <base-table class="summary-data-table" :list="dataList">
      <template slot="header" slot-scope="i">
        <th>公司</th>
        <th>状态</th>
      </template>
      <template slot-scope="iData">
        <td>{{iData.item.gongsi_sx}}</td>
        <td>{{iData.item.status}}</td>
      </template>
    </base-table>
    <base-pager :count="pageCount" :default="defaultPage" @pagechange="loadDataList"></base-pager>
  </div>

</template>
<script>
export default {
  props: {
    year: Number | String,
    month: Number | String
  },
  data () {
    return {
      dataList: [],
      defaultPage: 1,
      pageCount: 1
    }
  },
  methods: {
    loadDataList (page) {
      this.$loading({
        title: '正在加载',
        msg: '正在加载数据，请稍后...'
      })
      this.$services.manage
        .getProblemDataList({
          work: 'huizongliebiao',
          page: page,
          params: {
            year: this.year,
            month: this.month < 10 ? '0' + this.month : this.month
          }
        })
        .then(res => {
          this.$loading.close()
          this.dataList = res.data
        })
        .catch(err => {
          this.$loading.close()
          this.$dialog.alert({
            type: 'error',
            msg: err.msg
          })
        })
    },
    load () {
      this.loadDataList(this.defaultPage)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
