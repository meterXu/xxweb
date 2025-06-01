<template>
  <div>
    <slot name="header">
      <Header :class="['header', topMenu && 'top-header']">
        <div class="header-content">
          <div class="row-head">
            <div class="left-con">
              <slot name="head-expand-left-start"></slot>
              <div v-if="sideMenu" class="user-menu-item">
                <slot name="head-hamburger" v-if="hamburgerShow">
                  <Hamburger :isCollapse="isCollapse" />
                </slot>
              </div>
              <div class="user-menu-item" v-if="topMenu">
                <slot
                  name="head-logo"
                  v-if="app.appConfig.config.head.logo.show"
                >
                  <Logo :isCollapse="false" />
                </slot>
              </div>
              <template v-if="app.appConfig.config.head.title.show">
                <Divider
                  direction="vertical"
                  v-if="!topMenu && hamburgerShow"
                ></Divider>
                <div :class="{ 'user-menu-item': true, 'top-menu': topMenu }">
                  <slot name="head-title">
                    <HeadTitle :title="headTitle"/>
                  </slot>
                </div>
              </template>
              <template v-if="app.appConfig.config.head.breadcrumb.show">
                <Divider
                  direction="vertical"
                  v-if="!topMenu && hamburgerShow"
                ></Divider>
                <div :class="{ 'user-menu-item': true, 'top-menu': topMenu }">
                  <slot name="head-breadcrumb">
                    <HeadBreadcrumb />
                  </slot>
                </div>
              </template>
              <slot name="head-top-menu-wrap" :app="app">
                <div :class="{ 'user-menu-item': true, 'top-menu': topMenu }" v-if="topMenu && app.permission && app.permission.length>0">
                  <slot name="head-top-menu" :permission="app.permission">
                    <DynamicMenu
                        :isCollapse="false"
                        mode="horizontal"
                        :defaultActive="defaultActive"
                        :permission="app.permission"
                        :appConfig="app.appConfig"
                    ></DynamicMenu>
                  </slot>
                </div>
              </slot>
              <slot name="head-expand-left-end"></slot>
            </div>
            <div class="center-con">
              <slot name="head-expand-center"></slot>
            </div>
            <div class="right-con">
              <slot name="head-expand-right-start"></slot>
              <div
                class="user-menu-item top-menu"
                v-if="app.appConfig.config.head.searchMenu.show"
              >
                <slot name="head-searchMenu">
                  <SearchMenu />
                </slot>
              </div>
              <div
                class="user-menu-item top-menu"
                v-if="app.appConfig.config.head.fullscreen.show"
              >
                <slot name="head-fullScreen">
                </slot>
              </div>
              <div
                class="user-menu-item top-menu"
                v-if="app.appConfig.config.head.user.show"
              >
                <slot name="head-userMenu">
                  <UserMenu type="text">
                    <template v-slot:side-user-userName>
                      <slot name="head-user-userName"></slot>
                    </template>
                    <template v-slot:side-user-dropdownMenuItem="{ menu }">
                      <slot
                        name="head-user-dropdownMenuItem"
                        :menu="menu"
                      ></slot>
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
import {
  ElDivider as Divider,
  ElHeader as Header,
  ElMenu as Menu,
  ElMenuItem as MenuItem,
  ElSubMenu as Submenu,
} from 'element-plus'
import mixin from '../../../mixin/mixin.js'
import Logo from '../../../components/common/Logo.vue'
import Hamburger from './Hamburger.vue'
import HeadTitle from './HeadTitle.vue'
import HeadBreadcrumb from './HeadBreadcrumb.vue'
import SearchMenu from './SearchMenu.vue'
import UserMenu from './UserMenu.vue'
import FullScreen from './FullScreen.vue'
import DynamicMenu from '../../common/DynamicMenu.vue'
export default {
  name: 'HeaderLayout',
  mixins: [mixin],
  props: ['isCollapse'],
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
    Submenu,
  },
  computed: {
    sideMenu() {
      return this.app.appConfig.style.layout === 'sideMenu'
    },
    topMenu() {
      return this.app.appConfig.style.layout === 'topMenu'
    },
    defaultActive() {
      return this.$route.path
    },
    hamburgerShow() {
      return (
        !this.app.appConfig.style.fixSideMenu &&
        this.app.appConfig.config.head.hamburger
      )
    },
    headTitle(){
      if(this.device==='desktop'){
        return this.app.appConfig.config.head.title.desktop
      }else{
        return this.app.appConfig.config.head.title.mobile
      }
    }
  },
  methods: {
    toggle() {
      this.$emit('collapseToggle')
    },
  }
}
</script>
