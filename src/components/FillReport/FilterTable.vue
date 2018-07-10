<template>
  <div class="table-wrap">
    <base-table class="filter-data-table" :list="dataList">
      <template slot="header" slot-scope="i">
        <th style="width: 1.2%;">成本中心类别</th>
        <th>成本中心编码</th>
        <th style="width: 1.5%;">中心名称</th>
        <th style="width: 1.3%;">bugdet</th>
        <th style="width: 1.3%;">actual</th>
        <th style="width: 1.3%;">variance</th>
        <th style="width: 1.3%;">variance%</th>
        <th>需解释</th>
        <th>待解释</th>
        <th style="width: 1.4%;">创建时间</th>
        <th>状态</th>
        <th style="width: 1.2%;">操作</th>
      </template>
      <template slot-scope="iData">
        <td>{{iData.item.chenglei}}</td>
        <td>{{iData.item.chengben}}</td>
        <td>{{iData.item.chengbenming}}</td>
        <td>{{iData.item.budget && iData.item.budget.formatCurrency()}}</td>
        <td>{{iData.item.actual && iData.item.actual.formatCurrency()}}</td>
        <td>{{iData.item.variance && iData.item.variance.formatCurrency()}}</td>
        <td>{{iData.item.variance_percent === null? '': iData.item.variance_percent + '%'}}</td>
        <td>{{iData.item.sum_is_report}}</td>
        <td :class="{error: iData.item.sum_no_report > 0}">{{iData.item.sum_no_report}}</td>
        <td>{{iData.item.utime}}</td>
        <td>{{iData.item.status}}</td>
        <td class="base-center">
          <span class="base-table-btn" @click="redirect(iData.item.chengben, iData.item.chenglei, true)">预览</span>
          <span class="base-table-btn" @click="redirect(iData.item.chengben, iData.item.chenglei, false)">编辑</span>
        </td>
      </template>
    </base-table>
    <base-pager :count="pageCount" :default="defaultPage" @pagechange="loadDataList"></base-pager>
  </div>

</template>

<script>
export default {
  props: {
    year: Number | String,
    month: Number | String,
    company: Number | String,
    variance: Number | String,
    variancePer: Number | String,
    builded: Boolean
  },
  data () {
    return {
      dataList: [],
      pageCount: 1,
      defaultPage: 1
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
          work: 'wentiliebiao',
          page: page,
          params: {
            year: this.year,
            month: this.month < 10 ? '0' + this.month : this.month,
            company: this.company
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
    },
    redirect (center, centerClass, preview) {
      this.$router.push({
        name: preview ? 'FillReportPreview' : 'FillReportEdit',
        query: {
          year: this.year,
          month: this.month,
          company: this.company,
          center: center,
          centerClass: centerClass
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  .filter-data-table {
    td.error {
      font-weight: bold;
      color: $color-error-2;
    }
  }
}
</style>
