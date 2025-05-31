<template>
  <div style="height: 100%">
    <el-button @click="login">login</el-button>
  </div>
</template>

<script>
import {setLsValue} from "../packages/xxWeb-util/lib/util";
import * as types from '../packages/xxWeb-util/lib/types.js'
export default {
  name: "Login",
  props:['type'],
  components:{
  },
  data(){
    return {
      config:this.$project.config,
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
    login(valid){
      if(valid){
        this.$ls.set(types.ACCESS_TOKEN,setLsValue('xxxxxxxxxxxxxxxxxxxxxxxx'))
        this.$ls.set(types.USER_INFO,setLsValue({
          username:this.form.username,
          nickname:this.form.nickname
        }))
        this.$router.push({path:project.redirect.index})
      }
    }
  }
}
</script>

<style scoped>

</style>
