<template>
  <div class="logo" :style="maxWidth">
    <img :src="imgSrc" alt="logo">
    <transition name="title">
      <h1 v-if="!isCollapse" class="title">{{title}}</h1>
    </transition>
  </div>
</template>

<script>
import mixin from "../../mixin/mixin";
export default {
  name: "Logo",
  mixins:[mixin],
  props:['isCollapse'],
  components:{
  },
  computed:{
    imgSrc(){
      return this.app.appConfig.config.logo
    },
    title(){
      return this.app.appConfig.config.sideMenu.title
    },
    maxWidth(){
      return {
        maxWidth:`${parseInt(this.app.appConfig.config.sideMenu.width.replace('px',''))-50}px`
      }
    }
  }
}
</script>

<style scoped>

</style>
