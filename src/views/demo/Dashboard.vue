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
          <div style="width: 100%;height:264px;background: url('../../../public/static/imgs/bg-1.png') no-repeat center center;background-size: cover;"/>
          <div style="padding: 20px 30px 30px;">
            <h3 style="font-weight:500">22 March, 2022</h3>
            <h5 style="font-weight:500;font-size: 1.25rem;margin-top: 20px;margin-bottom: 8px">Super awesome, Vue 3 is there, Lets do this!</h5>
            <div class="tags">
              <el-tag size="medium">Medium</el-tag>
              <el-tag type="danger" size="medium">Low</el-tag>
              <el-tag type="warning" size="medium">High</el-tag>
            </div>
            <el-divider></el-divider>
            <div style="display: flex;justify-content: space-between">
             <div>
               <el-avatar style="margin-right: 10px" :size="40" src="./static/imgs/user-1.png"></el-avatar>
               <el-avatar style="margin-right: 10px" :size="40" src="./static/imgs/user-2.png"></el-avatar>
               <el-avatar :size="40" src="./static/imgs/user-3.png"></el-avatar>
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
          <div style="background: #FFF">
            <img src="../../../public/static/imgs/bg-2.png" width="100%" height="90">
            <div style="padding: 7px 20px;display: flex">
              <div class="d-flex align-center justify-center">
                <i class="el-icon-sunny weather-icon"></i>
                <div class="mm-h1">
                  <h1>32<sup>0</sup></h1>
                  <small>Sunny Rainy day</small>
                </div>
              </div>
              <div class="d-flex align-center justify-center">
                <i class="el-icon-moon weather-icon" style="color: #0CB9C5FF"></i>
                <div class="mm-h1">
                  <h1>25<sup>0</sup></h1>
                  <small>Tonight</small>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-margin card-no-border" :gutter="16">
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../../public/static/imgs/login-register.jpg" width="100%">
          <div class="user-avatar">
            <el-avatar :size="100" src="./static/imgs/user-1.png"></el-avatar>
          </div>
          <div class="user-content">
            <h2 style="margin-top: 16px">Jonathan Dominic</h2>
            <small>Web Designer & Developer</small>
            <br/>
            <el-button type="primary" style="border-radius: 50px;width: 100px;height: 36px;margin-top: 12px">Follow</el-button>
            <el-row style="margin-top: 24px;padding-bottom: 16px">
              <el-col :span="8">
                <h2>1099</h2>
                <small>Articles</small>
              </el-col>
              <el-col :span="8">
                <h2>23,469</h2>
                <small>Followers</small>
              </el-col>
              <el-col :span="8">
                <h2>6035</h2>
                <small>Following</small>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card style="margin-top: 24px" :body-style="{ padding: '0px' }">
          <div class="header">
           <h2>My Contacts</h2>
           <h5>Checkout my contacts here</h5>
          </div>
          <div class="pa-4">
            <div class="li-user" v-for="item in 4">
              <div class="li-user-avatar"><el-avatar :size="40" :src="userIcons[item]"></el-avatar></div>
              <div class="li-user-info">
                <h4>Pavan Kumar</h4>
                <h6>info@wrappixel.com</h6>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="Activity" name="Activity">
              <div class="profiletimeline">
                <div class="sk-item">
                  <div class="sl-left">
                    <img  width="40" class="rounded-circle" :src="userIcons[0]"/>
                  </div>
                  <div class="sl-right">
                    <div class="d-md-flex align-items-center">
                      <h3>John Doe</h3>
                      <small class="ms-1">5 minutes ago</small>
                    </div>
                    <p>assign a new task Design weblayout</p>
                    <el-row class="mt-3" :gutter="16">
                      <el-col :span="6">
                        <img width="100%" src="../../../public/static/imgs/illustration-2.png"/>
                      </el-col>
                      <el-col :span="6">
                        <img width="100%" src="../../../public/static/imgs/illustration-4.png"/>
                      </el-col>
                      <el-col :span="6">
                        <img width="100%" src="../../../public/static/imgs/illustration-3.png"/>
                      </el-col>
                      <el-col :span="6">
                        <img width="100%" src="../../../public/static/imgs/illustration-1.png"/>
                      </el-col>
                    </el-row>
                    <div style="display: flex;align-items: center;width: 220px;justify-content: flex-start;margin-top: 12px">
                      <a class="n-flex align-center text-14 text-primary mr-3"><i class="text-21 el-icon-s-comment"></i>  comments</a>
                      <a class="n-flex align-center text-14 text-red"><i class="text-21 el-icon-star-on"></i>  5 Likes</a>
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
                <div class="sk-item">
                  <div class="sl-left">
                    <img  width="40" class="rounded-circle" :src="userIcons[1]"/>
                  </div>
                  <div class="sl-right">
                    <div class="d-md-flex align-items-center">
                      <h3>John Doe</h3>
                      <small class="ms-1">5 minutes ago</small>
                    </div>
                    <el-row class="mt-3" :gutter="16">
                      <el-col :span="6">
                        <img width="100%" src="../../../public/static/imgs/illustration-4.png"/>
                      </el-col>
                      <el-col :span="18">
                        <div style="padding: 12px">
                          <p style="line-height: 1.2rem">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                          </p>
                          <el-button style="margin-top: 12px" type="primary" size="small">Design Weblayout</el-button>
                        </div>
                      </el-col>
                    </el-row>
                    <div style="display: flex;align-items: center;width: 220px;justify-content: flex-start;margin-top: 12px">
                      <a class="n-flex align-center text-14 text-primary mr-3"><i class="text-21 el-icon-s-comment"></i>  comments</a>
                      <a class="n-flex align-center text-14 text-red"><i class="text-21 el-icon-star-on"></i>  5 Likes</a>
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
                <div class="sk-item">
                  <div class="sl-left">
                    <img  width="40" class="rounded-circle" :src="userIcons[2]"/>
                  </div>
                  <div class="sl-right">
                    <div class="d-md-flex align-items-center">
                      <h3>John Doe</h3>
                      <small class="ms-1">5 minutes ago</small>
                    </div>
                    <el-row class="mt-3" :gutter="16">
                      <el-col :span="24">
                        <div>
                          <p style="line-height: 1.2rem">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                    <div style="display: flex;align-items: center;width: 220px;justify-content: flex-start;margin-top: 12px">
                      <a class="n-flex align-center text-14 text-primary mr-3"><i class="text-21 el-icon-s-comment"></i>  comments</a>
                      <a class="n-flex align-center text-14 text-red"><i class="text-21 el-icon-star-on"></i>  5 Likes</a>
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
                <div class="sk-item">
                  <div class="sl-left">
                    <img  width="40" class="rounded-circle" :src="userIcons[3]"/>
                  </div>
                  <div class="sl-right">
                    <div class="d-md-flex align-items-center">
                      <h3>John Doe</h3>
                      <small class="ms-1">5 minutes ago</small>
                    </div>
                    <div style="padding: 16px;font-weight: 400;color: #1E88E5FF;font-size: 14px">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
                <div class="sk-item">
                  <div class="sl-left">
                    <img  width="40" class="rounded-circle" :src="userIcons[4]"/>
                  </div>
                  <div class="sl-right">
                    <div class="d-md-flex align-items-center">
                      <h3>John Doe</h3>
                      <small class="ms-1">5 minutes ago</small>
                    </div>
                    <div style="padding: 16px;font-weight: 400;color: #0CB9C5FF;font-size: 14px">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Profile" name="Profile">Profile</el-tab-pane>
            <el-tab-pane label="Setting" name="Setting">Setting</el-tab-pane>
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
  },
  data(){
    return {
      activeName:'Activity',
      userIcons:[
          "./static/imgs/user-1.png",
          "./static/imgs/user-2.png",
          "./static/imgs/user-3.png",
          "./static/imgs/user-4.png",
          "./static/imgs/user-5.png",
          "./static/imgs/user-6.png"
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard{
  text-align: left;
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
.tags .el-tag{
  margin-right: 8px;
}
.d-flex{
  display: flex;
  padding: 10px;
  flex: 0.5;
}
.n-flex{
  display: flex;
}
.align-center{
  align-items: center;
}
.justify-center{
  justify-content: center;
}
.mm-h1{
  margin-left: 12px;
  line-height:20px;
  h1{
    font-size: 28px;
  }
}
.weather-icon{
  font-size: 45px;
  font-weight: 550;
  color: rgb(30,136,229);
}
sup {
  font-size:75%
}
small {
  font-size: 80%;
}
.user-avatar{
  text-align: center;
  margin-top: -60px;
}
.user-content{
  padding: 20px 30px 30px;
  text-align: center;
}
h1,h2,h3,h5,h4,h6{
  padding: 0;
  margin: 0;
  font-weight: 500;
}

h2{
  font-size: 21px;
}
h5{
  font-size: 12px;
}
.header{
  padding: 20px;
  background: rgb(30,136,229);
}
.pa-4{
  padding: 16px;
}
.li-user{
  display: flex;
  padding: 12px 16px;
  align-items: center;
  h4,h6{
    height: 24px;
  }
}
.li-user-avatar{
  margin-right: 12px;
}
.profiletimeline{
  padding-left: 40px;
  margin: 10px 10px 0 30px;
  border-left: 1px solid rgba(0,0,0,.1);
}
.sk-item{
  display: flex;
  margin-top: 8px;
  margin-bottom: 12px;
}
.sl-left{
  margin-left: -60px;
  z-index: 1;
  margin-right: 15px;
}
.rounded-circle{
  border-radius: 50%;
}
.d-md-flex{
  display: flex;
}
.align-items-center{
  align-items: center;
}
.ms-1{
  margin-inline-start: 4px;
}
.mt-3{
  margin-top: 12px;
}
p{
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.text-14{
  font-size: 14px;
}
.text-21{
  font-size: 21px;
}
.text-primary{
  color: rgb(30,136,229);
}
.text-red{
  color: rgb(224,67,54);
}
.mr-3{
  margin-right: 12px;
}
</style>
