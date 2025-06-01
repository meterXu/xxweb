import {loadEnv} from "vite";
import {expandFullProject} from './packages/xxWeb-util/lib/util.js'
export default function (mode){
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
            theme: 'vue-admin',
            layout: 'sideMenu',
            multiPage: true
        },
        config:{
            sideMenu:{
                user: {
                    show: true,
                    username: true,
                    tag:true,
                    menu: {
                        show: true,
                        clearCache: true,
                        changePwd: true,
                        exitSystem: true
                    }
                }
            }
        }
    })
}
