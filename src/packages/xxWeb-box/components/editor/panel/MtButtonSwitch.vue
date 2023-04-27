<template>
  <div class="switch-button">
    <div v-for="item in items" :class="value == item.value?'active':''" @click="changeStatus(item.value)">{{item.text}}</div>
  </div>
</template>
<script>
export default {
  name: "MtButtonSwitch",
  props:['value','items'],
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
