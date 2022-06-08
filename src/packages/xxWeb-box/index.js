import S2Frame from './components/S2Frame.vue'
const install = function (Vue,config) {
    Vue.component(S2Frame.name,S2Frame)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default install

