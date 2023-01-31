<template>
  <Tabs class="pro-panel" type="border-card" size="small">
    <TabPane>
      <span slot="label">
<!--        <i :class="item.icon"></i>-->
        UL列表
      </span>
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
<!--          <i class="header-icon el-icon-view"></i>-->
          <div class="custom-tree-node-label" @click="treeNodeClick(data)">{{ node.label }}</div>
          <span>
            <i class="el-icon-view" @click="controlShow(data)"></i>
            <slot name="ui-custom-icon" :data="{node,data}"></slot>
          </span>
        </span>
      </Tree>

      <!--      <Collapse v-for="(item,pi) in uiList" :key="pi">-->
      <!--        <CollapseItem :name="pi">-->
      <!--          <template slot="title">-->
      <!--            <div class="collapse-item-title">-->
      <!--              <span>{{item.name}}</span>-->
      <!--              <span>-->
      <!--                <i class="header-icon el-icon-view"></i>-->
      <!--                <i class="header-icon el-icon-view"></i>-->
      <!--              </span>-->
      <!--            </div>-->

      <!--          </template>-->
      <!--          <draggable-->
      <!--              :list="item.children"-->
      <!--              :disabled="!enabled"-->
      <!--              class="list-group"-->
      <!--              ghost-class="ghost"-->
      <!--              :move="checkMove"-->
      <!--              @start="dragging = true"-->
      <!--              @end="dragging = false"-->
      <!--          >-->
      <!--            <div-->
      <!--                class="list-group-item collapse-item-chart"-->
      <!--                v-for="element in item.children"-->
      <!--                :key="element.id"-->
      <!--            >-->
      <!--              <span>{{element.config.box.name}}</span>-->
      <!--              <span>-->
      <!--                <i class="header-icon el-icon-view"></i>-->
      <!--                <i class="header-icon el-icon-view"></i>-->
      <!--              </span>-->
      <!--            </div>-->
      <!--          </draggable>-->
      <!--&lt;!&ndash;          <div class="collapse-item-chart" v-for="(chart,ci) in item.children">&ndash;&gt;-->
      <!--&lt;!&ndash;            <span>{{chart.config.box.name}}</span>&ndash;&gt;-->
      <!--&lt;!&ndash;            <span>&ndash;&gt;-->
      <!--&lt;!&ndash;              <i class="header-icon el-icon-view"></i>&ndash;&gt;-->
      <!--&lt;!&ndash;              <i class="header-icon el-icon-view"></i>&ndash;&gt;-->
      <!--&lt;!&ndash;            </span>&ndash;&gt;-->
      <!--&lt;!&ndash;          </div>&ndash;&gt;-->
      <!--        </CollapseItem>-->
      <!--      </Collapse>-->

    </TabPane>
  </Tabs>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Tabs, TabPane, Form, FormItem, Collapse, CollapseItem, Input, Tree} from 'element-ui'
import MtFormItem from './MtFormItem'
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
      type: Number,
      default: 0
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
    MtFormItem,
    Tree
  },
  watch:{
    uiList:{
      deep:true,
      immediate: true,
      handler() {
        this.dataList = Object.assign([],this.uiList)
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
    },
    controlShow(data) {
      this.$emit('nodeChange',data.id,'show')
    }
  }
}
</script>

<style lang="less" scoped>
.pro-panel {
  /deep/ .el-form-item__label {
    font-size: 12px;
    line-height: 30px;
  }

  /deep/ .el-form-item__content {
    line-height: 30px;
  }

  /deep/ .el-form-item {
    margin-bottom: 8px;
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
