<template>
  <div class="select-group">
    <base-select :class="{'select-wide': onlyYearSelect}" :placeholder="fromYearPlaceholder" :options="fromYearCount" :base-number="fromYearBase" :selected="fromYear" @change="v => {fromYear = v}"></base-select>
    <base-select v-if="!onlyYearSelect" :placeholder="fromMonthPlaceholder" :options="fromMonthCount" :base-number="fromMonthBase" :selected="fromMonth" @change="v => {fromMonth = v}"></base-select>
    <span>--</span>
    <base-select :class="{'select-wide': onlyYearSelect}" :placeholder="toYearPlaceholder" :options="toYearCount" :base-number="toYearBase" :selected="toYear" @change="v => {toYear = v}"></base-select>
    <base-select v-if="!onlyYearSelect" :placeholder="toMonthPlaceholder" :options="toMonthCount" :base-number="toMonthBase" :selected="toMonth" @change="v => {toMonth = v}"></base-select>
  </div>
</template>
<script>
export default {
  props: {
    onlyYearSelect: {
      type: Boolean,
      default: false
    },
    selectBeginDate: {
      type: Date,
      default () {
        return this.$config.selectBeginDate
      }
    },
    selectEndDate: {
      type: Date,
      default () {
        return this.$config.selectEndDate
      }
    },
    selected: {
      type: Object,
      default () {
        return {}
      }
    },
    fromYearPlaceholder: {
      type: String,
      default: '请选择年'
    },
    toYearPlaceholder: {
      type: String,
      default: '请选择年'
    },
    fromMonthPlaceholder: {
      type: String,
      default: '请选择月'
    },
    toMonthPlaceholder: {
      type: String,
      default: '请选择月'
    }
  },
  data () {
    return {
      fromYear: '',
      fromMonth: '',
      toYear: '',
      toMonth: ''
    }
  },
  computed: {
    selectBeginYear () {
      return this.selectBeginDate.getFullYear()
    },
    selectEndYear () {
      return this.selectEndDate.getFullYear()
    },
    fromYearBase () {
      return this.selectBeginYear - 1
    },
    fromYearCount () {
      return this.selectEndYear - this.fromYearBase
    },
    toYearBase () {
      return (this.fromYear || this.selectBeginYear) - 1
    },
    toYearCount () {
      return this.selectEndYear - this.toYearBase
    },
    fromMonthBase () {
      if (this.fromYear === this.selectBeginYear) {
        return this.selectBeginDate.getMonth()
      }
      return 0
    },
    fromMonthCount () {
      if (this.fromYear === this.selectEndYear) {
        return this.selectEndDate.getMonth() + 1 - this.fromMonthBase
      }
      return 12 - this.fromMonthBase
    },
    toMonthBase () {
      if (this.toYear === this.fromYear) {
        return this.fromMonth ? this.fromMonth - 1 : this.fromMonthBase
      }
      return 0
    },
    toMonthCount () {
      if (this.toYear === this.selectEndYear) {
        return this.selectEndDate.getMonth() + 1 - this.toMonthBase
      }
      return 12 - this.toMonthBase
    },
    strExpress () {
      return `${this.fromYear}/${this.fromMonth}-${this.toYear}/${this.toMonth}`
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (val) {
        this.fromYear = val.fromYear || ''
        this.fromMonth = val.fromMonth || ''
        this.toYear = val.toYear || ''
        this.toMonth = val.toMonth || ''
      }
    },
    fromYear (v, ov) {
      if (
        this.fromMonth < this.fromMonthBase + 1 ||
        this.fromMonth > this.fromMonthBase + this.fromMonthCount
      ) {
        this.fromMonth = ''
      }
      if (
        this.toMonth < this.toMonthBase + 1 ||
        this.toMonth > this.toMonthBase + this.toMonthCount
      ) {
        this.toMonth = ''
      }
      if (this.fromYear > this.toYear) {
        this.toYear = ''
      }
    },
    fromMonth () {
      if (
        this.toMonth < this.toMonthBase + 1 ||
        this.toMonth > this.toMonthBase + this.toMonthCount
      ) {
        this.toMonth = ''
      }
    },
    toYear () {
      if (
        this.toMonth < this.toMonthBase + 1 ||
        this.toMonth > this.toMonthBase + this.toMonthCount
      ) {
        this.toMonth = ''
      }
    },
    strExpress () {
      this.triggerChange()
    }
  },
  methods: {
    triggerChange () {
      console.log({ ...this.$data })
      this.$emit('change', { ...this.$data })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-group {
  @include flex($jus: space-between);
  .base-select {
    flex: 0 0 auto;
    width: 90px;
    font-size: 12px;

    &.select-wide {
      width: 180px;
    }
  }
}
</style>
