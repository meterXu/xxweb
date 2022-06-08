import Vue from 'vue'
import App from './App.vue'
import S2Frame from './packages/s2-frame/index'
import router from './router';

Vue.config.productionTip = false
Vue.use(S2Frame)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
