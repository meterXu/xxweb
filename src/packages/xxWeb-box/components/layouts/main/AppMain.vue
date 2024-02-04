<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div class="transition-container">
        <router-view ref="pageView" :key="key" v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </transition>
  </section>
</template>

<script>
import mixin from '../../../mixin/mixin'

export default {
  name: 'AppMain',
  data() {
    return {
      refreshStamp: null,
    }
  },
  mixins: [mixin],
  computed: {
    key() {
      return this.$route.path + (this.refreshStamp || '')
    },
  },
  methods: {
    refresh() {
      this.refreshStamp = new Date().valueOf()
    },
  },
}
</script>

<style scoped>
.transition-container {
  overflow: hidden;
}
</style>
