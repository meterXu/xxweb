<template>
  <div style="height: 100%">
    <jeecg-login v-if="type==1" :config="config" @login="login"></jeecg-login>
    <PigLogin v-if="type==2" :config="config" @login="login">
    </PigLogin>
  </div>
</template>

<script>
import project from "../project";
import {JeecgLogin,PigLogin} from '../packages/xxWeb-box'
export default {
  name: "Login",
  components:{
    JeecgLogin,
    PigLogin
  },
  props:['type'],
  data(){
    return {
      config:project.config
    }
  },
  methods:{
    login(form){
      console.log(form)
    }
  }
}
</script>

<style scoped>

</style>
