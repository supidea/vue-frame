import Layout from '@/pages/layout'

// 不作为Layout组件的子页面展示的页面单独写
export const baseRoutes = [
  {
    path: '/403',
    name: 'Err403',
    meta: {
      title: '403-权限不够'
    },
    component: () => import('@/pages/error/403')
  },
  {
    path: '/404',
    name: 'Err404',
    meta: {
      title: '404-页面不存在'
    },
    component: () => import('@/pages/error/404')
  },
  {
    path: '/500',
    name: 'Err500',
    meta: {
      title: '500-服务器内部错误'
    },
    component: () => import('@/pages/error/500')
  }
]

// 作为Layout组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const addRoutes = [
  {
    path: '/paper',
    name: 'Paper',
    component: Layout,
    redirect: '/paper/list',
    meta: {
      icon: 'shijuan',
      title: '试卷库'
    },
    children: [
      {
        path: 'list',
        name: 'Paper_List',
        meta: {
          hidden: true,
          title: '试卷库'
        },
        component: () => import('@/pages/paper')
      },
      {
        path: ':id',
        name: 'Paper_Detail',
        meta: {
          hidden: true,
          title: '试卷详情'
        },
        component: () => import('@/pages/paper/detail')
      }
    ]
  },
  {
    path: '/question',
    name: 'Question',
    component: Layout,
    redirect: '/question/list',
    meta: {
      icon: 'timu',
      title: '题库'
    },
    children: [
      {
        path: 'list',
        name: 'Question_List',
        meta: {
          noBreadcrumb: true,
          title: '题库'
        },
        component: () => import('@/pages/question/list')
      },
      {
        path: ':id',
        name: 'Question_Detail',
        meta: {
          title: '题库详情'
        },
        component: () => import('@/pages/question/detail')
      }
    ]
  },
  {
    path: '/textbook',
    name: 'Textbook',
    meta: {
      icon: 'jiaocai',
      title: '精品教材'
    },
    component: () => import('@/pages/textbook')
  },
  {
    path: '/my',
    name: 'My',
    meta: {
      title: '个人中心',
      icon: 'geren'
    },
    component: Layout,
    children: [
      {
        path: 'schedule',
        name: 'My_Schedule',
        meta: {
          title: '我的日程表'
        },
        component: () => import('@/pages/my/schedule')
      }
    ]
  }
]

// 作为Layout组件的子页面展示但是不在左侧菜单显示的路由写在otherRoutes里
export const routes = [
  ...baseRoutes,
  ...addRoutes,
  { path: '*', redirect: '/404' }
]
