import Vue from 'vue'
import App from './App.vue'
import XXWebBox from './packages/xxWeb-box/index'
import {filter,util} from './packages/xxWeb-utils/index'
import router from './router';
Vue.config.productionTip = false
Vue.prototype.$project = window.project
filter(router,Vue.prototype.$project)
Vue.use(XXWebBox)
Vue.prototype.$ls = new util.ls(window.project)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
