import fetch from '../utils/fetch'
export default {
  getAsyncRoutes() {
    return fetch.get('/routes')
  },
  // 获取基础字典数据
  getDictData(type, needUnchecked = false) {
    return fetch.get('/dict/selector/list', { params: { type, needUnchecked } })
  },
  // 获取教学步骤
  getTeacherSteps() {
    return fetch.get(`/lecturesuit/teachingsteps`)
  }
}
