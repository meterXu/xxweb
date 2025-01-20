import XXWebBox from './components/index.js'
import {PigLogin, TreeLogin, WatermelonLogin, PhylumLogin} from './components/login/index.js'
import {NotFound, NotFoundDark, NoAuthority1,NoAuthority2, Error,NotFound2} from './components/error/index.js'

import filter from './utils/filter.js'
import * as types from './utils/types.js'
import * as util from './utils/util.js'
import * as request from './utils/request.js'
import * as validate from './utils/validate.js'

const install = function (Vue) {
    XXWebBox.install(Vue)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {
    XXWebBox,
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
    filter,
    types,
    util,
    request,
    validate
}
export default install

