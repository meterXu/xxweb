<template>
  <div id="app">
    <XXWebBox :appConfig="project" :permission="permission"
              @dropdownMenuClick="dropdownMenuClick">
<!--            <template v-slot:hamburger>-->
<!--              ddd-->
<!--            </template>-->
<!--            <template v-slot:headTitle>-->
<!--              HeadTitle-->
<!--            </template>-->
<!--            <template v-slot:breadcrumb>-->
<!--              Breadcrumb-->
<!--            </template>-->
<!--            <template v-slot:searchMenu>-->
<!--              SearchMenu-->
<!--            </template>-->
<!--      <template v-slot:header>-->
<!--        header-->
<!--      </template>-->
<!--      <template v-slot:searchMenu>-->
<!--        searchMenu-->
<!--      </template>-->
<!--      <template v-slot:fullScreen>-->
<!--        fullScreen-->
<!--      </template>-->
<!--      <template v-slot:userMenu>-->
<!--        userMenu-->
<!--      </template>-->
<!--      <template v-slot:dropdownMenuItem="{menu}">-->
<!--        <DropdownItem command="clearCache" icon="el-icon-delete" v-if="menu.clearCache">clearCache</DropdownItem>-->
<!--        <DropdownItem command="changePwd" icon="el-icon-delete" v-if="menu.changePwd">changePwd</DropdownItem>-->
<!--        <DropdownItem command="exitSystem" icon="el-icon-delete" v-if="menu.exitSystem">exitSystem</DropdownItem>-->
<!--        <DropdownItem command="hello" icon="el-icon-delete" >hello</DropdownItem>-->
<!--      </template>-->
      <template v-slot:leftSide="{data}">
        {{data.isCollapse}}
      </template>
    </XXWebBox>
  </div>
</template>

<script>
import project from "./project";
import permission from "./permission";
import {DropdownItem} from 'element-ui'
export default {
  name: 'App',
  data() {
    return {
      project: project,
      permission: permission
    }
  },
  components:{
    DropdownItem
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

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
