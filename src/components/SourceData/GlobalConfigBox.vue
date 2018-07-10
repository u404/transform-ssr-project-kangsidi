<template>
  <div class="global-config-box">
    <div class="control-bar">
      <button class="base-btn edit-btn" v-if="!isEdit" @click="isEdit=true">编辑</button>
      <button class="base-btn base-line-btn save-btn" v-if="isEdit" @click="save">保存</button>
    </div>
    <div class="config-list-box">
      <ul class="config-list" v-if="configList">
        <li class="config">
          <span class="config-label">问题清单重要性水平全局上限控制</span>
          <div class="form-item">
            <span class="form-label">variance</span>
            <input type="text" ref="config0" class="base-input form-input" placeholder="请输入数字" :disabled="!isEdit" :readonly="!isEdit" v-model="variance">
          </div>
          <div class="form-item">
            <span class="form-label">variance%</span>
            <input type="text" ref="config1" class="base-input form-input" placeholder="请输入数字" :disabled="!isEdit" :readonly="!isEdit" v-model="variancePer">
            <span class="form-text">%</span>
          </div>
        </li>
        <li class="config">
          <span class="config-label">报表金额单位</span>
          <div class="form-item">
            <base-check-group :list="mapUnitList(getConfigById(3).option)" :disabled="!isEdit" :checked-value="getConfigById(3).val" @change="(data)=>{getConfigById(3).val = data.value}"></base-check-group>
          </div>
        </li>
        <li class="config">
          <span class="config-label">报告金额单位</span>
          <div class="form-item">
            <base-check-group :list="mapUnitList(getConfigById(4).option)" :disabled="!isEdit" :checked-value="getConfigById(4).val" @change="(data)=>{getConfigById(4).val = data.value}"></base-check-group>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isEdit: false,
      configList: null,
      variance: 0,
      variancePer: 0
    }
  },
  watch: {
    variance (v, ov) {
      if (v === '') {
        this.getConfigById(1).val = v
      } else if (isNaN(+v) || +v < 0 || +v % 1 > 0) {
        this.variance = ov
      } else if (/ /.test(v)) {
        this.variance = v.replace(/(^ +)|( +$)/, '')
      } else {
        this.getConfigById(1).val = v
      }
    },
    variancePer (v, ov) {
      if (v === '') {
        this.getConfigById(2).val = v
      } else if (isNaN(+v) || +v > 100 || +v < 0) {
        this.variancePer = ov
      } else if (/ /.test(v)) {
        this.variancePer = v.replace(/(^ +)|( +$)/, '')
      } else {
        this.getConfigById(2).val = v
      }
    }
  },
  methods: {
    validNumber (value) {
      return !isNaN(+value)
    },
    save () {
      if (
        this.getConfigById(1).val === '' ||
        isNaN(+this.getConfigById(1).val) ||
        this.getConfigById(2).val === '' ||
        isNaN(+this.getConfigById(2).val)
      ) {
        this.showInputError()
        return
      }
      this.variance = this.getConfigById(1).val = +this.getConfigById(1).val
      this.variancePer = this.getConfigById(2).val = +this.getConfigById(2).val
      console.log(this.configList)
      this.$services.manage
        .saveConfigs({ params: this.configList })
        .then(res => {
          this.isEdit = false
        })
        .catch(err => {
          this.$dialog.alert({
            type: 'error',
            msg: err.msg
          })
        })
    },
    mapUnitList (optionStr) {
      return optionStr.split(',').map(item => {
        return {
          value: item,
          text: item
        }
      })
    },
    showInputError () {
      this.$tips({
        msg: '请输入正确的数字！'
      })
    },
    loadConfigList () {
      this.$services.manage.getGlobalConfigList().then(res => {
        this.configList = res.data
        this.variance = this.getConfigById(1).val
        this.variancePer = this.getConfigById(2).val
      })
    },
    getConfigById (id) {
      return this.configList.find(item => item.id === id)
    }
  },
  beforeMount () {
    this.loadConfigList()
  }
}
</script>
<style lang="scss" scoped>
.global-config-box {
  .control-bar {
    @include flex($jus: flex-end);
    .edit-btn,
    .save-btn {
      @include btn-size(80px, 25px);
    }
  }
  .config-list-box {
    .config-list {
      padding: 0 8px;
      .config {
        padding-left: 14px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: $border-default;
        .config-label {
          display: block;
          margin-left: -14px;
          margin-bottom: 20px;
          padding-left: 9px;
          font-size: 14px;
          font-weight: bold;
          line-height: 1em;
          border-left: 5px solid $color-active-light;
        }
        .form-item {
          @include flex($jus: flex-start);
          .form-label {
            flex: 0 0 auto;
            min-width: 64px;
            margin-right: 10px;
          }
          .form-input {
            width: 146px;
            height: 24px;
            margin-right: 5px;
            font-size: 12px;
            &[disabled] {
              background: $color-disabled-light;
            }
          }

          &:nth-child(n + 2) {
            margin-top: 14px;
          }
        }
      }
    }
  }
}
</style>
