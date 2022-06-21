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
  routeItems.forEach(element => {
    var tmpRoute = {
      path: '',
      component: () => import('@/views/deploy/resource'),
      name: '',
      meta: { title: '', roles: ['admin', 'editor'] },
      children: []
    }
    tmpRoute.path = element.path
    tmpRoute.name = element.path
    tmpRoute.meta.title = element.path
    // tmpRoute.children = element.serverList
    resourceRoutes[0].children[0].children.push(tmpRoute)
  })
  return resourceRoutes
}
