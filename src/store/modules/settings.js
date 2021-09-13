import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings,tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  showBread:true
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  TOGGLE_BREAD:(state,status) => {
    state.showBread = status
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  toggleBread({commit},data){
    commit('TOGGLE_BREAD',data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
