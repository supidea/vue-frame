import fetch from '../utils/fetch'

export default {
  // 获取我的日程表
  getSchedule(startDate, endDate) {
    return fetch.get('/user/schedule', { params: { startDate, endDate } })
  }
}
