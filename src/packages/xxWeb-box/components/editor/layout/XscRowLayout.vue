<template>
  <draggable
      class="list-group"
      v-bind="dragOptions"
      v-model="chart.items"
      @start="drag = true"
      @end="drag = false"
  >
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <el-row :style="cssVars" :gutter="0" v-for="(item,index) in chart.items"  :key="index" @dragstart.native="dragstart(item)" @click.native="itemClick(item)">
        <el-col :span="24" class="xsc-item">
          <slot :view="view" :item="item"></slot>
        </el-col>
      </el-row>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "XscRowLayout",
  props: {
    scale: Number,
    chart: {
      type: Object,
      default: null
    },
    view: {
      type: Boolean,
      default: true
    },
    activeItem: {
      type: Object,
      default: null
    },
    config:{
      type:Object,
      default(){
        return {
          moveStyle:{
            background: 'rgb(161, 255, 235)',
            borderWidth:'2px',
            borderStyle:'dashed',
            borderColor:'#acacac'
          }
        }
      }
    }
  },
  model: {
    prop: 'activeItem',
    event: 'change'
  },
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: this.view,
        ghostClass: "ghost"
      }
    }
  },
  computed:{
    cssVars(){
      return {
        '--bg-color': this.config.moveStyle.background,
        '--border-width':this.config.moveStyle.borderWidth,
        '--border-style':this.config.moveStyle.borderStyle,
        '--border-color':this.config.moveStyle.borderColor,
      }
    }
  },
  methods:{
    dragstart(item){
      const div = document.createElement("div");
      event.dataTransfer.setDragImage(div, 0, 0);
      this.$emit('change',item)
    },
    itemClick(item){
      this.$emit('change',item)
    }
  }
}
</script>

<style lang="less" scoped>
.xsc-item {
  padding: 6px;
  cursor: grab;
  position: relative;
  box-sizing: border-box;
}
.ghost {
  border-width:var(--border-width);
  border-style:var(--border-style);
  border-color:var(--border-color);
  cursor:move;
  :after{
    content: '';
    display: block;
    position: absolute;
    cursor:move;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-color);
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>