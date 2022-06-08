import Vue from 'vue'
import App from './App.vue'
import XXWebBox from './packages/xxWeb-box/index'
import router from './router';

Vue.config.productionTip = false
Vue.use(XXWebBox)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
