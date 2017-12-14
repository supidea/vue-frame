import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { routes } from './routes'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {
  let tit = ''
  if (to.meta.title) tit = to.meta.title + '-'
  window.document.title = `${tit}教师工作平台`
  NProgress.done()
})

export default router
