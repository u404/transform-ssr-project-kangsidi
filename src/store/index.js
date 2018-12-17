import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
Vue.use(Vuex)

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

const modules = {
  user
}

export function createStore() {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules
  })
}
