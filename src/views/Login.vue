<template>
  <div style="height: 100%">
    <el-button @click="login">login</el-button>
  </div>
</template>

<script>
import * as types from 'xxweb-util/lib/types'
import Vue from "vue";
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
    async login(valid){
      if(valid){
        Vue.prototype.$ls.set(types.PERMISSION,JSON.stringify((await import('@/permission/1')).default))
        this.$ls.set(types.ACCESS_TOKEN,'xxxxxxxxxxxxxxxxxxxxxxxx')
        this.$router.replace({path:project.redirect.index})
      }
    }
  }
}
</script>

<style scoped>

</style>
