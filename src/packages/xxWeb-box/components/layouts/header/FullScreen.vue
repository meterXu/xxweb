<template>
  <i class="el-icon-full-screen" @click="handleFullScreen"></i>
</template>

<script>

export default {
  name: 'FullScreen',
  methods: {
    handleFullScreen() {
      const element = document.querySelector("body");
      if (element) {
        this.$bus.$emit('fullScreen',element)
      }
    },
  },
}
</script>
