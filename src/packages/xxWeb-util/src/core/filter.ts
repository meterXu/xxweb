import {Ls,getQueryVariable} from './util.js'
import {ACCESS_TOKEN,PERMISSION} from './types.js';
import { match } from 'path-to-regexp';

import {Project} from "./project";
export type CallbackType = (to:any,from:any) => void
export type FilterCallbacks={
    beforeCallback?: CallbackType; // 可选的回调函数
    endCallback?: CallbackType;     // 可选的回调函数
    permission: boolean;           // 权限标志
}

/**
 * 授权钩子
 */
export function filter(router:object, project:Project,callbacks:FilterCallbacks) {
    let defaultLogin = project.redirect.login
    const whiteList = [defaultLogin, project.redirect['404'],project.redirect['403']]
    const _ls = new Ls(project.nameSpace)
    //@ts-ignore
    router.beforeEach((to, from, next) => {
        callbacks.beforeCallback&&callbacks.beforeCallback(to,from)
        if(validateNotFound(to,from,next,project,callbacks.endCallback)){
            dealWithQuery(to,_ls,project)
            if(isNotInWhiteList(to,from,next,whiteList,callbacks.endCallback)){
                if(validateToken(to,from,next,_ls,defaultLogin,callbacks.endCallback)){
                    if(dealWithPerm(to,from,next,whiteList,_ls,callbacks.permission,project,callbacks.endCallback)){
                        next()
                        callbacks.endCallback&&callbacks.endCallback(to,from)
                        return false
                    }
                }
            }
        }
    })
}
function validateNotFound(to:any,from:any,next:any,project:Project,endCallback?:CallbackType){
    if (!to.matched.length) {
        next({
            path: project.redirect['404']
        })
        endCallback&&endCallback(to,from)
        return false
    }
    return true
}
function dealWithQuery(to:any,ls:any,project:Project){
    if (to.query.action === 'logout') {
        ls.remove(ACCESS_TOKEN)
    } else {
        const accessToken = getQueryVariable(project.variable.tokenKey) || to.query[project.variable.tokenKey]
        if (accessToken) {
            ls.set(ACCESS_TOKEN, accessToken)
        }
    }
}
function isNotInWhiteList(to:any,from:any,next:any,whiteList:string[],endCallback?:CallbackType){
    if (whiteList.indexOf(to.path) >= 0) {
        next()
        endCallback&&endCallback(to,from)
        return false
    } else {
        return true
    }
}
function dealWithPerm(to:any,from:any,next:any,whiteList:string[],ls:any,permission:any,project:Project,endCallback?:CallbackType){
    if (permission&&!validatePermission(to.path,ls.get(PERMISSION))){
        next({
            path: project.redirect['403']||project.redirect['404']
        })
        endCallback&&endCallback(to,from)
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
function validateToken(to:any,from:any,next:any,ls:any,defaultLogin:string,endCallback?:CallbackType){
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
        endCallback&&endCallback(to,from)
        return false
    }
}
