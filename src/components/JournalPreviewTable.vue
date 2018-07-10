<template>
  <div class="table-wrap">
    <base-table class="journal-data-table" v-bind="$attrs" style="min-width: 500px;" :style="maxHeight?'max-height:'+maxHeight:''" :list="dataList">
      <template slot="header" slot-scope="i">
        <th>凭证号</th>
        <th>科目编号</th>
        <th>科目名称</th>
        <th>摘要</th>
        <th>金额</th>
        <th>借贷</th>
      </template>
      <template slot-scope="iData">
        <td>{{iData.item.xushi_a}}</td>
        <td>{{iData.item.caike_a}}</td>
        <td>{{iData.item.caike_d}}</td>
        <td>{{iData.item.xushi_c}}</td>
        <td>{{iData.item.jine && iData.item.jine.formatCurrency()}}</td>
        <td>{{iData.item.xushi_e}}</td>
      </template>
    </base-table>
  </div>

</template>
<script>
export default {
  props: {
    inheritAttrs: false,
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
      console.log('loadList')
      return this.$services.manage
        .getProblemDataList({
          work: 'xushizhang',
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
          console.log('loadedList')
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
