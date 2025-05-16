import XXWebBox from "./XXWebBox.vue";
import Logo from "./common/Logo.vue";
import DynamicMenu from "./common/DynamicMenu.vue";
import ItemLink from "./common/ItemLink.vue";
import UserMenu from "./layouts/header/UserMenu.vue";
import SearchMenu from "./layouts/header/SearchMenu.vue";
import HeadTitle from "./layouts/header/HeadTitle.vue";
import Hamburger from "./layouts/header/Hamburger.vue";
import HeadBreadcrumb from "./layouts/header/HeadBreadcrumb.vue";
import FullScreen from "./layouts/header/FullScreen.vue";
import DrawerMenu from "./layouts/left/DrawerMenu.vue";
import SideMenu from "./layouts/left/SideMenu.vue";
import AppMain from "./layouts/main/AppMain.vue";
import TabsView from "./layouts/main/TabsView.vue";

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

export {
    XXWebBox,
    SideMenu,
    UserMenu,
    SearchMenu,
    HeadTitle,
    Hamburger,
    HeadBreadcrumb,
    Logo,
    FullScreen,
    DrawerMenu,
    DynamicMenu,
    ItemLink,
    AppMain,
    TabsView
}