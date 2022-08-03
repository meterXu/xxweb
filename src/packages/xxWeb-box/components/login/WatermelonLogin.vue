<template>
  <div class="watermelon-login">
    <slot v-bind:config="config">
      <div class="login-main">
        <!-- 左边部分 -->
        <div class="login-main-left">
          <div class="main-left-img"></div>
        </div>
        <!-- 右边部分 -->
        <div class="login-main-right">
          <div class="main-right-box">
            <div class="main-right-box-text">
              <h3 v-if="config.login">
                {{config.login.title}}
                <br/>
              </h3>
            </div>
            <div class="main-right-box-input">
              <slot name="form-item-prefix"></slot>
              <Form :model="form" :rules="rules" class="login_from">
                <FormItem prop="username">
                  <Input
                      v-model="form.username"
                      :placeholder="placeholder.username"
                  ></Input>
                </FormItem>
                <FormItem prop="password">
                  <Input
                      v-model="form.password"
                      :placeholder="placeholder.password"
                      show-password
                  ></Input>
                </FormItem>
                <slot name="form-item-suffix"></slot>
                <FormItem class="check-box" v-if="remember">
                  <Checkbox v-model="form.remember" label="记住密码" name="type"></Checkbox>
                </FormItem>
                <FormItem>
                  <slot name="form-login-btn">
                    <Button type="primary" @click="login">登录</Button>
                  </slot>
                </FormItem>
              </Form>
            </div>
          </div>
          <!-- 底层文字 -->
          <div class="botton-text">
            <a href="javascript:;">注册</a>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import '../../assets/css/tree-login.less'
import {Form,FormItem,Input,Button,Checkbox} from 'element-ui'
export default {
  name: "WatermelonLogin",
  props:{
    config:{default(){return {}}},
    tips:{default:true},
    remember:{default:true},
    placeholder:{default(){return{username:'请输入用户名/邮箱/手机号','password':"请输入密码"}}}
  },
  components:{
    Form,
    FormItem,
    Input,
    Button,
    Checkbox
  },
  data() {
    return {
      form:{
        username:null,
        password:null,
        remember:false
      },
      rules:{
        username:[
          { required: true, message: '用户名不能为空'},
        ],
        password:[
          { required: true, message: '密码不能为空'},
        ]
      }
    };
  },
  methods:{
    login(){
      this.$emit('login',this.form)
    }
  }
}
</script>

<style lang="less" scoped>
.watermelon-login {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #4f8785;
  .login-main {
    width: 720px;
    height: 550px;
    background-image: url(../../assets/imgs/longin2/bg1.png);
    background-size: 100% 100%;
    border-radius: 5px;
    display: flex;

    .login-main-left {
      width: 340px;
      height: 550px;
      position: relative;
      .main-left-img {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 170px;
        left: 60px;
        background: url(../../assets/imgs/longin2/bg2.png) no-repeat;
        background-size: 100%;
      }
    }
    .login-main-right {
      position: relative;
      width: 380px;
      height: 550px;
      display: flex;
      justify-content: center;
      align-items: center;
      .main-right-box {
        width: 250px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        display: flex;
        flex-direction: column;
        .main-right-box-text {
          flex: 1;
          border-radius: 5px 5px 0 0;
          background-color: #ffffff;
          box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.19);
          padding: 0 10px;
          color: #184D56;
          a {
            font-size: 10px;
            text-decoration: none;
            line-height: 52px;
          }
          a:nth-child(1) {
            color: #ffba33;
            font-size: 13px;
          }
          a:nth-child(2) {
            float: right;
            color: #dcd8d0;
            text-align: right;
          }
          a:nth-child(2):hover {
            color: #ffba33;
          }
        }
        .main-right-box-input {
          flex: 3.5;
          border-radius: 0 0 5px 5px;
          padding: 20px 15px 0 15px;
        }
      }
      .botton-text {
        font-size: 12px;
        position: absolute;
        background-color: #ffba33;
        bottom: 20px;
        a {
          display: block;
          text-align: center;
          text-decoration: none;
          color: #ffffff;
        }
        a:hover {
          color: #1A535C;
        }
      }
    }
  }
}
/deep/.el-form-item {
  margin-bottom: 10px;
}
/deep/.el-input__inner {
  width: 100%;
  height: 35px;
  font-size: 10px;
}
.el-button {
  width: 220px;
  height: 40px;
  background-color: #1a535c;
  border-color: #1a535c;
}
/deep/.el-form-item__error {
  padding-top: 0px;
}
</style>
