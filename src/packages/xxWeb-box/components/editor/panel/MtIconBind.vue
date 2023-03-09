<!--
 * @Author: zhangyuc
 * @Date: 2023-03-09 08:56:48
 * @LastEditors: zhangyuc
 * @LastEditTime: 2023-03-09 10:56:45
 * @Description: 宽高等比绑定组件
-->
<template>
  <div class="bind-icon" :style="isBind?'background: #4634EE;':'background: #F6F6F6;'">
    <MtIcon icon="TextBoldNormal" :size="12" @click="changeStatus"></MtIcon>
  </div>
</template>
<script>
import MtIcon from "../view/MtIcon"
export default {
  name: "MtIconBind",
  props:['value','items'],
  data(){
    let findItem = this.items.find(c=>c.value===this.value)
    return{
      item:findItem,
      isBind:false,
      changeLoading:false
    }
  },
  components:{
    MtIcon
  },
  computed:{
    copyValue() {
      return JSON.parse(JSON.stringify(this.value));
    } // 因为监听对象 vue不会存副本，通过计算属性解决 新旧值一样问题
  },
  watch: {
    'copyValue':{
      handler(newVal, val){
        if(this.changeLoading || !this.isBind) {
          return
        }
        // 找到第一项改变的值，计算放大比例
        // 其余几项等于 旧×放大  
        this.changeValue(newVal,val);
      },
      deep:true
    }
  },
  methods:{
    changeValue(newVal,val) {
      let first = ''; // 记录第一个监听改变的items里的值
      let scale = 1;  // 记录第一个的缩放比例
      this.items.map((item) => {
        if(newVal[item] != val[item]) {
          first = item;
          scale = newVal[item]/val[item];
          return
        }
      })
      // 如果找不到 第一个变化 就结束
      if(!first) {
        return
      }
      // 二次遍历缩放比例
      this.items.map((item) => {
        if(newVal[item] == val[item] && item != first) {
          newVal[item] = val[item]*scale
        }
      })
      this.changeLoading = true; // 避免死循环
      this.$emit('change',newVal)
      setTimeout(() => {
        this.changeLoading = false;
      }, 0);
    },
    changeStatus() {
      this.isBind = !this.isBind;
    },
  }
}
</script>
<style scoped>
.bind-icon {
  width: 24px;
  height: 24px;
  display: flex;
  background: #F6F6F6;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  cursor:pointer;
}

</style>
