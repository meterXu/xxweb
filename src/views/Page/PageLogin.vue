<template>
  <ul class="box-list">
    <li v-for="item in loginList" :key="item.index">
      <Card class="box-card">
        <div class="image" :style="{'backgroundImage':'url('+item.cover+')'} "/>
        <div class="box-item-text">
          <div>
            <div class="box-item-title">{{item.title}}</div>
            <div class="box-item-desc" v-html="item.desc"></div>
          </div>
          <div>
            <Button type="primary" plain size="mini" @click="gotoCode(item)">
              <i class="el-icon-set-up" style="font-size: 18px"></i>
            </Button>
          </div>
        </div>
      </Card>
    </li>
  </ul>
</template>

<script>
import {Card,Button} from 'element-ui'
export default {
  name: "PageLogin",
  components:{Card,Button},
  data(){
    return {
      loginList:[
        {title:"JeecgLogin",cover:require('../../assets/imgs/login/JeecgLogin.jpg'),desc:'design by <a href="">JeecgLogin</a>',path:'/page/comDetail/login/JeecgLogin'},
        {title:"PigLogin",cover:require('../../assets/imgs/login/PigLogin.jpg'),desc:'design by <a href="">PigLogin</a>',path:'/page/comDetail/login/PigLogin'},
        {title:"TreeLogin",cover:require('../../assets/imgs/login/TreeLogin.png'),desc:'design by <a href="">TreeLogin</a>',path:'/page/comDetail/login/TreeLogin'},
        {title:"WatermelonLogin",cover:require('../../assets/imgs/login/WatermelonLogin.png'),desc:'design by <a href="">WatermelonLogin</a>',path:'/page/comDetail/login/WatermelonLogin'},
        {title:"PhylumLogin",cover:require('../../assets/imgs/login/PhylumLogin.png'),desc:'design by <a href="">PhylumLogin</a>',path:'/page/comDetail/login/PhylumLogin'},
      ]
    }
  },
  methods:{
    gotoCode(item){
      this.$router.push({
        path:item.path
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  border-radius: 6px;
  width: 450px;
}
.box-list{
  list-style-type: none;
  margin: 0 auto;
  width: 100%;
  padding: 0;
  vertical-align: middle;
  text-align: center;
  top: 20%;
  padding-bottom: 90px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 446px);
  grid-gap: 48px 48px;
  justify-content: center;
}
.image{
  object-fit: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 450px;
  height: 240px;
}
.box-item-text{
  padding: 16px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .box-item-title{
    height: 30px;
    line-height: 30px;
    font-size:17px;
    font-weight:800;
  }
  .box-item-desc{
    height: 30px;
    line-height: 30px;
    font-size:13px;
    font-weight:400;
    color:#00000099;
  }
}
</style>
