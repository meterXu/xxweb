<template>
  <div class="login-container">
    <div class="login-div">
      <div class="box">
        <h3>
          Mapmost云渲染平台
          <br/>
        </h3>
        <Form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" status-icon label-width="0">
          <br>
          <p>账户</p>
          <FormItem prop="username">
            <el-input size="small" auto-complete="off" v-model="loginForm.username" placeholder="请输入用户姓名" class="username-passwd-div" @keyup.enter.native="login">
            </el-input>
          </FormItem>
          <p>密码</p>
          <FormItem prop="password">
            <el-input type="password" size="small" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" class="username-passwd-div" @keyup.enter.native="login">
            </el-input>
          </FormItem>
          <el-form-item>
            <el-button size="small" class="login-submit login-btn" @click="login"><span style="font-weight:bold;">登录</span>
            </el-button>
          </el-form-item>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {Form,FormItem,Input,Button,Checkbox} from 'element-ui'
export default {
  name: "PigLogin",
  props:['config','remember'],
  components:{
    Form,
    FormItem,
    Input,
    Button,
    Checkbox
  }
}
</script>

<style scoped>

</style>
