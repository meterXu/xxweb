<template>
  <Tabs class="pro-panel" type="border-card" size="small">
    <TabPane v-for="(tab,ti) in config" :key="ti">
      <span slot="label">
        <i :class="tab.icon"></i>
        {{tab.type}}
      </span>
      <Collapse v-if="tab.con instanceof Array" :value="tab.con.map((c,i)=>{return i})">
        <CollapseItem v-for="(panel,pi) in tab.con" :title="panel.name" :name="pi" :key="pi">
          <template slot="title">
            <span class="panel-title">
              {{panel.name}}
            </span>
            <template v-for="(tItem,ti) in panel.tools">
              <MtFormItem v-on="$listeners" :fItem="tItem" :controlledObj="controlledObj"></MtFormItem>
            </template>
          </template>
          <Form label-width="60px">
            <FormItem v-for="(fItem,fi) in panel.sub" :key="fi" :label="fItem.name">
              <MtFormItem v-on="$listeners" :fItem="fItem" :controlledObj="controlledObj"></MtFormItem>
            </FormItem>
          </Form>
        </CollapseItem>
      </Collapse>
      <template v-else>
        <Form label-width="60px">
          <FormItem v-for="(fItem,fi) in tab.con.sub" :key="fi" :label="fItem.name" :class="fItem.name?'':'none-label'">
            <MtFormItem v-on="$listeners" :fItem="fItem" :controlledObj="controlledObj"></MtFormItem>
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
  width: 100%;
  height: 100%;
  .panel-title{
    width: 70px;
    padding: 2px;
    margin-right: 6px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
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
  /deep/ .el-collapse-item__wrap{
    overflow-x: auto;
  }
  .none-label /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
