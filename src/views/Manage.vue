<template>
  <div class="page page-tb-wrap">
    <nav-bar class="flex-0"></nav-bar>
    <div class="page-lr-wrap flex-1">
      <left-menu></left-menu>
      <div class="main-body flex-1">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar/Index'
import LeftMenu from '@/components/LeftMenu/Index'
export default {
  components: {
    LeftMenu,
    NavBar
  }
}
</script>
<style lang="scss" scoped>
.page-lr-wrap {
  .main-body {
    width: 1px;
    overflow: auto;
    @include flex($ali: stretch);
    .main-content {
      padding: 12px;
      flex: 1 1 auto;
    }
  }
}
</style>
