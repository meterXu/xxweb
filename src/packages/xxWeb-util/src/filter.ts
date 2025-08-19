import {Ls,getQueryVariable} from './util.js'
import {ACCESS_TOKEN,PERMISSION} from './types.js';
import { match } from 'path-to-regexp';

/**
 * 授权钩子
 */
function filter(router:object, project:ProjectType,callbacks:FilterCallbacks) {
    let defaultLogin = project.redirect.login
    const whiteList = [defaultLogin, project.redirect['404'],project.redirect['403']]
    const _ls = new Ls(project.nameSpace)
    //@ts-ignore
    router.beforeEach((to, from, next) => {
        callbacks.beforeCallback&&callbacks.beforeCallback()
        if(validateNotFound(to,next,project,callbacks.endCallback)){
            dealWithQuery(to,_ls,project)
            if(isNotInWhiteList(to,next,whiteList,callbacks.endCallback)){
                if(validateToken(to,from,next,_ls,defaultLogin,callbacks.endCallback)){
                    if(dealWithPerm(to,next,whiteList,_ls,callbacks.permission,project,callbacks.endCallback)){
                        next()
                        callbacks.endCallback&&callbacks.endCallback()
                        return false
                    }
                }
            }
        }
    })
}
function validateNotFound(to:any,next:any,project:ProjectType,endCallback?:() => void){
    if (!to.matched.length) {
        next({
            path: project.redirect['404']
        })
        endCallback&&endCallback()
        return false
    }
    return true
}
function dealWithQuery(to:any,ls:any,project:ProjectType){
    if (to.query.action === 'logout') {
        ls.remove(ACCESS_TOKEN)
    } else {
        const accessToken = getQueryVariable(project.variable.tokenKey) || to.query[project.variable.tokenKey]
        if (accessToken) {
            ls.set(ACCESS_TOKEN, accessToken)
        }
    }
}
function isNotInWhiteList(to:any,next:any,whiteList:string[],endCallback?:()=>void){
    if (whiteList.indexOf(to.path) >= 0) {
        next()
        endCallback&&endCallback()
        return false
    } else {
        return true
    }
}
function dealWithPerm(to:any,next:any,whiteList:string[],ls:any,permission:any,project:ProjectType,endCallback?:()=>void){
    if (permission&&!validatePermission(to.path,ls.get(PERMISSION))){
        next({
            path: project.redirect['403']||project.redirect['404']
        })
        endCallback&&endCallback()
        return false
    }else{
        return true
    }
}
function validatePermission(path:string,permission:any):boolean{
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
            }else if(testPath(_permission[i].path,path)){
                res = true
                break
            }
        }
    }
    return res
}
function testPath(rule:string,path:string){
    const matcher = match(rule, { decode: decodeURIComponent });
    return matcher(path);
}
function validateToken(to:any,from:any,next:any,ls:any,defaultLogin:string,endCallback?:()=>void){
    if (from.query.path!==to.path){
        to.query.path = from.query.path
    }
    if (to.meta&&to.meta.requireAuth === false) {
        return true
    } else if (ls.get(ACCESS_TOKEN)) {
        return true
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
