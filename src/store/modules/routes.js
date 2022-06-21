import { fetchData } from '@/api/server-endpoint'
const state = {
  routes: []
}
const mutations = {
  SET_ROUTES: (state, routeItems) => {
    state.routes = routeItems
  }
}
const actions = {
  // get routes
  getRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      fetchData().then(response => {
        var routeItems = response.data
        commit('SET_ROUTES', routeItems)
        resolve(routeItems)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
