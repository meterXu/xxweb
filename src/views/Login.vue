<template>
  <div style="height: 100%">
    <jeecg-login v-if="type==1" :config="config" @login="login">
    </jeecg-login>
    <PigLogin v-if="type==2" :config="config" @login="login">
    </PigLogin>
    <TreeLogin v-if="type==3" :config="config" @login="login">
    </TreeLogin>
    <WatermelonLogin v-if="type==4" :config="config" @login="login">
    </WatermelonLogin>
  </div>
</template>

<script>
import {types} from "../packages/xxWeb-utils/index";

export default {
  name: "Login",
  props:['type'],
  data(){
    return {
      config:this.$project.config
    }
  },
  methods:{
    login(form){
      localStorage.setItem(types.ACCESS_TOKEN,'xxxxxxxxxxxxxxxxxxxxxxxx')
      this.$router.replace({path:project.redirect.index})
    }
  }
}
</script>

<style scoped>

</style>
