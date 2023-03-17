<!--
 * @Author: zhangyuc
 * @Date: 2023-03-17 09:42:34
 * @LastEditors: zhangyuc
 * @LastEditTime: 2023-03-17 10:36:36
 * @Description: 按钮切换状态
-->
<template>
  <div class="switch-button">
    <div :class="value == 'horizontal'?'active':''" @click="changeStatus('horizontal')">横向</div>
    <div :class="value == 'vertical'?'active':''" @click="changeStatus('vertical')">纵向</div>
  </div>
</template>
<script>
export default {
  name: "MtButtonSwitch",
  props:['value'],
  data(){
    return{
      
    }
  },
  methods:{
    changeStatus(value) {
      this.$emit('change',value)
    },
  }
}
</script>
<style scoped lang="less">
.switch-button {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  div {
    width: 50%;
    border: 1px solid #DDDDDD;
    border-radius: 1px;
    line-height: 24px;
    color: #666666;
    font-size: 8px;
    font-weight: 400;
    text-align: center;
  }
  .active {
    border: 1px solid #DDDDDD;
    border-radius: 1px;
    background-color:  #4634EE;
    color: #FFFFFF;
  }
}

</style>
