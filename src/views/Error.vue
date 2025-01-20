<template>
  <div style="height: 100%">
    <NotFound v-if="type==='1'" :link="link">
    </NotFound>
    <NotFoundDark v-if="type==='2'" :link="link">
    </NotFoundDark>
    <NotFound2 v-if="type==='3'" :link="link">
    </NotFound2>
    <NoAuthority1 v-if="type==='4'" :link="link"></NoAuthority1>
    <NoAuthority2 v-if="type==='5'" :link="link"></NoAuthority2>
  </div>
</template>

<script>
import {NotFound,NotFoundDark,NotFound2,NoAuthority1,NoAuthority2} from '../packages/xxWeb-box/index'
export default {
  name: "NotFoundBox",
  props:["type"],
  components:{
    NotFound,
    NotFoundDark,
    NotFound2,
    NoAuthority1,
    NoAuthority2
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