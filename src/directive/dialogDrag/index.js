import dialogDrag from './dialogDrag.js'

const install = function(Vue) {
  Vue.directive('dialogDrag', dialogDrag)
}

if (window.Vue) {
  window['dialogDrag'] = dialogDrag
  Vue.use(install); // eslint-disable-line
}

dialogDrag.install = install
export default dialogDrag
