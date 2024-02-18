import JeecgLogin from './JeecgLogin.vue'
import PigLogin from './PigLogin.vue'
import TreeLogin from './TreeLogin.vue'
import WatermelonLogin from './WatermelonLogin.vue'
import PhylumLogin from './PhylumLogin.vue'
import WDPLogin from './WDPLogin.vue'

let logins = [
  JeecgLogin,
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
  WDPLogin,
]

logins.forEach((login) => {
  login.install = function (Vue) {
    window.$vueApp.component(login.name, login)
  }
})

export {
  JeecgLogin,
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
  WDPLogin,
}
