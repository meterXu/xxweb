<template>
  <JeecgLogin :config="config" @login="login"></JeecgLogin>
</template>

<script>
import project from "../project";
import {JeecgLogin} from '../packages/xxWeb-box'
export default {
  name: "Login",
  components:{
    JeecgLogin
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
