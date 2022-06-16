<template>
  <Main class="layout-main">
    <TagsView @refresh="refresh"></TagsView>
    <AppMain ref="appMain"></AppMain>
  </Main>
</template>

<script>
import {Tabs,TabPane,Card,Button,Row,Col} from 'element-ui'
import TagsView from "./TagsView.vue";
import AppMain from "./AppMain.vue";
export default {
  name: "TabLayout",
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
