<template>
  <draggable
      class="list-group"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
  >
    <el-row :gutter="0" v-for="item in charts">
      <el-col :span="24" class="xsc-item">
        <slot :view="view" :item="item"></slot>
      </el-col>
    </el-row>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "XscRowLayout",
  props: {
    scale: Number,
    charts: {
      type: Array,
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
</style>