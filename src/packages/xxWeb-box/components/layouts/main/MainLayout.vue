<template>
  <main
    :class="{
      'layout-main': true,
      'tab-padding':
        app.appConfig.style.multipage && app.appConfig.config.tabs.show,
    }"
  >
    <TagsView
      v-if="app.appConfig.style.multipage && app.appConfig.config.tabs.show"
      @refresh="refresh"
    ></TagsView>
    <AppMain ref="appMain"></AppMain>
  </main>
</template>

<script>
import {
  ElTabs as Tabs,
  ElTabPane as TabPane,
  ElCard as Card,
  ElButton as Button,
  ElRow as Row,
  ElCol as Col,
} from 'element-plus'
import TagsView from './TabsView.vue'
import AppMain from './AppMain.vue'
import mixin from '../../../mixin/mixin.js'
export default {
  name: 'TabLayout',
  mixins: [mixin],
  components: {
    AppMain,
    TagsView,
    Tabs,
    TabPane,
    Card,
    Button,
    Row,
    Col,
  },
  methods: {
    refresh() {
      this.$refs.appMain.refresh()
    },
  },
}
</script>
