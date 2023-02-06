<template>
  <Tabs class="pro-panel" type="border-card" size="small">
    <TabPane v-for="(tab,ti) in config" :key="ti">
      <span slot="label">
        <i :class="tab.icon"></i>
        {{tab.type}}
      </span>
      <Collapse v-if="tab.con instanceof Array">
        <CollapseItem v-for="(panel,pi) in tab.con" :title="panel.name" :name="pi" :key="pi">
          <Form label-width="60px">
            <FormItem v-for="(fItem,fi) in panel.sub" :key="fi" :label="fItem.name">
              <MtFormItem :fItem="fItem" :controlledObj="controlledObj"></MtFormItem>
            </FormItem>
          </Form>
        </CollapseItem>
      </Collapse>
      <template v-else>
        <Form label-width="60px">
          <FormItem v-for="(fItem,fi) in tab.con.sub" :key="fi" :label="fItem.name">
            <MtFormItem :fItem="fItem" :controlledObj="controlledObj"></MtFormItem>
          </FormItem>
        </Form>
      </template>
    </TabPane>
  </Tabs>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Tabs,TabPane,Form,FormItem,Collapse,CollapseItem,Input} from 'element-ui'
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
      default(){
        return []
      }
    }
  },
  components:{
    Input,
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

<style lang="less" scoped>
.pro-panel{
  height: 100%;
  /deep/ .el-form-item__label{
    font-size: 12px;
    line-height: 30px;
  }
  /deep/ .el-form-item__content{
    line-height: 30px;
  }
  /deep/ .el-form-item{
    margin-bottom: 8px;
  }
  /deep/ .el-tabs__content {
    height: 90%;
    overflow: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  /deep/ .el-tabs__content::-webkit-scrollbar {
    display: none;
  }
  /deep/ .el-tabs__content{
    padding: 6px;
  }
  /deep/ .el-tab-pane{
    border: 1px solid #d7dde4;
  }
  /deep/ .el-collapse-item__header{
    background: #f7f7f7;
    text-indent: 12px;
  }
}
</style>
