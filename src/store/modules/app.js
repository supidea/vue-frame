import * as types from '../mutation-types'
import { app } from '../../api'

const state = {
  cachePage: [],
  menuList: [],
  sidebar: {
    isCollapse: !!+window.localStorage.getItem('sidebarStatus')
  },
  sgrOptions: []
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
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },
  async getSgrOptions({ commit }, type) {
    try {
      let res = await app.getDictData(type)
      commit(types.SET_SGROPTIONS, res.data)
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
