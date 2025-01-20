<template>
  <div style="height: 100%">
    <PigLogin v-if="type==='2'" :config="config" :rules="rules" v-model="form" @login="login">
    </PigLogin>
    <TreeLogin v-if="type==='3'" :config="config" :rules="rules" v-model="form" @login="login">
    </TreeLogin>
    <WatermelonLogin v-if="type==='4'" :config="config" :rules="rules" v-model="form" @login="login">
    </WatermelonLogin>
    <PhylumLogin v-if="type==='5'" :config="config" :rules="rules" v-model="form" @login="login">
    </PhylumLogin>
  </div>
</template>

<script>
import {PigLogin,TreeLogin,WatermelonLogin,PhylumLogin,types} from '../packages/xxWeb-box/index'
export default {
  name: "Login",
  props:['type'],
  components:{
    PigLogin,
    TreeLogin,
    WatermelonLogin,
    PhylumLogin
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
