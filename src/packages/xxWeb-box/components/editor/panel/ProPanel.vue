<template>
  <Tabs class="pro-panel" type="border-card">
    <TabPane v-for="(tab,index) in config" :key="index">
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
  props:{
    controlledObj:{
      type:Object,
      default:null
    },
    config:{
      type:Array,
      default: []
    }
  },
  components:{
    Tabs,
    TabPane
  }
}
</script>

<style scoped>

</style>