import * as types from '../mutation-types'
import { user } from '../../api'

const state = {
  id: '',
  name: '',
  avatar: '',
  role: ''
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
  }
}

const actions = {
  getUserInfo({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      user.getUserInfo().then(res => {
        commit(types.SET_USRE_ID, res.data.id)
        commit(types.SET_USER_NAME, res.data.name)
        commit(types.SET_USER_AVATAR, res.data.avatar)
        commit(types.SET_USER_ROLE, res.data.role)
        dispatch('generateRoutes', res.data.routes).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
