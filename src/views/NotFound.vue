<template>
  <div style="height: 100%">
    <NotFound v-if="type==1">
    </NotFound>
    <NotFoundDark v-if="type==2" >
    </NotFoundDark>
    <NotFound2 v-if="type==3" :link="link">
    </NotFound2>
  </div>
</template>

<script>
import {NotFound,NotFoundDark,NotFound2} from '../packages/xxWeb-box/index'
export default {
  name: "NotFound",
  props:["type"],
  components:{
    NotFound,
    NotFoundDark,
    NotFound2
  },
  data(){
    return {
      link:{
        home:window.location.pathname
      }
    }
  }
}
</script>

<style scoped>

</style>