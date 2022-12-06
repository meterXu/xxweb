import NotFound from './404/NotFound'
import NotFoundDark from './404/NotFoundDark'
import Error from './500/Error'
import NoAuthority from "./403/NoAuthority";


let errors = [NoAuthority,Error,NotFoundDark,NotFound]

errors.forEach(login=>{
    login.install = function (Vue){
        Vue.components(login.name,login)
    }
})

export {NotFound,NotFoundDark,Error,NoAuthority}
