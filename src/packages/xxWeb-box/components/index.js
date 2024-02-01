import XXWebBox from './XXWebBox'

XXWebBox.install = function (Vue) {
  let EventBus = {}
  Object.defineProperties(window.$vueApp.config.globalProperties, {
    $bus: {
      get: function () {
        return EventBus
      },
    },
  })
  window.$vueApp.component(XXWebBox.name, XXWebBox)
}

export default XXWebBox
