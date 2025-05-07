<template>
  <Main :class="{'layout-main':true,'tab-padding':app.appConfig.style.multiPage&&app.appConfig.config.tabs.show}">
    <TagsView v-if="app.appConfig.style.multiPage&&app.appConfig.config.tabs.show" @refresh="refresh"></TagsView>
    <AppMain ref="appMain"></AppMain>
  </Main>
</template>

<script>
import {Tabs,TabPane,Card,Button,Row,Col} from 'element-ui'
import TagsView from "./TabsView.vue";
import AppMain from "./AppMain.vue";
import mixin from "../../../mixin/mixin";
export default {
  name: "TabLayout",
   mixins:[mixin],
  components:{
    AppMain,
    TagsView,
    Tabs,
    TabPane,
    Card,
    Button,
    Row,
    Col
  },
  methods: {
    refresh(){
      this.$refs.appMain.refresh()
    }
  }
}
</script>

<style scoped>

</style>
