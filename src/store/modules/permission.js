import * as types from '../mutation-types'
const _import = require('../../router/_import')

/**
 * 递归获得的路由JSON，转换路由的组件地址
 * @param {Array} routes
 */
async function setRoutesComponent(routes) {
  for (let i = 0; i < routes.length; i++) {
    let route = routes[i]
    if (route.componentPath) {
      route.component = _import(route.componentPath)
      delete route.componentPath
    }
    if (route.children) {
      setRoutesComponent(route.children)
    }
  }
}

const state = {
  addRoutes: []
}

const mutations = {
  [types.SET_ROUTES](state, routes) {
    state.addRoutes = routes
  }
}

const actions = {
  generateRoutes({ commit }, routes) {
    return new Promise((resolve) => {
      setRoutesComponent(routes)
      commit(types.SET_ROUTES, routes)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
