import store from '@/store'
import Layout from '@/layout'
export default function(route) {
  var resourceRoutes = [{
    path: '/DeployManage',
    component: Layout,
    redirect: '',
    name: 'Deploy Manage',
    meta: { title: 'Deploy Manage', icon: 'eye-open', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'Resource',
        component: () => import('@/views/deploy/index'),
        name: 'Resource Name',
        // redirect: '/DeployManage/Resource/test',
        meta: { title: 'Resource Name', icon: 'nested', roles: ['admin', 'editor'] },
        children: []
      },
      {
        path: 'ResourceReg',
        name: 'Resource Register',
        component: () => import('@/views/pubform/index'),
        meta: { title: 'Resource Register', icon: 'form', roles: ['admin', 'editor'] }
      }
    ]
  }]
  var routeItems = store.getters.routes
  // console.log('routeItems', routeItems)
  Object.keys(routeItems).forEach(endpoint => {
    var tmpRoute = {
      path: '',
      component: () => import('@/views/deploy/resource'),
      name: '',
      meta: { title: '', roles: ['admin', 'editor'] },
      children: []
    }
    tmpRoute.path = routeItems[endpoint].path
    tmpRoute.name = routeItems[endpoint].path
    tmpRoute.meta.title = routeItems[endpoint].path
    // console.log(tmpRoute)
    // tmpRoute.children = element.serverList
    Object.keys(routeItems[endpoint].serverList).forEach(serverName => {
      var tmpChildrenRoute = {
        path: '',
        component: () => import('@/views/deploy/resource'),
        name: '',
        meta: { title: '', roles: ['admin', 'editor'] }
      }
      tmpChildrenRoute.path = serverName
      tmpChildrenRoute.name = serverName
      tmpChildrenRoute.meta.title = serverName
      tmpRoute.children.push(tmpChildrenRoute)
    })
    resourceRoutes[0].children[0].children.push(tmpRoute)
  })
  return resourceRoutes
}
