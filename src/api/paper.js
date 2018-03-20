import fetch from '../utils/fetch'

export default {
  // 获取试卷列表
  getPaperList(params) {
    return fetch.post('/paper/list', params)
  },
  // 获取试卷详情
  getPaperDetail(id) {
    return fetch.get(`/paper/${id}`)
  }
}
