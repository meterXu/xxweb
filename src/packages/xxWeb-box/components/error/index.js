import NotFound from './404/NotFound'
import NotFoundDark from './404/NotFoundDark'
import Error from './500/Error'
import NoAuthority1 from "./403/NoAuthority1";
import NoAuthority2 from "./403/NoAuthority2";
import NotFound2 from "./404/NotFound2";


let errors = [NoAuthority1,Error,NotFoundDark,NotFound,NotFound2,NoAuthority2]

errors.forEach(login=>{
    login.install = function (Vue){
        Vue.component(login.name,login)
    }
})

export {NotFound,NotFoundDark,Error,NoAuthority1,NotFound2,NoAuthority2}
