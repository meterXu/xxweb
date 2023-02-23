<template>
  <div class="XscColumnLayout">
    <draggable
        class="list-group"
        v-bind="dragOptions"
        v-model="chart.items"
        @start="drag = true"
        @end="drag = false"
    >
      <transition-group class="transition-group" type="transition" :name="!drag ? 'flip-list' : null">
        <div v-for="(item,index) in chart.items"
             :key="index" @dragstart="dragstart(item)" @click="itemClick(item)"
             class="xsc-col" :style="cssVars">
          <slot :view="view" :item="item" :index="index"></slot>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import '../assets/css/XscColumnLayout.less'
import draggable from "vuedraggable";

export default {
  name: "XscColumnLayout",
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
          gutter:'6px',
          moveStyle:{
            background: '#dae8fc',
            borderWidth:'1px',
            borderStyle:'dashed',
            borderColor:'#6c8ebf'
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
        '--gutter':this.config.gutter,
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

</style>