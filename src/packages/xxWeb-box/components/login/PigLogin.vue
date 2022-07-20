<template>
  <div class="pig-login">
    <div class="login-div">
      <div class="box">
        <h3 v-if="config.login">
          {{config.login.title}}
          <br/>
        </h3>
        <Form ref="loginForm" :model="form" :rules="rules" class="login-form" status-icon label-width="0">
          <br>
          <slot name="form-label-username">
            <p>账户</p>
          </slot>
          <FormItem prop="username">
            <Input prefix-icon="el-icon-user" v-model="form.username" :placeholder="placeholder.username"/>
          </FormItem>
          <slot name="form-label-password">
            <p>密码</p>
          </slot>
          <FormItem prop="password">
            <Input prefix-icon="el-icon-lock" v-model="form.password" :placeholder="placeholder.username"/>
          </FormItem>
          <FormItem v-if="remember">
            <Checkbox v-model="form.remember">记住密码</Checkbox>
          </FormItem>
          <FormItem>
            <slot name="form-login-btn">
              <Button size="small" class="login-submit login-btn" @click="login">
                登录
              </Button>
            </slot>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/pig-login.less'
import {Form,FormItem,Input,Button,Checkbox} from 'element-ui'
export default {
  name: "PigLogin",
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
  data(){
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
    }
  },
  methods:{
    login(){
      this.$emit('login',this.form)
    }
  }
}
</script>

<style scoped>

</style>
