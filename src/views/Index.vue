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
  </XXWebBox>
</template>

<script>
import * as types from 'xxweb-util/lib/types'
import permission from "../permission";
import {Tag} from 'element-ui'
export default {
  name: 'Index',
  data() {
    return {
      project: this.$project,
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
