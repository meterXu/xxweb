<template>
  <Aside class="side-menu" :width="width">
    <div :class="{'side-menu-header':true,'side-menu-header-center':!hamburgerShow||isCollapse}">
      <slot name="side-logo" v-if="logoShow">
        <Logo :isCollapse="isCollapse"/>
      </slot>
      <Hamburger v-if="hamburgerShow" :isCollapse="isCollapse"/>
    </div>
    <Scrollbar wrap-class="side-scrollbar">
    <slot name="side-userMenu" v-if="app.appConfig.config.sideMenu.user.show">
      <UserMenu type='avatar' :isCollapse="isCollapse" :user="app.appConfig.config.sideMenu.user">
        <template v-slot:user-userName>
          <slot name="side-user-userName"></slot>
        </template>
        <template v-slot:user-dropdownMenuItem="{menu}">
          <slot name="side-user-dropdownMenuItem" :menu="menu"></slot>
        </template>
        <template v-slot:user-tag>
          <slot name="side-user-tag"></slot>
        </template>
        <template v-slot:user-tag-text>
          <slot name="side-user-tag-text"></slot>
        </template>
      </UserMenu>
    </slot>
    <slot name="side-menu" :app="app">
      <div class="dynamic-menu-wrap">
        <DynamicMenu
            :mode="mode"
            :isCollapse="isCollapse"
            :defaultActive="activeIndex">
        </DynamicMenu>
      </div>
    </slot>
    <slot name="side-bottom"></slot>
    </Scrollbar>
  </Aside>
</template>

<script>
import {Aside,Menu,MenuItem,Submenu} from 'element-ui'
import Scrollbar from 'element-ui/lib/scrollbar'
import mixin from "../../../mixin/mixin";
import DynamicMenu from '../../common/DynamicMenu.vue'
import Logo from "../../common/Logo.vue";
import UserMenu from "../header/UserMenu.vue";
import Hamburger from "../header/Hamburger.vue";
export default {
  name: "SideMenu",
  props:['mode','isCollapse','activeIndex'],
  mixins:[mixin],
  components:{
    Logo,
    Aside,
    Menu,
    MenuItem,
    Submenu,
    Scrollbar,
    DynamicMenu,
    UserMenu,
    Hamburger
  },
  computed:{
    width(){
      return this.isCollapse?'65px': this.app.appConfig.config.sideMenu.width
    },
    title(){
      return this.app.appConfig.config.sideMenu.title
    },
    hamburgerShow(){
      return !this.app.appConfig.style.fixSideMenu&&this.app.appConfig.config.sideMenu.hamburger
    },
    logoShow(){
      if(this.hamburgerShow){
        return this.app.appConfig.config.sideMenu.logo.show&&!this.isCollapse
      }else{
        return this.app.appConfig.config.sideMenu.logo.show
      }
    }
  },
  methods:{
  },
  created() {
  }
}
</script>

<style scoped>

</style>
