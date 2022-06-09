<template>
  <div class="tags-view-container">
    <Tabs
        v-model="selectedTag"
        closable
        @tab-click="tabClick"
        @contextmenu.native="openMenu">
      <TabPane
          v-for="item in visitedViews"
          :key="item.path"
          :label="item.meta.title"
          :name="item.path"
      >
      </TabPane>
    </Tabs>
    <ul
        v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import {Tabs,TabPane} from 'element-ui'
export default {
  name: "TagsView",
  components:{
    Tabs,
    TabPane
  },
  data(){
    return {
      visible: false,
      top: 0,
      left: 0,
      visitedViews:[],
      selectedTag: null,
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
    '$route':function (to) {
      let flag = false;
      for (let i = 0;i < this.visitedViews.length;i++) {
        if (this.visitedViews[i].path === to.path) {
          flag = true;
          this.selectedTag=to.path
          break;
        }
      }
      if (!flag) {
        this.visitedViews.push(to);
        this.selectedTag = to.path;
      }
    }
  },
  methods:{
    isAffix(tag){
      return true;
    },
    isActive(route){
      return route.path === this.$route.path;
    },
    closeSelectedTag(){

    },
    tabClick(tab){

    },
    openMenu(tab){
      const path = tab.srcElement.id.replace('tab-','')
      event.stopPropagation()
      event.preventDefault()
      this.left = event.srcElement.offsetLeft+15+event.offsetX;
      this.top = event.srcElement.offsetTop+event.offsetY;
      this.visible = true;
      this.selectedTag = path;
    },
    refreshSelectedTag(){

    },
    closeOthersTags(){

    },
    closeAllTags(){

    },
    closeMenu(){
      this.visible = false
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
