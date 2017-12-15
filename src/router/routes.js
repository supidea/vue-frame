import Layout from '@/pages/layout'

// 不作为Layout组件的子页面展示的页面单独写
export const baseRoutes = [
  {
    path: '/403',
    name: 'Err403',
    meta: {
      title: '403-权限不够'
    },
    component: () => import('@/pages/error/403.vue')
  },
  {
    path: '/404',
    name: 'Err404',
    meta: {
      title: '404-页面不存在'
    },
    component: () => import('@/pages/error/404.vue')
  },
  {
    path: '/500',
    name: 'Err500',
    meta: {
      title: '500-服务器内部错误'
    },
    component: () => import('@/pages/error/500.vue')
  }
]

// 作为Layout组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const addRoutes = [
  {
    path: '/paper',
    name: 'Paper',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Paper_Index',
        meta: {
          title: '试卷库'
        },
        component: () => import('@/pages/paper')
      },
      {
        path: ':id',
        name: 'Paper_Detail',
        meta: {
          title: '试卷详情'
        },
        component: () => import('@/pages/paper/Detail.vue')
      }
    ]
  },
  {
    path: '/question',
    name: 'Question',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Question_List',
        meta: {
          title: '题库'
        },
        component: () => import('@/pages/question/List')
      },
      {
        path: ':id',
        name: 'Question_Detail',
        meta: {
          title: '题详情'
        },
        component: () => import('@/pages/question/Detail.vue')
      }
    ]
  }
]

// // 作为Layout组件的子页面展示但是不在左侧菜单显示的路由写在otherRoutes里
export const routes = [
  ...baseRoutes,
  ...addRoutes,
  { path: '*', redirect: '/404' }
]
