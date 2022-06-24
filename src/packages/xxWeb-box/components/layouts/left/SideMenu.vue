<template>
  <Scrollbar wrap-class="side-scrollbar">
    <Aside class="side-menu" :width="width">
      <Logo :isCollapse="isCollapse"/>
      <DynamicMenu
          :mode="mode"
          :defaultActive="defaultActive">
      </DynamicMenu>
    </Aside>
  </Scrollbar>
</template>

<script>
import {Aside,Menu,MenuItem,Submenu} from 'element-ui'
import Scrollbar from 'element-ui/lib/scrollbar'
import mixin from "../../../mixin/mixin";
import DynamicMenu from '../../common/DynamicMenu.vue'
import Logo from "../../common/Logo";
export default {
  name: "SideMenu",
  props:['mode'],
  mixins:[mixin],
  components:{
    Logo,
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
