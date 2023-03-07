<template>
  <div class="mt-ui-list">
    <Tree
        ref="ui-tree"
        :data="dataList"
        :props="defaultProps"
        node-key="id"
        :indent="0"
        default-expand-all
        :highlight-current="true"
        :draggable="draggable"
        :current-node-key="activeId"
        :allow-drop="allowDrop"
        @node-drop="handleDrop"
    >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div class="custom-tree-node-label" @click="nodeClick(data)" @contextmenu="contextmenu(data)">
            {{ node.label }}
          </div>
          <slot name="ui-custom-icon" :data="{node,data}"></slot>
        </span>
    </Tree>
    <slot name="ui-content-menu"></slot>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Tabs, TabPane, Form, FormItem, Collapse, CollapseItem, Input, Tree} from 'element-ui'
import DynamicIcon from "../../common/DynamicIcon";
import '../assets/css/mtUiList.less'
export default {
  name: "UIList",
  props: ["uiList","activeId","draggable"],
  components: {
    DynamicIcon,
    Input,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Collapse,
    CollapseItem,
    Tree
  },
  watch:{
    uiList:{
      deep:true,
      immediate: true,
      handler() {
        this.dataList = Object.assign([],this.uiList)
        this.$nextTick(() => {
          this.$refs['ui-tree'].setCurrentKey(this.activeId)
        })
      }
    },
    activeId:{
      immediate: true,
      handler(nv) {
        this.$nextTick(() => {
          this.$refs['ui-tree'].setCurrentKey(nv)
        })
      }
    },
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataList:[]
    };
  },
  mounted() {
    this.dataList = Object.assign([],this.uiList)
  },
  methods: {
    handleDrop() {
      this.$emit('nodeChange',this.dataList,'drag',dropNode.parent.data.id)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.data.id !== dropNode.data.id) {
        if (!dropNode.data.children&&draggingNode.parent.data.id===dropNode.parent.data.id) {
          return type === "prev" || type === "next";
        } else {
          return false;
        }
        return false;
      }
    },
    nodeClick(data){
      this.$emit('nodeChange',data.id,'active')
    },
    contextmenu(data) {
      event.preventDefault()
      this.$emit('contextmenu',{
          id:data.id,
          x:event.clientX,
          y:event.clientY
      })
    }
  }
}
</script>
