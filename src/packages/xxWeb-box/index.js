import XXWebBox from './components/XXWebBox.vue'
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

export default install

