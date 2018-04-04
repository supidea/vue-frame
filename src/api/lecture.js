import fetch from '../utils/fetch'

export default {
  // 获取讲义列表
  getLectureList({ initFlag = false, ...params }) {
    return fetch.post(`/lecture/list`, { initFlag, ...params })
  },
  // 获取讲义详情
  getLectureEditInfo(id) {
    return fetch.get(`/lecture/${id}/edit`)
  },
  // 获取知识点对应的考试要求
  getLecturePointRequire(pointIds) {
    return fetch.get(`/lecture/point/require?pointIds=${pointIds}`)
  },
  // 创建或修改讲义
  updateLecture(params) {
    return fetch.post('/lecture', params)
  },
  // 删除讲义
  removeLeture(id) {
    return fetch.delete(`/lecture/${id}`)
  },
  // 讲义库 列表
  getLectureLibList(params) {
    return fetch.post(`/lecture/lib/list`, params)
  },
  // 获取讲义套件列表
  getLectureSuiteList({ status = 'INIT', ...params }) {
    return fetch.post(`/lecturesuit/list`, { status, ...params })
  },
  // 获取讲义套件详情
  getLectureSuiteDetail(lecturesuitId) {
    return fetch.get(`/lecturesuit/${lecturesuitId}`)
  },
  // 添加讲义套件模块
  addLectureSuiteModule(params) {
    return fetch.post('/lecturesuit/template', params)
  },
  // 删除讲义套件中的教学步骤模块
  removeLectureSuiteModule(templateId) {
    return fetch.delete(`/lecturesuit/template/${templateId}`)
  },
  // 删除讲义套件
  removeLectureSuite(id) {
    return fetch.delete(`/lecturesuit/${id}`)
  },
  // 复制讲义套件
  copyLectureSuite(lecturesuitId) {
    return fetch.post(`/lecturesuit/${lecturesuitId}/copy`)
  },
  // 发布讲义套件
  pubilshLectureSuite(lecturesuitId) {
    return fetch.put(`/lecturesuit/${lecturesuitId}/publish`)
  },
  // 绑定讲义套件
  bindLectureSuite(params) {
    return fetch.put('/lecturesuit/template/bind', params)
  }
}
