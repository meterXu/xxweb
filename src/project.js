const {loadEnv} = require("vite");
import {expandFullProject} from './packages/xxWeb-box/utils/util.js'
const project = function (mode){
    const env = loadEnv(mode,process.cwd())
    return expandFullProject({
        nameSpace:'helloWorld',
        variable: {
            tokenKey:'Authorization',
            baseApi:env.VITE_APP_baseApi,
            ssoApi:env.VITE_APP_ssoApi
        },
        redirect: {
            index: '/page/itemList/xxWebBox',
            login: '/login/5',
            "404": '/error/1',
            '403':'/error/5'
        },
        style: {
            theme: 'nitro',
            layout: 'sideMenu',
            multiPage: true
        }
    })
}

module.exports = project;
