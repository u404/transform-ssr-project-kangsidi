<template>
  <div class="left-menu">
    <div class="menu-header">
      <div class="menu-title">管理中心</div>
    </div>
    <menu-list :list="config.menuList" :active-index="0"></menu-list>
  </div>
</template>
<script>
import MenuList from './MenuList.vue'
export default {
  data () {
    return {
      config: 'LeftMenu.json'
    }
  },
  methods: {},
  components: {
    MenuList
  }
}
</script>
<style lang="scss" scoped>
.left-menu {
  flex: 0 0 auto;
  width: 190px;
  background: #242d3c;
  color: $color-white;
  .menu-header {
    .menu-title {
      font-size: 14px;
      line-height: 54px;
      padding-left: 52px;
      border-bottom: $border-default;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        margin-top: -9px;
        left: 24px;
        width: 18px;
        height: 18px;
        background: url(../../assets/images/icons.png) left top no-repeat;
      }
    }
  }
}
</style>
