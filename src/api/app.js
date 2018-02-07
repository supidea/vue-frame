import fetch from '../utils/fetch'
export default {
  getAsyncRoutes() {
    return fetch.get('/routes')
  },
  // 获取基础字典数据
  getDictData(type, needUnchecked = true) {
    return fetch.get('/dict/selector/list', { params: { type, needUnchecked } })
  }
}
