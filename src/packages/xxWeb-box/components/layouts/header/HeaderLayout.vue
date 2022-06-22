<template>
  <Header :class="['header',topmenu&&'top-header'] ">
    <slot name="header">
      <div class="header-content" v-if="sidemenu">
        <div class="row-head">
          <div class="left-con">
            <Hamburger v-if="!appConfig.style.fixSide" :isCollapse="isCollapse" @toggleClick="toggle"/>
            <HeadTitle class="head-title" v-if="appConfig.config.head.title.show"/>
            <HeadBreadcrumb v-if="appConfig.config.head.breadcrumb.show"/>
          </div>
          <div class="col-user-menu">
            <SearchMenu v-if="appConfig.config.head.searchMenu.show" class="user-menu-item"/>
            <FullScreen v-if="appConfig.config.head.fullscreen.show" class="user-menu-item"/>
            <div class="user-menu-item">
              <slot name="userMenu" v-if="appConfig.config.head.user.show">
                <UserMenu/>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="header-content" v-else-if="topmenu">
        <div class="row-head">
          <div class="left-con">
            <Logo :isCollapse="false"/>
            <HeadTitle class="head-title" v-if="appConfig.config.head.title.show"/>
            <HeadBreadcrumb v-if="appConfig.config.head.breadcrumb.show"/>
          </div>
          <div class="col-user-menu">
            <SearchMenu v-if="appConfig.config.head.searchMenu.show" class="user-menu-item"/>
            <FullScreen v-if="appConfig.config.head.fullscreen.show" class="user-menu-item"/>
            <div class="user-menu-item">
              <slot name="userMenu" v-if="appConfig.config.head.user.show">
                <UserMenu/>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </Header>
</template>

<script>
import {Row, Col, Icon, Header} from 'element-ui'
import UserMenu from "./UserMenu.vue";
import mixin from "../../../mixin/mixin";
import Hamburger from "./Hamburger.vue";
import SearchMenu from "./SearchMenu.vue";
import FullScreen from "./FullScreen.vue";
import HeadTitle from "./HeadTitle.vue";
import HeadBreadcrumb from "./HeadBreadcrumb.vue";
import Logo from "@/packages/xxWeb-box/components/common/Logo";

export default {
  name: "HeaderLayout",
  mixins: [mixin],
  components: {
    Logo,
    HeadBreadcrumb,
    HeadTitle,
    FullScreen,
    SearchMenu,
    Hamburger,
    Row,
    Col,
    Icon,
    UserMenu,
    Header
  },
  data() {
    return {
      isCollapse: false,
      expandSearch: false
    }
  },
  computed:{
    sidemenu(){
      return this.appConfig.style.layout==='sidemenu'
    },
    topmenu(){
      return this.appConfig.style.layout==='topmenu'
    }
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse
      this.$emit('menuToggle', this.isCollapse)
    },
  }
}
</script>

<style scoped>
</style>
