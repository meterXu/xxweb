import XXWebBox from './components/index'
import {JeecgLogin, PigLogin, TreeLogin, WatermelonLogin, PhylumLogin} from './components/login'
import {NotFound, NotFoundDark, NoAuthority1,NoAuthority2, Error,NotFound2} from './components/error'
import {DarkMode1} from './components/darmode'
import {MtView} from './components/editor/index'

const install = function (Vue) {
    XXWebBox.install(Vue)
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
    DarkMode1,
    MtView
}
export default install

