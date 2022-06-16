<template>
  <div class="head-title">
    <span> {{headTitle}} </span>
  </div>
</template>

<script>
import mixin from "../../../mixin/mixin";
export default {
  name: "HeadTitle",
  mixins:[mixin],
  data(){
    return {
      device:'desktop',
    }
  },
  computed:{
    headTitle(){
      if(this.device==='desktop'){
        return this.appConfig.config.head.title.desktop
      }else{
        return this.appConfig.config.head.title.mobile
      }
    }
  },
}
</script>

<style scoped>

</style>
