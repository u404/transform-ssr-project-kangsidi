<template>
  <nav class="nav-bar">
    <div class="container">
      <div class="logo"></div>
      <div class="user-box dropdown-menu-box" v-show="token">
        <div class="user-avator"></div>
        <div class="user-name">{{username}}</div>
        <div class="dropdown-menu">
          <ul class="menu-list">
            <li class="menu" @click="logout">退出</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      config: 'NavBar.json',
      activeNavIndex: 0
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      token: state => state.user.token
    })
  },
  methods: {
    logout () {
      this.$store
        .dispatch('userLogout')
        .then(() => {
          this.$router.push('/Login/back')
        })
        .catch(err => {
          if (err.code === 1015) {
            this.$router.push('/Login/back')
            return
          }
          this.$dialog.alert({
            msg: err.msg,
            type: 'error'
          })
        })
    }
  }
}
</script>
<style lang="scss" src="./Index.scss" scoped></style>
