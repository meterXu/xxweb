<template>
  <div class="xxWeb-box" theme='default'>
    <Container class="main-container">
      <template v-if="appConfig.style.layout==='sidemenu'">
        <slot name="leftSide" :data="{isCollapse,permission}">
          <SideMenu :isCollapse="isCollapse" mode="vertical"></SideMenu>
        </slot>
      </template>
      <Container class="content-container">
        <HeaderLayout @collapseToggle="collapseToggle">
          <template v-slot:dropdownMenuItem="{menu}">
            <slot name="dropdownMenuItem" :menu="menu"></slot>
          </template>
        </HeaderLayout>
        <MainLayout/>
        <Footer class="footer" v-if="appConfig.config.footer.show">
          Copyright © {{appConfig.config.footer.copyright.year}} <a :href="appConfig.config.footer.copyright.href" :target="appConfig.config.footer.copyright.target">苏州工业园园区测绘地理信息有限公司</a>
        </Footer>
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
    HeaderLayout
  },
  data(){
    return {
      isCollapse:false,
      visitedViews:[],
      cachedViews:[],
      xxx:null
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
    collapseToggle(isCollapse){
      this.isCollapse = isCollapse
      this.$emit('collapseToggle',isCollapse)
    },
  },
  created() {
    this.$bus.$on('dropdownMenuClick',(command) => {
      this.$emit('dropdownMenuClick',command)
    })
  },
  destroyed() {
    this.$bus.$off()
  }
}
</script>

<style scoped>

</style>
