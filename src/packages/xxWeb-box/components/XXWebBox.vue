<script setup>
import 'element-plus/dist/index.css'
import '../assets/css/index.less'
import HeaderLayout from './layouts/header/HeaderLayout.vue'
import { ElContainer as Container, ElAside as Aside, ElMain as Main, ElFooter as Footer, ElHeader as Header } from 'element-plus'
import SideMenu from './layouts/left/SideMenu.vue'
import DrawerMenu from './layouts/left/DrawerMenu.vue'
import MainLayout from './layouts/main/MainLayout.vue'
import project from "../project";
import {mergeObject} from "../utils/util";
import {defineProps,defineEmits,ref,provide,watch,computed,onBeforeMount,onBeforeUnmount,onMounted,getCurrentInstance} from 'vue'
import {useRoute} from 'vue-router'
import {$emit, $off, $on, $once} from "../utils/bus.js";

const $bus = {
  $on,
  $off,
  $once,
  $emit:$emit
}

const props = defineProps({
  config:{
    type:Object,
    default:{}
  },
  permission:{
    type:Array,
    default:[]
  },
  initCollapse:{
    type:Boolean,
    default:false
  }
})
const emits = defineEmits(['dropdownMenuClick', 'collapseToggle', 'menuClick'])
const route = useRoute()

const isCollapse = ref(props.initCollapse)
const visitedViews = ref([])
const cachedViews = ref([])
const device = ref('desktop')
const activeIndex = ref(route.path)
const width = ref(992)

watch(()=>activeIndex,(nv)=>{
  if (device.value === 'mobile') {
    isCollapse.value = false
  }
},{
  deep:true,
  immediate: true
})

const appConfig = computed(()=>{
  return mergeObject(project,props.config)
})

const contentWidth = computed(()=>{
  return {
    width: `calc(100% - ${appConfig.value.config.sideMenu.width})`
  }
})

provide('cachedViews', cachedViews);
provide('visitedViews', visitedViews);
provide('app', {
  appConfig:appConfig.value,
  permission:props.permission
});
provide('$bus', $bus);

function isMobile() {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < width.value
}
function resizeHandler() {
  if (!document.hidden) {
    device.value = isMobile() ? 'mobile' : 'desktop'
  }
}

onBeforeMount(()=>{
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(()=>{
  $bus.$off()
  window.removeEventListener('resize', resizeHandler)
})

onMounted(()=>{
  resizeHandler()
  $bus.$on('dropdownMenuClick',(command) => {
    emits('dropdownMenuClick',command)
  })
  $bus.$on('collapseToggle',() => {
    isCollapse.value = !isCollapse.value
    emits('collapseToggle',isCollapse.value)
  })
  $bus.$on('menuClick',(path) => {
    emits('menuClick',path)
  })
  $bus.$on('searchMenuItemSelect',(_activeIndex) => {
    activeIndex.value = _activeIndex
  })
  $bus.$on('tabViewChange',(_activeIndex) => {
    activeIndex.value = _activeIndex
  })
})
</script>

<template>
  <div class="xxWeb">
    <div class="xxWeb-box" :data-theme="appConfig.style.theme">
      <Container class="main-container">
        <template v-if="appConfig.style.layout === 'sideMenu'">
          <template v-if="device === 'desktop'">
            <slot name="side" :data="{ isCollapse, permission }">
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
                <template v-slot:side-user-dropdownMenuItem="{ menu }">
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
                <template v-slot:user-wrapper-avatar-icon>
                  <slot name="user-wrapper-avatar-icon"></slot>
                </template>
              </SideMenu>
            </slot>
          </template>
          <DrawerMenu v-else v-model:value="isCollapse">
            <template v-slot:side-logo>
              <slot name="side-logo"></slot>
            </template>
            <template v-slot:side-userMenu>
              <slot name="side-userMenu"></slot>
            </template>
            <template v-slot:side-user-userName>
              <slot name="side-user-userName"></slot>
            </template>
            <template v-slot:side-user-dropdownMenuItem="{ menu }">
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
              <slot name="header"> </slot>
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
            <template v-slot:head-user-dropdownMenuItem="{ menu }">
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
          <MainLayout />
          <template v-if="appConfig.config.footer.show">
            <slot name="footer">
              <Footer class="footer">
                Copyright © {{ appConfig.config.footer.copyright.year }}
                <a :href="appConfig.config.footer.copyright.href" :target="appConfig.config.footer.copyright.target">
                  {{ appConfig.config.footer.copyright.content }}
                </a>
              </Footer>
            </slot>
          </template>
        </Container>
      </Container>
    </div>
  </div>
</template>
