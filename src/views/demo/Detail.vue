<template>
  <div class="detail">

    <el-card class="detail-header">
      <el-row class="detail-header-content" :gutter="16">
        <el-col :span="4">
          <img class="detail-header-avatar" src="../../assets/imgs/detail/header.svg">
        </el-col>
        <el-col :span="10">
          <el-row class="detail-header-name">
            <el-col :span="12">
              <span class="header-name">amanda_nash</span>
              <i class="el-icon-success header-name-icon"></i>
              <p>Amanda Nash</p>
            </el-col>
            <el-col class="header-tag" :span="12">
              <el-tag class="name-tag" key="Lifestyle" type="success" effect="plain">Lifestyle</el-tag>
              <el-tag class="name-tag" key="Music" type="warning" effect="plain">Music</el-tag>
            </el-col>
          </el-row>
          <el-row class="header-info">
            <el-col :span="6">
              <span class="info-black">1,022</span>
              <span>Posts</span>
            </el-col>
            <el-col :span="6">
              <span class="info-black">100k</span>
              <span>Followers</span>
            </el-col>
            <el-col :span="6">
              <span class="info-black">1540</span>
              <span>Following</span>
            </el-col>
          </el-row>
          <el-row>
            <p> Actor, musician, songwriter #amanda_nash, mailbox: hello@amandanash.com </p>
          </el-row>
        </el-col>
        <el-col class="header-button" :span="10">
          <el-button icon="el-icon-message" circle></el-button>
          <el-button icon="el-icon-more" circle></el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-row class="row-margin"  :gutter="16">
      <el-col :span="6">
        <el-card class="basic-info">
          <div slot="header">
            <span>Basic Info</span>
          </div>
          <div class="basic-info-item" v-for="item in basicArr" :key="item.themeName">
            <div>
              <div>{{item.themeName}}</div>
              <div class="basic-info-detail">{{item.themeDetail}}</div>
            </div>
            <i :class="item.icon"></i>
          </div>
        </el-card>
        <el-card class="basic-info">
          <div slot="header">
            <span>Friends</span>
          </div>
          <div class="friends-item" v-for="item in friendsArr" :key="item.themeName">
            <div class="friends-icon">
              <el-avatar :src="item.imgUrl"></el-avatar>
            </div>
            <div class="friends-name">
              <div>{{item.friendsName}}</div>
              <div class="friends-detail">{{item.friendsDetail}}</div>
            </div>
            <i :class="item.icon"></i>
          </div>
          <el-button class="friends-button" type="primary">View All Friends</el-button>
        </el-card>
      </el-col>
      <el-col :span="18">
        <div class="block">
          <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index">
              <template slot="dot">
                <el-avatar class="block-avatar" :src="activity.avatarImg"></el-avatar>
              </template>
              <el-card class="block-card">
                <div class="block-card-header">
                  <el-avatar class="block-card-avatar" :src="activity.avatarImg"></el-avatar>
                  <div class="block-header-name">
                    <div>{{activity.name}}</div>
                    <div class="block-header-time">{{activity.timestamp}}</div>
                  </div>
                  <i class="el-icon-more"></i>
                </div>
                <p>{{activity.detail}}</p>
                <img class="block-detail-img" :src="activity.detailImg">
                <div class="block-foot">
                  <div class="block-foot-left">
                    <img src="../../assets/imgs/detail/man.svg">
                    <img src="../../assets/imgs/detail/woman.svg">
                    <img src="../../assets/imgs/detail/bald.svg">
                  </div>
                  <div class="block-foot-right">
                    <span>
                      <i class="el-icon-star-off"></i>32
                    </span>
                    <span>
                      <i class="el-icon-chat-round"></i>12
                    </span>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import avatar1 from '../../assets/imgs/detail/1.jpg'
import avatar2 from '../../assets/imgs/detail/2.jpg'
import avatar3 from '../../assets/imgs/detail/3.jpg'
import avatar4 from '../../assets/imgs/detail/4.jpg'
import avatar5 from '../../assets/imgs/detail/5.jpg'
import detail1 from '../../assets/imgs/detail/sq1.jpg'
import detail2 from '../../assets/imgs/detail/sq2.jpg'
export default {
  name: "Dashboard",
  data() {
    return {
      circleUrl: '',
      basicArr: [{
        themeName:'Country',
        themeDetail:'USA',
        icon:'el-icon-s-home'
      },{
        themeName:'Relationship',
        themeDetail:'Single',
        icon:'el-icon-star-on'
      },{
        themeName:'Form',
        themeDetail:'New York',
        icon:'el-icon-map-location'
      },{
        themeName:'Studied @',
        themeDetail:'University Of UI Lib',
        icon:'el-icon-s-home'
      },{
        themeName:'Lives In',
        themeDetail:'Texas',
        icon:'el-icon-bank-card'
      },{
        themeName:'Followers',
        themeDetail:'120k Followers',
        icon:'el-icon-message-solid'
      }],
      friendsArr:[{
        imgUrl:avatar1,
        friendsName:'Tim Clarkson',
        friendsDetail:'2 mutual friend',
        icon:'el-icon-star-on'
      },{
        imgUrl:avatar2,
        friendsName:'Jhon Weaver',
        friendsDetail:'2 mutual friend',
        icon:'el-icon-star-on'
      },{
        imgUrl:avatar3,
        friendsName:'Kane Frost',
        friendsDetail:'2 mutual friend',
        icon:'el-icon-star-on'
      },{
        imgUrl:avatar4,
        friendsName:'Kane Frost',
        friendsDetail:'2 mutual friend',
        icon:'el-icon-star-on'
      },{
        imgUrl:avatar5,
        friendsName:'Drow Ranger',
        friendsDetail:'2 mutual friend',
        icon:'el-icon-star-on'
      },{
        imgUrl:avatar4,
        friendsName:'Juggernaut Frost',
        friendsDetail:'2 mutual friend',
        icon:'el-icon-star-on'
      }],
      activities: [{
        avatarImg:avatar1,
        name: 'Timothy Clarkson',
        timestamp: '11 Mar 2020',
        detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        detailImg: detail1
      },{
        avatarImg:avatar3,
        name: 'Timothy Clarkson',
        timestamp: '11 Mar 2020',
        detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        detailImg: detail2
      }]
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
.detail{
  text-align: left;
  width: 1200px;
  margin: 0 auto;
  .detail-header {
    padding: 40px 28px 68px;
    .detail-header-content {
      color: rgba(0,0,0,.38);
      font-size: 14px;
    }
    .detail-header-avatar {
      width: 120px;
    }
    .detail-header-name {
      .header-name{
        font-size: 20px;
        font-weight: bold;
        margin-right: 6px;
        color: #000;
      }
      .header-name-icon {
        color: #2196F3;
      }
      p{
        margin: 10px 0 20px 0;
      }
      .header-tag {
        display: flex;
        justify-content: flex-end;
        .name-tag {
          border-radius: 16px;
          padding: 0 20px;
          margin-right: 10px;
        }
      }

    }
    .header-info .info-black{
      color: #000;
      font-weight: bold;
      margin-right: 4px;
    }
    .header-button {
      display: flex;
      justify-content: flex-end;
      button {
        font-size: 18px;
        background-color: #F1F1F1;
        &:hover {
          color: #606266;
          background-color: #E5E5E5;
          border-color: #DCDFE6;
        }
      }
    }
  }
}
.row-margin {
  margin-top: 20px;
  .basic-info {
    margin-bottom: 20px;
    .basic-info-item {
      min-height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .basic-info-detail {
        font-size: 14px;
        color: rgba(0,0,0,0.6);
      }
      i {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: #EEEEEE;
        color: #9E9E9E;
        border-radius: 15px;
      }
    }
    .friends-item {
      min-height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .friends-name {
        width: 150px;
        .friends-detail {
          font-size: 14px;
          color: rgba(0,0,0,0.6);
        }
      }
      i {
        width: 30px;
        height: 30px;
        font-size: 28px;
        text-align: center;
        line-height: 30px;
        color: #9E9E9E;
      }
    }
    .friends-button {
      width: 100%;
    }
  }
  .block {
    .block-avatar {
      position: relative;
      left: -15px;
      top: 10px;
    }
    .block-card-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .block-card-avatar {
        margin-right: 10px;
      }
      .block-header-name {
        .block-header-time {
          margin-top: 10px;
          font-size: 12px;
          color: rgba(0,0,0,.38);
        }
      }
      i {
        margin-left: 10px;
        width: 30px;
        height: 30px;
        font-size: 18px;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        cursor: pointer;
        color: #9E9E9E;
        &:hover {
          background-color: #F4F4F4;
        }
      }
    }
    .block-detail-img {
      width: 600px;
      height: 600px;
    }
    .block-foot {
      margin: 20px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .block-foot-left {
        img {
          width: 36px;
          height: 36px;
          margin-right: 8px;
        }
      }
      .block-foot-right {
        span {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
