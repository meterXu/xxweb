import XXWebBox from './components/index'
import {JeecgLogin, PigLogin, TreeLogin, WatermelonLogin, PhylumLogin,WDPLogin} from './components/login'
import {NotFound, NotFoundDark, NoAuthority1,NoAuthority2, Error,NotFound2} from './components/error'
import {DarkMode1} from './components/darmode'

import filter from './utils/filter'
import * as types from './utils/mutation-types'
import * as util from './utils/util'
import * as request from './utils/request'
import * as validate from './utils/validate'

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
    WDPLogin,
    NotFound,
    NotFoundDark,
    NotFound2,
    NoAuthority1,
    NoAuthority2,
    Error,
    DarkMode1,
    filter,
    types,
    util,
    request,
    validate
}
export default install

