<template>
  <div class="ui-list">
    <Tree
        ref="ui-tree"
        :data="dataList"
        :props="defaultProps"
        node-key="id"
        :indent="0"
        default-expand-all
        :highlight-current="true"
        draggable
        :current-node-key="activeId"
        :allow-drop="allowDrop"
        @node-drop="handleDrop"
    >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div class="custom-tree-node-label" @click="treeNodeClick(data)">{{ node.label }}</div>
          <span>
            <slot name="ui-custom-icon" :data="{node,data}"></slot>
          </span>
        </span>
    </Tree>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Tabs, TabPane, Form, FormItem, Collapse, CollapseItem, Input, Tree} from 'element-ui'
import DynamicIcon from "../../common/DynamicIcon";
// import draggable from 'vuedraggable'

export default {
  name: "UIList",
  props: {
    uiList: {
      type: Array,
      default: []
    },
    activeId:{
      type: String,
      default: ''
    }
  },
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
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  mounted() {
    this.dataList = Object.assign([],this.uiList)
  },
  methods: {
    // checkMove: function(e) {
    //   window.console.log("Future index: " + e.draggedContext.futureIndex);
    //   window.console.log(e.relatedContext.list);
    //   this.uiList[0].children=e.relatedContext.list
    //   this.uiList.push(Object.assign({},this.uiList[0]))
    //   this.uiList.shift()
    //   console.log(this.uiList)
    // },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.$emit('nodeChange',this.dataList,'drag')
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
    treeNodeClick(data) {
      this.$emit('nodeChange',data.id,'active')
    }
  }
}
</script>

<style lang="less" scoped>
.ui-list {
  height: 100%;
  /deep/ .el-tabs__content {
    height: 80%;
    overflow: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  /deep/ .el-tabs__content::-webkit-scrollbar {
    display: none;
  }
}

.custom-tree-node {
  width: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  i {
    margin-right: 5px;
  }
  .custom-tree-node-label {
    flex: auto;
  }
}

</style>
