<template>
  <div style="height: 100%">
    <jeecg-login v-if="type==1" :config="config" :rules="rules" v-model="form" @login="login">
    </jeecg-login>
    <PigLogin v-if="type==2" :config="config" :rules="rules" v-model="form" @login="login">
    </PigLogin>
    <TreeLogin v-if="type==3" :config="config" :rules="rules" v-model="form" @login="login">
    </TreeLogin>
    <WatermelonLogin v-if="type==4" :config="config" :rules="rules" v-model="form" @login="login">
    </WatermelonLogin>
  </div>
</template>

<script>
import {types} from "../packages/xxWeb-utils/index";
import {FormItem} from 'element-ui'
export default {
  name: "Login",
  props:['type'],
  components:{
    FormItem
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
        console.log(this.form)
        this.$ls.set(types.ACCESS_TOKEN,'xxxxxxxxxxxxxxxxxxxxxxxx')
        this.$router.replace({path:project.redirect.index})
      }
    }
  }
}
</script>

<style scoped>

</style>
