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
// filter(router,{
//   loginPath:window.project.redirect.login,
//   notFundPath:window.project.redirect["404"],
//   noPermissionsPath:window.project.redirect['403'],
//   nameSpace:window.project.nameSpace,
//   tokenKey:window.project.variable.tokenKey,
//   tokenLsKey:types.ACCESS_TOKEN
// },{})
app.config.globalProperties.$ls = new util.Ls(window.project.namespace)
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
