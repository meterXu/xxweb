import XXWebBox from './components/index'

const install = function (Vue) {
    XXWebBox.install(Vue)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {
    XXWebBox
}
export default install

