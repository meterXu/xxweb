<template>
  <Header class="header">
    <div class="side-header" v-if="appConfig.style.layout==='sidemenu'">
      <div class="row-head">
        <div class="left-con">
          <Hamburger :isCollapse="isCollapse" @toggleClick="toggle" v-if="!appConfig.style.fixSide"></Hamburger>
          <div class="head-title">
            <span> {{headTitle}} </span>
          </div>
        </div>
        <div class="col-user-menu">
          <SearchMenu v-if="appConfig.config.head.searchMenu.show"></SearchMenu>
          <i v-if="appConfig.config.head.fullscreen.show" class="user-menu-item el-icon-full-screen" @click="handleFullScreen"></i>
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
import screenfull from 'screenfull';
import SearchMenu from "@/packages/xxWeb-box/components/layouts/header/SearchMenu";
export default {
  name: "HeaderLayout",
  mixins:[mixin],
  components:{
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
      expandSearch:false,
      device:'desktop',
    }
  },
  computed:{
    headTitle(){
      if(this.device==='desktop'){
        return this.appConfig.config.head.title.desktop
      }else{
        return this.appConfig.config.head.title.mobile
      }
    }
  },
  methods:{
    toggle(){
      this.isCollapse = !this.isCollapse
      this.$emit('menuToggle',this.isCollapse)
    },
    handleFullScreen(){
      const element = document.getElementById('app');
      if (element) screenfull.toggle(element);
    }
  }
}
</script>

<style scoped>
</style>
