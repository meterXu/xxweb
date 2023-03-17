<!--
 * @Author: zhangyuc
 * @Date: 2023-03-16 16:22:23
 * @LastEditors: zhangyuc
 * @LastEditTime: 2023-03-17 09:53:39
 * @Description: 图表开关
-->
<template>
  <div class="switch-icon" :style="value?'color: #4634EE;':''" @click="changeStatus">
    <i class="el-icon-view" ></i>
  </div>
</template>
<script>
export default {
  name: "MtIconSwitch",
  props:['value'],
  data(){
    return{
      
    }
  },
  methods:{
    changeStatus() {
      this.$emit('change',!this.value)
    },
  }
}
</script>
<style scoped>
.switch-icon {
  width: 40px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
}

</style>
