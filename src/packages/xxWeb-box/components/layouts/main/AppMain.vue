<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div class="transition-container">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data(){
    return {
      cachedViews:[]
    }
  },
  computed: {
    key(){
      return this.$route.path;
    }
  }
}
</script>

<style scoped>

</style>
