<template>
  <XXWebBox :appConfig="project" :permission="permission"
            @dropdownMenuClick="dropdownMenuClick"
            @menuClick="menuClick">
    <template v-slot:side-user-tag>
      <Tag class="version" size="mini" effect="light">version:1.0</Tag>
    </template>
  </XXWebBox>
</template>

<script>
import {XXWebBox} from '../packages/xxWeb-box/index'
import permission from "../permission";
import {Tag} from 'element-ui'
import {types} from '../packages/xxWeb-utils/index'
export default {
  name: 'Index',
  data() {
    return {
      project: this.$project,
      permission: permission
    }
  },
  components:{
    Tag,
    XXWebBox
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
    let a = process.env.VUE_APP_ssoApi
    console.log(a)
  }
}
</script>

<style scoped>
.version{
  background-color: transparent;
  border-color: #40A9FF;
}
</style>
