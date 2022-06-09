<template>
  <Main class="layout-main">
    <TagsView></TagsView>
    <AppMain></AppMain>
  </Main>
</template>

<script>
import {Tabs,TabPane,Card,Button,Row,Col} from 'element-ui'
import TagsView from "./TagsView";
import AppMain from "./AppMain";
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
  }
}
</script>

<style scoped>

</style>
