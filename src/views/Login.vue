<template>
  <JeecgLogin :config="project.config"/>
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
      project:project
    }
  }
}
</script>

<style scoped>

</style>
