<template>
  <div ref="mt_canvas"
       @drop="drop"
       @dragover="dragover"
       @click="canvasClick"
       :style="canvasStyle"
       :class="['xsc-static-layout', {mt_canvas_position:view}]">
    <div v-for="item in charts" :ref="item.id"
         :key="item.id"
         :class="itemClass(item)"
         tabindex="-1"
         :style="itemStyle(item)"
         @click="itemClick(item)"
         @mousedown="itemMousedown(item)"
         @dragstart="()=>{return false}">
      <slot v-if="item.config.box.show" :view="view" :item="item" :active="item.id===activeItem.id"></slot>
      <span style="user-select: none" draggable="false"  @mousedown="changeSizeSizeMousedown(item)">
            <div ref="resize" v-if="!view&&item.id===activeItem.id" class="item_resize"></div>
      </span>
    </div>
    <span v-if="page.config.options.changeSize" draggable="false" style="user-select: none" @mousedown="changeSizeSizeMousedown(page)">
        <div ref="resize" v-if="!view&&activeItem&&activeItem.chart==='canvas'" class="item_resize"></div>
    </span>
  </div>
</template>
<script>
import '../assets/css/XscStaticLayout.less'
export default {
  name: 'XscStaticLayout',
  props: {
    scale: Number,
    charts: {
      type: Array,
      default: null
    },
    page: {
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
    },
    alignment:{
      type: String,
      default: null
    },
    isLight:{
      type: Boolean,
      default: false
    },
    lightStyle:{
      type: Object,
      default: null
    },
    isDrag:{
      type: Boolean,
      default: true
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
    },
    activeItem: {
      handler(nv) {
        if(!this.shiftKey){
          this.selectedItems=[nv]
        }
        if(nv===null){
          this.selectedItems=[]
        }
      }
    },
    alignment: {
      immediate: true,
      handler(nv,ov) {
        if(this.selectedItems.length>0) {
          switch (nv) {
            case 'left':
              this.leftAlign();
              break;
            case 'right':
              this.rightAlign();
              break;
            case 'top':
              this.topAlign();
              break;
            case 'bottom':
              this.bottomAlign();
              break;
            default:
              break;
          }
        }
      }
    }
  },
  computed: {
    canvasStyle() { // 画布样式
      if (this.page) {
        return {
          width: this.page.config.box.width + 'px',
          height: this.page.config.box.height + 'px',
          'background-color': this.page.config.options.backgroundColor,
          'background-image': 'url(\'' + this.page.config.options.backgroundImage + '\')',
          'background-size': this.page.config.options.backgroundSize,
          'background-repeat': this.page.config.options.backgroundRepeat,
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
    addSelectedItems(data) {
      if(this.selectedItems&&!this.selectedItems.find(c=>c.id===data.id)) {
        this.selectedItems.push(data)
      } else {
        this.selectedItems.push(data)
      }
    },
    keydown() {
      event.stopPropagation()
      if(event.keyCode===16){
        this.shiftKey = true
      }
      // if (this.activeItem&&(this.activeItem.chart !== 'canvas')) {
      //   switch (event.keyCode) {
      //     case 38: { // 上
      //       this.activeItem.config.box.y--
      //       break
      //     }
      //     case 40: { // 下
      //       this.activeItem.config.box.y++
      //       break
      //     }
      //     case 37: { // 左
      //       this.activeItem.config.box.x--
      //       break
      //     }
      //     case 39: { // 右
      //       this.activeItem.config.box.x++
      //       break
      //     }
      //   }
      // }
    },
    itemClick() {
      event.stopPropagation()
    },
    itemMousedown(item) {
      this.$emit('change',item)
      const mouseEvent = {
        0: () => {
          event.stopPropagation()
          if (!this.view) {
            if(this.shiftKey){
              this.addSelectedItems(item)
            }else{
              this.selectedItems=[item]
            }
            let clickBox = event.currentTarget.getBoundingClientRect()
            this.dragItem = this.charts.find(c => c.id === item.id)
            this.shift.x = event.clientX - clickBox.left
            this.shift.y = event.clientY - clickBox.top
            document.removeEventListener('mousemove', this.itemMousemove)
            document.removeEventListener('mouseup', this.removeMouseMove)
            if(this.isDrag) {
              document.addEventListener('mousemove', this.itemMousemove)
              document.addEventListener('mouseup', this.removeMouseMove)
            }
          }
        },
        2: () => {
          if(!this.view){
            event.preventDefault()
            this.contextmenu(item)
          }
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
      if (this.dragItem.config.type==='dom'&&this.dragItem.config.chart==='page') {
        this.dragItem.width = parseInt((event.pageX + this.shift.x) / this.scale)
        this.dragItem.height = parseInt((event.pageY + this.shift.y) / this.scale)
      }else {
        this.dragItem.config.box.width = parseInt((event.pageX + this.shift.x) / this.scale)
        this.dragItem.config.box.height = parseInt((event.pageY + this.shift.y) / this.scale)
      }
    },
    drop(event) {
      if (!this.view) {
        event.preventDefault()
        event.stopPropagation()
        let clickBox = event.currentTarget.getBoundingClientRect()
        let location = {
          x:parseInt((event.clientX - clickBox.left)/this.scale),
          y:parseInt((event.clientY - clickBox.top)/this.scale)
        }
        this.$emit('drop',location)
        this.$nextTick(()=>{
          let activeItem = this.charts[this.charts.length - 1]
          this.$emit('change',activeItem)
          this.selectedItems=[activeItem]
        })
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
        const activeItem = this.page
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
        let style = {
          width: (item.config.box.width || 400) + 'px',
          height: (item.config.box.height || 300) + 'px',
          left: (item.config.box.x || 0) + 'px',
          top: (item.config.box.y || 0) + 'px',
          zIndex: (item.config.box.zIndex || 100),
          "--border": '',
          "--box-shadow": ''
        }
        if(this.isLight) {
          style["--border"]=(this.lightStyle&&this.lightStyle["border"])?this.lightStyle["border"]:"1px solid #8595FF"
          style["--box-shadow"]=(this.lightStyle&&this.lightStyle["box-shadow"])?this.lightStyle["box-shadow"]:"0 2px 12px 0 #8595FF"
        }
        return style
      } else {
        return {}
      }
    },
    itemClass(item){
      if(this.view){
        return ['mt_item','mt_item_view']
      }else{
        return this.selectedItems.findIndex(c=>c.id===item.id)>-1? this.isLight? ['mt_item','mt_item_light','dragging']:['mt_item','mt_item_active','dragging']: ['mt_item','mt_item_base']
      }
    },
    leftAlign(){
      // let Xmax = Math.max.apply(Math,this.selectedItems.map(item => { return item.config.box.x }))
      let Xmin = Math.min.apply(Math,this.selectedItems.map(item => { return item.config.box.x }))
      this.selectedItems.forEach(item=>{
        item.config.box.x=Xmin
      })
      this.$emit('resetAlignment')
      // config
    },
    rightAlign(){
      console.log('right')
    },
    topAlign(){
      console.log('top')
    },
    bottomAlign(){
      console.log('bottom')
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

</style>
