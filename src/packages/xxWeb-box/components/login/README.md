# 登录组件

```vue
<template>
  <JeecgLogin :config="config" v-model="form" @login="login"></JeecgLogin>
</template>
<script>
import {JeecgLogin} from 'xxweb-box'
export default {
  data(){
    return {
      config:{
        logo: "./static/imgs/logo-white.png",
        title: "xxWebBox",
        login: {
          title: "xxWebBox",
          desc: "请输入你的账号",
        },
        footer: {
          show: true,
          links: [],
          copyright: {
            content: "xxWebBox",
            year: "2022",
            href: "http://www.baidu.con",
            target: "_blank"
          }
        }
      },
      rules:{
        username:[
          { required: true, message: '用户名不能为空',trigger: 'blur'},
        ],
        password:[
          { required: true, message: '密码不能为空',trigger: 'blur'},
        ]
      },
      form:{
        username:null,
        password:null,
        remember:false
      }
    }
  },
  components:{
    JeecgLogin
  },
  methods:{
    login(valid){
      if(valid){
        console.log(this.form)
      }
    }
  }
  
}
</script>
```

## 组件列表
* JeecgLogin
* PhylumLogin
* PigLogin
* TreeLogin
* WatermelonLogin

## 属性

|prop| remark           |
|---|------------------|
|config| 配置               |
|remember| 初始是显示记住密码，默认true |
|placeholder| input描述，{username:'请输入用户名/邮箱/手机号',password:"请输入密码"}         |
|rules| 验证规则             |
|form| 表单               |

## 事件
|methodName| methodParams                | remark |
|---|-----------------------------|------|
|login| valid:Boolean,loginState:{loading:false} | 登录   |



## 插槽

| slotName | slotProps | remark   |
|----------|-----------|----------|
| default  | ---       | 整个登录内容区域 |
| form-item-prefix  | ---       | 表单前置内容   |
| form-item-suffix  |---| 表单后置内容   |
|form-login-btn|---| 表单按钮内容   |
|form-login-btn-other|---| 额外表单按钮   |
