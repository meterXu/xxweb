import JeecgLogin from './JeecgLogin'
import PigLogin from './PigLogin'
import TreeLogin from './TreeLogin'
import WatermelonLogin from './WatermelonLogin'
import PhylumLogin from "./PhylumLogin";


let logins = [JeecgLogin,PigLogin,TreeLogin,WatermelonLogin,PhylumLogin]

logins.forEach(login=>{
    login.install = function (Vue){
        Vue.component(login.name,login)
    }
})


export {
    JeecgLogin,
    PigLogin,
    TreeLogin,
    WatermelonLogin,
    PhylumLogin
}