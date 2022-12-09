<template>
  <ul class="box-list">
    <li v-for="(item,index) in xxWebBoxList" :key="item.index">
      <Card class="box-card">
        <div class="image" :style="{'backgroundImage':'url('+item.cover+')'} "/>
        <div class="box-item-text">
         <div>
           <div class="box-item-title">{{item.title}}</div>
           <div class="box-item-desc" v-html="item.desc"></div>
         </div>
          <div>
            <Button type="primary" plain size="mini">
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
  name: "XXWebBox",
  components:{Card,Button},
  data(){
    return {
      xxWebBoxList:[
        {title:"default",cover:require('../../assets/imgs/xxWebBox/vue-admin.png'),desc:'design by <a href="">jeecg</a>'},
        {title:"vue-admin",cover:require('../../assets/imgs/xxWebBox/vue-admin.png'),desc:'design by <a href="">vue-admin</a>'},
        {title:"v2board",cover:require('../../assets/imgs/xxWebBox/v2board.png'),desc:'design by <a href="">v2board</a>'},
        {title:"thunder",cover:require('../../assets/imgs/xxWebBox/thunder.png'),desc:'design by <a href="">thunder</a>'},
        {title:"Lux",cover:require('../../assets/imgs/xxWebBox/Lux.png'),desc:'design by <a href="">Lux</a>'},
        {title:"Lux_dark",cover:require('../../assets/imgs/xxWebBox/Lux_dark.png'),desc:'design by <a href="">Lux_dark</a>'},
        {title:"Nitro",cover:require('../../assets/imgs/xxWebBox/Nitro.png'),desc:'design by <a href="">Nitro</a>'},
        {title:"Octavia",cover:require('../../assets/imgs/xxWebBox/Octavia.png'),desc:'design by <a href="">Octavia</a>'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  border-radius: 6px;
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
<style lang="less">
.box-card{
  .el-card__body{
    padding: 0;
    border-radius: 6px;
  }
  a{
    text-decoration: none;
    color: #0096c7;
    font-weight: 600;
  }
}
</style>
