<template>
  <div class="xxWeb">
    <div class="tree-login">
      <div class="login-main">
        <div class="login-box">
          <slot v-bind:config="config">
            <div class="login-box-content">
              <!-- 右面登录区域上面部分 -->
              <div class="login-content-input">
                <h2 v-if="config.login">
                  {{config.login.title}}
                  <br/>
                </h2>
                <Form :model="form" :rules="rules" label-width="35px">
                  <slot name="form-item-prefix"></slot>
                  <FormItem prop="username">
                    <Input
                        v-model="form.username"
                        prefix-icon="el-icon-user-solid"
                        :placeholder="placeholder.username"
                    ></Input>
                  </FormItem>
                  <FormItem prop="password">
                    <Input
                        v-model="form.password"
                        prefix-icon="el-icon-key"
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
                      <Button type="primary" size="small" class="el-login-but" @click="login">
                        登录
                      </Button>
                    </slot>
                  </FormItem>
                </Form>
              </div>
              <!-- 右面登录区域中间部分 -->
              <div class="login-content-text">
                <div class="text-left">
                  <a href="javascript:;">注册</a>
                </div>
                <div class="text-middle"><span>or</span></div>
                <div class="text-right">
                  <a href="javascript:;">忘记密码</a>
                </div>
              </div>
            </div>
          </slot>
        </div>
        <div class="img-box">
          <img src="../../assets/imgs/longin1/bg1.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/login/tree-login.less'
import {Form,FormItem,Input,Button,Checkbox} from 'element-ui'
export default {
  name: "TreeLogin",
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

<style scoped>

</style>
