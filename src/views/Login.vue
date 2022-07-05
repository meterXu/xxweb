<template>
  <JeecgLogin :config="config"/>
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
  }
}
</script>

<style scoped>

</style>
