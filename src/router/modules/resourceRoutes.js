import store from '@/store'
import Layout from '@/layout'
export default function(roles) {
  var resourceRoutes = [{
    path: '/DeployManage',
    component: Layout,
    redirect: '',
    name: 'Deploy Manage',
    meta: { title: 'Deploy Manage', icon: 'eye-open', roles: ['visitor'] },
    children: [
      {
        path: 'Resource',
        component: () => import('@/views/deploy/index'),
        name: 'Resource Name',
        // redirect: '/DeployManage/Resource/test',
        meta: { title: 'Resource Name', icon: 'nested', roles: ['visitor'] },
        children: []
      },
      {
        path: 'ResourceReg',
        name: 'Resource Register',
        component: () => import('@/views/deploy/myServer'),
        meta: { title: 'Resource Register', icon: 'form', roles: ['visitor'] }
      },
      {
        path: 'ResourceMonitor',
        name: 'Resource Monitor',
        component: () => import('@/views/deploy/monitor'),
        meta: { title: 'Resource Monitor', icon: 'form', roles: ['visitor'] }
      }
    ]
  }]
  var myRoles = roles
  // default my role visitor
  myRoles.push('visitor')
  var routeItems = store.getters.routes
  // console.log('routeItems', routeItems)
  Object.keys(routeItems).forEach(endpoint => {
    var tmpRoute = {
      path: endpoint,
      component: () => import('@/views/deploy/endpoint'),
      name: '',
      meta: { title: '', roles: [] },
      children: []
    }
    tmpRoute.path = routeItems[endpoint].path
    tmpRoute.name = routeItems[endpoint].path
    tmpRoute.meta.title = routeItems[endpoint].path
    tmpRoute.meta.roles = routeItems[endpoint].roles
    // add routes base on my role
    if (!myRoles.some(role => tmpRoute.meta.roles.includes(role))) {
      return
    }
    // console.log(tmpRoute)
    // tmpRoute.children = element.serverList
    Object.keys(routeItems[endpoint].serverList).forEach(serverName => {
      var tmpChildrenRoute = {
        path: '',
        component: () => import('@/views/deploy/resource'),
        name: '',
        meta: { title: '', roles: [] }
      }
      tmpChildrenRoute.path = serverName
      tmpChildrenRoute.name = serverName
      tmpChildrenRoute.meta.title = serverName
      tmpChildrenRoute.meta.roles = routeItems[endpoint].roleList[serverName]
      // add routes base on my role
      if (!myRoles.some(role => tmpChildrenRoute.meta.roles.includes(role))) {
        return
      }
      tmpRoute.children.push(tmpChildrenRoute)
    })
    resourceRoutes[0].children[0].children.push(tmpRoute)
  })
  return resourceRoutes
}
