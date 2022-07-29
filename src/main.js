import Vue from 'vue'
import App from './App.vue'
import XXWebBox from './packages/xxWeb-box/index'
import {filter} from './packages/xxWeb-utils/index'
import project from "./project";
// import XXWebBox from "xxWeb-xxWebBox";
import router from './router';

Vue.config.productionTip = false
Vue.use(XXWebBox)
filter(router,project)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
