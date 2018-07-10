<template>
  <div class="table-wrap">
    <base-table class="preview-table" :list="dataList">
      <template slot="header" slot-scope="i">
        <th v-for="item in thList" :key="item">{{item}}</th>
      </template>
      <template slot-scope="iData">
        <td v-for="(val,key) of iData.item" :key="'td-'+key">{{val}}</td>
      </template>
    </base-table>
    <base-pager :count="pageCount" :default="defualtPage" @pagechange="loadDataList"></base-pager>
  </div>

</template>
<script>
export default {
  props: {
    id: Number,
    thList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dataList: [],
      defualtPage: 1,
      pageCount: 1
    }
  },
  beforeMount () {
    if (this.id) {
      this.loadDataList(this.defualtPage)
    }
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
          this.dataList = res.data.data
          this.pageCount = res.datta.last_page
        })
        .catch(() => {
          this.$loading.close()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
