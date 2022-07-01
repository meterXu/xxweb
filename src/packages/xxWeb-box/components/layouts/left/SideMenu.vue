<template>
  <Scrollbar wrap-class="side-scrollbar">
    <Aside class="side-menu" :width="width">
      <slot  name="sideLog" v-if="appConfig.config.sideMenu.logo.show">
        <Logo :isCollapse="isCollapse"/>
      </slot>
      <slot name="sideUserMenu" v-if="appConfig.config.sideMenu.user.show">
        <UserMenu>
          <template v-slot:dropdownMenuItem="{menu}">
            <slot name="dropdownMenuItem" :menu="menu"></slot>
          </template>
        </UserMenu>
      </slot>
      <DynamicMenu
          :mode="mode"
          :isCollapse="isCollapse"
          :defaultActive="activeIndex">
      </DynamicMenu>
    </Aside>
  </Scrollbar>
</template>

<script>
import {Aside,Menu,MenuItem,Submenu} from 'element-ui'
import Scrollbar from 'element-ui/lib/scrollbar'
import mixin from "../../../mixin/mixin";
import DynamicMenu from '../../common/DynamicMenu.vue'
import Logo from "../../common/Logo.vue";
import UserMenu from "../header/UserMenu.vue";
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
    UserMenu
  },
  computed:{
    width(){
      return this.isCollapse?'65px': this.appConfig.config.sideMenu.width
    },
    title(){
      return this.appConfig.config.sideMenu.title
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
