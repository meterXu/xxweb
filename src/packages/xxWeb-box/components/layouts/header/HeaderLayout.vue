<template>
  <Header :class="['header',topmenu&&'top-header'] ">
    <slot name="header">
      <div class="header-content">
        <div class="row-head">
          <div class="left-con">
            <div v-if="sidemenu" class="user-menu-item">
              <slot name="hamburger" v-if="!appConfig.style.fixSide">
                <Hamburger :isCollapse="isCollapse" @toggleClick="toggle"/>
              </slot>
            </div>
            <div v-if="topmenu" class="user-menu-item">
              <Logo :isCollapse="false"/>
            </div>
            <div class="user-menu-item">
              <slot name="headTitle" v-if="appConfig.config.head.title.show">
                <HeadTitle/>
              </slot>
            </div>
            <div class="user-menu-item">
              <slot name="breadcrumb" v-if="appConfig.config.head.breadcrumb.show">
                <HeadBreadcrumb/>
              </slot>
            </div>
            <div v-if="topmenu" class="user-menu-item">
              <DynamicMenu :isCollapse="false" mode="horizontal" :defaultActive="defaultActive"></DynamicMenu>
            </div>
          </div>
          <div class="right-con">
            <div class="user-menu-item">
              <slot name="searchMenu" v-if="appConfig.config.head.searchMenu.show">
                <SearchMenu/>
              </slot>
            </div>
            <div class="user-menu-item">
              <slot name="fullScreen" v-if="appConfig.config.head.fullscreen.show">
                <FullScreen/>
              </slot>
            </div>
            <div class="user-menu-item">
              <slot name="userMenu" v-if="appConfig.config.head.user.show">
                <UserMenu>
                  <template v-slot:dropdownMenuItem="{menu}">
                    <slot name="dropdownMenuItem" :menu="menu"></slot>
                  </template>
                </UserMenu>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </Header>
</template>

<script>
import {Header} from 'element-ui'
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
  components: {
    Logo,
    Hamburger,
    HeadTitle,
    HeadBreadcrumb,
    SearchMenu,
    FullScreen,
    UserMenu,
    Header,
    DynamicMenu
  },
  computed:{
    sidemenu(){
      return this.appConfig.style.layout==='sidemenu'
    },
    topmenu(){
      return this.appConfig.style.layout==='topmenu'
    },
    defaultActive(){
      return this.$route.path
    }
  },
  methods: {
    toggle() {
      this.$emit('collapseToggle', !this.isCollapse)
    }
  }
}
</script>

<style scoped>
</style>
