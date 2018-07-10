<template>
  <div class="welcome-wrap">
    <i class="welcome-icon"></i>
    <div class="welcome-text">欢迎登陆管理系统！</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.welcome-wrap {
  width: 100%;
  height: 100%;
  @include flex(column, center, center);

  .welcome-icon {
    width: 80px;
    height: 80px;
    background: url(../assets/images/icon-welcome.png) center no-repeat;
    margin-bottom: 18px;
  }
  .welcome-text {
    font-size: $font-h3;
    color: $color-active-light;
  }
}
</style>
