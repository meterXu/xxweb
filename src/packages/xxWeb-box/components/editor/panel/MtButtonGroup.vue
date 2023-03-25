<template>
  <div class="mt-btn-group">
    <el-button v-for="item in  buttons" :key="item.value" size="mini" @click="changeSelect(item)" :class="{active:item.value === selectedValue}">{{item.text}}</el-button>
  </div>
</template>

<script>
  export default {
    name:'MtButtonGroup',
    props:['value','fItem'],
    data(){
      return {
        buttons: this.fItem.data,
        selectedValue:'info'
      }
    },
    methods:{
      changeSelect(item){
        this.selectedValue = item.value
        this.$emit('change', this.selectedValue)
      }
    }
  }
</script>

<style lang="less" scoped>
.mt-btn-group{
   .el-button.active{
     color: #409EFF;
     border-color: #c6e2ff;
     background-color: #ecf5ff;
   }
   .el-button{
     margin-left: 0;
   }
}
</style>