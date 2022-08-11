const state = {
  appForm: null,
  yamlFile: null
}
const mutations = {
  SET_APP: (state, appForm) => {
    state.appForm = appForm
    // state.id = 'qaz'
  },
  SET_YAML: (state, yamlFile) => {
    state.yamlFile = yamlFile
    // state.id = 'qaz'
  }
}
const actions = {
  PushData({ commit }, appForm) {
    commit('SET_APP', appForm)
  },
  readYAMl({ commit }, yamlFile) {
    commit('SET_YAML', yamlFile)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
