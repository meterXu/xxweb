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
            <Autocomplete class="menu-search"
                          size="small"
                          placeholder="请输入菜单"
                          v-model="text"
                          :fetch-suggestions="querySearch"
                          @select="handleSelect"
                          clearable>
              <template slot-scope="{ item }">
                <div class="name">

                  {{ item.title }}
                </div>
              </template>
            </Autocomplete>
          </div>
          <i v-if="appConfig.config.head.fullscreen.show" class="user-menu-item el-icon-full-screen" @click="handleFullScreen"></i>
          <UserMenu class="user-menu-item" v-if="appConfig.config.head.user.show"/>
        </div>
      </div>
    </div>
  </Header>
</template>

<script>
import {Row,Col,Icon,Header,Autocomplete} from 'element-ui'
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
    Autocomplete
  },
  data(){
    return {
      isCollapse:false,
      expandSearch:false,
      device:'desktop',
      text:null
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
    },
    treeDataFilter(data,queryString,results){
      data.forEach(p=>{
        if(p.hasOwnProperty('meta')&&p.meta.title.includes(queryString)){
          results.push({ path: p.path, title: p.meta.title,icon:p.meta.icon })
        }
        if(p.hasOwnProperty('children')){
          this.treeDataFilter(p.children,queryString,results)
        }
      })
    },
    querySearch(queryString, cb){
      let results = []
      this.treeDataFilter(this.permission,queryString,results)
      cb(results);
    },
    handleSelect(item){
      this.text = item.title
      this.$router.push({path:item.path})
    },
    createIcon(icon){
      if (icon) {
        if (typeof (icon) === 'object'){
          return (icon)
        }
        else {
          return (<i class={icon} />)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
