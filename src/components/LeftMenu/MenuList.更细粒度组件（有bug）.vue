<template>
  <ul class="menu-list" :class="'menu-list-' + deep">
    <menu-item v-for="(item, index) in list" :key="'lm-' + deep + '-' + index" :data="item" :deep="deep" :active="activeIndexList.indexOf(index) > -1" @click="toggleActive(index)"></menu-item>
  </ul>
</template>


<script>
import MenuItem from './MenuItem'
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
  created () {
    this.activeIndex && this.activeIndexList.push(this.activeIndex)
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
    MenuItem
  }
}
</script>
