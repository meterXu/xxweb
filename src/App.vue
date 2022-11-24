<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// import {
//   enable as enableDarkMode,
//   disable as disableDarkMode,
//   auto as followSystemColorScheme,
//   exportGeneratedCSS as collectCSS,
//   isEnabled as isDarkReaderEnabled
// } from 'darkreader';
//
// enableDarkMode({
//   brightness: 100,
//   contrast: 90,
//   sepia: 10,
// });
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
