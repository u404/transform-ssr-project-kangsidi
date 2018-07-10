<template>
  <div class="source-data-wrap">
    <div class="base-main-title">基础数据&gt;</div>
    <div class="base-tab">
      <ul class="tab-list">
        <li class="tab" :class="{active: activeTab == 0}" @click="activeTab=0">基础资料维护</li>
        <li class="tab" :class="{active: activeTab == 1}" @click="activeTab=1">全局参数设置</li>
      </ul>
      <ul class="content-list">
        <li class="content" v-show="activeTab == 0">
          <source-data-box></source-data-box>
        </li>
        <li class="content" v-show="activeTab == 1">
          <global-config-box></global-config-box>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import SourceDataBox from '@/components/SourceData/SourceDataBox'
import GlobalConfigBox from '@/components/SourceData/GlobalConfigBox'
export default {
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {},
  components: {
    SourceDataBox,
    GlobalConfigBox
  }
}
</script>

<style lang="scss" scoped>
.source-data-wrap {
}
</style>
