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
      console.log(command)
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
