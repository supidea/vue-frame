import Mock from 'mockjs'
import getAsyncRoutes from './routes'
import login from './login'

Mock.setup({
  timeout: 400
})

// 登录相关
Mock.mock(/\/user\/info$/, 'get', login.getUserInfo)

// 界面相关
Mock.mock(/\/routes$/, 'get', getAsyncRoutes)

export default Mock
