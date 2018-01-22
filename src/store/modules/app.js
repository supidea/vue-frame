import * as types from '../mutation-types'

const state = {
  cachePage: [],
  menuList: [],
  sidebar: {
    isCollapse: !!+window.localStorage.getItem('sidebarStatus')
  }
}

const mutations = {
  [types.TOGGLE_SIDEBAR](state, status) {
    if (state.sidebar.isCollapse) {
      window.localStorage.setItem('sidebarStatus', 0)
    } else {
      window.localStorage.setItem('sidebarStatus', 1)
    }
    state.sidebar.isCollapse = !state.sidebar.isCollapse
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  }
}

export default {
  state,
  mutations,
  actions
}
