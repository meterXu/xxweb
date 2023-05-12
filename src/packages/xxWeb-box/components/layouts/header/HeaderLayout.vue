<template>
  <div>
    <slot name="header">
      <Header :class="['header',topmenu&&'top-header'] ">
        <div class="header-content">
          <div class="row-head">
            <div class="left-con">
              <slot name="head-expand-left-start"></slot>
              <div v-if="sidemenu" class="user-menu-item">
                <slot name="head-hamburger" v-if="hamburgerShow">
                  <Hamburger :isCollapse="isCollapse"/>
                </slot>
              </div>
              <div class="user-menu-item" v-if="topmenu" >
                <slot name="head-logo" v-if="app.appConfig.config.head.logo.show">
                  <Logo :isCollapse="false"/>
                </slot>
              </div>
              <template v-if="app.appConfig.config.head.title.show">
                <Divider direction="vertical" v-if="!topmenu&&hamburgerShow"></Divider>
                <div :class="{'user-menu-item':true,'topmenu':topmenu}">
                  <slot name="head-title">
                    <HeadTitle/>
                  </slot>
                </div>
              </template>
              <template v-if="app.appConfig.config.head.breadcrumb.show">
                <Divider direction="vertical" v-if="!topmenu&&hamburgerShow"></Divider>
                <div :class="{'user-menu-item':true,'topmenu':topmenu}">
                  <slot name="head-breadcrumb">
                    <HeadBreadcrumb/>
                  </slot>
                </div>
              </template>
              <div :class="{'user-menu-item':true,'topmenu':topmenu}" v-if="topmenu">
                <DynamicMenu :isCollapse="false" mode="horizontal" :defaultActive="defaultActive"></DynamicMenu>
              </div>
              <slot name="head-expand-left-end"></slot>
            </div>
            <div class="center-con">
              <slot name="head-expand-center"></slot>
            </div>
            <div class="right-con">
              <slot name="head-expand-right-start"></slot>
              <div class="user-menu-item topmenu" v-if="app.appConfig.config.head.searchMenu.show">
                <slot name="head-searchMenu">
                  <SearchMenu/>
                </slot>
              </div>
              <div class="user-menu-itemm topmenu" v-if="app.appConfig.config.head.fullscreen.show">
                <slot name="head-fullScreen">
                  <FullScreen/>
                </slot>
              </div>
              <div class="user-menu-item topmenu" v-if="app.appConfig.config.head.user.show">
                <slot name="head-userMenu">
                  <UserMenu type="text">
                    <template v-slot:side-user-userName>
                      <slot name="head-user-userName"></slot>
                    </template>
                    <template v-slot:side-user-dropdownMenuItem="{menu}">
                      <slot name="head-user-dropdownMenuItem" :menu="menu"></slot>
                    </template>
                    <template v-slot:side-user-tag>
                      <slot name="head-user-tag"></slot>
                    </template>
                    <template v-slot:side-user-tag-text>
                      <slot name="head-user-tag-text"></slot>
                    </template>
                  </UserMenu>
                </slot>
              </div>
              <slot name="head-expand-right-end"></slot>
            </div>
          </div>
        </div>
      </Header>
    </slot>
  </div>
</template>

<script>
import {Divider, Header,Menu,MenuItem,Submenu} from 'element-ui'
import mixin from "../../../mixin/mixin";
import Logo from "../../../components/common/Logo.vue";
import Hamburger from "./Hamburger.vue";
import HeadTitle from "./HeadTitle.vue";
import HeadBreadcrumb from "./HeadBreadcrumb.vue";
import SearchMenu from "./SearchMenu.vue";
import FullScreen from "./FullScreen.vue";
import UserMenu from "./UserMenu.vue";
import DynamicMenu from '../../common/DynamicMenu.vue'
export default {
  name: "HeaderLayout",
  mixins: [mixin],
  props:['isCollapse'],
  components: {
    Logo,
    Hamburger,
    HeadTitle,
    HeadBreadcrumb,
    SearchMenu,
    FullScreen,
    UserMenu,
    Header,
    DynamicMenu,
    Divider,
    Menu,
    MenuItem,
    Submenu
},
  computed:{
    sidemenu(){
      return this.app.appConfig.style.layout==='sidemenu'
    },
    topmenu(){
      return this.app.appConfig.style.layout==='topmenu'
    },
    defaultActive(){
      return this.$route.path
    },
    hamburgerShow(){
      return !this.app.appConfig.style.fixSideMenu&&this.app.appConfig.config.head.hamburger
    }
  },
  methods: {
    toggle() {
      this.$emit('collapseToggle')
    }
  }
}
</script>

<style scoped>
</style>
