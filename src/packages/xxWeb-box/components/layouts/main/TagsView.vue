<template>
  <div class="tags-view-container">
    <Tabs
        v-model="selectedPath"
        @tab-click="tabClick"
        @tab-remove="removeTab"
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
      <li @click="refreshSelectedTag"><i class="el-icon-refresh" ></i> 刷新页面</li>
      <li v-if="!isCanClose()" @click="closeSelectedTag"><i class="el-icon-close"></i> 关闭页面</li>
      <li @click="closeOthersTags"><i class="el-icon-remove-outline"></i> 关闭其他</li>
      <li @click="closeAllTags"><i class="el-icon-circle-close"></i> 关闭全部</li>
    </ul>
  </div>
</template>

<script>
import {Tabs, TabPane} from 'element-ui'
import mixin from "../../../mixin/mixin";

export default {
  name: "TagsView",
  components: {
    Tabs,
    TabPane
  },
  mixins: [mixin],
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      visitedViews: [],
      selectedPath: null,
      menuPath:null,
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
    '$route'(to){
      this.addVisitedViews(to)
      this.selectedPath = to.path;
    }
  },
  methods: {
    tabClick(tab) {
      this.selectedPath = tab.name;
      if(this.$route.path!==tab.name){
        this.$router.push({path: this.selectedPath});
      }
    },
    removeTab(tabName) {
      let indexPath = this.appConfig.redirect.index
      if (tabName === indexPath) {
        return;
      }
      let tabs = this.visitedViews
      let activePath = this.selectedPath;
      if (activePath === tabName) {
        tabs.forEach((tab, index) => {
          if (tab.path === tabName) {
            let nextTab = tabs[index + 1];
            let preTab = tabs[index - 1];

            if (nextTab) {
              activePath = nextTab.path;
            } else if (preTab) {
              activePath = preTab.path;
            } else {
              activePath = indexPath;
            }
          }
        });
      }
      this.visitedViews = tabs.filter(tab => tab.path !== tabName)
      this.$router.push({path: activePath})
    },
    openMenu(tab) {
      this.menuPath = tab.srcElement.id.replace('tab-', '')
      event.stopPropagation()
      event.preventDefault()
      this.left = event.srcElement.offsetLeft + 15 + event.offsetX;
      this.top = event.srcElement.offsetTop + event.offsetY;
      this.visible = true;
    },
    isCanClose() {
      let menu = this.visitedViews.find(c=>c.path===this.menuPath)
      return  menu && menu.meta && menu.meta.permanent
    },
    refreshSelectedTag() {
      this.$emit('refresh')
    },
    closeOthersTags() {
      let indexMenu = this.visitedViews.find(c=>c.path===this.appConfig.redirect.index)
      if(this.menuPath===this.appConfig.redirect.index){
        if(indexMenu){
          this.visitedViews=[indexMenu]
        }
      }else{
        let menu = this.visitedViews.find(c=>c.path===this.menuPath)
        this.visitedViews = []
        indexMenu&&this.visitedViews.push(indexMenu)
        menu&&this.visitedViews.push(menu)
      }
      this.$router.push({path:this.menuPath})
    },
    closeSelectedTag(){
      this.removeTab(this.menuPath)
    },
    closeAllTags() {
      let indexMenu = this.visitedViews.find(c=>c.path===this.appConfig.redirect.index)
      if(indexMenu){
        this.visitedViews = [indexMenu]
      }else{
        this.visitedViews = []
      }
      this.$router.push({path:this.appConfig.redirect.index})
    },
    closeMenu() {
      this.visible = false
    },
    addVisitedViews(route,permanent=false){
      let view = this.visitedViews.find(c=>c.path === route.path)
      if(!view){
        view = this.searchMenuByPath(this.permission, route.path)
        if(view){
          view = JSON.parse(JSON.stringify(view))
          view.meta = Object.assign(view.meta,route.meta, {
            permanent
          })
        }else{
          let {name,path,meta} = route
          view = {name, path, meta}
        }
        this.visitedViews.push(view)
        this.saveCachedView(view.meta.keepAlive,route.name||view.name)
      }
    },
    saveCachedView(keepAlive,name){
      if(keepAlive&&!this.cachedViews.includes(name)){
        this.cachedViews.push(name)
      }
    }
  }
  ,
  created() {
    if (this.$route.path === this.appConfig.redirect.index) {
      this.addVisitedViews(this.$route,true)
    } else {
      this.addVisitedViews({path:this.appConfig.redirect.index},true)
      this.addVisitedViews(this.$route)
    }
    this.selectedPath = this.$route.path
  }
}
</script>

<style scoped>

</style>
