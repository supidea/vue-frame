import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { baseRoutes } from './routes'

Vue.use(Router)
NProgress.configure({ showSpinner: false })

const router = new Router({
  routes: baseRoutes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.state.user.id === '') {
    store.dispatch('getUserInfo').then(res => {
      router.addRoutes(store.state.permission.addRoutes)
      next({ ...to, replace: true })
    }).catch(() => {
      NProgress.done()
    })
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  let tit = ''
  if (to.meta && to.meta.title) tit = to.meta.title + '-'
  window.document.title = `${tit}教师工作平台`
  NProgress.done()
})

export default router
