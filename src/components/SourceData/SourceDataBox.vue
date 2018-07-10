<template>
  <div class="source-data-box">
    <div class="tab-title">工作表列表</div>
    <base-table class="source-table" :list="tableList">
      <template slot="header" slot-scope="i">
        <th class="source-name">工作表名称</th>
        <th class="source-time">更新时间</th>
        <th class="source-controls">操作</th>
      </template>
      <template slot-scope="iData">
        <td>{{iData.item.sheet_name}}</td>
        <td>{{formatTime(iData.item.utime)}}</td>
        <td class="base-center">
          <span class="base-table-btn" @click="showAddDataDialog(iData.item.id)">添加</span>
          <router-link class="base-table-btn" :to="'/SourceData/Preview/' + iData.item.id">预览</router-link>
        </td>
      </template>
    </base-table>
    <base-dialog class="add-data-dialog" title="添加数据" :show="addDataDialogDisplay" @close="addDataDialogDisplay=false">
      <div class="base-btn upload-file-btn">
        <span>上传本地文件</span>
        <input type="file" @change="upload" v-if="addDataDialogDisplay" />
        <!--为了销毁清除fileInput中的选中文件，所以使用了v-if-->
      </div>
      <div class="upload-file-tips">仅支持xls(excel2003)文件格式，<br />单个文件建议控制在50MB以内</div>
    </base-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableList: [],
      addDataDialogDisplay: false,
      addDataId: null
    }
  },
  beforeMount () {
    this.$loading({
      title: '正在加载',
      msg: '正在加载数据，请稍后...'
    })
    this.$services.manage
      .getSourceWorkTableList()
      .then(res => {
        this.$loading.close()
        this.tableList = res.data
      })
      .catch(err => {
        this.$loading.close()
        this.$dialog.alert({
          type: 'error',
          msg: err.msg
        })
      })
  },
  methods: {
    formatTime (number) {
      return new Date(number * 1000).format('yyyy-MM-dd hh:mm:ss')
    },
    showAddDataDialog (id) {
      this.addDataDialogDisplay = true
      this.addDataId = id
    },
    upload (e) {
      if (!e.target.files.length) {
        return
      }
      var formData = new FormData()
      formData.append('config_id', this.addDataId)
      formData.append('excel_file', e.target.files[0])
      this.addDataDialogDisplay = false
      this.$loading({
        title: '正在上传',
        msg: '正在上传中，请稍后...'
      })
      this.$services.manage
        .uploadExcel({}, formData)
        .then(res => {
          this.$loading.close()
          this.alertSuccess()
        })
        .catch(err => {
          console.log(err)
          this.$loading.close()
          if (err.code === 2107) {
            this.confirmRecoverTips()
          } else {
            this.alertFail()
          }
        })
    },
    recover () {
      this.$loading({
        title: '正在上传',
        msg: '正在写入数据，请稍后...'
      })
      this.$services.manage
        .forceRecoverData({
          config_id: this.addDataId
        })
        .then(res => {
          this.$loading.close()
          this.alertSuccess()
        })
        .catch(err => {
          console.log(err)
          this.$loading.close()
          this.alertFail()
        })
    },
    alertSuccess () {
      this.$dialog.alert({
        type: 'success',
        msg: '添加数据成功！'
      })
    },
    alertFail () {
      this.$dialog.alert({
        type: 'error',
        msg: '添加数据失败！'
      })
    },
    confirmRecoverTips () {
      this.$dialog.confirm({
        title: '提示',
        msg: '是否继续上传并覆盖原始数据？',
        onSure: () => {
          this.recover()
        },
        onCancel: () => {
          this.alertFail()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.source-data-box {
  .tab-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .add-data-dialog {
    .upload-file-btn {
      margin: 0 auto;
      @include btn-size(145px, 40px, $font-h6);
      @include upload-btn;
    }
    .upload-file-tips {
      margin-top: 28px;
      font-size: 12px;
      color: $color-warning;
      line-height: 1.2em;
    }
  }
}
</style>
