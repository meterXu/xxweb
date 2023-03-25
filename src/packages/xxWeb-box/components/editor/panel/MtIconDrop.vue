<!-- 
必须给两个参数！
-->
<template>
  <div class="icon-drop">
  <!-- <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <MtIcon :icon="icon" :size="14"></MtIcon>
    </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in items" :key="item.value" :command="item.value">
          <MtIcon :icon="item.icon" :size="12"></MtIcon>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
    <div class='icon-box' :class='value === items[1].value ? "selected" : ""' @click='handleCommand'>
      <MtIcon :icon="items[1].icon" :size="14"></MtIcon>
    </div>
  </div>
</template>
<script>
import MtIcon from "../view/MtIcon"
export default {
  name: "MtIconDrop",
  props: ['value', 'items'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    let findItem = this.items.find(c => c.value === this.value)
    return {
      icon: findItem ? findItem.icon : null
    }
  },
  components: {
    MtIcon
  },
  methods: {
    handleCommand(command) {
      // let item = this.items.find(c => c.value === command)
      let item = this.items.find(c => c.value !== this.value)
      if (item) {
        this.icon = item.icon
        this.$emit('change', item.value)
      }
    }
  }
}
</script>
<style scoped>
.icon-box {
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.selected {
  background-color: #F1F4F8;
}
</style>
