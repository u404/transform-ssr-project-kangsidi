import Vue from 'vue'
import './assets/scripts/utils'
import App from './App'
import { createStore } from './store'
import { createRouter } from './router'
import './plugins'
import './assets/styles/base.scss'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

export function createApp () {
  const store = createStore()
  const router = createRouter()

  router.beforeEach((to, from, next) => {
    if (/\/Login/.test(to.path)) {
      next()
    } else {
      store
        .dispatch('userCheckLogin')
        .then(() => {
          next()
        })
        .catch(() => {
          router.push('/Login/back')
        })
    }
  })

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
