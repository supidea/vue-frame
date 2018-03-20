import fetch from '../utils/fetch'

export default {
  // 获取讲义列表
  getLectureList({ initFlag = false, ...params }) {
    return fetch.post(`/lecture/list`, { initFlag, ...params })
  },
  // 删除讲义
  removeLeture(id) {
    return fetch.delete(`/lecture/${id}`)
  },
  // 讲义库 列表
  getLectureLibList(params) {
    return fetch.post(`/lecture/lib/list`, params)
  },
  // 获取讲义套件
  getLectureSuiteList({ status = 'INIT', ...params }) {
    return fetch.post(`/lecturesuit/list`, { status, ...params })
  },
  // 删除讲义套件
  removeLectureSuite(id) {
    return fetch.delete(`/lecturesuit/${id}`)
  }
}
