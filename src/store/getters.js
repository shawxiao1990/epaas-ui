const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  appForm: state => state.publishapp.appForm,
  yamlFile: state => state.publishapp.yamlFile,
  routes: state => state.routes.routes,
  allRoles: state => state.user.allRoles
}
export default getters
