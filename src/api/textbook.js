import fetch from '../utils/fetch'

export default {
  // 获取精品教材列表
  getTextbookList(params) {
    return fetch.post('/textbook/list', params)
  },
  // 获取精品教材详情
  getTextbookDetail (textBookId) {
    return fetch.get(`/textbook/${textBookId}/preview`)
  }
}
