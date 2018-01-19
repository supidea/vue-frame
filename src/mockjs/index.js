import Mock from 'mockjs'
import getAsyncRoutes from './routes'

Mock.setup({
  timeout: 400
})

// 登录相关
Mock.mock(/\/routes$/, 'get', getAsyncRoutes)

export default Mock
