<template>
  <li class="menu" :class="{active: active}">
    <span class="menu-text" v-if="data.children" @click="$emit('click')">{{data.name}}</span>
    <router-link class="menu-text" v-else-if="data.path" :to="data.path">{{data.name}}</router-link>
    <span class="menu-text" v-else>{{data.name}}</span>
    <transition name="dropdown">
      <menu-list v-if="data.children" :list="data.children" :deep="deep + 1" v-show="active"></menu-list>
    </transition>
  </li>
</template>
<script>
import MenuList from './MenuList'
export default {
  name: 'menu-item',
  props: {
    data: Object,
    active: {
      type: Boolean,
      default: false
    },
    deep: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {},
  components: {
    MenuList
  }
}
</script>
