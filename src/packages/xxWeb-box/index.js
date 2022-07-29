import XXWebBox from './components/XXWebBox.vue'
import JeecgLogin from './components/login/JeecgLogin'
import PigLogin from './components/login/PigLogin'
import Router from 'vue-router';
import NotFound from "./components/error/NotFound";

let components = [XXWebBox,JeecgLogin,PigLogin,NotFound]
const install = function (Vue,config) {
    let EventBus = new Vue();
    Object.defineProperties(Vue.prototype, {
        $bus: {
            get: function () {
                return EventBus
            }
        }
    })
    Vue.use(Router)
    components.forEach(c=>{
        Vue.component(c.name,c)
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export {XXWebBox,JeecgLogin,PigLogin,NotFound}
export default install

