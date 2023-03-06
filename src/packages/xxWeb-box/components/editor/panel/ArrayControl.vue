<template>
  <div class="vertical-control">
    <div v-if="value.length>0">
      <el-row v-for="(item,index) in value" :key="item.id">
        <el-col :span="16">
          <el-input v-model="value[index].name" size="mini"></el-input>
        </el-col>
        <el-col :span="2">
          <i class="el-icon-plus" @click="addItem"></i>
        </el-col>
        <el-col :span="2">
          <i class="el-icon-minus" @click="reduceItem(index)"></i>
        </el-col>
      </el-row>
    </div>
    <el-row v-else>
      <i class="el-icon-plus" @click="addItem"></i>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ArrayControl",
  props:['value'],
  model:{
    prop:'value',
    event:'change'
  },
  methods:{
    addItem() {
      this.value.push({
        id: "vertical_list_"+new Date().valueOf(),
        name: `子标题${this.value.length+1}`
      })
      this.$emit('change',this.value)
    },
    reduceItem(index) {
      this.value.splice(index, 1)
      this.$emit('change',this.value)
    }
  },
}
</script>
<style lang="less" scoped>
.vertical-control {
 i {
   margin-left: 8px;
   cursor: pointer;
 }
}

</style>
