<template>
  <div class="xxWeb">
    <div class="xxWeb-box" :theme="appConfig.style.theme">
      <Container class="main-container">
        <template v-if="appConfig.style.layout === 'sidemenu'">
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
            <template v-slot:user-wrapper-avatar-icon>
              <slot name="user-wrapper-avatar-icon"></slot>
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

<script>
import { $on, $off, $once, $emit } from '../utils/gogocodeTransfer'
import 'element-plus/dist/index.css'
import '../assets/css/index.less'
import HeaderLayout from './layouts/header/HeaderLayout.vue'
import { ElContainer as Container, ElAside as Aside, ElMain as Main, ElFooter as Footer, ElHeader as Header } from 'element-plus'
import SideMenu from './layouts/left/SideMenu.vue'
import DrawerMenu from './layouts/left/DrawerMenu'
import MainLayout from './layouts/main/MainLayout.vue'

export default {
  name: 'XXWebBox',
  props: ['appConfig', 'permission', 'initCollapse'],
  components: {
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
  data() {
    return {
      isCollapse: this.initCollapse ? true : false,
      visitedViews: [],
      cachedViews: [],
      device: 'desktop',
      activeIndex: this.$route.path,
      width: 992
    }
  },
  provide() {
    return {
      app: this,
      cachedViews: this.cachedViews,
      visitedViews: this.visitedViews
    }
  },
  methods: {
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < this.width
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        this.device = isMobile ? 'mobile' : 'desktop'
      }
    }
  },
  watch: {
    activeIndex: {
      deep: true,
      immediate: true,

      handler(nv) {
        if (this.device === 'mobile') {
          this.isCollapse = false
        }
      }
    }
  },
  computed: {
    contentWidth() {
      return {
        width: `calc(100% - ${this.appConfig.config.sideMenu.width})`
      }
    }
  },
  mounted() {
    this.resizeHandler()
    $on(this.$bus, 'dropdownMenuClick', command => {
      $emit(this, 'dropdownMenuClick', command)
    })
    $on(this.$bus, 'collapseToggle', () => {
      this.isCollapse = !this.isCollapse
      $emit(this, 'collapseToggle', this.isCollapse)
    })
    $on(this.$bus, 'menuClick', path => {
      $emit(this, 'menuClick', path)
    })
    $on(this.$bus, 'searchMenuItemSelect', activeIndex => {
      this.activeIndex = activeIndex
    })
    $on(this.$bus, 'tabViewChange', activeIndex => {
      this.activeIndex = activeIndex
    })
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeUnmount() {
    $off(this.$bus)
    window.removeEventListener('resize', this.resizeHandler)
  },
  emits: ['dropdownMenuClick', 'collapseToggle', 'menuClick']
}
</script>
