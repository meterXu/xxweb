import XXWebBox from './XXWebBox'
import {createApp} from "vue";

XXWebBox.install = function (Vue) {
  let EventBus = {}
  Object.defineProperties(Vue.config.globalProperties, {
    $bus: {
      get: function () {
        return EventBus
      },
    },
  })
  window.app.component(XXWebBox.name, XXWebBox)
}

export default XXWebBox
