<template>
  <Tabs class="pro-panel">
    <TabPane v-for="(tab,index) in activeOptions.config" type="card" :key="index">
      <span slot="label">
        <i :class="tab.icon"></i>
        {{tab.type}}
      </span>
    </TabPane>
  </Tabs>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Tabs,TabPane,Form,FormItem} from 'element-ui'
export default {
  name: "ProPanel",
  props:['options'],
  components:{
    Tabs,
    TabPane
  },
  data(){
    return {
      activeOptions:{
        config:[]
      }
    }
  }
}
</script>

<style scoped>

</style>