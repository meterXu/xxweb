import XXWebBox from "./XXWebBox";

XXWebBox.install  = function (Vue){
    let EventBus = new Vue();
    Object.defineProperties(Vue.prototype, {
        $bus: {
            get: function () {
                return EventBus
            }
        }
    })
    Vue.component(XXWebBox.name,XXWebBox)
}

export default XXWebBox