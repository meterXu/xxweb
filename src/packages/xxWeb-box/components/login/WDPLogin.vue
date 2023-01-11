<template>
  <div class="xxWeb">
    <div class="wdp-login">
      <div class="container">
        <slot v-bind:config="config">
          <Row>
            <Col :xl="16" :md="14" :sm="12" :xs="0">
              <div class="left">
                <div class="bg-header">
                  <img :src="config.logo" class="logo" alt="logo">
                  <span class="title">{{config.login.title }}</span>
                </div>
                <img class="bg-img" src="../../assets/imgs/login3/slogan.svg" alt="" />
              </div>
            </Col>
            <Col :xl="8" :md="10" :sm="12" :xs="24">
              <div class="main">
                <div class="login-header">
<!--                  <img v-if="config.logo" :src="config.logo" class="logo" alt="logo">-->
                  <span v-if="config.login" class="title">{{config.login.title }}</span>
                </div>
                <Tabs v-model="activeName" @tab-click="handleClick">
                  <TabPane name="password">
                    <span slot="label" class="tab-pane-label">密码登录</span>
                    <Form ref="loginForm" :model="form" :rules="rules">
                      <slot name="form-item-prefix"></slot>
                      <FormItem prop="username">
                        <Input v-model="form.username"  @keyup.enter.native="login" :placeholder="placeholder.username"/>
                      </FormItem>
                      <FormItem prop="password">
                        <Input type="password" v-model="form.password" @keyup.enter.native="login" :placeholder="placeholder.password"/>
                      </FormItem>
                      <FormItem prop="verificationCode">
                        <Row :gutter="10">
                          <Col :span="16"><Input v-model="form.verificationCode" @keyup.enter.native="login" :placeholder="placeholder.verificationCode"/></Col>
                          <Col :span="8"><img class="vc-img" src="../../assets/imgs/login3/verification-code.png" /></Col>
                        </Row>
                      </FormItem>
                      <slot name="form-item-suffix"></slot>
                    </Form>
                    <slot name="form-login-btn">
                      <Button :loading="loginState.loading" :disabled="loginState.loading"  class="login-btn" type="primary" @click="login">登 录</Button>
                      <slot name="form-login-btn-other"></slot>
                    </slot>
                  </TabPane>
                  <TabPane name="message">
                    <span slot="label" class="tab-pane-label">短信登录</span>
                    <Form ref="loginForm" :model="form" :rules="rules">
                      <slot name="form-item-prefix"></slot>
                      <FormItem prop="phone">
                        <Input v-model="form.phone"  @keyup.enter.native="login" :placeholder="placeholder.phone"/>
                      </FormItem>
                      <FormItem prop="verificationCode">
                        <Row :gutter="10">
                          <Col :span="16"><Input v-model="form.verificationCode" @keyup.enter.native="login" :placeholder="placeholder.verificationCode"/></Col>
                          <Col :span="8"><img class="vc-img" src="../../assets/imgs/login3/verification-code.png" /></Col>
                        </Row>
                      </FormItem>
                      <slot name="form-item-suffix"></slot>
                    </Form>
                    <slot name="form-login-btn">
                      <Button :loading="loginState.loading" :disabled="loginState.loading"  class="login-btn" type="primary" @click="login">登 录</Button>
                      <slot name="form-login-btn-other"></slot>
                    </slot>
                  </TabPane>
                </Tabs>
                <div class="login-footer">
                  <span class="register">账号注册</span>
                  <span class="certified">企业认证</span>
                  <span class="forgot-btn">忘记密码</span>
                </div>
                <Divider direction="horizontal" content-position="center">第三方账号登录</Divider>
                <div class="third-party">
                  <img class="third-party-img" src="../../assets/imgs/login3/weixin.svg"/>
                </div>
                </div>
            </Col>
          </Row>
        </slot>
      </div>
      <div class="footer" v-if="config.footer.show">
        <template v-if="config.footer.copyright">
          <div class="copyright" v-if="config.footer.copyright">
            Copyright &copy; {{ config.footer.copyright.year }} <a :href="config.footer.copyright.href" :target="config.footer.copyright.target">{{ config.footer.copyright.content }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/login/wdp-login.less'
import {Form,FormItem,Input,Button,Checkbox,Row,Col,Tabs,TabPane,Divider} from 'element-ui'
export default {
  name: "WDPLogin",
  props:{
    config:{default(){return {}}},
    tips:{default:true},
    remember:{default:true},
    placeholder:{default(){return{username:'请输入用户名/邮箱/手机号',password:"请输入密码",phone:'请输入手机号码',verificationCode:'请输入验证码'}}},
    rules:{
      type:Object,
      default(){
        return {
          username:[
            { required: true, message: '用户名不能为空',trigger: 'blur'},
          ],
          password:[
            { required: true, message: '密码不能为空',trigger: 'blur'},
          ],
          phone:[
            { required: true, message: '手机号码不能为空',trigger: 'blur'}
          ],
          verificationCode: [
            { required: true, message: '验证码不能为空',trigger: 'blur'}
          ]
        }
      }
    },
    form:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      loginState:{
        loading:false
      },
      activeName: 'password'
    }
  },
  model:{
    prop:'form',
    event:'change'
  },
  components:{
    Form,
    FormItem,
    Input,
    Button,
    Checkbox,
    Row,
    Col,
    Tabs,
    TabPane,
    Divider
  },
  methods:{
    login(){
      this.$refs.loginForm.validate(valid=>{
        this.$emit('login',valid,this.loginState)
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

</style>
