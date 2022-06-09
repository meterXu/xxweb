<template>
  <div class="tags-view-container">
    <Tabs
        v-model="selectedTag"
        @tab-click="tabClick"
        @contextmenu.native="openMenu">
      <TabPane
          v-for="item in visitedViews"
          :key="item.path"
          :label="item.meta&&item.meta.title"
          :name="item.path"
          :closable="item.meta&&!item.meta.permanent"
      >
      </TabPane>
    </Tabs>
    <ul
        v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isCanClose(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import {Tabs,TabPane} from 'element-ui'
import mixin from "../../../mixin/mixin";
export default {
  name: "TagsView",
  components:{
    Tabs,
    TabPane
  },
  mixins:[mixin],
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
        let view = this.searchMenuByPath(this.permission,to.path)
        if(view){
          this.visitedViews.push(view);
          this.selectedTag = view.path;
        }
      }
    }
  },
  methods:{
    isCanClose(tag){
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
    },
    searchMenuByPath(data,path){
      let res =null
      for (let i = 0; i < data.length; i++) {
        if (data[i].path === path) {
          res = data[i]
          break
        } else if (data[i].hasOwnProperty('children') && data[i].children instanceof Array) {
          res = this.searchMenuByPath(data[i].children, path)
          if(res){
            break
          }
        }
      }
      return res
    }
  },
  created() {
    if(this.$route.path===this.appConfig.redirect.index){
      let indexMenu = this.searchMenuByPath(this.permission,this.appConfig.redirect.index)
      indexMenu.meta=Object.assign(indexMenu.meta,{
        permanent:true,
      })
      indexMenu&&this.visitedViews.push(indexMenu)
    }else{
      let indexMenu = this.searchMenuByPath(this.permission,this.appConfig.redirect.index)
      indexMenu.meta=Object.assign(indexMenu.meta,{
        permanent:true,
      })
      indexMenu&&this.visitedViews.push(indexMenu)
      let menu = this.searchMenuByPath(this.permission,this.$route.path)
      indexMenu&&this.visitedViews.push(menu)
    }
  }
}
</script>

<style scoped>

</style>
