<template>
  <div class="icon-drop">
    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <MtIcon :icon="icon" :size="16" class="align-icon" title="左对齐"></MtIcon>
    </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in items" :key="item.value" :command="item.value">{{item.value}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import MtIcon from "../view/MtIcon"
import Navigate from "../view/Navigate";
import {Dropdown, DropdownItem, DropdownMenu} from "element-ui";
import RulerScale from "../view/RulerScale";
export default {
  name: "MtIconDrop",
  props:['value','icon','items'],
  model:{
    prop:'value',
    event:'change'
  },
  components:{
    MtIcon
  },
  methods:{
    handleCommand(command){
      this.$emit('change',command)
    }
  }
}
</script>
<style scoped>
.icon-drop{
  line-height: 22px;
  padding:2px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
}

</style>
