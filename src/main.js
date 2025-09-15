import App from './App.vue'
import {createApp} from 'vue'
import {filter, Ls, $on, $emit, $off, $once, resizeFontSize} from './packages/xxWeb-util'
import XXWebBox from './packages/xxWeb-box'
import router from './router';
import DemoBlock from "./views/doc/DemoBlock";
import elementUI from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
window.app = app
app.config.productionTip = false
app.config.globalProperties.$project = window.project
filter(router, window.project, {})
app.config.globalProperties.$ls = new Ls(window.project.nameSpace)
app.config.globalProperties.$bus = {
    $on, $emit, $off, $once
}
app.use(XXWebBox)
app.component(DemoBlock.name, DemoBlock)
app.use(elementUI)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
window.onresize = () => {
    resizeFontSize(1920, 4, 0, (width) => {
        if (width <= 1280) {
            return 1280
        } else if (width <= 1366) {
            return 1366
        }
        return width
    })
}
app.mount('#app')
window.onresize()
