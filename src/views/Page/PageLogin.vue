<template>
  <div>
    业务页面{{index}} {{time}}
  </div>
</template>

<script>
export default {
  name: "PageLogin",
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
