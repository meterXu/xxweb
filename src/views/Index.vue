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
  </XXWebBox>
</template>

<script>

import permission from "../permission";
import * as types from '../packages/xxWeb-util/lib/types.js'
import {setLsValue} from "../packages/xxWeb-util/lib/util";

export default {
  name: 'Index',
  data() {
    return {
      project: this.$project,
      permission: permission,
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
    }
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
