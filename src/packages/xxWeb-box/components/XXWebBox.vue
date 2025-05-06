<template>
  <div class="xxWeb">
    <div class="xxWeb-box" :theme='appConfig.style.theme'>
      <Container class="main-container">
        <template v-if="appConfig.style.layout==='sidemenu'">
          <template v-if="device==='desktop'">
            <slot name="side" :data="{isCollapse,permission}">
              <SideMenu mode="vertical" :isCollapse="isCollapse" :activeIndex="activeIndex">
                <template v-slot:side-logo>
                  <slot name="side-logo"></slot>
                </template>
                <template v-slot:side-userMenu>
                  <slot name="side-userMenu"></slot>
                </template>
                <template v-slot:side-user-userName>
                  <slot name="side-user-userName"></slot>
                </template>
                <template v-slot:side-user-dropdownMenuItem="{menu}">
                  <slot name="side-user-dropdownMenuItem" :menu="menu"></slot>
                </template>
                <template v-slot:side-user-tag>
                  <slot name="side-user-tag"></slot>
                </template>
                <template v-slot:side-user-tag-text>
                  <slot name="side-user-tag-text"></slot>
                </template>
                <template v-slot:side-bottom>
                  <slot name="side-bottom"></slot>
                </template>
              </SideMenu>
            </slot>
          </template>
          <DrawerMenu v-else v-model="isCollapse">
            <template v-slot:side-logo>
              <slot name="side-logo"></slot>
            </template>
            <template v-slot:side-userMenu>
              <slot name="side-userMenu"></slot>
            </template>
            <template v-slot:side-user-userName>
              <slot name="side-user-userName"></slot>
            </template>
            <template v-slot:side-user-dropdownMenuItem="{menu}">
              <slot name="side-user-dropdownMenuItem" :menu="menu"></slot>
            </template>
            <template v-slot:side-user-tag>
              <slot name="side-user-tag"></slot>
            </template>
            <template v-slot:side-user-tag-text>
              <slot name="side-user-tag-text"></slot>
            </template>
          </DrawerMenu>
        </template>
        <Container class="content-container" :style="contentWidth">
          <HeaderLayout :isCollapse="isCollapse">
            <template v-slot:header>
              <slot name="header"></slot>
            </template>
            <template v-slot:head-expand-left-start>
              <slot name="head-expand-left-start"></slot>
            </template>
            <template v-slot:head-hamburger>
              <slot name="head-hamburger"></slot>
            </template>
            <template v-slot:head-logo>
              <slot name="head-logo"></slot>
            </template>
            <template v-slot:head-title>
              <slot name="head-title"></slot>
            </template>
            <template v-slot:head-breadcrumb>
              <slot name="head-breadcrumb"></slot>
            </template>
            <template v-slot:head-expand-left-end>
              <slot name="head-expand-left-end"></slot>
            </template>
            <template v-slot:head-expand-center>
              <slot name="head-expand-center"></slot>
            </template>
            <template v-slot:head-expand-right-start>
              <slot name="head-expand-right-start"></slot>
            </template>
            <template v-slot:head-searchMenu>
              <slot name="head-searchMenu"></slot>
            </template>
            <template v-slot:head-fullScreen>
              <slot name="head-fullScreen"></slot>
            </template>
            <template v-slot:head-userMenu>
              <slot name="head-userMenu"></slot>
            </template>
            <template v-slot:head-user-userName>
              <slot name="head-user-userName"></slot>
            </template>
            <template v-slot:head-user-dropdownMenuItem="{menu}">
              <slot name="head-user-dropdownMenuItem" :menu="menu"></slot>
            </template>
            <template v-slot:head-user-tag>
              <slot name="head-user-tag"></slot>
            </template>
            <template v-slot:head-user-tag-text>
              <slot name="head-user-tag-text"></slot>
            </template>
            <template v-slot:head-expand-right-end>
              <slot name="head-expand-right-end"></slot>
            </template>
          </HeaderLayout>
          <MainLayout/>
          <template v-if="appConfig.config.footer.show">
            <slot name="footer">
              <Footer class="footer">
                Copyright © {{appConfig.config.footer.copyright.year}}
                <a :href="appConfig.config.footer.copyright.href" :target="appConfig.config.footer.copyright.target">
                  {{appConfig.config.footer.copyright.content}}
                </a>
              </Footer>
            </slot>
          </template>
        </Container>
      </Container>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/xxweb-box.css'
import HeaderLayout from "./layouts/header/HeaderLayout.vue";
import {Container,Aside,Main,Footer,Header} from 'element-ui'
import SideMenu from "./layouts/left/SideMenu.vue";
import DrawerMenu from "./layouts/left/DrawerMenu"
import MainLayout from "./layouts/main/MainLayout.vue";


export default {
  name: "XXWebBox",
  props:['appConfig','permission','initCollapse'],
  components:{
    MainLayout,
    SideMenu,
    Container,
    Aside,
    Main,
    Footer,
    Header,
    HeaderLayout,
    DrawerMenu,
  },
  data(){
    return {
      isCollapse:this.initCollapse?true:false,
      visitedViews:[],
      cachedViews:[],
      device:'desktop',
      activeIndex:this.$route.path,
      width:992
    }
  },
  provide () {
    return {
      app:this,
      cachedViews:this.cachedViews,
      visitedViews:this.visitedViews,
      device:this.device
    }
  },
  methods:{
    isMobile() {
      const rect = document.body.getBoundingClientRect();
      return rect.width - 1 < this.width;
    },
    resizeHandler(){
      if (!document.hidden) {
        const isMobile = this.isMobile();
        this.device = isMobile ? 'mobile' : 'desktop'
      }
    }
  },
  watch:{
    activeIndex:{
      immediate:true,
      handler(nv){
        if(this.device==='mobile'){
          this.isCollapse = false
        }
      }
    }
  },
  computed:{
    contentWidth(){
      return {
        width:`calc(100% - ${this.appConfig.config.sideMenu.width})`
      }
    }
  },
  mounted() {
    this.resizeHandler()
    this.$bus.$on('dropdownMenuClick',(command) => {
      this.$emit('dropdownMenuClick',command)
    })
    this.$bus.$on('collapseToggle',() => {
      this.isCollapse = !this.isCollapse
      this.$emit('collapseToggle',this.isCollapse)
    })
    this.$bus.$on('menuClick',(path) => {
      this.$emit('menuClick',path)
    })
    this.$bus.$on('searchMenuItemSelect',(activeIndex) => {
      this.activeIndex = activeIndex
    })
    this.$bus.$on('tabViewChange',(activeIndex) => {
      this.activeIndex = activeIndex
    })
    this.$bus.$on('fullScreen',(dom)=>{
      this.$emit('fullScreen',dom)
    })
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    this.$bus.$off('dropdownMenuClick')
    this.$bus.$off('collapseToggle')
    this.$bus.$off('menuClick')
    this.$bus.$off('searchMenuItemSelect')
    this.$bus.$off('tabViewChange')
    this.$bus.$off('fullScreen')
    window.removeEventListener('resize', this.resizeHandler);
  }
}
</script>

<style scoped>

</style>
