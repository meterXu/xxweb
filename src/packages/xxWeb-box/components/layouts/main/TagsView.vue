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
      <li @click="refreshSelectedTag">刷新</li>
      <li v-if="!isCanClose()" @click="closeSelectedTag">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
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
    '$route': function (to) {
      let flag = false;
      for (let i = 0; i < this.visitedViews.length; i++) {
        if (this.visitedViews[i].path === to.path) {
          flag = true;
          this.selectedPath = to.path
          break;
        }
      }
      if (!flag) {
        let view = this.searchMenuByPath(this.permission, to.path)
        if (view) {
          this.visitedViews.push(view);
          this.selectedPath = view.path;
        }
      }
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
      let menu = this.searchMenuByPath(this.permission, this.menuPath)
      return  menu && menu.meta && menu.meta.permanent

    },
    refreshSelectedTag() {

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
    searchMenuByPath(data, path) {
      let res = null
      for (let i = 0; i < data.length; i++) {
        if (data[i].path === path) {
          res = data[i]
          break
        } else if (data[i].hasOwnProperty('children') && data[i].children instanceof Array) {
          res = this.searchMenuByPath(data[i].children, path)
          if (res) {
            break
          }
        }
      }
      return res
    }
  }
  ,
  created() {
    if (this.$route.path === this.appConfig.redirect.index) {
      let indexMenu = this.searchMenuByPath(this.permission, this.appConfig.redirect.index)
      indexMenu.meta = Object.assign(indexMenu.meta, {
        permanent: true,
      })
      indexMenu && this.visitedViews.push(indexMenu)
      this.selectedPath = indexMenu.path
    } else {
      let indexMenu = this.searchMenuByPath(this.permission, this.appConfig.redirect.index)
      indexMenu.meta = Object.assign(indexMenu.meta, {
        permanent: true,
      })
      indexMenu && this.visitedViews.push(indexMenu)
      let menu = this.searchMenuByPath(this.permission, this.$route.path)
      menu && this.visitedViews.push(menu)
      this.selectedPath = menu.path
    }
  }
}
</script>

<style scoped>

</style>
