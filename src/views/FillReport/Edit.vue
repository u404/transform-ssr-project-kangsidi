<template>
  <div class="edit-wrap">
    <div class="base-main-title">填报列表&gt;</div>
    <div class="base-main-panel control-panel">
      <div class="panel-child control-bar" v-if="!isPreview">
        <div></div>
        <div class="btn-box">
          <button class="base-btn base-line-btn save-btn" @click="save">保存</button>
          <button class="base-btn submit-btn" @click="submit">提交</button>
        </div>
      </div>
      <div class="panel-child detail-box" v-show="detailDisplay">
        <div class="budget-table-box">
          <budget-preview-table ref="budgetTable" class="budget-table" :table-class="'view-table'" :scroll-pager="true" max-height="158px" :year="year" :month="month" :company="company" :center="activeCenterCode" :center-class="activeCenterClass" :report="detailReport"></budget-preview-table>
        </div>
        <div class="journal-table-box">
          <journal-preview-table ref="journalTable" class="journal-table" :table-class="'view-table'" :scroll-pager="true" max-height="158px" :year="year" :month="month" :company="company" :center="activeCenterCode" :center-class="activeCenterClass" :report="detailReport"></journal-preview-table>
        </div>
      </div>
      <div class="panel-child filter-box">
        <div class="input-box">
          <div class="form-item">
            <span class="form-label">variance</span>
            <input class="base-input form-input" type="text" disabled :value="variance" />
          </div>
          <div class="form-item">
            <span class="form-label">variance%</span>
            <input class="base-input form-input" type="text" disabled :value="variancePer" />
          </div>
        </div>
        <div class="selector-box">
          <div class="selector-tips">选择成本中心编码</div>
          <ul class="option-list">
            <li class="option" :class="{active: activeCenterCode === item.a}" v-for="(item,i) in centerList" :key="'center-'+i" @click="redirect(item.a, item.c)">{{item.a}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="base-main-panel">
      <report-edit-table ref="reportTable" :is-preview="isPreview" :year="year" :month="month" :company="company" :center-code="activeCenterCode" :center-class="activeCenterClass" @rowclick="previewDetail"></report-edit-table>
    </div>
  </div>
</template>

<script>
import BudgetPreviewTable from '@/components/BudgetPreviewTable'
import JournalPreviewTable from '@/components/JournalPreviewTable'
import ReportEditTable from '@/components/FillReport/ReportEditTable'
export default {
  props: {
    isPreview: {
      type: Boolean,
      default: false
    },
    year: Number | String,
    month: Number | String,
    company: Number | String,
    center: {
      type: String,
      default: ''
    },
    centerClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      centerList: [],
      activeCenterCode: '',
      activeCenterClass: '',

      variance: 0,
      variancePer: '0%',
      detailReport: '',
      detailDisplay: false
    }
  },
  watch: {
    center: {
      handler (v) {
        this.activeCenterCode = v
        this.$nextTick(() => {
          this.loadReportList({})
          this.detailReport = ''
          this.detailDisplay = false
        })
      },
      immediate: true
    },
    centerClass: {
      handler (v) {
        this.activeCenterClass = v
      },
      immediate: true
    }
  },
  methods: {
    loadVarianceConfig () {
      let baseStr = `${this.year}_${
        this.month < 10 ? '0' + this.month : this.month
      }_${this.company}_`

      let lastVs = baseStr + 'variance'
      let lastVsp = baseStr + 'variance_percent'
      let globalVs = 'global_variance'
      let globalVsp = 'global_variance_percent'

      this.$services.manage
        .getConfigs({
          param_name: [lastVs, lastVsp, globalVs, globalVsp]
        })
        .then(res => {
          let lastVsConfig = res.data.find(item => item.name === lastVs)
          let lastVspConfig = res.data.find(item => item.name === lastVsp)
          let globalVariance = +res.data.find(item => item.name === globalVs)
            .val
          let globalVariancePer = +res.data.find(
            item => item.name === globalVsp
          ).val
          if (lastVsConfig) {
            this.variance = +lastVsConfig.val
          } else {
            this.variance = globalVariance
          }
          if (lastVspConfig) {
            this.variancePer = +lastVspConfig.val + '%'
          } else {
            this.variancePer = globalVariancePer + '%'
          }
        })
    },
    loadCenterList () {
      return this.$services.manage
        .getPreviewDataList({
          config_id: 8
        })
        .then(res => {
          this.centerList = res.data.data
        })
    },
    loadReportList () {
      this.$refs.reportTable.load()
    },
    previewDetail ({ baobiao }) {
      if (this.detailReport === baobiao) {
        // 取消重复点击加载
        return
      }
      this.detailReport = baobiao
      this.$loading({
        title: '正在加载',
        msg: '正在加载数据，请稍后...'
      })
      this.$nextTick(() => {
        Promise.all([
          this.$refs.budgetTable.load(),
          this.$refs.journalTable.load()
        ])
          .then(() => {
            this.detailDisplay = true
            this.$loading.close()
          })
          .catch(err => {
            this.$loading.close()
            this.$dialog.alert({
              type: 'error',
              msg: err.msg
            })
          })
      })
    },
    redirect (center, centerClass) {
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          center: center,
          centerClass: centerClass
        }
      })
    },
    save () {
      this.$dialog.alert({
        type: 'success',
        msg: '保存成功',
        onSure: () => {
          this.$router.go(-1)
        }
      })
    },
    submit () {
      this.$services.manage
        .updateData({
          work: 'wentisubmit',
          params: {
            year: this.year,
            month: this.month < 10 ? '0' + this.month : this.month,
            company: this.company,
            chengben: this.activeCenterCode,
            chenglei: this.activeCenterClass
          }
        })
        .then(res => {
          this.$dialog.alert({
            type: 'success',
            msg: '提交成功',
            onSure: () => {
              this.$router.go(-1)
            }
          })
        })
        .catch(err => {
          this.$dialog.alert({
            type: 'error',
            msg: err.msg
          })
        })
    }
  },
  mounted () {
    console.log('mount')
    this.loadVarianceConfig()
    this.loadCenterList()
  },
  components: {
    BudgetPreviewTable,
    JournalPreviewTable,
    ReportEditTable
  }
}
</script>

<style lang="scss" src="./Edit.scss" scoped></style>
