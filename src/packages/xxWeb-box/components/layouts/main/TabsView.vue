<template>
  <div class="tags-view-container">
    <Tabs class="xx-web-tab"
        v-model="selectedPath"
        @tab-click="tabClick"
        @tab-remove="removeTab"
        @contextmenu.native="openMenu($event.target)">
      <TabPane
          style=""
          v-for="item in visitedViews"
          :key="item.fullPath"
          :name="item.fullPath"
          :closable="item.meta&&!item.meta.permanent"
      >
        <span class="tabs-item-title-wrap" slot="label" @contextmenu="openMenu($event.target.parentNode)">
          <DynamicIcon v-if="app.appConfig.config.tabs.icon" type="tab" :meta="item.meta"/>
          <span class="title-text">{{myTitle(item)}}</span>
        </span>
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
import DynamicIcon from "../../common/DynamicIcon.vue";
export default {
  name: "TagsView",
  components: {
    DynamicIcon,
    Tabs,
    TabPane
  },
  mixins: [mixin],
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedPath:null,
      contextMenuPath:null,
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
      this.selectedPath = to.fullPath;
      this.$bus.$emit('tabViewChange',to.path)
    }
  },
  methods: {
    tabClick(tab) {
      this.visitRoute(tab.name)
    },
    removeTab(tabName) {
      let indexPath = this.app.appConfig.redirect.index
      if (tabName === indexPath) {
        return;
      }
      let tabs = this.visitedViews
      let activePath = this.selectedPath;
      if (activePath === tabName) {
        tabs.forEach((tab, index) => {
          if (tab.fullPath === tabName) {
            let nextTab = tabs[index + 1];
            let preTab = tabs[index - 1];

            if (nextTab) {
              activePath = nextTab.fullPath;
            } else if (preTab) {
              activePath = preTab.fullPath;
            } else {
              activePath = indexPath;
            }
          }
        });
      }
      let delViewIndex = tabs.findIndex(tab => tab.fullPath === tabName)
      delViewIndex>-1&&tabs.splice(delViewIndex,1)
      this.visitRoute(activePath)
    },
    visitRoute(fullPath){
      if(this.$route.fullPath!==fullPath){
        this.selectedPath = fullPath;
        this.$router.push({path: fullPath});
      }
    },
    openMenu(tab) {
      event.stopPropagation()
      event.preventDefault()
      if(tab&&tab.id){
        this.contextMenuPath = tab.id.replace('tab-', '')
        tab.blur()
        this.left = tab.offsetLeft + 15 + event.offsetX;
        this.top = tab.offsetTop + event.offsetY;
        this.visible = true;
      }
    },
    isCanClose() {
      let menu = this.visitedViews.find(c=>c.path===this.contextMenuPath)
      return  menu && menu.meta && menu.meta.permanent
    },
    refreshSelectedTag() {
      if(this.selectedPath===this.contextMenuPath){
        this.$emit('refresh')
      }
    },
    closeOthersTags() {
      let indexMenu = this.visitedViews.find(c=>c.path===this.app.appConfig.redirect.index)
      if(this.contextMenuPath===this.app.appConfig.redirect.index){
        this.visitedViews.splice(0,this.visitedViews.length)
        indexMenu&&this.visitedViews.push(indexMenu)
      }else{
        let menu = this.visitedViews.find(c=>c.path===this.contextMenuPath)
        this.visitedViews.splice(0,this.visitedViews.length)
        indexMenu&&this.visitedViews.push(indexMenu)
        menu&&this.visitedViews.push(menu)
      }
      this.visitRoute(this.contextMenuPath)
    },
    closeSelectedTag(){
      this.removeTab(this.contextMenuPath)
    },
    closeAllTags() {
      let indexMenu = this.visitedViews.find(c=>c.path===this.app.appConfig.redirect.index)
      this.visitedViews.splice(0,this.visitedViews.length)
      indexMenu&&this.visitedViews.push(indexMenu)
      this.visitRoute(this.app.appConfig.redirect.index)
    },
    closeMenu() {
      this.visible = false
    },
    addVisitedViews(route,permanent=false){
      let view = this.visitedViews.find(c=>c.fullPath === route.fullPath)
      if(!view){
        view = this.searchMenuByPath(this.app.permission, route.path) //根据路由在权限中查询
        if(view){
          let _meta= Object.assign({},view.meta)
          view = JSON.parse(JSON.stringify(view))
          view.name = route.name
          view.fullPath = route.fullPath
          view.meta = Object.assign(_meta,route.meta, {permanent})
        }else{
          view = this.searchMenuByPath(this.$router.getRoutes(), route.path)//根据路由查询路由表
          if(!view){
            view = {name:'未定义路由',path:route.path,fullPath:route.fullPath, meta:{title:'未定义路由',keepAlive:false,permanent}}
          }else{
            view = {name:view.name,path:view.path,fullPath:route.fullPath,meta:Object.assign({permanent},view.meta)}
          }
        }
        if(!view.meta.hideInTabs&&view.meta.title&&view.name!=='未定义路由'){
          this.visitedViews.push(view)
        }
        this.saveCachedView(view.meta.keepAlive,route.name||view.name)
      }
    },
    saveCachedView(keepAlive,name){
      if(keepAlive&&!this.cachedViews.includes(name)){
        this.cachedViews.push(name)
      }
    },
    initVisitedViews(){
      this.visitedViews.splice(0,this.visitedViews.length)
      this.cachedViews.splice(0,this.cachedViews.length)
      if (this.$route.fullPath === this.app.appConfig.redirect.index) {
        this.addVisitedViews(this.$route,true)
      } else {
        this.addVisitedViews({path:this.app.appConfig.redirect.index,fullPath:this.app.appConfig.redirect.index},true)
        this.addVisitedViews(this.$route)
      }
      this.selectedPath = this.$route.fullPath
    }
  },
  created() {
    this.initVisitedViews()
  }
}
</script>