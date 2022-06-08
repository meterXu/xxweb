<template>
  <div class="s2">
    <Container class="main-container">
      <SideMenu :isCollapse="isCollapse" :permission="permission"></SideMenu>
      <Container class="content-container">
        <HeaderLayout @menuToggle="menuToggle"/>
        <MainLayout/>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/index.less'
import HeaderLayout from "./layouts/header/HeaderLayout.vue";
import {Container,Aside,Main,Footer,Header} from 'element-ui'
import SideMenu from "./layouts/left/SideMenu.vue";
import MainLayout from "./layouts/main/MainLayout";
export default {
  name: "S2Frame",
  props:['appConfig','permission'],
  components:{
    MainLayout,
    SideMenu,
    Container,
    Aside,
    Main,
    Footer,
    Header,
    HeaderLayout
  },
  data(){
    return {
      isCollapse:false
    }
  },
  provide () {
    return {
      appConfig: this.appConfig
    }
  },
  methods:{
    menuToggle(isCollapse){
      this.isCollapse = isCollapse
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
