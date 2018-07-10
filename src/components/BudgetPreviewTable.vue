<template>
  <div class="table-wrap">
    <base-table class="budget-data-table" v-bind="$attrs" :style="maxHeight?'max-height:'+maxHeight:''" :list="dataList">
      <template slot="header" slot-scope="i">
        <th>预算科目全称</th>
        <th>金额</th>
      </template>
      <template slot-scope="iData">
        <td>{{iData.item.yuke_a}}</td>
        <td>{{iData.item.jine && iData.item.jine.formatCurrency()}}</td>
      </template>
    </base-table>
  </div>

</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    maxHeight: {
      type: String,
      defualt: ''
    },
    year: Number | String,
    month: Number | String,
    company: String,
    center: String,
    centerClass: String,
    report: String
  },

  data () {
    return {
      dataList: [],
      defaultPage: 1
    }
  },
  methods: {
    loadDataList (page) {
      return this.$services.manage
        .getProblemDataList({
          work: 'yusuan',
          params: {
            year: this.year,
            month: +this.month < 10 ? '0' + this.month : this.month,
            company: this.company,
            chengben: this.center,
            chenglei: this.centerClass,
            baobiao: this.report
          }
        })
        .then(res => {
          this.dataList = res.data
        })
        .catch(err => {
          return Promise.reject(err)
        })
    },
    load () {
      return this.loadDataList(this.defaultPage)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
