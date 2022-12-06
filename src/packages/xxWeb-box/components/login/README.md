# 登录组件

```vue
<template>
  <JeecgLogin :config="config" v-model="form" @login="login"></JeecgLogin>
</template>
<script>
import {JeecgLogin} from '@dpark/s2-xxweb-box'
export default {
  data(){
    return {
      config:this.$project.config, // 来自于project.js中的config
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