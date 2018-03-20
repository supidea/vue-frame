import Mock from 'mockjs'

const getUserInfo = Mock.mock({
  success: true,
  message: '成功',
  data: {
    id: '@id',
    name: '@cname',
    avatar: Mock.Random.image('60x60'),
    role: 'admin',
    periodId: 10001,
    regionId: 153,
    subjectId: 8,
    routes: [
      {
        path: '/textbook',
        name: 'Textbook',
        componentPath: 'layout/index',
        noDropdown: true,
        icon: 'icon-jiaocai',
        redirect: '/textbook/list',
        meta: {
          title: '精品教材'
        },
        children: [
          {
            path: '/textbook/list',
            name: 'Textbook_List',
            componentPath: 'textbook/list/index',
            meta: {
              hidden: true,
              title: '教材列表'
            }
          },
          {
            path: ':id',
            name: 'Textbook_Detail',
            componentPath: 'textbook/detail/index',
            meta: {
              hidden: true,
              title: '教材列表'
            }
          }
        ]
      },
      {
        path: '/paper',
        name: 'Paper',
        componentPath: 'layout/index',
        noDropdown: true,
        icon: 'icon-shijuan',
        redirect: '/paper/list',
        meta: {
          title: '试卷库'
        },
        children: [
          {
            path: '/paper/list',
            name: 'Paper_List',
            componentPath: 'paper/list/index',
            meta: {
              hidden: true,
              title: '试卷列表'
            }
          },
          {
            path: ':id',
            name: 'Paper_Detail',
            componentPath: 'paper/detail/index',
            meta: {
              hidden: true,
              title: '试卷详情'
            }
          }
        ]
      },
      {
        path: '/question',
        name: 'Question',
        componentPath: 'layout/index',
        icon: 'icon-timu',
        redirect: '/question/list',
        noDropdown: true,
        meta: {
          title: '题库'
        },
        children: [
          {
            path: '/question/list',
            name: 'Question_List',
            meta: {
              hidden: true,
              title: '题库列表'
            },
            componentPath: 'question/list'
          },
          {
            path: ':id',
            name: 'Question_Detail',
            meta: {
              hidden: true,
              title: '题库详情'
            },
            componentPath: 'question/detail'
          }
        ]
      },
      {
        path: '/lecture',
        name: 'Lecture',
        componentPath: 'layout/index',
        noDropdown: true,
        icon: 'icon-jiangyi',
        redirect: '/lecture/list',
        meta: {
          title: '讲义库'
        },
        children: [
          {
            path: '/lecture/list',
            name: 'Lecture_List',
            componentPath: 'lecture/list/index',
            meta: {
              hidden: true,
              title: '讲义列表'
            }
          }
        ]
      },
      {
        path: '/my',
        name: 'My',
        componentPath: 'layout/index',
        icon: 'icon-geren',
        meta: {
          title: '个人中心'
        },
        children: [
          {
            path: '/my/lecture',
            name: 'My_Lecture',
            componentPath: 'my/lecture/index',
            meta: {
              title: '我的讲义'
            }
          },
          {
            path: '/my/draft',
            name: 'My_Draft',
            componentPath: 'my/draft/layout',
            redirect: '/my/draft/lecture',
            meta: {
              title: '草稿箱'
            },
            children: [
              {
                path: '/my/draft/lecture',
                name: 'My_Draft_Lecture',
                meta: {
                  title: '我的讲义',
                  hidden: true
                },
                componentPath: 'my/draft/lecture/index'
              },
              {
                path: '/my/draft/lecture-suite',
                name: 'My_Draft_Lecture-suite',
                meta: {
                  title: '讲义套件',
                  hidden: true
                },
                componentPath: 'my/draft/lecture-suite/index'
              }
            ]
          }
        ]
      }
    ]
  }
})

export default {
  getUserInfo
}
