import {Ls,getQueryVariable} from './util.js'
import {ACCESS_TOKEN} from "./types";

/**
 * 授权钩子
 * @param router vue Router
 * @param project Project
 * @param beforeCallback 钩子执行之前
 * @param endCallback 钩子执行之后
 */
function filter(router, project,{beforeCallback,endCallback}) {
    let defaultLogin = project.redirect.login
    const whiteList = [defaultLogin, project.redirect['404'],project.redirect['403']]
    const _ls = new Ls(project.nameSpace)
    router.beforeEach((to, from, next) => {
        beforeCallback&&beforeCallback()
        if (!to.matched.length) {
            next({
                path: project.redirect['404']
            })
            endCallback&&endCallback()
        }
        if (to.query.action === 'logout') {
            _ls.remove(ACCESS_TOKEN)
        } else {
            const accessToken = getQueryVariable(project.variable.tokenKey) || to.query[project.variable.tokenKey]
            if (accessToken) {
                _ls.set(ACCESS_TOKEN, accessToken)
            }
        }
        if (whiteList.indexOf(to.path) >= 0) {
            next()
            endCallback&&endCallback()
        } else if (!validatePermission(to.path,window.permission)){
            next({
                path: project.redirect['403']||project.redirect['404']
            })
            endCallback&&endCallback()
        } else {
            let accessToken = _ls.get(ACCESS_TOKEN)
            if (from.query.path!==to.path){
                to.query.path = from.query.path
            }
            if (to.meta.requireAuth === false) {
                next()
                endCallback&&endCallback()
            } else if (accessToken) {
                next()
                endCallback&&endCallback()
            } else {
                next({
                    path: defaultLogin,
                    query: Object.assign({}, to.query, {path: to.path})
                })
                endCallback&&endCallback()
            }
        }
    })
}

/**
 * 权限验证
 * @param path 路径
 * @param permission 权限树
 * @return {boolean} true有权限，false无权限
 */
function validatePermission(path,permission){
    let res = false
    if(!permission){
        res = true
    }else {
        for (let i=0;i<permission.length;i++){
            if(permission[i].children){
                res = validatePermission(path,permission[i].children)
                break
            }else if(permission[i].path === path){
                res = true
                break
            }
        }
    }
    return res

}

export default filter
