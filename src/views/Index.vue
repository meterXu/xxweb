<template>
  <XXWebBox :appConfig="project" :permission="permission"
            @dropdownMenuClick="dropdownMenuClick">
    <template v-slot:side-user-tag>
      <Tag class="version" size="mini" effect="light">version:1.0</Tag>
    </template>
  </XXWebBox>
</template>

<script>
import project from "../project";
import permission from "../permission";
import {Tag} from 'element-ui'
import {types} from '../packages/xxWeb-utils/index'
export default {
  name: 'Index',
  data() {
    return {
      project: project,
      permission: permission
    }
  },
  components:{
    Tag
  },
  methods: {
    dropdownMenuClick(command) {
      switch (command){
        case 'exitSystem':{
          localStorage.setItem(types.ACCESS_TOKEN,null)
          this.$router.replace({path:project.redirect.login})
        }
      }
    },
    collapseToggle(isCollapse){
      console.log(isCollapse)
    }
  }
}
</script>

<style scoped>
.version{
  background-color: transparent;
  border-color: #40A9FF;
}
</style>
