import XXWebBox from './XXWebBox.vue'
import { $on, $off, $once,$emit } from '../utils/gogocodeTransfer.js'

XXWebBox.install = function (Vue) {
  let EventBus = {
    $on,
    $off,
    $once,
    $emit:$emit
  }
  Object.defineProperties(Vue.config.globalProperties, {
    $bus: {
      get: function () {
        return EventBus
      },
    }
  })
  window.app.component(XXWebBox.name, XXWebBox)
}

export default XXWebBox
