import Mock from 'mockjs'

const getUserInfo = Mock.mock({
  success: true,
  message: '成功',
  data: {
    id: '@id',
    name: '@cname',
    avatar: Mock.Random.image('60x60'),
    role: 'admin',
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
            path: '',
            name: 'Paper_List',
            componentPath: 'paper/index',
            meta: {
              title: '试卷库'
            }
          }
        ]
      }
    ]
  }
})

export default {
  getUserInfo
}
