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
        :default-expand-all="defaultExpandAll"
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
    crossParentDraggable:{
      type: Boolean,
      default:false
    },
    defaultExpandAll:{
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
            this.$refs['ui-tree'].setCurrentKey(this.activeId);
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
              if(this.$refs['ui-tree'].getNode(nv)&&this.$refs['ui-tree'].getNode(nv).parent) {
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
      if(draggingNode.data.parentId===dropNode.data.parentId){//同父节点拖动
        this.$emit('nodeChange',this.uiList,'drag',dropNode.parent.data.id)
      }else{//跨父节点拖动
        let toIndex= 0
        if(dropNode.data.parentId){//在父节点内部拖
          toIndex = dropNode.parent.childNodes.findIndex(c=>c.data.id===draggingNode.data.id)
        }else{//直接拖至父节点上
          toIndex = dropNode.childNodes.length-1
        }
        this.$emit('nodeChange',{
          formPaentId:draggingNode.data.parentId,
          toParentId:dropNode.data.parentId||dropNode.data.id,
          toIndex:toIndex,
          id:draggingNode.data.id,
          uiList:this.uiList
        },'cross-page',dropNode.parent.data.id)
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      draggingNode.data.parentId = draggingNode.parent?draggingNode.parent.data.id:null
      dropNode.data.parentId = dropNode.parent?dropNode.parent.data.id:null
      if (draggingNode.data.id !== dropNode.data.id) {
        if(draggingNode.data.hasOwnProperty('children')){//父节点拖动
          return !dropNode.data.parentId && (type === "prev" || type === "next");
        }else{//子节点拖动
          if (dropNode.parent.data.id) {//释放至子节点
            return (this.crossParentDraggable
                ? true
                :dropNode.parent.data.id===draggingNode.parent.data.id)
                &&type !== "inner"
          } else {//释放至父节点
            return this.crossParentDraggable&&type === "inner"
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