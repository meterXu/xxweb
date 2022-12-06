import Vue from 'vue'
import App from './App.vue'
import {filter,util} from './packages/xxWeb-utils/index'
import {XXWebBox} from './packages/xxWeb-box'
import router from './router';
Vue.config.productionTip = false
Vue.prototype.$project = window.project
filter(router,Vue.prototype.$project)
Vue.prototype.$ls = new util.ls(window.project)
Vue.use(XXWebBox)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
