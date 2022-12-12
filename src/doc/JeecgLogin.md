```vue
<div style="height: 100%">
    <JeecgLogin :config="config" v-model="form" @login="login">
    </JeecgLogin>
</div>
<script>
import {JeecgLogin} from '@dpark/s2-xxWeb-box'
export default {
  name:'Login',
  components:{
    JeecgLogin
  },
  data(){
    return {
      config:{
        logo: "./static/imgs/logo-white.png",
        title: "xxWebBox",
        login: {
          title: "xxWebBox",
          desc: "请输入你的账号",
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
  methods:{
    login(){
      
    }
  }
}
</script>
```