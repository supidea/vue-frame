import fetch from '../utils/fetch'

export default {
  // 获取精品教材列表
  getTextbookList(params) {
    return fetch.post('/textbook/list', params)
  }
}
