<template>
  <div class="xxWeb">
    <div class="phylum-login">
      <div class="container">
        <slot v-bind:config="config">
          <div class="pic">
            <div class="title">
              <img class="img" :src="config.logo"/>
              <div class="text" v-if="config.login">
                {{config.login.title}}
              </div>
            </div>
            <div class="pic-icon"></div>
          </div>
          <div class="form">
            <div class="title">
              <h3>登 录</h3>
              <div class="desc">{{config.login.desc}}</div>
            </div>
            <Form ref="loginForm" :model="form" :rules="rules" class="login-form" status-icon label-width="0">
              <slot name="form-item-prefix"></slot>
              <FormItem prop="username">
                <Input prefix-icon="el-icon-user" v-model="form.username" :placeholder="placeholder.username"/>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" prefix-icon="el-icon-lock" v-model="form.password" :placeholder="placeholder.password"/>
              </FormItem>
              <slot name="form-item-suffix"></slot>
              <FormItem v-if="remember">
                <Checkbox v-model="form.remember">记住密码</Checkbox>
              </FormItem>
              <FormItem>
                <slot name="form-login-btn">
                  <Button type="primary" size="normal" class="login-submit login-btn" @click="login">
                    登录
                  </Button>
                  <slot name="form-login-btn-other"></slot>
                </slot>
              </FormItem>
            </Form>
          </div>
        </slot>
      </div>
      <div class="footer" v-if="config.footer.show">
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
    </div>
  </div>
</template>

<script>
import '../../assets/css/login/phylum-login.less'
import {Form,FormItem,Input,Button,Checkbox} from 'element-ui'
export default {
  name: "PhylumLogin",
  props:{
    config:{default(){return {}}},
    tips:{default:true},
    remember:{default:true},
    placeholder:{default(){return{username:'请输入用户名/邮箱/手机号','password':"请输入密码"}}},
    rules:{
      type:Object,
      default(){
        return {
          username:[
            { required: true, message: '用户名不能为空',trigger: 'blur'},
          ],
          password:[
            { required: true, message: '密码不能为空',trigger: 'blur'},
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
  model:{
    prop:'form',
    event:'change'
  },
  components:{
    Form,
    FormItem,
    Input,
    Button,
    Checkbox
  },
  methods:{
    login(){
      this.$refs.loginForm.validate(valid=>{
        this.$emit('login',valid)
      })
    }
  }
}
</script>

<style scoped>

</style>