import App from './App.vue'
import { createApp } from 'vue'
import {filter,util} from './packages/xxWeb-box/index'
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
} from './packages/xxWeb-box'
import router from './router';
import DemoBlock from "./views/doc/DemoBlock";
import elementUI from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
window.app = app
app.config.productionTip = false
app.config.globalProperties.$project = window.project
// filter(router,Vue.config.globalProperties.$project)
app.config.globalProperties.$ls = new util.ls(window.project)
app.use(XXWeb)
app.component(DemoBlock.name,DemoBlock)
app.use(elementUI)
app.use(router)
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
]
components.forEach(c=>{
  app.component(c.name,c)
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
