import Mock from 'mockjs'
import login from './login'

Mock.setup({
  timeout: 400
})

// 登录相关
Mock.mock(/\/user\/info$/, 'get', login.getUserInfo)

export default Mock
