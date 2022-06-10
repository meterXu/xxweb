<template>
  <div>
    业务页面{{index}} {{time}}
  </div>
</template>

<script>
export default {
  name: "Page",
  props:['index'],
  data(){
    return {
      time:null
    }
  },
  mounted() {
    this.time = new Date().toLocaleString()
  }
}
</script>

<style scoped>

</style>
