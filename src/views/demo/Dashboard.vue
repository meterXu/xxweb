<template>
  <div class="dashboard">
    <el-row :gutter="16">
      <el-col :span="16">
        <el-card>
          <div slot="header">
            <span>Sales Overview</span>
          </div>
          <BarChart></BarChart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>Our Visitors</span>
          </div>
          <PieChart></PieChart>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-margin"  :gutter="16">
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div class="image"></div>
          <div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">
            <span>Our Visitors</span>
          </div>
          <AreaChart></AreaChart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from './module/BarChart'
import PersonCount from "./module/PersonCount";
import PieChart from "./module/PieChart";
import AreaChart from "./module/AreaChart"
export default {
  name: "Dashboard",
  components:{
    BarChart,
    PersonCount,
    PieChart,
    AreaChart
  }
}
</script>

<style scoped>
.dashboard{
  text-align: left;
  width: 1200px;
  margin: 0 auto;
}
.row-margin{
  margin-top: 24px;
}
.image{
  height: 264px;
  background: url("https://materialpro-vue3-dark.vercel.app/assets/u5.6e16be31.jpg") no-repeat center center;
  background-size: cover;

}
</style>
