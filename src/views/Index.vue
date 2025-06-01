<template>
  <XXWebBox :appConfig="project" :permission="permission"
            @dropdownMenuClick="dropdownMenuClick"
            @menuClick="menuClick">
    <template v-slot:head-user-userName>
      {{userInfo?.username}}
    </template>
    <template v-slot:side-user-tag>
      <el-tag class="version" size="small" effect="light">version:1.0</el-tag>
    </template>
    <template #head-expand-right-start>
      <el-button @click="theme('element')">theme-element</el-button>
      <el-button @click="theme('thunder')">theme-thunder</el-button>
      <el-button @click="theme('wdp')">theme-wdp</el-button>
      <el-button @click="theme('vue-admin')">vue-admin</el-button>
      <el-button @click="theme('nitro')">vue-nitro</el-button>
      <el-button @click="theme('v2board')">vue-v2board</el-button>

      <el-button @click="test(1)">test1</el-button>
      <el-button @click="test(2)">test2</el-button>
      <el-button @click="test(3)">test3</el-button>
    </template>
  </XXWebBox>
</template>

<script>
import * as types from '@/packages/xxWeb-util/lib/types.js'
import {setLsValue} from "@/packages/xxWeb-util/lib/util";

export default {
  name: 'Index',
  data() {
    return {
      project: this.$project,
      permission: [],
      dark:false
    }
  },
  computed:{
    userInfo(){
      return JSON.parse(this.$ls.get(types.USER_INFO))
    }
  },
  methods: {
    dropdownMenuClick(command) {
      switch (command){
        case 'exitSystem':{
          this.$ls.set(types.ACCESS_TOKEN,setLsValue(null))
          this.$ls.set(types.USER_INFO,setLsValue(null))
          this.$router.push({path:this.project.redirect.login})
        }break
        case 'clearCache':{
          this.$ls.set(types.ACCESS_TOKEN,setLsValue(null))
          this.$ls.set(types.USER_INFO,setLsValue(null))
          window.location.reload()
        }break
        case 'changePwd':{
          this.$message.success('修改成功')
        }break
      }
    },
    menuClick(path){
      this.$router.push({path:path})
    },
    async test(type){
      this.permission.splice(0,this.permission.length)
      this.permission.push(...(await import((`../permission/${type}`))).default)
      this.$ls.set(types.PERMISSION,JSON.stringify(this.permission))
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
  watch:{
    dark(nv){
      this.$ls.set('dark',nv)
    }
  },
  mounted() {
    this.test(1)
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
</style>
