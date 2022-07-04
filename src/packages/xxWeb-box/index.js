import XXWebBox from './components/XXWebBox.vue'
import JeecgLogin from './components/login/JeecgLogin'
import PigLogin from './components/login/PigLogin'
const install = function (Vue,config) {
    let EventBus = new Vue();
    Object.defineProperties(Vue.prototype, {
        $bus: {
            get: function () {
                return EventBus
            }
        }
    })
    Vue.component(XXWebBox.name,XXWebBox)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {JeecgLogin,PigLogin}
export default install

