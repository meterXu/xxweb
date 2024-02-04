<template>
  <XXWebBox :appConfig="project" :permission="permission"
            @dropdownMenuClick="dropdownMenuClick"
            @menuClick="menuClick">
    <template v-slot:side-user-tag>
      <el-tag class="version" size="small" effect="light">version:1.0</el-tag>
    </template>
    <template v-slot:head-expand-right-start>
      <DarkMode1 v-model="dark" style="margin-right: 12px"/>
    </template>
  </XXWebBox>
</template>

<script>

import permission from "../permission";
import {DarkMode1,types} from '../packages/xxWeb-box'
export default {
  name: 'Index',
  data() {
    return {
      project: this.$project,
      permission: permission,
      dark:false
    }
  },
  components:{
    DarkMode1
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
