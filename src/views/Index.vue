<template>
  <XXWebBox :appConfig="project" :permission="permission"
            @dropdownMenuClick="dropdownMenuClick"
            @menuClick="menuClick">
    <template v-slot:side-user-tag>
      <Tag class="version" size="mini" effect="light">version:1.0</Tag>
    </template>
    <template v-slot:head-user-userName>
      admin
    </template>
    <template v-slot:side-user-userName>
      admin
    </template>
    <template #head-expand-right-start>
      <el-button @click="theme('element')">theme-element</el-button>
      <el-button @click="theme('thunder')">theme-thunder</el-button>
      <el-button @click="theme('wdp')">theme-wdp</el-button>
      <el-button @click="theme('vue-admin')">vue-admin</el-button>
      <el-button @click="theme('vue-nitro')">vue-nitro</el-button>
      <el-button @click="theme('vue-v2board')">vue-v2board</el-button>

      <el-button @click="test(1)">test1</el-button>
      <el-button @click="test(2)">test2</el-button>
      <el-button @click="test(3)">test3</el-button>
    </template>
    <template #head-logo>
      <div class="my-top-logo">
        my-top-logo
      </div>
    </template>
<!--    <template #side-logo>-->
<!--      <div class="my-side-logo">-->
<!--        my-side-logo-->
<!--      </div>-->
<!--    </template>-->
  </XXWebBox>
</template>

<script>
import * as types from 'xxweb-util/lib/types'
import * as util from "xxweb-util/lib/util";
import {Tag} from 'element-ui'
import Vue from "vue";
export default {
  name: 'Index',
  data() {
    return {
      project: util.mergeObject(this.$project),
      permission: [],
      dark:false,
    }
  },
  components:{
    Tag,
  },
  methods: {
    dropdownMenuClick(command) {
      switch (command){
        case 'exitSystem':{
          localStorage.setItem(types.ACCESS_TOKEN,null)
          localStorage.setItem(types.PERMISSION,null)
          this.$router.replace({path:this.project.redirect.login})
        }
      }
    },
    collapseToggle(isCollapse){
      console.log(isCollapse)
    },
    menuClick(path){
      console.log(path)
      this.$router.push({path:path})
    },
    async test(type){
      this.permission = (await import((`@/permission/${type}`))).default
      Vue.prototype.$ls.set(types.PERMISSION,JSON.stringify(this.permission))
      switch (type){
        case 1:{
          this.project.style.layout = 'sideMenu'
          this.project.redirect.index = '/page/itemList/xxWebBox'
          this.$router.push({path:'/page/itemList/login'})
        }break
        case 2:{
          this.project.style.layout = 'sideMenu'
          this.project.redirect.index = '/demo/pageList'
          this.$router.push({path:'/demo/detail'})
        }break;
        case 3:{
          this.project.style.layout = 'topMenu'
          this.project.redirect.index = '/demo/pageList'
          this.$router.push({path:'/demo/pageList'})
        }break;
      }
    },
    theme(type){
      this.project.style.theme = type
    }
  },
  mounted() {
    this.test(1)
  },
  watch:{
    dark(nv){
      this.$ls.set('dark',nv)
    }
  },
  created() {
    this.dark = eval(this.$ls.get('dark'))
  }
}
</script>

<style scoped>
.version{
  background-color: transparent;
  border-color: #40A9FF;
}
.my-side-logo{
  font-size: 32px;
  width: 100%;
}
.my-top-logo{
  font-size: 32px;
  width: 200px;
}
</style>
