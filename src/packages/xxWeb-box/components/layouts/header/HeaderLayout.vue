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
          <div v-if="appConfig.config.head.searchMenu.show" class="user-menu-item menu-search-box" :style="{width:(expandSearch?'180px':'18px')}">
            <i class="el-icon-search" @click="handleShowSearch"></i>
            <Input class="menu-search" size="small" placeholder="请输入菜单" clearable/>
          </div>
          <i v-if="appConfig.config.head.fullscreen.show" class="user-menu-item el-icon-full-screen" @click="handleFullScreen"></i>
          <UserMenu class="user-menu-item" v-if="appConfig.config.head.user.show"/>
        </div>
      </div>
    </div>
  </Header>
</template>

<script>
import {Row,Col,Icon,Header,Input} from 'element-ui'
import UserMenu from "./UserMenu.vue";
import mixin from "../../../mixin/mixin";
import Hamburger from "./Hamburger";
import screenfull from 'screenfull';
export default {
  name: "HeaderLayout",
  mixins:[mixin],
  components:{
    Hamburger,
    Row,
    Col,
    Icon,
    UserMenu,
    Header,
    Input
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
    },
    handleShowSearch(){
      this.expandSearch=!this.expandSearch
    }
  }
}
</script>

<style scoped>
</style>
