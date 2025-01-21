import App from './App.vue'
import { createApp } from 'vue'
import {filter,util,types} from './packages/xxWeb-box/index'
import XXWebBox from './packages/xxWeb-box'
import {
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
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
filter(router,window.project,{})
app.config.globalProperties.$ls = new util.Ls(window.project.nameSpace)
app.use(XXWebBox)
app.component(DemoBlock.name,DemoBlock)
app.use(elementUI)
app.use(router)
const components = [
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
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
