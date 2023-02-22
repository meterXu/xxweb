<template>
  <el-row :justify="10">
    <el-col :span="24">1</el-col>
    <el-col :span="24">2</el-col>
    <el-col :span="24">3</el-col>
    <el-col :span="24">4</el-col>
    <el-col :span="24">5</el-col>
    <el-col :span="24">6</el-col>
  </el-row>
</template>

<script>
export default {
  name: "XscRowLayout",
  props:{
    scale: Number,
    charts: {
      type: Array,
      default: null
    },
    view: {
      type: Boolean,
      default: true
    },
    activeItem:{
      type:Object,
      default:null
    },
  },
  model:{
    prop:'activeItem',
    event:'change'
  },
}
</script>

<style scoped>

</style>