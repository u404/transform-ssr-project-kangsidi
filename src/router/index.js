import Vue from 'vue'

import Router from 'vue-router'

import Manage from '@/views/Manage'
import Index from '@/views/Index' // 命名chunk，内部注释是必须的

import Login from '@/views/Login/Index' // 同步chunk

Vue.use(Router)

const manageRouter = {
  path: '/',
  name: 'Manage',
  component: Manage,
  // beforeEnter: (to, from, next) => {
  //   store.dispatch('userCheckLogin').then(() => {
  //     next()
  //   }).catch(() => {
  //     router.push('/Login/back')
  //   })
  // },
  children: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/SourceData', // 基础设置
    name: 'SourceData',
    component: () =>
        import(/* webpackChunkName: 'SourceData' */ '@/views/SourceData/Index')
  },
  {
    path: '/SourceData/Preview/:id', // 基础设置
    name: 'SourceDataPreview',
    props: (route) => ({
      id: +route.params.id
    }),
    component: () =>
        import(/* webpackChunkName: 'SourceData' */ '@/views/SourceData/Preview')
  },
  {
    path: '/SummaryData',
    name: 'SummaryData',
    component: () =>
        import(/* webpackChunkName: 'SummaryData' */ '@/views/SummaryData')
  },
  {
    path: '/FillReport',
    name: 'FillReport',
    component: () =>
        import(/* webpackChunkName: 'FillReport' */ '@/views/FillReport/Index')
  }, {
    path: '/FillReport/Edit',
    name: 'FillReportEdit',
    props: (route) => ({
      ...route.query,
      isPreview: false
    }),
    component: () =>
        import(/* webpackChunkName: 'FillReport' */ '@/views/FillReport/Edit')
  },
  {
    path: '/FillReport/Preview',
    name: 'FillReportPreview',
    props: (route) => ({
      ...route.query,
      isPreview: true
    }),
    component: () =>
        import(/* webpackChunkName: 'FillReport' */ '@/views/FillReport/Edit')
  },
  {
    path: '/JournalData',
    name: 'JournalData',
    component: () =>
        import(/* webpackChunkName: 'JournalData' */ '@/views/JournalData')
  }, {
    path: '/BudgetData',
    name: 'BudgetData',
    component: () =>
        import(/* webpackChunkName: 'BudgetData' */ '@/views/BudgetData')
  }, {
    path: '/QueryReport',
    name: 'QueryReport',
    component: () =>
        import(/* webpackChunkName: 'QueryReport' */ '@/views/QueryReport')
  }
  ]
}

export function createRouter () {
  return new Router({
    routes: [
      manageRouter,
      {
        // 支持/Login、/Login/back、/Login/redirectUrl=encodeURIComponent(path)
        path: '/Login/:action?/',
        name: 'Login',
        component: Login,
        props: (route) => ({
          ...route.params,
          redirectUrl: route.query.redirectUrl
        }),
        beforeEnter: (to, from, next) => {
          if (!from.name) {
            to.params.action = ''
          }
          next()
        }
      }
    ]
  })
}
