import * as types from '../mutation-types'
import { Message } from 'element-ui'
import { app } from '../../api'

const state = {
  cachePage: [],
  menuList: [],
  sidebar: {
    isCollapse: !!+window.localStorage.getItem('sidebarStatus')
  },
  // 用户的知识体系，科目，学段
  sgrOptions: [],
  // 知识体系选项
  regionOptions: { key: '', label: '', list: [] },
  // 学段选项
  periodOptions: { key: '', label: '', list: [] },
  // 科目选项
  subjectOptions: { key: '', label: '', list: [] },
  // 教学步骤
  tearchSteps: [],
  types: {LECTURE: '讲义', PAPER: '试卷'}
}

const mutations = {
  [types.TOGGLE_SIDEBAR](state, status) {
    if (state.sidebar.isCollapse) {
      window.localStorage.setItem('sidebarStatus', 0)
    } else {
      window.localStorage.setItem('sidebarStatus', 1)
    }
    state.sidebar.isCollapse = !state.sidebar.isCollapse
  },
  [types.SET_SGROPTIONS](state, data) {
    state.sgrOptions = data
  },
  [types.SET_REDION_OPTIONS](state, data) {
    state.regionOptions = data
  },
  [types.SET_PERIOD_OPTIONS](state, data) {
    state.periodOptions = data
  },
  [types.SET_SUBJECT_OPTIONS](state, data) {
    state.subjectOptions = data
  },
  [types.SET_TEACHER_STEPS](state, data) {
    state.tearchSteps = data
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },
  // 获取基础数据
  async getBaseOptions({ commit }) {
    try {
      let res = await app.getDictData('BASE')
      let regionOptions = res.data.find(v => v.key === 'regionId')
      let periodOptions = res.data.find(v => v.key === 'periodId')
      let subjectOptions = res.data.find(v => v.key === 'subjectId')
      if (regionOptions) commit(types.SET_REDION_OPTIONS, regionOptions)
      if (periodOptions) commit(types.SET_PERIOD_OPTIONS, periodOptions)
      if (subjectOptions) commit(types.SET_SUBJECT_OPTIONS, subjectOptions)
      return res
    } catch (err) {
      return err
    }
  },
  // 获取教学步骤
  async getTeacherSteps({ commit }) {
    try {
      let res = await app.getTeacherSteps()
      commit(types.SET_TEACHER_STEPS, res.data)
    } catch (e) {
      Message.error(e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
