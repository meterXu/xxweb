<template>
  <div class="xxWeb-box" theme='default'>
    <Container class="main-container">
      <template v-if="appConfig.style.layout==='sidemenu'">
        <template v-if="device==='desktop'">
          <slot name="leftSide" :data="{isCollapse,permission}">
            <SideMenu mode="vertical" :isCollapse="isCollapse"></SideMenu>
          </slot>
        </template>
        <DrawerMenu v-else v-model="isCollapse">
          <template v-slot:leftSide="{data}">
            <slot name="leftSide" :data="data">
            </slot>
          </template>
        </DrawerMenu>
      </template>
      <Container class="content-container">
        <HeaderLayout :isCollapse="isCollapse">
          <template v-slot:dropdownMenuItem="{menu}">
            <slot name="dropdownMenuItem" :menu="menu"></slot>
          </template>
        </HeaderLayout>
        <MainLayout/>
        <template v-if="appConfig.config.footer.show">
          <slot name="footer">
            <Footer class="footer">
              Copyright © {{appConfig.config.footer.copyright.year}} <a :href="appConfig.config.footer.copyright.href" :target="appConfig.config.footer.copyright.target">苏州工业园园区测绘地理信息有限公司</a>
            </Footer>
          </slot>
        </template>
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
import DrawerMenu from "./layouts/left/DrawerMenu"
import MainLayout from "./layouts/main/MainLayout.vue";
export default {
  name: "XXWebBox",
  props:['appConfig','permission'],
  components:{
    MainLayout,
    SideMenu,
    Container,
    Aside,
    Main,
    Footer,
    Header,
    HeaderLayout,
    DrawerMenu
  },
  data(){
    return {
      isCollapse:false,
      visitedViews:[],
      cachedViews:[],
      device:'desktop',
      WIDTH:992
    }
  },
  provide () {
    return {
      appConfig: this.appConfig,
      permission:this.permission,
      cachedViews:this.cachedViews,
      visitedViews:this.visitedViews,
      slots:this.$slots,
      scopedSlots:this.$scopedSlots
    }
  },
  methods:{
    isMobile() {
      const rect = document.body.getBoundingClientRect();
      return rect.width - 1 < this.WIDTH;
    },
    resizeHandler(){
      if (!document.hidden) {
        const isMobile = this.isMobile();
        this.device = isMobile ? 'mobile' : 'desktop'
      }
    }
  },
  created() {
    this.$bus.$on('dropdownMenuClick',(command) => {
      this.$emit('dropdownMenuClick',command)
    })
    this.$bus.$on('collapseToggle',() => {
      this.isCollapse = !this.isCollapse
      this.$emit('collapseToggle',this.isCollapse)
    })
  },
  mounted() {
    this.resizeHandler()
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    this.$bus.$off()
    window.removeEventListener('resize', this.resizeHandler);
  }
}
</script>

<style scoped>

</style>
