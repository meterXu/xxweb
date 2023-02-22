<template>
  <draggable
      class="list-group"
      v-bind="dragOptions"
      v-model="chart.items"
      @start="drag = true"
      @end="drag = false"
  >
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <el-row :gutter="0" v-for="(item,index) in chart.items"  :key="index">
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
  methods:{
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
  border:2px dashed #acacac;
  :after{
    content: '';
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(161, 255, 235);
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>