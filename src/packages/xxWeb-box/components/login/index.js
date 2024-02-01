import JeecgLogin from './JeecgLogin'
import PigLogin from './PigLogin'
import TreeLogin from './TreeLogin'
import WatermelonLogin from './WatermelonLogin'
import PhylumLogin from './PhylumLogin'
import WDPLogin from './WDPLogin'

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
