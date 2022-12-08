import NotFound from './404/NotFound'
import NotFoundDark from './404/NotFoundDark'
import Error from './500/Error'
import NoAuthority from "./403/NoAuthority";
import NotFound2 from "./404/NotFound2";


let errors = [NoAuthority,Error,NotFoundDark,NotFound,NotFound2]

errors.forEach(login=>{
    login.install = function (Vue){
        Vue.component(login.name,login)
    }
})

export {NotFound,NotFoundDark,Error,NoAuthority,NotFound2}
