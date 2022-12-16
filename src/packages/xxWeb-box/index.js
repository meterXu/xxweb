import XXWebBox from './components/index'
import {JeecgLogin, PigLogin, TreeLogin, WatermelonLogin, PhylumLogin} from './components/login'
import {NotFound, NotFoundDark, NoAuthority1,NoAuthority2, Error,NotFound2} from './components/error'
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
    NoAuthority1,
    NoAuthority2,
    Error,
    NotFound2,
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
    NoAuthority1,
    NoAuthority2,
    Error,
    DarkMode1
}
export default install

