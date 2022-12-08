import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {ACCESS_TOKEN, USER_INFO} from './mutation-types'
import * as util from './util'

function filter(router, project) {
    let defaultLogin = project.redirect.login
    let defaultIndex = project.redirect.index
    const whiteList = [defaultLogin, project.redirect['404'],project.redirect['403']]
    const _ls = new util.ls(project)

    router.beforeEach((to, from, next) => {
        NProgress.start()
        if (!to.matched.length) {
            next({
                path: project.redirect['404']
            })
            NProgress.done()
        }else if (whiteList.indexOf(to.path) >= 0) {
            next()
        } else {
            if (to.query.action === 'logout') {
                _ls.remove(ACCESS_TOKEN)
                _ls.remove(USER_INFO)
            } else {
                const accessToken = util.getQueryVariable(project.variable.tokenKey) || to.query[project.variable.tokenKey]
                const realname = util.getQueryVariable('realname') || to.query['realname']
                const username = util.getQueryVariable('username') || to.query['username']
                const tenantId = util.getQueryVariable('tenantId') || to.query['tenantId']
                if (accessToken) {
                    _ls.set(ACCESS_TOKEN, accessToken)
                }
                if (realname) {
                    _ls.set(USER_INFO, JSON.stringify({
                        'realname': realname,
                        'username': username,
                        'tenantId': tenantId
                    }))
                }
            }
            let accessToken = _ls.get(ACCESS_TOKEN)
            if (from.query.path!==to.path){
                to.query.path = from.query.path
            }
            if (to.meta.requireAuth === false || to.params.requireAuth == 0) {
                next()
            } else if (accessToken) {
                next()
            } else {
                next({
                    path: defaultLogin,
                    query: Object.assign({}, to.query, {path: to.path})
                })
                NProgress.done()
            }
        }
    })

    router.afterEach(() => {
        NProgress.done()
    })
}

export default filter
