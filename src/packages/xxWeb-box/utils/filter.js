import * as util from './util.js'

function filter(router,
                {loginPath,notFundPath,noPermissionsPath,nameSpace,tokenKey,tokenLsKey},
                {beforeCallback,endCallback}) {
    const whiteList = [loginPath, notFundPath,noPermissionsPath]
    const _ls = new util.Ls(nameSpace)

    router.beforeEach((to, from, next) => {
        beforeCallback&&beforeCallback()
        if (!to.matched.length) {
            next({
                path: notFundPath
            })
            endCallback&&endCallback()
        }
        else if (whiteList.indexOf(to.path) >= 0) {
            next()
            endCallback&&endCallback()
        } else if (!validatePermission(to.path,window.permission)){
            next({
                path: noPermissionsPath||notFundPath
            })
            endCallback&&endCallback()
        } else {
            if (to.query.action === 'logout') {
                _ls.remove(tokenLsKey)
            } else {
                const accessToken = util.getQueryVariable(tokenKey) || to.query[tokenKey]
                if (accessToken) {
                    _ls.set(tokenLsKey, accessToken)
                }
            }
            let accessToken = _ls.get(tokenLsKey)
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
                    path: loginPath,
                    query: Object.assign({}, to.query, {path: to.path})
                })
                endCallback&&endCallback()
            }
        }
    })
}

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
