<template>
  <Scrollbar wrap-class="side-scrollbar">
    <Aside class="side-menu" :width="width">
      <div
        :class="{
          'side-menu-header': true,
          'side-menu-header-center': !hamburgerShow || isCollapse,
        }"
      >
        <slot name="side-logo" v-if="logoShow">
          <Logo :isCollapse="isCollapse" />
        </slot>
        <Hamburger v-if="hamburgerShow" :isCollapse="isCollapse" />
      </div>
      <slot name="side-userMenu" v-if="app.appConfig.config.sideMenu.user.show">
        <UserMenu type="avatar" :isCollapse="isCollapse">
          <template v-slot:side-user-userName>
            <slot name="side-user-userName"></slot>
          </template>
          <template v-slot:side-user-dropdownMenuItem="{ menu }">
            <slot name="side-user-dropdownMenuItem" :menu="menu"></slot>
          </template>
          <template v-slot:side-user-tag>
            <slot name="side-user-tag"></slot>
          </template>
          <template v-slot:side-user-tag-text>
            <slot name="side-user-tag-text"></slot>
          </template>
          <template v-slot:user-wrapper-avatar-icon>
            <slot name="user-wrapper-avatar-icon"></slot>
          </template>
        </UserMenu>
      </slot>
      <DynamicMenu
        :mode="mode"
        :isCollapse="isCollapse"
        :defaultActive="activeIndex"
        :permission="app.permission"
        :appConfig="app.appConfig"
      >
      </DynamicMenu>
      <slot name="side-bottom"></slot>
    </Aside>
  </Scrollbar>
</template>

<script>
import {
  ElAside as Aside,
  ElMenu as Menu,
  ElMenuItem as MenuItem,
  ElSubMenu as Submenu,
  ElScrollbar as Scrollbar
} from 'element-plus'
import mixin from '../../../mixin/mixin.js'
import DynamicMenu from '../../common/DynamicMenu.vue'
import Logo from '../../common/Logo.vue'
import UserMenu from '../header/UserMenu.vue'
import Hamburger from '../header/Hamburger.vue'
export default {
  name: 'SideMenu',
  props: ['mode', 'isCollapse', 'activeIndex'],
  mixins: [mixin],
  components: {
    Logo,
    Aside,
    Menu,
    MenuItem,
    Submenu,
    Scrollbar,
    DynamicMenu,
    UserMenu,
    Hamburger,
  },
  computed: {
    width() {
      return this.isCollapse ? '65px' : this.app.appConfig.config.sideMenu.width
    },
    title() {
      return this.app.appConfig.config.sideMenu.title
    },
    hamburgerShow() {
      return (
        !this.app.appConfig.style.fixSideMenu &&
        this.app.appConfig.config.sideMenu.hamburger
      )
    },
    logoShow() {
      if (this.hamburgerShow) {
        return this.app.appConfig.config.sideMenu.logo.show && !this.isCollapse
      } else {
        return this.app.appConfig.config.sideMenu.logo.show
      }
    },
  },
  methods: {},
  created() {},
}
</script>
