import * as types from '../mutation-types'
import { Message } from 'element-ui'
import { app } from '../../api'

const state = {
  cachePage: [],
  menuList: [],
  sidebar: {
    isCollapse: !!+window.localStorage.getItem('sidebarStatus')
  },
  baseData: [],
  // 用户的知识体系，科目，学段
  sgrOptions: [],
  // 知识体系选项
  regionOptions: { key: '', label: '', list: [] },
  // 学段选项
  periodOptions: { key: '', label: '', list: [] },
  // 科目选项
  subjectOptions: { key: '', label: '', list: [] },
  // // 年份选项
  // yearOptions: { key: '', label: '', list: [] },
  // // 年级选项
  // gradeOptions: { key: '', label: '', list: [] },
  // // 教材类型选项
  // textbookTypeOptions: { key: '', label: '', list: [] },
  // // 课程季选项
  // seasonOptions: { key: '', label: '', list: [] },
  // // 产品线选项
  // productOptions: { key: '', label: '', list: [] },
  // // 题型选项
  // itemTypeOptions: { key: '', label: '', list: [] },
  // // 试卷类型选项
  // paperTypeOptions: { key: '', label: '', list: [] },
  // // 难度选项
  // LevelOptions: { key: '', label: '', list: [] },
  // // 来源部门选项
  // departmentOptions: { key: '', label: '', list: [] },
  // 教学步骤
  tearchSteps: [],
  types: { LECTURE: '讲义', PAPER: '试卷' }
}

const getters = {
  getBaseOptions: state => (...params) => {
    return state.baseData.filter(v => {
      return params.includes(v.key)
    })
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
  // [types.SET_GRADE_OPTIONS](state, data) {
  //   state.gradeOptions = data
  // },
  // [types.SET_TBTYPE_OPTIONS](state, data) {
  //   state.textbookTypeOptions = data
  // },
  // [types.SET_SEASON_OPTIONS](state, data) {
  //   state.seasonOptions = data
  // },
  // [types.SET_PRODUCT_OPTIONS](state, data) {
  //   state.productOptions = data
  // },
  // [types.SET_ITEMTYPE_OPTIONS](state, data) {
  //   state.itemTypeOptions = data
  // },
  // [types.SET_PAPERTYPE_OPTIONS](state, data) {
  //   state.paperTypeOptions = data
  // },
  // [types.SET_YEAR_OPTIONS](state, data) {
  //   state.yearOptions = data
  // },
  // [types.SET_LEVEL_OPTIONS](state, data) {
  //   state.LevelOptions = data
  // },
  // [types.SET_DEPARTMENT_OPTIONS](state, data) {
  //   state.departmentOptions = data
  // },
  [types.SET_TEACHER_STEPS](state, data) {
    state.tearchSteps = data
  },
  [types.SET_BASEDATA](state, data) {
    state.baseData = data
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
  // 获取数据
  async getBaseData({ commit }) {
    try {
      let res = await app.getDictData('ALL')
      commit(types.SET_BASEDATA, res.data)
      // res.data.forEach(v => {
      //   switch (v.key) {
      //     case 'gradeId':
      //       commit(types.SET_GRADE_OPTIONS, v)
      //       break
      //     case 'textbookTypeId':
      //       commit(types.SET_TBTYPE_OPTIONS, v)
      //       break
      //     case 'seasonId':
      //       commit(types.SET_SEASON_OPTIONS, v)
      //       break
      //     case 'productCode':
      //       commit(types.SET_PRODUCT_OPTIONS, v)
      //       break
      //     case 'itemTypeId':
      //       commit(types.SET_ITEMTYPE_OPTIONS, v)
      //       break
      //     case 'paperTypeId':
      //       commit(types.SET_PAPERTYPE_OPTIONS, v)
      //       break
      //     case 'yearId':
      //       commit(types.SET_YEAR_OPTIONS, v)
      //       break
      //     case 'diffLevelId':
      //       commit(types.SET_LEVEL_OPTIONS, v)
      //       break
      //     case 'sourceDepartmentId':
      //       commit(types.SET_DEPARTMENT_OPTIONS, v)
      //       break
      //   }
      // })
    } catch (e) {
      Message.error(e)
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
  getters,
  mutations,
  actions
}
