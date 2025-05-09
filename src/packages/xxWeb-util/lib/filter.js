import {Ls,getQueryVariable} from './util.js'
import {ACCESS_TOKEN,PERMISSION} from "./types";

/**
 * 授权钩子
 * @param router vue Router
 * @param project Project
 * @param beforeCallback 钩子执行之前
 * @param endCallback 钩子执行之后
 * @param permission 是否权限验证
 */
function filter(router, project,{beforeCallback,endCallback,permission}) {
    let defaultLogin = project.redirect.login
    const whiteList = [defaultLogin, project.redirect['404'],project.redirect['403']]
    const _ls = new Ls(project.nameSpace)
    router.beforeEach((to, from, next) => {
        beforeCallback&&beforeCallback()
        validateNotFound(to,next,project,{endCallback})
        dealWithQuery(to,_ls,project)
        if(dealWithPerm(to,next,whiteList,_ls,permission,project,{endCallback})){
            validateToken(to,from,next,_ls,defaultLogin,{endCallback})
        }
    })
}
function validateNotFound(to,next,project,{endCallback}){
    if (!to.matched.length) {
        next({
            path: project.redirect['404']
        })
        endCallback&&endCallback()
        return false
    }
}
function dealWithQuery(to,ls,project){
    if (to.query.action === 'logout') {
        ls.remove(ACCESS_TOKEN)
    } else {
        const accessToken = getQueryVariable(project.variable.tokenKey) || to.query[project.variable.tokenKey]
        if (accessToken) {
            ls.set(ACCESS_TOKEN, accessToken)
        }
    }
}
function dealWithPerm(to,next,whiteList,ls,permission,project,{endCallback}){
    if (whiteList.indexOf(to.path) >= 0) {
        next()
        endCallback&&endCallback()
        return false
    } else if (permission&&!validatePermission(to.path,ls.get(PERMISSION))){
        next({
            path: project.redirect['403']||project.redirect['404']
        })
        endCallback&&endCallback()
        return false
    }
    return true
}
function validatePermission(path,permission){
    let res = false
    if(!permission){
        res = false
    }else {
        let _permission = permission
        if(typeof(permission)==='string'){
            try{_permission = JSON.parse(permission)}catch (err){}
        }
        for (let i=0;i<_permission.length;i++){
            if(_permission[i].children){
                res = validatePermission(path,_permission[i].children)
                if(res){
                    break
                }
            }else if(_permission[i].path === path){
                res = true
                break
            }
        }
    }
    return res

}
function validateToken(to,from,next,ls,defaultLogin,{endCallback}){
    if (from.query.path!==to.path){
        to.query.path = from.query.path
    }
    if (to.meta&&to.meta.requireAuth === false) {
        next()
        endCallback&&endCallback()
        return false
    } else if (ls.get(ACCESS_TOKEN)) {
        next()
        endCallback&&endCallback()
        return false
    } else {
        next({
            path: defaultLogin,
            query: Object.assign({}, to.query, {path: to.path})
        })
        endCallback&&endCallback()
        return false
    }
}
export default filter
