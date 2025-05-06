import {
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
} from './components/index'

const install = function (Vue) {
    XXWebBox.install(Vue)
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
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
export default install

