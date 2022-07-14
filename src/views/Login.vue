<template>
  <jeecg-login :config="config" @login="login">
  </jeecg-login>
  <PigLogin :config="config" @login="login"></PigLogin>
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
