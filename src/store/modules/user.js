import * as types from '../mutation-types'
import { user } from '../../api'

const state = {
  id: '',
  name: '',
  avatar: '',
  role: '',
  regionId: '',
  periodId: '',
  subjectId: ''
}

const mutations = {
  [types.SET_USRE_ID](state, id) {
    state.id = id
  },
  [types.SET_USER_NAME](state, name) {
    state.name = name
  },
  [types.SET_USER_AVATAR](state, avatar) {
    state.avatar = avatar
  },
  [types.SET_USER_ROLE](state, role) {
    state.role = role
  },
  [types.SET_USER_REGIONID](state, regionId) {
    state.regionId = regionId
  },
  [types.SET_USER_PERIODID](state, periodId) {
    state.periodId = periodId
  },
  [types.SET_USER_SUBJECTID](state, subjectId) {
    state.subjectId = subjectId
  }
}

const actions = {
  async getUserInfo({ dispatch, commit }) {
    try {
      let res = await user.getUserInfo()
      commit(types.SET_USRE_ID, res.data.id)
      commit(types.SET_USER_NAME, res.data.name)
      commit(types.SET_USER_AVATAR, res.data.avatar)
      commit(types.SET_USER_ROLE, res.data.role)
      commit(types.SET_USER_REGIONID, res.data.regionId)
      commit(types.SET_USER_PERIODID, res.data.periodId)
      commit(types.SET_USER_SUBJECTID, res.data.subjectId)
      let result = await dispatch('generateRoutes', res.data.routes)
      return result
    } catch (err) {
      return err
    }
  },
  updateUserSgr({ commit }, { regionId = '', periodId = '', subjectId = '' }) {
    commit(types.SET_USER_REGIONID, regionId)
    commit(types.SET_USER_PERIODID, periodId)
    commit(types.SET_USER_SUBJECTID, subjectId)
  }
}

export default {
  state,
  mutations,
  actions
}
