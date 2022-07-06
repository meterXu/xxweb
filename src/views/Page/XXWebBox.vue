<template>
  <ul class="box-list">
    <li v-for="(item,index) in xxWebBoxList" :key="item.index">
      <Card class="box-card" style="padding: 0">
        <div class="image" :style="{'backgroundImage':'url('+item.cover+')'} "/>
        <div style="padding: 14px;">
          <span>{{item.title}}</span>
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
        {title:"default",cover:require('../../assets/imgs/xxWebBox/thunder.png')},
        {title:"vue-admin",cover:require('../../assets/imgs/xxWebBox/thunder.png')},
        {title:"v2board",cover:require('../../assets/imgs/xxWebBox/thunder.png')},
        {title:"thunder",cover:require('../../assets/imgs/xxWebBox/thunder.png')},
        {title:"Lux",cover:require('../../assets/imgs/xxWebBox/Lux.png')},
        {title:"Lux_dark",cover:require('../../assets/imgs/xxWebBox/Lux_dark.png')},
        {title:"Nitro",cover:require('../../assets/imgs/xxWebBox/Nitro.png')},
        {title:"Octavia",cover:require('../../assets/imgs/xxWebBox/Octavia.png')}
      ]
    }
  }
}
</script>

<style scoped>
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
  grid-template-columns: repeat(auto-fill, 392px);
  grid-gap: 20px 30px;
  justify-content: center;
}
.image{
  object-fit: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 248px;
}

</style>
