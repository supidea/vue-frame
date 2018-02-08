import * as types from '../mutation-types'
import { app } from '../../api'

const state = {
  cachePage: [],
  menuList: [],
  sidebar: {
    isCollapse: !!+window.localStorage.getItem('sidebarStatus')
  },
  sgrOptions: [],
  regionOptions: { key: '', label: '', list: [] },
  periodOptions: { key: '', label: '', list: [] },
  subjectOptions: { key: '', label: '', list: [] }
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
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },
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
  }
}

export default {
  state,
  mutations,
  actions
}
