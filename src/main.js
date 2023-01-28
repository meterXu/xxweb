import Vue from 'vue'
import App from './App.vue'
import {filter,util} from './packages/xxWeb-utils/index'
import XXWeb from './packages/xxWeb-box'
import {JeecgLogin,
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
  WDPLogin,
  NotFound,
  NotFoundDark,
  NotFound2,
  NoAuthority1,
  NoAuthority2,
  Error,
  DarkMode1,
  MtView,
  XscStaticLayout,
  ProPanel
} from './packages/xxWeb-box'
import router from './router';
import DemoBlock from "@/views/doc/DemoBlock";
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.$project = window.project
// filter(router,Vue.prototype.$project)
Vue.prototype.$ls = new util.ls(window.project)
Vue.use(XXWeb)
Vue.component(DemoBlock.name,DemoBlock)
Vue.use(elementUI)
const components = [JeecgLogin,
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
  WDPLogin,
  NotFound,
  NotFoundDark,
  NotFound2,
  NoAuthority1,
  NoAuthority2,
  Error,
  DarkMode1,
  MtView,
  XscStaticLayout,
  ProPanel
]
components.forEach(c=>{
  Vue.use(c)
})
window.vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
