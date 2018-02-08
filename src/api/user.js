import fetch from '../utils/fetch'

export default {
  // 获取用户信息
  getUserInfo() {
    return fetch.get('/user/info')
  },
  /**
   * 修改用户操作信息
   * @param {Object} params
   */
  updateUserSgr(params) {
    return fetch.put('/user/userOperate', params)
  },
  // 获取我的日程表
  getSchedule(startDate, endDate) {
    return fetch.get('/user/schedule', { params: { startDate, endDate } })
  }
}
