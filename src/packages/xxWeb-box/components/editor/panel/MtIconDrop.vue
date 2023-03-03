<template>
  <div class="icon-drop">
    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <MtIcon :icon="icon" :size="14"></MtIcon>
    </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in items" :key="item.value" :command="item.value">
          <MtIcon :icon="item.icon" :size="12"></MtIcon>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import MtIcon from "../view/MtIcon"
export default {
  name: "MtIconDrop",
  props:['value','items'],
  model:{
    prop:'value',
    event:'change'
  },
  data(){
    let findItem = this.items.find(c=>c.value===this.value)
    return{
      icon:findItem?findItem.icon:null
    }
  },
  components:{
    MtIcon
  },
  methods:{
    handleCommand(command){
      let item = this.items.find(c=>c.value===command)
      if(item){
        this.icon = item.icon
        this.$emit('change',item.value)
      }
    }
  }
}
</script>
<style scoped>
.icon-drop{
  line-height: 22px;
  padding:2px;
  min-width: 28px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
}

</style>
