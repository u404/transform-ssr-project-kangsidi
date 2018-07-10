<template>
  <div class="summary-data-wrap">
    <div class="base-main-title">汇总列表&gt;</div>
    <div class="base-main-panel">
      <div class="control-bar">
        <div class="time-filter-box flex">
          <base-select class="year-select" placeholder="请选择年" :options="selectYearCount" :base-number="selectYearBase" :selected="selectedYear" @change="value=>selectedYear=value"></base-select>
          <base-select class="month-select" placeholder="请选择月" :options="12" :selected="selectedMonth" @change="value=>selectedMonth=value"></base-select>
          <span class="tips">提示：请同时选择年和月份后进行筛选</span>
        </div>
        <div class="btn-box flex">
          <button class="base-btn base-line-btn query-btn" @click="query">查阅</button>
        </div>
      </div>
      <summary-data-table :year="selectedYear" :month="selectedMonth" ref="summaryTable"></summary-data-table>
    </div>
  </div>
</template>

<script>
import utils from '@/assets/scripts/utils'
import SummaryDataTable from '@/components/SummaryDataTable'
export default {
  props: {},
  data () {
    return {
      selectedYear: '',
      selectedMonth: ''
    }
  },
  computed: {
    selectYearBase () {
      return this.$config.selectBeginDate.getFullYear() - 1
    },
    selectYearCount () {
      return this.$config.selectEndDate.getFullYear() - this.selectYearBase
    }
  },
  methods: {
    query () {
      if (this.selectedYear && this.selectedMonth) {
        this.$refs.summaryTable.load()
        this.setCache()
      } else {
        this.$dialog.alert({
          type: 'error',
          msg: '请同时选择年月后<br/>再进行“查阅”操作'
        })
      }
    },
    setCache () {
      utils.localStorage.set('summaryData', {
        selectedYear: this.selectedYear,
        selectedMonth: this.selectedMonth
      })
    },
    getCache () {
      let data = utils.localStorage.get('summaryData')
      console.log('cache', data)
      if (data) {
        this.selectedYear = data.selectedYear
        this.selectedMonth = data.selectedMonth
        return true
      }
      return false
    },
    sure () {
      this.confirmDisplay = false
      this.$dialog.alert({ msg: '填写正确', type: 'success' })
    }
  },
  mounted () {
    if (this.getCache()) {
      this.$nextTick(() => {
        this.query()
      })
    }
  },
  components: {
    SummaryDataTable
  }
}
</script>

<style lang="scss" scoped>
.summary-data-wrap {
  .control-bar {
    @include flex();
    height: 72px;
    padding: 0 $margin-default;
    .time-filter-box {
      select,
      option {
        height: 22px;
      }
      .year-select,
      .month-select {
        margin-right: 8px;
        width: 90px;
      }
      .month-select {
        margin-right: 0;
      }
      .tips {
        margin-left: 16px;
        padding-left: 24px;
        line-height: 18px;
        color: $color-warning-text;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 18px;
          height: 18px;
          background: url(../assets/images/icons.png) 0 -40px no-repeat;
        }
      }
    }
    .btn-box {
      .query-btn {
        @include btn-size(80px, 25px);
      }
      .report-btn {
        @include btn-size(130px, 25px);
        margin-left: $margin-default;
      }
    }
  }
  .build-dialog {
    .form-item {
      @include flex($jus: center);
      .form-label {
        width: 75px;
        font-size: $font-default;
      }
      .form-input {
        width: 146px;
        height: 24px;
      }
      &:nth-child(n + 2) {
        margin-top: 14px;
      }
    }
  }
  .input-error-tips {
    .tips-label {
      padding-left: 20px;
      color: $color-error;
    }
    .tips-content-wrap {
      margin-top: 15px;
      font-size: 12px;
      @include flex($jus: center, $ali: flex-start);
      text-align: left;
    }
  }
}
</style>
