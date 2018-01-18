import Mock from 'mockjs'
import routes from './routes'

Mock.setup({
  timeout: 400
})

Mock.mock(/\/routes$/, 'GET', routes)

export default Mock
