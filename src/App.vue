<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// let timer = null;
// const BaseFontSize = 1920 / 4;
// window.onresize = windowResize;
//
// windowResize();
//
// function windowResize() {
//   timer && clearTimeout(timer);
//   timer = setTimeout(() => {
//     let width = document.body.clientWidth;
//     width = width < 1366 ? 1366 : width
//     const widthNum = width / BaseFontSize;
//     document.documentElement.style.fontSize = widthNum + 'px';
//   }, 10);
// }

export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {},
  mounted() {

  }
}
</script>

<style>
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
