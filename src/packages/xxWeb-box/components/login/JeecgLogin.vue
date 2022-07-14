<template>
  <div class="jeecg-user-login">
    <div class="container">
      <slot>
        <div class="top">
          <div class="header">
            <img v-if="config.logo" :src="config.logo" class="logo" alt="logo">
            <span class="title">{{config.login.title }}</span>
          </div>
          <div class="desc">
            {{ config.login.desc }}
          </div>
        </div>
        <div class="main">
          <div class="login-title">系统登录</div>
          <Form :model="form" :rules="rules">
            <FormItem prop="username">
              <Input prefix-icon="el-icon-user" v-model="form.username" placeholder="请输入用户名/邮箱/手机号"/>
            </FormItem>
            <FormItem prop="password">
              <Input prefix-icon="el-icon-lock" type="password" v-model="form.password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem></FormItem>
          </Form>
          <Button class="login-btn" type="primary">登 录</Button>
        </div>
        <template v-if="config.footer">
          <div class="footer">
            <template v-if="config.footer.links">
              <div class="links">
                <template v-for="link in config.footer.links">
                  <a :key="link.name" :href="link.href" :target="link.target">{{ link.name }}</a>
                </template>
              </div>
            </template>
            <template v-if="config.footer.copyright">
              <div class="copyright" v-if="config.footer.copyright">
                Copyright &copy; {{ config.footer.copyright.year }} <a :href="config.footer.copyright.href" :target="config.footer.copyright.target">{{ config.footer.copyright.content }}</a>
              </div>
            </template>
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
import '../../assets/css/jeecg-login.less'
import {Form,FormItem,Input,Button} from 'element-ui'
export default {
  name: "JeecgLogin",
  props:['config'],
  components:{
    Form,
    FormItem,
    Input,
    Button
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
  }
}
</script>

<style scoped>

</style>
