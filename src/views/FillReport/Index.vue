<template>
  <div class="fill-report-wrap">
    <div class="base-main-title">填报列表&gt;</div>
    <div class="base-main-panel">
      <div class="control-bar">
        <div class="time-filter-box flex">
          <base-select class="year-select" placeholder="请选择年" :options="selectYearCount" :base-number="selectYearBase" :selected="selectedYear" @change="value=>selectedYear=value"></base-select>
          <base-select class="month-select" placeholder="请选择月" :options="12" :selected="selectedMonth" @change="value=>selectedMonth=value"></base-select>
          <base-select class="company-select" placeholder="请选择公司" :options="companyList" :selected="selectedCompany" @change="value=>selectedCompany=value"></base-select>
          <span class="tips">提示：请同时选择年、月份和公司后进行筛选</span>
        </div>
        <div class="btn-box flex">
          <button class="base-btn base-line-btn query-btn" @click="query">查阅</button>
          <button class="base-btn report-btn" @click="showBuildSetting">生成问题清单</button>
        </div>
      </div>
      <filter-table ref="filterTable" :year="selectedYear" :month="selectedMonth" :company="selectedCompany" :variance="variance" :variance-per="variancePer"></filter-table>
    </div>

    <base-confirm class="build-dialog" title="生成问题清单" :show="buildConfirmDisplay" @cancel="buildConfirmDisplay=false" @sure="tryBuild">
      <div class="form-item">
        <span class="form-label">variance</span>
        <input class="base-input form-input" type="text" placeholder="请输入数字" v-model="variance" />
      </div>
      <div class="form-item">
        <span class="form-label">variance%</span>
        <input class="base-input form-input" type="text" placeholder="请输入数字" v-model="variancePer" />
        <span class="form-text">%</span>
      </div>
    </base-confirm>

    <base-dialog class="confirm-dialog" :show="recoverConfirmDisplay" title="提示" :x="true" @close="recoverConfirmDisplay=false">
      <div class="confirm-dialog-msg">
        <p>问题清单已存在，</p>
        <p>是否继续生成并覆盖原始的问题清单结果？</p>
      </div>
      <template slot="footer">
        <div class="base-btn base-line-btn dialog-multi-btn" @click="recover">
          是
        </div>
        <div class="base-btn dialog-multi-btn" @click="recoverConfirmDisplay=false">
          否
        </div>
      </template>
    </base-dialog>

    <base-alert :show="varianceErrorDisplay" @sure="varianceErrorDisplay=false">
      <div class="input-error-tips">
        <div class="tips-title">请输入正确的数字！</div>
        <div class="tips-content-wrap">
          <div class="tips-label">注意：</div>
          <div class="tips-content">
            <p>variance输入框数字为非负数，</p>
            <p>且小于全局variance；</p>
            <p>variance%输入框数字在0-100之间，</p>
            <p>且小于全局variance%</p>
          </div>
        </div>
      </div>
    </base-alert>
  </div>
</template>

<script>
import utils from '@/assets/scripts/utils'
import FilterTable from '@/components/FillReport/FilterTable'
export default {
  data () {
    return {
      buildConfirmDisplay: false,
      recoverConfirmDisplay: false,
      companyList: [],
      selectedYear: '',
      selectedMonth: '',
      selectedCompany: '',
      needReloadConfig: true,
      variance: 0,
      variancePer: 0,
      globalVariance: 0,
      globalVariancePer: 0,
      varianceErrorDisplay: false
    }
  },
  computed: {
    selectYearBase () {
      return this.$config.selectBeginDate.getFullYear() - 1
    },
    selectYearCount () {
      return this.$config.selectEndDate.getFullYear() - this.selectYearBase
    },
    checkSelected () {
      if (this.selectedYear && this.selectedMonth && this.selectedCompany) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    checkSelected () {
      this.needReloadConfig = true
    },
    variance (v, ov) {
      if (v === '') {
      } else if (isNaN(+v) || +v < 0 || +v % 1 > 0) {
        this.variance = ov
      } else if (/ /.test(v)) {
        this.variance = v.replace(/(^ +)|( +$)/, '')
      } else {
      }
    },
    variancePer (v, ov) {
      if (v === '') {
      } else if (isNaN(+v) || +v > 100 || +v < 0) {
        this.variancePer = ov
      } else if (/ /.test(v)) {
        this.variancePer = v.replace(/(^ +)|( +$)/, '')
      } else {
      }
    }
  },
  methods: {
    setCache () {
      utils.localStorage.set('fillReportData', {
        selectedYear: this.selectedYear,
        selectedMonth: this.selectedMonth,
        selectedCompany: this.selectedCompany
      })
    },
    getCache () {
      let data = utils.localStorage.get('fillReportData')
      if (data) {
        this.selectedYear = data.selectedYear
        this.selectedMonth = data.selectedMonth
        this.selectedCompany = data.selectedCompany
        return true
      }
      return false
    },
    alertSelectError () {
      this.$dialog.alert({
        type: 'error',
        msg: '请同时选择三个条件后<br/>再进行“查阅”或“生成问题清单”操作'
      })
    },
    loadConfig () {
      if (this.needReloadConfig) {
        this.$loading({
          title: '加载数据',
          msg: '正在加载数据，请稍后...'
        })
        let baseStr = `${this.selectedYear}_${
          this.selectedMonth < 10
            ? '0' + this.selectedMonth
            : this.selectedMonth
        }_${this.selectedCompany}_`

        let lastVs = baseStr + 'variance'
        let lastVsp = baseStr + 'variance_percent'
        let globalVs = 'global_variance'
        let globalVsp = 'global_variance_percent'
        return this.$services.manage
          .getConfigs({
            param_name: [lastVs, lastVsp, globalVs, globalVsp]
          })
          .then(res => {
            let lastVsConfig = res.data.find(item => item.name === lastVs)
            let lastVspConfig = res.data.find(item => item.name === lastVsp)
            this.globalVariance = +res.data.find(item => item.name === globalVs)
              .val
            this.globalVariancePer = +res.data.find(
              item => item.name === globalVsp
            ).val
            if (lastVsConfig) {
              this.variance = +lastVsConfig.val
            } else {
              this.variance = this.globalVariance
            }
            if (lastVspConfig) {
              this.variancePer = +lastVspConfig.val
            } else {
              this.variancePer = this.globalVariancePer
            }
            this.needReloadConfig = false
            this.$loading.close()
          })
          .catch(err => {
            console.log(err)
            this.$loading.close()
          })
      } else {
        return Promise.resolve()
      }
    },
    query () {
      if (this.checkSelected) {
        this.$refs.filterTable.load()
        this.setCache()
      } else {
        this.alertSelectError()
      }
    },
    showBuildSetting () {
      if (this.checkSelected) {
        this.loadConfig().then(() => {
          this.buildConfirmDisplay = true
        })
      } else {
        this.alertSelectError()
      }
    },
    tryBuild () {
      if (
        +this.variance >= 0 &&
        +this.variance <= this.globalVariance &&
        +this.variancePer >= 0 &&
        +this.variancePer <= this.globalVariancePer
      ) {
        this.buildConfirmDisplay = false
        this.build()
      } else {
        this.varianceErrorDisplay = true
      }
    },
    build (force = false) {
      this.$loading({
        title: '生成问题清单',
        msg: '正在处理数据，请稍后...'
      })
      return this.$services.manage
        .buildProblemDataList({
          work: 'wentiqingdan_company',
          params: {
            year: this.selectedYear,
            month:
              this.selectedMonth < 10
                ? '0' + this.selectedMonth
                : this.selectedMonth,
            company: this.selectedCompany,
            variance: this.variance,
            variance_percent: this.variancePer,
            force: force ? 1 : 0
          }
        })
        .then(res => {
          this.$loading.close()
          this.$dialog.alert({ msg: '生成成功', type: 'success' })
          this.query()
        })
        .catch(err => {
          this.$loading.close()
          if (+err.code === 5102) {
            this.recoverConfirmDisplay = true
          } else {
            this.$dialog.alert({
              type: 'error',
              msg: err.msg
            })
          }
        })
    },
    sure () {
      this.buildConfirmDisplay = false
      this.recoverConfirmDisplay = true
    },
    recover () {
      this.recoverConfirmDisplay = false
      this.build(true)
    }
  },
  beforeMount () {
    // 获取公司列表
    this.$services.manage
      .getPreviewDataList({
        config_id: 10
      })
      .then(res => {
        this.companyList = res.data.data.map(item => {
          return {
            value: item.b,
            text: item.b
          }
        })
      })
  },
  mounted () {
    if (this.getCache()) {
      this.$nextTick(() => {
        this.query()
      })
    }
  },
  components: {
    FilterTable
  }
}
</script>

<style lang="scss" src="./Index.scss" scoped>
</style>
