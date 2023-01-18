<template>
  <Tabs class="pro-panel" type="border-card" size="small">
    <TabPane v-for="(tab,ti) in config" :key="ti">
      <span slot="label">
        <i :class="tab.icon"></i>
        {{tab.type}}
      </span>
      <Collapse>
        <CollapseItem v-for="(panel,pi) in tab.con" :title="panel.name" :name="pi">
          <Form label-width="60px">
            <FormItem v-for="(fItem,fi) in panel.sub" :key="fi" :label="fItem.name">
              <MtFormItem :fItem="fItem" :panel="panel" :controlledObj="controlledObj"></MtFormItem>
            </FormItem>
          </Form>
        </CollapseItem>
      </Collapse>
    </TabPane>
  </Tabs>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Tabs,TabPane,Form,FormItem,Collapse,CollapseItem} from 'element-ui'
import MtFormItem from './MtFormItem'
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
    TabPane,
    Form,
    FormItem,
    Collapse,
    CollapseItem,
    MtFormItem
  }
}
</script>

<style scoped>

</style>