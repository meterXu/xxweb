import Vue from 'vue'
import App from './App.vue'
import XXWebBox from 'xxweb-box'
import * as util from 'xxweb-util/lib/util'
import router from './router';
import DemoBlock from "./views/doc/DemoBlock";
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.$project = window.project
Vue.prototype.$ls = new util.Ls(window.project)
Vue.use(XXWebBox)
Vue.component(DemoBlock.name,DemoBlock)
Vue.use(elementUI)
window.vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
