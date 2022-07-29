import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {ACCESS_TOKEN} from './mutation-types'
function filter(router,project) {
    let defaultLogin = project.redirect.login
    let defaultIndex = project.redirect.index
    const whiteList = [defaultLogin, project.redirect['404']]

    router.beforeEach((to, from,next) => {
        NProgress.start()
        if(!to.matched.length){
            next({
                path: project.redirect['404']
            })
            NProgress.done()
        }
        else if (whiteList.indexOf(to.path) >=0) {
            next()
        }
        else{
            let accessToken =  localStorage.getItem(ACCESS_TOKEN)
            if (to.meta.requireAuth === false || to.params.requireAuth == 0) {
                next()
            } else if (accessToken) {
                next()
            } else {
                next({
                    path: defaultLogin,
                    query: Object.assign({},to.query,{path :to.path})
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
