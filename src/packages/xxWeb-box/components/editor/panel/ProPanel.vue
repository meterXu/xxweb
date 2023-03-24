<!--
 * @Author: zhangyuc
 * @Date: 2023-03-06 18:09:50
 * @LastEditors: zhangyuc
 * @LastEditTime: 2023-03-10 15:07:40
 * @Description: 
-->
<template>
  <Tabs class="mt-pro-panel" size="small" @tab-click="handleTabClick" v-model='value'>
    <TabPane v-for="(tab, ti) in config" :key="ti" :name="ti + ''">
      <span slot="label">
        <i :class="tab.icon"></i>
        {{ tab.type }}
      </span>
      <div v-for="(panel, pi) in tab.head" :key="pi" class="mt-pro-div">
        <Form>
          <FormItem v-for="(fItem, fi) in panel.sub" :key="fi.toString()" :label="fItem.name">
            <MtFormItem v-on="$listeners" :fItem="fItem" :controlledObj="controlledObj"></MtFormItem>
          </FormItem>
        </Form>
      </div>
      <Collapse class="mt-pro-collapse" v-if="tab.con instanceof Array" v-model="activeNames">
        <CollapseItem v-for="(panel, pi) in tab.con" :title="panel.name" :name="pi" :key="pi" :disabled="panel.fold||false">
          <template slot="title">
            <span class="panel-title">
              {{ panel.name }}
            </span>
            <div v-for="(tItem, ti) in panel.tools" class="mt-pro-collapse-tools" :key="ti">
              <MtFormItem v-on="$listeners" :fItem="tItem" :controlledObj="controlledObj" :key="ti"></MtFormItem>
            </div>
          </template>
          <Form>
            <div :class='fItem.name ? "label-min" : ""' v-for="(fItem, fi) in panel.sub" :key="fi">
              <!-- 存在下拉选项依赖关系的表单逻辑 -->
              <FormItem v-if='!fItem.dependKey || fItem.dependValues.includes(get(controlledObj, fItem.dependKey))'>
                <!-- label可能是文本也可能是个icon -->
                <span slot='label'>
                  <span v-if='fItem.nameType === "icon"'>
                    <MtIcon :icon='fItem.name' :size='fItem.iconSize || 20'></MtIcon>
                  </span>
                  <span v-else>
                    {{ fItem.name }}
                  </span>
                </span>
                <MtFormItem v-on="$listeners" :fItem="fItem" :controlledObj="controlledObj"></MtFormItem>
              </FormItem>
            </div>
          </Form>
        </CollapseItem>
      </Collapse>
      <template v-else>
        <Form class="single-con">
          <FormItem v-for="(fItem, fi) in tab.con.sub" :key="fi" :label="fItem.name"
            :class="fItem.name ? '' : 'none-label'">
            <MtFormItem v-on="$listeners" :fItem="fItem" :controlledObj="controlledObj"></MtFormItem>
          </FormItem>
        </Form>
      </template>
    </TabPane>
  </Tabs>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import { Tabs, TabPane, Form, FormItem, Collapse, CollapseItem, Input } from 'element-ui'
import MtFormItem from './MtFormItem'
import '../assets/css/mtProPanel.less'
import MtIcon from '../view/MtIcon.vue'
import { get } from "lodash";
export default {
  name: "ProPanel",
  props: {
    controlledObj: {
      type: Object,
      default: null
    },
    config: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Input,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Collapse,
    CollapseItem,
    MtFormItem,
    MtIcon
  },
  watch: {
    config: {
      handler(val) {
        this.value = '0'
        this.activeNames = val?val[0].con.map((v, index) => index):null
      }
    },
    deep: true
  },
  data() {
    return {
      value: '0',
      activeNames: [0]
    }
  },
  methods: {
    get,
    handleTabClick(tab, event) {
      // this.$refs.dataComponents.$refs.cmExpressionsRef.refresh()
    }
  }
}
</script>