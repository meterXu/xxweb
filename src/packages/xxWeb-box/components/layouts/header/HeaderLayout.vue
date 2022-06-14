<template>
  <Header class="header">
    <div class="side-header" v-if="appConfig.style.layout==='sidemenu'">
      <div class="row-head">
        <div class="left-con">
          <Hamburger v-if="!appConfig.style.fixSide" :isCollapse="isCollapse" @toggleClick="toggle"/>
          <HeadTitle  v-if="appConfig.config.head.title.show"/>
          <HeadBreadcrumb v-if="appConfig.config.head.breadcrumb.show"/>
        </div>
        <div class="col-user-menu">
          <SearchMenu v-if="appConfig.config.head.searchMenu.show" class="user-menu-item"/>
          <FullScreen v-if="appConfig.config.head.fullscreen.show" class="user-menu-item"/>
          <UserMenu v-if="appConfig.config.head.user.show" class="user-menu-item"/>
        </div>
      </div>
    </div>
  </Header>
</template>

<script>
import {Row,Col,Icon,Header} from 'element-ui'
import UserMenu from "./UserMenu.vue";
import mixin from "../../../mixin/mixin";
import Hamburger from "./Hamburger";
import SearchMenu from "@/packages/xxWeb-box/components/layouts/header/SearchMenu";
import FullScreen from "@/packages/xxWeb-box/components/layouts/header/FullScreen";
import HeadTitle from "@/packages/xxWeb-box/components/layouts/header/HeadTitle";
import HeadBreadcrumb from "@/packages/xxWeb-box/components/layouts/header/HeadBreadcrumb";
export default {
  name: "HeaderLayout",
  mixins:[mixin],
  components:{
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
  data(){
    return {
      isCollapse:false,
      expandSearch:false
    }
  },
  methods:{
    toggle(){
      this.isCollapse = !this.isCollapse
      this.$emit('menuToggle',this.isCollapse)
    }
  }
}
</script>

<style scoped>
</style>
