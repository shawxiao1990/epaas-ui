import loadMore from './scroll-loadMore'

const install = function(Vue) {
  Vue.directive('scroll-loadMore', loadMore)
}

if (window.Vue) {
  window['scroll-loadMore'] = loadMore
  Vue.use(install); // eslint-disable-line
}

loadMore.install = install
export default loadMore
