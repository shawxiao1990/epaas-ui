const state = {
  appForm: {}
}
const mutations = {
  SET_APP: (state, appForm) => {
    state.appForm = appForm
    // state.id = 'qaz'
  }
}
const actions = {
  PushData({ commit }, appForm) {
    commit('SET_APP', appForm)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
