<template>
  <div class="report-edit-wrap">
    <div class="report-total-tips">待解释
      <span :class="{strong: unexplained}">{{unexplained}}</span> 条</div>
    <div class="base-table-box report-edit-table" style="max-height: 410px;">
      <div class="base-header-table-box" ref="headerBox">
        <table class="base-table base-header-table" :class="tableClass" ref="headerTable">
          <tr>
            <th style="width:2%;">报表项</th>
            <th>Budget</th>
            <th>Actual</th>
            <th>Variance</th>
            <th>Variance%</th>
            <th style="width: 2.4%;">差异原因</th>
          </tr>
        </table>
      </div>
      <div class="base-body-table-box" ref="bodyBox" @scroll.passive="onScroll">
        <table class="base-table base-body-table" :class="tableClass" ref="bodyTable">
          <tr>
            <th style="width:2%;"></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th style="width: 2.4%;"></th>
          </tr>
          <template v-for="(item1, index1) in list">
            <tr class="level-1" :class="{active: active[index1]}" :key="'table-tr-'+index1" @click="rowClick(item1)">
              <td>
                <i class="toggle-btn" @click.stop="toggleActive(index1)"></i>
                {{item1.baobiao_name}}
              </td>
              <td>{{item1.budget && item1.budget.formatCurrency()}}</td>
              <td>{{item1.actual && item1.actual.formatCurrency()}}</td>
              <td>{{item1.variance && item1.variance.formatCurrency()}}</td>
              <td>
                <div class="flex">
                  <i class="icon-state" :class="item1.light==='red'?'icon-state-error':'icon-state-success'"></i>
                  <span>{{item1.variance_percent===null?'':item1.variance_percent+'%'}}</span>
                </div>
              </td>
              <td @click.stop></td>
            </tr>
            <template v-for="(item2,index2) in item1.list">
              <tr class="level-2" :class="{active: active[index1] && active[index1][index2]}" v-show="active[index1]" :key="'table-tr-' + index1 + '-'+index2" @click="rowClick(item2)">
                <td>
                  <i class="toggle-btn" @click.stop="toggleActive(index1, index2)"></i>
                  {{item2.baobiao_name}}
                </td>
                <td>{{item2.budget && item2.budget.formatCurrency()}}</td>
                <td>{{item2.actual && item2.actual.formatCurrency()}}</td>
                <td>{{item2.variance && item2.variance.formatCurrency()}}</td>
                <td>
                  <div class="flex">
                    <i class="icon-state" :class="item2.light==='red'?'icon-state-error':'icon-state-success'"></i>
                    <span>{{item2.variance_percent===null?'':item2.variance_percent+'%'}}</span>
                  </div>
                </td>
                <td @click.stop></td>
              </tr>
              <template v-for="(item3,index3) in item2.list">
                <tr class="level-3" v-show="active[index1] && active[index1][index2]" :key="'table-tr-' + index1 + '-' + index2 + '-' + index3" @click="rowClick(item3)">
                  <td>{{item3.baobiao_name}}</td>
                  <td>{{item3.budget && item3.budget.formatCurrency()}}</td>
                  <td>{{item3.actual && item3.actual.formatCurrency()}}</td>
                  <td>{{item3.variance && item3.variance.formatCurrency()}}</td>
                  <td>
                    <div class="flex">
                      <i class="icon-state" :class="item3.light==='red'?'icon-state-error':'icon-state-success'"></i>
                      <span>{{item3.variance_percent===null?'':item3.variance_percent+'%'}}</span>
                    </div>
                  </td>
                  <td v-if="isPreview || +item3.is_report===0" @click.stop>{{item3.report}}</td>
                  <td class="reason-wrap" v-else @click.stop>
                    <input class="reason-input" :class="{warning: true}" type="text" v-model="item3.report" @focus="cacheItem(item3)" @change="updateReportItemReason(item3.id, item3.report)" @click.stop />
                  </td>
                </tr>
              </template>
            </template>
          </template>
          <tr>
            <td colspan="6"></td>
          </tr>
        </table>
      </div>

      <div class="base-footer-table-box" ref="footerBox">
        <table class="base-table base-footer-table" :class="tableClass" ref="footerTable">
          <tr>
            <th style="width:2%;">总计</th>
            <th>{{total.budget || 0}}</th>
            <th>{{total.actual || 0}}</th>
            <th>{{total.variance || 0}}</th>
            <th>{{total.variance_percent===null?'':total.variance_percent+'%'}}</th>
            <th style="width: 2.4%;"></th>
          </tr>
        </table>
      </div>

    </div>
  </div>

</template>

<script>
import utils from '@/assets/scripts/utils'
export default {
  props: {
    maxHeight: {
      type: Number,
      default: 500
    },
    tableClass: {
      type: String | Object | Array,
      default: null
    },
    triggerOffset: {
      type: Number,
      default: 80
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    year: String | Number,
    month: String | Number,
    company: String | Number,
    centerCode: String,
    centerClass: String
  },
  data () {
    return {
      list: [],
      total: {},
      active: {},
      cacheData: {}
    }
  },
  computed: {
    unexplained () {
      if (!this.list) return 0
      let count = 0
      console.log('list', this.list)
      this.list.forEach(item => {
        item.list &&
          item.list.forEach(item2 => {
            item2.list &&
              item2.list.forEach(item3 => {
                if (+item3.is_report !== 0 && !item3.report) {
                  count++
                }
              })
          })
      })
      return count
    }
  },
  mounted () {},
  watch: {},
  methods: {
    activeChildren (list, parentActive) {
      if (!list) {
        return
      }
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].list) {
          parentActive[i] = {}
          this.activeChildren(list[i].list, parentActive[i])
        }
      }
    },
    autoSetHeaderPadding () {
      let scrollWidth =
        this.$refs.bodyBox.offsetWidth - this.$refs.bodyTable.offsetWidth
      this.$refs.headerBox.style.paddingRight = this.$refs.footerBox.style.paddingRight =
        scrollWidth + 'px'
    },
    toggleActive (index1, index2) {
      console.log(index1, index2)
      if (index2 === undefined) {
        if (this.active[index1]) {
          this.$set(this.active, index1, false)
        } else {
          this.$set(this.active, index1, {})
        }
      } else {
        var active1 = this.active[index1] || (this.active[index1] = {})
        if (active1[index2]) {
          active1[index2] = false
        } else {
          active1[index2] = true
        }
        this.$set(this.active, index1, { ...active1 })
      }
      this.$nextTick(() => {
        this.autoSetHeaderPadding()
      })
    },
    onScroll (e) {
      console.log('scroll')
      let scrollBottom =
        e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop

      if (scrollBottom < this.triggerOffset) {
        this.triggerScrollBottom()
      }
    },
    triggerScrollBottom: (function () {
      return utils.throttle(function () {
        // 节流方式触发事件
        console.log('滚动到底部了，触发事件')
        this.$emit('scrollBottom')
      }, 300)
    })(),

    cacheItem (item) {
      this.cacheData[item.id] = {
        item: item,
        oldData: {
          ...item
        }
      }
    },
    resetItem (id) {
      this.$set(
        this.cacheData[id].item,
        'report',
        this.cacheData[id].oldData.report
      )
    },
    updateReportItemReason (id, text) {
      this.$services.manage
        .updateData({
          work: 'wentireport',
          params: {
            report_id: id,
            report_text: text
          }
        })
        .catch(() => {
          this.resetItem(id)
          this.$dialog.alert({
            type: 'error',
            msg: '自动保存失败，该条原因已被还原'
          })
        })
    },

    loadDataList () {
      this.$loading({
        title: '正在加载',
        msg: '正在加载数据，请稍后...'
      })
      this.$services.manage
        .getProblemDataList({
          work: 'wentiqingdan',
          params: {
            year: this.year,
            month: +this.month < 10 ? '0' + this.month : this.month,
            company: this.company,
            chengben: this.centerCode,
            chenglei: this.centerClass
          }
        })
        .then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.activeChildren(this.list, this.active)
          this.active = { ...this.active } // 这里就为了强制进行一次数据绑定更新，否则监听不到对象内部的变更
          this.$nextTick(() => {
            this.autoSetHeaderPadding()
          })
          this.$loading.close()
        })
        .catch(err => {
          this.$loading.close()
          this.$dialog.alert({
            type: 'error',
            msg: err.msg
          })
        })
    },
    load () {
      this.loadDataList()
    },

    rowClick (itemData) {
      this.$emit('rowclick', itemData)
    }
  }
}
</script>

<style lang="scss" scoped>
.report-edit-wrap {
  padding-top: 8px;
  .report-total-tips {
    margin: 8px 0;
    padding: 0 4px;
    text-align: right;
    line-height: 1;
    color: $color-error-2;

    .strong {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .report-edit-table {
    .base-table {
      tr {
        td {
          overflow: hidden;
          position: relative;

          .toggle-btn {
            position: absolute;
            top: 50%;
            margin-top: -5.5px;
            margin-left: -20px;
            width: 11px;
            height: 11px;
            background: url(../../assets/images/icons.png) 0 -190px no-repeat;

            &:before {
              content: "";
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
            }
          }
        }
        &.active td .toggle-btn {
          background-position: -11px -190px;
        }
      }

      tr.level-1 {
        td {
          background: $color-table-bg-3;

          &:first-child {
            padding-left: 40px;
          }
        }
      }
      tr.level-2 {
        td {
          background: $color-table-bg-2;

          &:first-child {
            padding-left: 50px;
          }
        }
      }
      tr.level-3 {
        td {
          background: $color-table-bg;

          &:first-child {
            padding-left: 60px;
          }

          &.reason-wrap {
            padding: 0;
            .reason-input {
              display: block;
              padding: 0 18px;
              width: 100%;
              height: 100%;
              border: none;

              &.warning {
                background: $color-table-bg-warning;
              }
              &:focus {
                background: $color-table-bg-1;
              }
            }
          }
        }
        // &:nth-of-type(2n + 1) {
        //   td {
        //     background: $color-table-bg-1;
        //   }
        // }
      }
      tr.level-1,
      tr.level-2 {
        cursor: pointer;
      }
      tr.level-2,
      tr.level-3 {
      }
    }
    .icon-state {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url(../../assets/images/icons.png) no-repeat;
      vertical-align: center;
      &.icon-state-error {
        background-position: -36px -40px;
      }
      &.icon-state-success {
        background-position: -54px -40px;
      }
    }
  }
}
</style>
