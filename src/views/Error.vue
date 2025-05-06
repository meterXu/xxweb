<template>
  <div style="height: 100%">
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