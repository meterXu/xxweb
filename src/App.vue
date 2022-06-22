<template>
  <div id="app">
    <XXWebBox :appConfig="project" :permission="permission"
              @clearCache="clearCache"
              @changePwd="changePwd"
              @exitSystem="exitSystem">
            <template v-slot:hamburger>
              xxx
            </template>
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
    </XXWebBox>
  </div>
</template>

<script>
import project from "./project";
import permission from "./permission";

export default {
  name: 'App',
  data() {
    return {
      project: project,
      permission: permission
    }
  },
  methods: {
    clearCache() {
      console.log('clearCache')
    },
    changePwd() {
      console.log('changePwd')
    },
    exitSystem() {
      console.log('exitSystem')
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
