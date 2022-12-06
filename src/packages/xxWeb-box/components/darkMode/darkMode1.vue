<template>
  <Switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" @change="change"></Switch>
</template>

<script>
import {Switch} from 'element-ui'
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from 'darkreader';

export default {
  name: "darkMode1",
  components:{
    Switch
  },
  data(){
    return {
      value:false
    }
  },
  methods:{
    change(nv){
      if(nv){
        enableDarkMode({
          brightness: 100,
          contrast: 90,
          sepia: 10,
        });
      }else{
        disableDarkMode()
      }
    }
  }
}
</script>

<style scoped>

</style>