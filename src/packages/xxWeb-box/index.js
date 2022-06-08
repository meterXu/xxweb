import XXWebBox from './components/XXWebBox.vue'
const install = function (Vue,config) {
    Vue.component(XXWebBox.name,XXWebBox)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default install

