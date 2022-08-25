import Vue from 'vue'
import App from './App.vue'
import XXWebBox from './packages/xxWeb-box/index'
import {filter} from './packages/xxWeb-utils/index'
import router from './router';
Vue.config.productionTip = false
Vue.use(XXWebBox)
Vue.prototype.$project = window.project
filter(router,Vue.prototype.$project)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
