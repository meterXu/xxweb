<template>
  <div style="height: 100%">
    {{type==='5'?'403':'404'}}
  </div>
</template>

<script>
export default {
  name: "NotFoundBox",
  props:["type"],
  components:{
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