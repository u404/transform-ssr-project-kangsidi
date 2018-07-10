<template>
  <div class="source-preview-wrap">
    <div class="base-main-title">基础数据&gt;</div>
    <div class="base-main-panel">
      <div class="table-header">
        <div class="table-title">{{tableTitle}}预览</div>
      </div>
      <preview-table :id="id" :thList="thList"></preview-table>
    </div>

  </div>
</template>

<script>
import PreviewTable from '@/components/SourceData/PreviewTable'
export default {
  props: {
    id: Number
  },
  data () {
    return {
      thList: [],
      tableTitle: ''
    }
  },
  beforeMount () {
    this.$services.manage.getSourceWorkTableList().then(res => {
      let tableBase = res.data.find(item => {
        return item.id === this.id
      })
      this.thList = tableBase.column_names.split(',')
      this.tableTitle = tableBase.sheet_name
    })
  },
  methods: {},
  components: {
    PreviewTable
  }
}
</script>

<style lang="scss" scoped>
.source-preview-wrap {
  .table-header {
    padding: 20px 0;
    .table-title {
      font-size: $font-h6;
      line-height: 1;
    }
  }
}
</style>
