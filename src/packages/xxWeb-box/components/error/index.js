import NotFound from './404/NotFound.vue'
import NotFoundDark from './404/NotFoundDark.vue'
import Error from './500/Error.vue'
import NoAuthority1 from './403/NoAuthority1.vue'
import NoAuthority2 from './403/NoAuthority2.vue'
import NotFound2 from './404/NotFound2.vue'

let errors = [
  NoAuthority1,
  Error,
  NotFoundDark,
  NotFound,
  NotFound2,
  NoAuthority2,
]

errors.forEach((error) => {
  error.install = function (Vue) {
    window.$vueApp.component(error.name, error)
  }
})

export { NotFound, NotFoundDark, Error, NoAuthority1, NotFound2, NoAuthority2 }
