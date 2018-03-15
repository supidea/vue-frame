import fetch from '../utils/fetch'

export default {
  // 讲义库 列表
  getLectureLibList(params) {
    return fetch.post(`/lecture/lib/list`, params)
  }
}
