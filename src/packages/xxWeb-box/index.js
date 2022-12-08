import XXWebBox from './components/index'
import {JeecgLogin, PigLogin, TreeLogin, WatermelonLogin, PhylumLogin} from './components/login'
import {NotFound, NotFoundDark, NoAuthority, Error,NotFound2} from './components/error'
import {DarkMode1} from './components/darmode'

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
    Error,
    DarkMode1
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
    NotFound2,
    NoAuthority,
    Error,
    DarkMode1
}
export default install

