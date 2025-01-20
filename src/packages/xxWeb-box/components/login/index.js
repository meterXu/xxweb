import PigLogin from './PigLogin.vue'
import TreeLogin from './TreeLogin.vue'
import WatermelonLogin from './WatermelonLogin.vue'
import PhylumLogin from './PhylumLogin.vue'

let logins = [
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
]

logins.forEach((login) => {
  login.install = function (Vue) {
    window.$vueApp.component(login.name, login)
  }
})

export {
  PigLogin,
  TreeLogin,
  WatermelonLogin,
  PhylumLogin,
}
