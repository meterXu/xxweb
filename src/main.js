import Vue from 'vue'
import App from './App.vue'
import XXWebBox from './packages/xxWeb-box/index'
import {filter,util} from './packages/xxWeb-utils/index'
import DoIcon from '@dpark/icon'
import router from './router';
Vue.config.productionTip = false
Vue.use(XXWebBox)
Vue.use(DoIcon)
console.log("test")
console.log("test")
console.log("test")
console.log("test")
Vue.prototype.$project = window.project
filter(router,Vue.prototype.$project)
Vue.prototype.$ls = new util.ls(window.project)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
