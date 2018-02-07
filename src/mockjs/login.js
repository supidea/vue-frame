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
        meta: {
          title: '试卷库',
          icon: 'shijuan'
        },
        children: [
          {
            hidden: true,
            path: '',
            name: 'Paper_List',
            componentPath: 'paper/index',
            meta: {
              title: '试卷库'
            }
          },
          {
            hidden: true,
            path: ':id',
            name: 'Paper_Detail',
            componentPath: 'paper/detail',
            meta: {
              title: '试卷详情'
            }
          }
        ]
      },
      {
        path: '/question',
        name: 'Question',
        componentPath: 'layout/index',
        meta: {
          icon: 'timu',
          title: '题库'
        },
        children: [
          {
            path: 'list',
            name: 'Question_List',
            meta: {
              title: '题库'
            },
            componentPath: 'question/list'
          },
          {
            path: ':id',
            name: 'Question_Detail',
            meta: {
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
