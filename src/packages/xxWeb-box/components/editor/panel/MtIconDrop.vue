<template>
  <div>
    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{value}}
    </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in items" :key="item.value" :command="item.value">{{item.value}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "MtIconDrop",
  props:['value','items'],
  model:{
    prop:'value',
    event:'change'
  },
  methods:{
    handleCommand(command){
      this.$emit('change',command)
    }
  }
}
</script>
<style scoped>

</style>