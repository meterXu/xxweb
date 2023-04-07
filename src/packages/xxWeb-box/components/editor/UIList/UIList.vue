<template>
  <div class="mt-ui-list">
    <Tree
        ref="ui-tree"
        :data="uiList"
        :props="defaultProps"
        node-key="id"
        :indent="0"
        :highlight-current="true"
        :default-expanded-keys="expandedKeys"
        :draggable="draggable"
        :current-node-key="activeId"
        :expand-on-click-node="false"
        :allow-drop="allowDrop"
        icon-class="tree-icon"
        @node-drop="handleDrop"
        @node-expand="nodeExpandHandle"
        @node-collapse="nodeCollapseHandle"
    >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div class="custom-tree-node-label" @click="nodeClick(data,node)" @contextmenu="contextmenu(data,node.parent)">
            <span v-if="!node.isLeaf" class="page-icon">
              <MtIcon v-if="node.expanded" icon="文件夹_开" :size="11"></MtIcon>
              <MtIcon v-else icon="文件夹_关" :size="11"></MtIcon>
            </span>
            <span v-else-if="node.level===1&&node.isLeaf" class="page-icon">
              <span class="page-icon-hide"><MtIcon icon="文件夹_开" :size="11"></MtIcon></span>
              <span><MtIcon icon="文件夹_关" :size="11"></MtIcon></span>
            </span>
          <span :class="{'node-title':true,'node-parent-title':!node.isLeaf}">
             <slot name="label" :data="data">
              {{ data.name }}
           </slot>
          </span>
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
import MtIcon from "../view/MtIcon";
import '../assets/css/mtUiList.less'
export default {
  name: "UIList",
  props: {
    uiList:{
      type: Array,
      default:()=>[]
    },
    activeId:{
      type: String,
      default:null
    },
    draggable:{
      type: Boolean,
      default:false
    },
    defaultProps:{
      type: Object,
      default(){
        return {
          children: 'children',
          label: 'name'
        }
      }
    }
  },
  components: {
    MtIcon,
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
      immediate: true,
      handler(nv){
        if(nv&&nv.length>0){
          if(!this.expandedKeys) {
            this.pushExpandedKeys(nv[0].id)
          }
          this.$nextTick(()=>{
            let isFater = []
            let arr = document.getElementsByClassName('el-tree-node__expand-icon')
            for(let i = 0;i<arr.length;i++) {
              if(arr[i].nextElementSibling.querySelector('.custom-tree-node-label').querySelector('.page-icon')) {
                isFater.push(arr[i])
              }
            }
            if(isFater.length) {
              isFater.forEach(item=>{
                if(item.classList.contains('is-leaf')) {
                  item.classList.remove('is-leaf')
                  let fb = this.iconClick.bind(this,item)
                  item.addEventListener("click",fb,false)
                }
              })
            }
          })
        }
      }
    },
    activeId:{
      immediate: true,
      handler(nv) {
        if(nv){
          this.$nextTick(() => {
            this.$refs['ui-tree'].setCurrentKey(nv);
            if(nv) {
              if(this.$refs['ui-tree'].getNode(nv).parent) {
                this.$refs['ui-tree'].getNode(nv).parent.expanded=true;
              } else {
                this.$refs['ui-tree'].getNode(nv).expanded=true;
              }
            }
            this.pushExpandedKeys(nv)
          })
        }
      }
    },
  },
  data() {
    return {
      expandedKeys:null,
      enabled: true,
      dragging: false
    };
  },
  mounted() {
  },
  methods: {
    handleDrop(draggingNode, dropNode) {
      this.$emit('nodeChange',this.uiList,'drag',dropNode.parent.data.id)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.data.id !== dropNode.data.id) {
        if(draggingNode.data.hasOwnProperty('children')){//页面
          return type === "prev" || type === "next";
        }else{//图表
          if (dropNode.parent.data.id) {
            return type === "prev" || type === "next";
          } else {
            return false
          }
        }
      }
      return true
    },
    nodeClick(data,dropNode){
      this.$emit('nodeChange',data.id,'active',dropNode.parent.data.id)
    },
    contextmenu(data,parent) {
      event.preventDefault()
      this.$emit('contextmenu',{
        id:data.id,
        data:data,
        parentId:parent?parent.data.id:null,
        x:event.clientX,
        y:event.clientY
      })
    },
    pushExpandedKeys(id){
      if(this.expandedKeys){
        if(this.expandedKeys.indexOf(id)===-1){
          this.expandedKeys.push(id)
        }
      }else{
        this.expandedKeys = [id]
      }
    },
    removeExpandedKeys(id){
      if(this.expandedKeys){
        const index =this.expandedKeys.indexOf(id)
        if(index!==-1){
          this.expandedKeys.splice(index,1)
        }
      }
    },
    nodeExpandHandle(data){
      this.pushExpandedKeys(data.id)
    },
    nodeCollapseHandle(data){
      this.removeExpandedKeys(data.id)
    },
    iconClick(item){
      let arr = item.nextElementSibling.querySelector('.page-icon').children
      if(item.classList.contains('expanded')) {
        item.classList.remove('expanded')
      } else {
        item.classList.add('expanded')
      }
      if(arr[0]&&arr[0].classList.contains('page-icon-hide')) {
        arr[0]&&arr[0].classList.remove('page-icon-hide')
        arr[1]&&arr[1].classList.add('page-icon-hide')
      } else {
        arr[1]&&arr[1].classList.remove('page-icon-hide')
        arr[0]&&arr[0].classList.add('page-icon-hide')
      }
    }
  }
}
</script>