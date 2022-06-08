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
          <i class="el-icon-full-screen"></i>
          <UserMenu/>
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
export default {
  name: "HeaderLayout",
  mixins:[mixin],
  components:{
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
      device:'desktop'
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
    }
  }
}
</script>

<style scoped>
</style>
