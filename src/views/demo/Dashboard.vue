<template>
  <div class="dashboard">
    <el-row :gutter="16" class="card-no-border">
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
    <el-row class="row-margin card-no-border" :gutter="16">
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
    <el-row class="row-margin card-no-border" :gutter="16">
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div class="min-card-chart">
            <div class="card-title">
              <i class="el-icon-s-help" style="font-size: 30px"></i>
              <div class="card-title-con"><h3>Bandwidth usage</h3><h5>March 2022</h5></div>
            </div>
            <div class="card-body">
              <div class="card-body-text">50 GB</div>
              <div class="card-body-apexcharts">
                <MiniLineChart></MiniLineChart>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div class="min-card-chart" style="background: #0CB9C5FF">
            <div class="card-title">
              <i class="el-icon-s-help" style="font-size: 30px"></i>
              <div class="card-title-con"><h3>Download Count</h3><h5>March 2022</h5></div>
            </div>
            <div class="card-body">
              <div class="card-body-text">35487</div>
              <div class="card-body-apexcharts">
                <MinColumnChart></MinColumnChart>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <div class="min-card-chart" style="background: #FFF">
            <img src="https://materialpro-vue3-dark.vercel.app/assets/weatherbg.39f32caf.jpg" width="100%" height="90">
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-margin card-no-border" :gutter="16">
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
import MiniLineChart from "./module/MiniLineChart"
import MinColumnChart from "./module/MinColumnChart"
export default {
  name: "Dashboard",
  components:{
    BarChart,
    PersonCount,
    PieChart,
    AreaChart,
    MiniLineChart,
    MinColumnChart
  }
}
</script>

<style lang="less" scoped>
.dashboard{
  text-align: left;
  width: 1200px;
  margin: 0 auto;
}
.row-margin{
  margin-top: 24px;
}
.card-no-border{
  .el-card{
    border:none;
  }
}
.card-title{
  display: flex;
  align-items: center;
  line-height: 40px;
  h3,h5{
    margin: 0;
    padding: 0;
    height: 20px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.25px;
    font-size: 16px;
  }
  h5{
    font-size: 12px;
  }
  .card-title-con{
    margin: 0 16px;
  }
}
.card-body{
  display: flex;
  align-items: center;
  margin-top: 4px;
  .card-body-text,.card-body-apexcharts{
    padding: 12px;
  }
  .card-body-text{
    width: 90px;
    font-size: 21px;
    font-weight: 300;
  }
  .card-body-apexcharts{
    flex: 1;
  }
}
.min-card-chart{
  height: 126px;background: #1E88E5FF;color: #fff;
  padding: 20px 30px 30px;
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
