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
import {ACCESS_TOKEN} from "../packages/xxWeb-utils/src/mutation-types";

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
      localStorage.setItem(ACCESS_TOKEN,'xxxxxxxxxxxxxxxxxxxxxxxx')
      this.$router.replace({path:project.redirect.index})
    }
  }
}
</script>

<style scoped>

</style>
