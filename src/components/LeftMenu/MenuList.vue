<template>
  <ul class="menu-list" :class="'menu-list-' + deep">
    <li class="menu" :class="[{active: activeIndexList.indexOf(index) > -1}, {'has-child': item.children},{icon: item.icon},(item.icon ? item.icon : '')]" v-for="(item, index) in list" :key="'lm-' + deep + '-' + index">
      <span class="menu-text" v-if="item.children" @click="toggleActive(index)">{{item.name}}</span>
      <router-link class="menu-text" v-else-if="item.path" :to="item.path">{{item.name}}</router-link>
      <span class="menu-text" v-else>{{item.name}}</span>
      <transition name="dropdown" appear>
        <menu-list v-if="item.children" :list="item.children" :deep="deep + 1" v-show="activeIndexList.indexOf(index) > -1"></menu-list>
      </transition>
    </li>
  </ul>
</template>

<script>
import MenuList from './MenuList.vue'
export default {
  name: 'menu-list',
  props: {
    list: {
      type: Array
    },
    activeIndex: Number,
    deep: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      activeIndexList: []
    }
  },
  watch: {
    list: {
      handler: function (val, oldVal) {
        if (this.deep === 0) {
          this.list &&
            this.list.forEach((item, index, arr) => {
              if (
                item.children &&
                item.children.find(val => {
                  let regex = new RegExp('^' + val.path + '(/\\w*)*')
                  console.log(regex.test(this.$route.path))
                  return regex.test(this.$route.path)
                })
              ) {
                this.activeIndexList.push(index)
              }
            })
        }
      },
      immediate: true
    }
  },
  methods: {
    toggleActive (index) {
      var i = this.activeIndexList.indexOf(index)
      if (i > -1) {
        this.activeIndexList.splice(i, 1)
      } else {
        this.activeIndexList.push(index)
      }
    }
  },
  components: {
    MenuList
  }
}
</script>

<style lang="scss" scoped>
.menu-list {
  overflow: hidden;
  .menu {
    .menu-text {
      display: block;
      border-left: 4px solid transparent;
      padding-left: 48px;
      line-height: 40px;
      position: relative;
      cursor: pointer;

      &.router-link-active {
        background: #000a1b;
        border-left-color: $color-active-light;
        color: $color-active-light;
      }
    }

    &.icon {
      > .menu-text:before {
        content: "";
        position: absolute;
        top: 50%;
        margin-top: -9px;
        left: 21px;
        width: 18px;
        height: 18px;
        background: url(../../assets/images/icons.png) left top no-repeat;
      }

      &.icon-setting {
        > .menu-text:before {
          background-position: -18px 0;
        }
      }
      &.icon-list {
        > .menu-text:before {
          background-position: -36px 0;
        }
      }
      &.icon-report {
        > .menu-text:before {
          background-position: -54px 0;
        }
      }
    }

    &.has-child {
      > .menu-text:after {
        content: "";
        position: absolute;
        right: 24px;
        top: 50%;
        margin-top: -5px;
        width: 10px;
        height: 10px;
        background: url(../../assets/images/icons.png) -10px -20px no-repeat;
      }
      &.active {
        > .menu-text:after {
          background-position: -20px -20px;
        }
      }
    }
  }

  &.menu-list-0 {
    > .menu {
      > .menu-text {
        font-size: 14px;
      }
    }
  }
  &.menu-list-1 {
    > .menu {
      > .menu-text {
        padding-left: 50px;
      }
    }
  }

  .dropdown-enter,
  .dropdown-leave-to {
    max-height: 0;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: max-height 0.3s ease;
  }

  .dropdown-enter-to,
  .dropdown-leave {
    max-height: 120px;
  }
}
</style>
