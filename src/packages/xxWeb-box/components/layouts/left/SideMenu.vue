<template>
  <Scrollbar wrap-class="side-scrollbar">
    <Aside class="side-menu" :width="width">
      <div class="logo">
        <img :src="imgSrc" alt="logo">
        <transition name="title">
          <h1 v-if="!isCollapse" class="title">{{title}}</h1>
        </transition>
      </div>
      <DynamicMenu
          :isCollapse="isCollapse"
          :permission="permission"
          :defaultActive="defaultActive">
      </DynamicMenu>
    </Aside>
  </Scrollbar>
</template>

<script>
import {Aside,Menu,MenuItem,Submenu} from 'element-ui'
import Scrollbar from 'element-ui/lib/scrollbar'
import mixin from "../../../mixin/mixin";
import DynamicMenu from './DynamicMenu'
export default {
  name: "SideMenu",
  props:["isCollapse","permission"],
  mixins:[mixin],
  components:{
    Aside,
    Menu,
    MenuItem,
    Submenu,
    Scrollbar,
    DynamicMenu
  },
  computed:{
    width(){
      return this.isCollapse?'65px': this.appConfig.config.sideMenu.width
    },
    title(){
      return this.appConfig.config.sideMenu.title
    },
    imgSrc(){
      return this.appConfig.config.logo
    },
    defaultActive(){
      return this.$route.path
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
