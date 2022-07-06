<template>
  <ul class="box-list">
    <li>
      <Card class="box-card">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <time class="time"></time>
            <Button type="text" class="button">操作按钮</Button>
          </div>
        </div>
      </Card>
    </li>
    <li>
      <Card class="box-card">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <time class="time"></time>
            <Button type="text" class="button">操作按钮</Button>
          </div>
        </div>
      </Card>
    </li>
    <li>
      <Card class="box-card">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <time class="time"></time>
            <Button type="text" class="button">操作按钮</Button>
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

    }
  }
}
</script>

<style scoped>
.box-list{
  list-style-type: none;
  margin: 0 auto;
  width: 80%;
  padding: 0;
  vertical-align: middle;
  text-align: center;
  top: 20%;
  padding-bottom: 90px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 215px);
  grid-gap: 20px 30px;
  justify-content: center;
}
</style>
