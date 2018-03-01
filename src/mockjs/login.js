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
        path: '/paper',
        name: 'Paper',
        componentPath: 'layout/index',
        noDropdown: true,
        icon: 'shijuan',
        redirect: '/paper/list',
        meta: {
          title: '试卷库'
        },
        children: [
          {
            path: '/paper/list',
            name: 'Paper_List',
            componentPath: 'paper/index',
            meta: {
              hidden: true,
              title: '试卷库'
            }
          },
          {
            path: ':id',
            name: 'Paper_Detail',
            componentPath: 'paper/detail',
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
        icon: 'timu',
        redirect: '/question/list',
        meta: {
          title: '题库'
        },
        children: [
          {
            path: '/question/list',
            name: 'Question_List',
            meta: {
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
      }
    ]
  }
})

export default {
  getUserInfo
}
