import XXWebBox from './XXWebBox'

XXWebBox.install = function (Vue) {
  let EventBus = {}
  Object.defineProperties(window.app.config.globalProperties, {
    $bus: {
      get: function () {
        return EventBus
      },
    },
  })
  window.app.component(XXWebBox.name, XXWebBox)
}

export default XXWebBox
