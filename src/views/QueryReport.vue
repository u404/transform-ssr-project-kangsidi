<template>
  <div class="query-report-wrap">
    <div class="base-main-title">查询报告&gt;</div>
    <!-- <div class="base-main-panel">
      <query-config-table ref="paramTable"></query-config-table>
    </div> -->
    <div class="base-main-panel">
      <!-- <div class="panel-title">查询报告</div> -->
      <div class="query-box">
        <date-from-to-select class="form-item select-group" :only-year-select="true" :selected="selectedDate" @change="v=>{selectedDate=v}" from-year-placeholder="请选择开始年" to-year-placeholder="请选择结束年"></date-from-to-select>
        <div class="btn-group">
          <button class="base-btn export-btn" @click="exportReport">导出报表</button>
        </div>
      </div>
      <div class="report-iframe-box">
        <div class="report-warning-tips">
          暂不支持可视化查询报告功能，请在BI下查看报告！
        </div>
        <iframe class="report-iframe" :src="iframeSrc" frameborder="1" v-show="iframeSrc"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import DateFromToSelect from '@/components/DateFromToSelect'
import QueryConfigTable from '@/components/QueryConfigTable'
export default {
  data () {
    return {
      iframeSrc: '',
      selectedDate: {},
      configList: []
    }
  },
  methods: {
    exportReport () {
      if (!this.selectedDate.fromYear || !this.selectedDate.toYear) {
        this.$dialog.alert({
          type: 'error',
          msg: '请选择时间范围'
        })
        return
      }
      // let paramObj = {}
      // this.$refs.paramTable.dataList.forEach(item => {
      //   paramObj[item.name] = item.val
      // })

      this.$loading({
        title: '导出报表',
        msg: '正在生成报表文件，请稍后...'
      })
      this.$services.manage
        .exportReport({
          work: 'chaxunbaobiao',
          params: {
            start_year: this.selectedDate.fromYear,
            end_year: this.selectedDate.toYear
            // ...paramObj,
            // chengben: paramObj.chengbenzhongxin,
            // chenglei: paramObj.chengbenleibie
          }
        })
        .then(() => {
          this.$loading.close()
        })
        .catch(err => {
          this.$loading.close()
          this.$dialog.alert({
            type: 'error',
            msg: err.msg || '服务器错误，请稍后重试'
          })
        })
    }
  },
  components: {
    QueryConfigTable,
    DateFromToSelect
  }
}
</script>
<style lang="scss" scoped>
.query-report-wrap {
  .base-main-panel {
    padding: 10px;
    .panel-title {
      margin-top: 5px;
      margin-bottom: 15px;
      padding-left: 10px;
      font-size: $font-h6;
      font-weight: bold;
      line-height: 1;
      color: $color-active-light;
      border-left: 5px solid $color-active-light;
    }
    .query-box {
      margin-bottom: 8px;
      @include flex;
      /deep/ .select-group {
        @include flex;
        width: 224px;
        .split-line {
          color: $color-input-border;
        }
        .base-select {
          width: 100px;
          height: 22px;
          font-size: 12px;
        }
      }
      .btn-group {
        .export-btn {
          @include btn-size(110px, 25px);
        }
      }
    }
    .report-iframe-box {
      @include flex($jus: center);
      width: 100%;
      height: 625px;
      border: 1px solid $color-input-border;
      .report-warning-tips {
        line-height: 32px;
        padding-left: 42px;
        font-size: $font-h6;
        font-weight: bold;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          background: url(../assets/images/icons.png) 0 -145px no-repeat;
        }
      }
      .report-iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }
}
</style>
