<template>
  <div>
  <el-row>
    <el-card :bodyStyle="{padding: 0}">
      <PersonCount/>
    </el-card>
  </el-row>
  <el-row class="row-margin" :gutter="[16,16]">
    <el-col :span="12">
      <el-card title="核酸总体情况">
        <el-col :span="12">
<!--          <PieChart title="普通人群" :isImportant="0"/>-->
        </el-col>
        <el-col :span="12">
<!--          <PieChart title="重点人群" :isImportant="1"/>-->
        </el-col>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card title="未核酸情况">
<!--        <LineChart/>-->
      </el-card>
    </el-col>
  </el-row>
  <el-row class="row-margin"  :gutter="[16,16]">
    <el-col :span="8">
      <el-card title="项目总体情况">
        <BarChart/>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card title="功能区核酸情况">
        <el-col :span="12">
<!--          <StackBarChart title="工地普通人员核酸情况/周期" :isImportant="0"/>-->
        </el-col>
        <el-col :span="12">
<!--          <StackBarChart title="工地重点人群/周期" :isImportant="1"/>-->
        </el-col>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import BarChart from './module/BarChart'
import PersonCount from "./module/PersonCount";
export default {
  name: "Dashboard",
  components:{
    BarChart,
    PersonCount
  }
}
</script>

<style scoped>

</style>