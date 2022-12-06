import XXWebBox from './components/index'
import {JeecgLogin, PigLogin, TreeLogin, WatermelonLogin, PhylumLogin} from './components/login'
import {NotFound, NotFoundDark, NoAuthority, Error} from './components/error'

let components = [
    XXWebBox,
    JeecgLogin,
    PigLogin,
    TreeLogin,
    WatermelonLogin,
    PhylumLogin,
    NotFound,
    NotFoundDark,
    NoAuthority,
    Error
]

const install = function (Vue) {
    components.forEach(c=>{
        c.install(Vue)
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {
    XXWebBox,
    JeecgLogin,
    PigLogin,
    TreeLogin,
    WatermelonLogin,
    PhylumLogin,
    NotFound,
    NotFoundDark,
    NoAuthority,
    Error
}
export default install

