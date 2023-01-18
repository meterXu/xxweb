<template>
  <div ref="mt_canvas"
       @drop="drop"
       @dragover="dragover"
       @click="canvasClick"
       :style="canvasStyle"
       :class="['mt_canvas', {mt_canvas_position:view}]">
    <div v-for="item in charts" :ref="item.id"
         :key="item.id"
         :class="itemClass(item)"
         tabindex="-1"
         :style="itemStyle(item)"
         @click="itemClick(item)"
         @mousedown="itemMousedown(item)"
         @dragstart="()=>{return false}">
      <slot :view="view" :item="item"></slot>
      <span @dragstart="()=>{return false}" @mousedown="changeSizeSizeMousedown(item)">
            <div ref="resize" v-if="!view&&item===activeItem" class="item_resize"></div>
          </span>
    </div>
    <span v-if="options.changeSize" @dragstart="()=>{return false}" @mousedown="changeSizeSizeMousedown(options)">
        <div ref="resize" v-if="!view&&activeItem&&activeItem.chart==='canvas'" class="item_resize"></div>
      </span>
  </div>
</template>
<script>
export default {
  name: 'XscStaticLayout',
  props: {
    scale: Number,
    charts: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    view: {
      type: Boolean,
      default: true
    },
    activeItem:{
      type:Object,
      default:null
    }
  },
  model:{
    prop:'activeItem',
    event:'change'
  },
  data() {
    return {
      selectedItems:[],
      startDrag: false,
      dragItem: null,
      shiftKey:false,
      shift: {
        x: 0,
        y: 0
      }
    }
  },
  watch: {
    charts: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.$emit('loaded')
        })
      }
    }
  },
  computed: {
    canvasStyle() { // 画布样式
      if (this.options) {
        return {
          width: this.options.width + 'px',
          height: this.options.height + 'px',
          'background-color': this.options.backgroundColor,
          'background-image': 'url(\'' + this.options.backgroundImage + '\')',
          'background-size': this.options.backgroundSize,
          'background-repeat': this.options.backgroundRepeat,
          display: this.view ? 'block' : 'inline-block'
        }
      } else {
        return {
          width: '1000px',
          height: '500px',
          'background-color': null,
          display: this.view ? 'block' : 'inline-block'
        }
      }
    }
  },
  methods: {
    removeMouseMove() {
      document.removeEventListener('mousemove', this.itemMousemove)
      document.removeEventListener('mousemove', this.changeSizeMousemove)
    },
    keydown() {
      event.stopPropagation()
      if(event.keyCode===16){
        this.shiftKey = true
      }
      if (this.activeItem&&(this.activeItem.chart !== 'canvas')) {
        switch (event.keyCode) {
          case 38: { // 上
            this.activeItem.config.box.y--
            break
          }
          case 40: { // 下
            this.activeItem.config.box.y++
            break
          }
          case 37: { // 左
            this.activeItem.config.box.x--
            break
          }
          case 39: { // 右
            this.activeItem.config.box.x++
            break
          }
        }
      }
    },
    itemClick() {
      event.stopPropagation()
    },
    itemMousedown(item) {
      const mouseEvent = {
        0: () => {
          event.stopPropagation()
          if (!this.view) {
            this.$emit('change',item)
            if(this.shiftKey){
              this.selectedItems.push(item)
            }else{
              this.selectedItems=[item]
            }
            let clickBox = event.currentTarget.getBoundingClientRect()
            this.dragItem = this.charts.find(c => c.id === item.id)
            this.shift.x = event.clientX - clickBox.left
            this.shift.y = event.clientY - clickBox.top
            document.removeEventListener('mousemove', this.itemMousemove)
            document.addEventListener('mousemove', this.itemMousemove)
            document.removeEventListener('mouseup', this.removeMouseMove)
            document.addEventListener('mouseup', this.removeMouseMove)
          }
        },
        2: () => {
          this.contextmenu(item)
        }
      }
      mouseEvent[event.button]();
    },
    itemMousemove(event) {
      event.stopPropagation()
      if (!this.view) {
        const ownerRect = this.$refs.mt_canvas.getBoundingClientRect()
        this.dragItem.config.box.x = parseInt((event.pageX - ownerRect.left - this.shift.x) / this.scale)
        this.dragItem.config.box.y = parseInt((event.pageY - ownerRect.top - this.shift.y) / this.scale)
      }
    },
    changeSizeSizeMousedown(item) {
      event.stopPropagation()
      if (!this.view) {
        this.dragItem = item
        let clickBoxWeight = event.currentTarget.parentElement.offsetWidth;
        let clickBoxHeight = event.currentTarget.parentElement.offsetHeight;
        this.shift.x = parseInt(clickBoxWeight * this.scale) - event.clientX
        this.shift.y = parseInt(clickBoxHeight * this.scale) - event.clientY
        document.removeEventListener('mousemove', this.changeSizeMousemove)
        document.addEventListener('mousemove', this.changeSizeMousemove)
        document.removeEventListener('mouseup', this.removeMouseMove)
        document.addEventListener('mouseup', this.removeMouseMove)
      }
    },
    changeSizeMousemove(event) {
      event.stopPropagation()
      if (this.dragItem.hasOwnProperty('config')) {
        this.dragItem.config.box.width = parseInt((event.pageX + this.shift.x) / this.scale)
        this.dragItem.config.box.height = parseInt((event.pageY + this.shift.y) / this.scale)
      }else {
        this.dragItem.width = parseInt((event.pageX + this.shift.x) / this.scale)
        this.dragItem.height = parseInt((event.pageY + this.shift.y) / this.scale)
      }
    },
    drop() {
      if (!this.view) {
        event.preventDefault()
        event.stopPropagation()
        this.$emit('drop')
        let activeItem = this.charts[this.charts.length - 1]
        this.$emit('change',activeItem)
        this.selectedItems=[activeItem]
      }
    },
    dragover() {
      if (!this.view) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    canvasClick() {
      if (!this.view) {
        const activeItem = {
          type: 'dom',
          chart: 'canvas',
          config: {
            options: this.options
          }
        }
        this.$emit('change',activeItem)
      }
    },
    contextmenu(item) {
      event.preventDefault()
      event.stopPropagation()
      if (!this.view) {
        this.$emit('contextmenu', {
          x: item.config.box.x + event.offsetX,
          y: item.config.box.y + event.offsetY,
          id: item.id
        })
      }
    },
    itemStyle (item) {
      if (item && item.config) {
        return {
          width: (item.config.box.width || 400) + 'px',
          height: (item.config.box.height || 300) + 'px',
          left: (item.config.box.x || 0) + 'px',
          top: (item.config.box.y || 0) + 'px',
          zIndex: (item.config.box.zIndex || 100)
        }
      } else {
        return {}
      }
    },
    itemClass(item){
      if(this.view){
        return ['mt_item','mt_item_view']
      }else{
        return this.selectedItems.findIndex(c=>c.id===item.id)>-1? ['mt_item','mt_item_active','dragging']: ['mt_item','mt_item_base']
      }
    },
    topAlign(){

    },
    bottomAlign(){

    },
    leftAlign(){

    },
    rightAlign(){

    }

  },
  mounted() {
    document.removeEventListener('keydown', this.keydown)
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', ()=>{
      this.shiftKey = false
    })
  }
}
</script>

<style scoped>
.mt_canvas {
  position: relative;
  width: 500px;
  height: 500px;
  background: #fff;
  background-size: auto;
  background-repeat: repeat;
}
.mt_item{
  display: inline-block;
  cursor: move;
  position: absolute;
  outline: none;
}
.mt_canvas_position {
  margin: 0 auto;
}

.mt_item_base {
  box-sizing: content-box;
  border: 1px dashed #000;
}

.mt_item_view {
  box-sizing: content-box;
  border: 0px solid rgba(0, 0, 0, 0);
}

.mt_item_active {
  box-sizing: content-box;
  border: 1px dashed #2d8cf0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.item_resize {
  position: absolute;
  z-index: 3;
  width: 7px;
  height: 7px;
  background: rgb(255, 255, 255);
  border: 1px solid #2d8cf0;
  border-radius: 2px;
  bottom: -4.5px;
  right: -4.5px;
  cursor: se-resize;
}

.dragging {
  cursor: move;
}
</style>
