<template>
  <div>
    业务页面{{index}} {{new Date().toLocaleString()}}
  </div>
</template>

<script>
export default {
  name: "Second",
  props:['index']
}
</script>

<style scoped>

</style>
