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
          <div style="padding: 20px 30px 30px;">
            <h3 style="font-weight:500">22 March, 2021</h3>
            <h5 style="font-weight:500;font-size: 1.25rem;margin-top: 20px;margin-bottom: 8px">Super awesome, Vue 3 is there, Lets do this!</h5>
            <div class="tags">
              <el-tag size="medium">Medium</el-tag>
              <el-tag type="danger" size="medium">Low</el-tag>
              <el-tag type="warning" size="medium">High</el-tag>
            </div>
            <el-divider></el-divider>
            <div style="display: flex;justify-content: space-between">
             <div>
               <el-avatar style="margin-right: 10px" :size="40" src="https://materialpro-vue3-dark.vercel.app/assets/1.32ddcd87.jpg"></el-avatar>
               <el-avatar style="margin-right: 10px" :size="40" src="https://materialpro-vue3-dark.vercel.app/assets/2.1c16a104.jpg"></el-avatar>
               <el-avatar :size="40" src="https://materialpro-vue3-dark.vercel.app/assets/3.0594bd0b.jpg"></el-avatar>
             </div>
              <div>
                <el-button icon="el-icon-chat-round" circle></el-button>
              </div>
            </div>
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
    <el-row class="row-margin"  :gutter="16">
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div style="height: 176px;background: #1E88E5FF"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card></el-card>
      </el-col>
      <el-col :span="8">
        <el-card></el-card>
      </el-col>
    </el-row>
    <el-row class="row-margin"  :gutter="16">
      <el-col :span="8">
        <el-card></el-card>
        <el-card style="margin-top: 24px"></el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-tabs>
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
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
.tags .el-tag{
  margin-right: 8px;
}
</style>
