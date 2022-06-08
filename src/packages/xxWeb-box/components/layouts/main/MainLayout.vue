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
  data() {
    return {
      activeName:'first',
      pageList:[{
        path:'/',
        fullPath:'/',
        query:null,
        meta:'xxx',
        affix:'xxx'
      }]
    };
  },
  methods: {
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeSelectedTag(view) {
    },
  }
}
</script>

<style scoped>

</style>
