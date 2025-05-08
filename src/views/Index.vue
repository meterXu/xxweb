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
    <template #head-top-menu>
      <el-button @click="test(1)">test1</el-button>
      <el-button @click="test(2)">test2</el-button>
      <el-button @click="test(3)">test3</el-button>
    </template>
  </XXWebBox>
</template>

<script>
import * as types from 'xxweb-util/lib/types'
import * as util from "xxweb-util/lib/util";
import permission from "../permission/1";
import {Tag} from 'element-ui'
export default {
  name: 'Index',
  data() {
    return {
      project: util.mergeObject(this.$project),
      permission: permission,
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
      window.permission = this.permission
      switch (type){
        case 1:{
          this.project.redirect.index =  '/page/itemList/login'
          this.$router.push({path:'/page/itemList/login'})
        }break
        case 2:{
          this.project.redirect.index =  '/demo/detail'
          this.$router.push({path:'/demo/detail'})
        }break;
        case 3:{
          this.project.redirect.index =  '/demo/pageList'
          this.$router.push({path:'/demo/pageList'})
        }break;
      }
    }
  },
  mounted() {
  },
  watch:{
    dark(nv){
      this.$ls.set('dark',nv)
    }
  },
  created() {
    this.dark = eval(this.$ls.get('dark'))
    window.permission = permission
  }
}
</script>

<style scoped>
.version{
  background-color: transparent;
  border-color: #40A9FF;
}
</style>
