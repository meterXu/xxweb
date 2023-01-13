<template>
  <div ref="mt_canvas"
       @drop="drop"
       @dragover="dragover"
       @click="canvasClick"
       :style="canvasStyle"
       :class="['mt_canvas', {mt_canvas_position:view}]">
    <div v-for="item in charts" :ref="item.id"
         :key="item.id"
         :class="[view?['mt_node','mt_node_view']:(item===activeNode ? ['mt_node','mt_node_active']: ['mt_node','mt_node_base']),'dragging']"
         tabindex="-1"
         :style="nodeStyle(item)"
         @click="itemClick(item)"
         @mousedown="itemMousedown(item)"
         @dragstart="()=>{return false}">
      <slot :view="view" :item="item"></slot>
      <span @dragstart="()=>{return false}" @mousedown="changeSizeSizeMousedown(item)">
            <div ref="resize" v-if="!view&&item===activeNode" class="node_resize" shape="circle"
                 icon="ios-resize"></div>
          </span>
    </div>
    <span @dragstart="()=>{return false}" @mousedown="changeSizeSizeMousedown(options)">
        <div ref="resize" v-if="!view&&activeNode&&activeNode.chart==='canvas'" class="node_resize" shape="circle"
             icon="ios-resize"></div>
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
    }
  },
  data() {
    return {
      activeNode: null, // 活动的节点
      startDrag: false,
      dragNode: null,
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
      document.removeEventListener('mousemove', this.nodeMousemove)
      document.removeEventListener('mousemove', this.changeSizeMousemove)
    },
    keydown() {
      event.preventDefault()
      event.stopPropagation()
      if (this.activeNode.chart !== 'canvas') {
        switch (event.keyCode) {
          case 38: { // 上
            this.activeNode.config.box.y--
            break
          }
          case 40: { // 下
            this.activeNode.config.box.y++
            break
          }
          case 37: { // 左
            this.activeNode.config.box.x--
            break
          }
          case 39: { // 右
            this.activeNode.config.box.x++
            break
          }
        }
      }
    },
    itemClick() {
      event.preventDefault()
      event.stopPropagation()
    },
    itemMousedown(item) {
      const mouseEvent = {
        0: () => {
          event.preventDefault()
          event.stopPropagation()
          if (!this.view) {
            this.activeNode = item
            let clickBox = event.currentTarget.getBoundingClientRect()
            this.dragNode = this.charts.find(c => c.id === item.id)
            this.shift.x = event.clientX - clickBox.left
            this.shift.y = event.clientY - clickBox.top
            document.removeEventListener('mousemove', this.nodeMousemove)
            document.addEventListener('mousemove', this.nodeMousemove)
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
    nodeMousemove(event) {
      event.stopPropagation()
      if (!this.view) {
        const ownerRect = this.$refs.mt_canvas.getBoundingClientRect()
        this.dragNode.config.box.x = parseInt((event.pageX - ownerRect.left - this.shift.x) / this.scale)
        this.dragNode.config.box.y = parseInt((event.pageY - ownerRect.top - this.shift.y) / this.scale)
      }
    },
    changeSizeSizeMousedown(item) {
      event.stopPropagation()
      if (!this.view) {
        this.dragNode = item
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
      if (this.dragNode.hasOwnProperty('config')) {
        this.dragNode.config.box.width = parseInt((event.pageX + this.shift.x) / this.scale)
        this.dragNode.config.box.height = parseInt((event.pageY + this.shift.y) / this.scale)
      }else {
        this.dragNode.width = parseInt((event.pageX + this.shift.x) / this.scale)
        this.dragNode.height = parseInt((event.pageY + this.shift.y) / this.scale)
      }
    },
    drop() {
      if (!this.view) {
        event.preventDefault()
        event.stopPropagation()
        this.$emit('drop')
        this.activeNode = this.charts[this.charts.length - 1]
        this.$emit('nodeActive')
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
        this.activeNode = {
          type: 'dom',
          chart: 'canvas',
          config: {
            options: this.options
          }
        }
        this.$emit('nodeActive')
      }
    },
    nodeClick(item) {
      event.preventDefault()
      event.stopPropagation()
      this.activeNode = item
      if (!this.view) {
        this.$emit('nodeActive')
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
    getDataConf(id) {
      if (id) {
        let xscNode = this.charts.find(c => c.id === id)
        if (xscNode) {
          return xscNode.config.data
        } else {
          return null
        }
      } else {
        return null
      }
    },
    update(id) {
      let that = this
      let warnMsgs = null
      let errors = null
      return new Promise((resolve, reject) => {
        if (id) {
          that.$refs[id][0].update().then(warnData => {
            if (resolve) {
              warnMsgs = {id: id, warns: warnData}
              resolve(warnMsgs)
            }
          }).catch(c => {
            if (reject) {
              errors = {id: id, error: c}
              reject(errors)
            }
          })
        } else {
          let keys = Object.keys(that.$refs)
          let resIndex = 0
          keys.map(key => {
            that.$refs[key][0].update().then(warnData => {
              resIndex = resIndex + 1
              warnMsgs = {id: key, warns: warnData}
              if (resIndex === keys.length) {
                if (resolve) {
                  resolve(warnMsgs)
                }
              }
            }).catch(c => {
              resIndex = resIndex + 1
              errors = {id: key, error: c}
              if (resIndex === keys.length) {
                if (reject) {
                  reject(errors)
                }
              }
            })
          })
        }
      })
    },
    getData(id) {
      let that = this
      let datas = null
      let errors = null
      return new Promise((resolve, reject) => {
        if (id) {
          that.$refs[id][0].getNodeData().then(data => {
            datas = {id: id, data: data}
            if (resolve) {
              resolve(datas)
            }
          }).catch(c => {
            errors = {id: id, error: c}
            if (reject) {
              reject(errors)
            }
          })
        } else {
          let keys = Object.keys(that.$refs)
          let resIndex = 0
          keys.map(key => {
            that.$refs[key][0].getNodeData().then(data => {
              resIndex = resIndex + 1
              datas = {id: key, data: data}
              if (resIndex === keys.length) {
                if (resolve) {
                  resolve(datas)
                }
              }
            }).catch(c => {
              resIndex = resIndex + 1
              errors = {id: key, error: c}
              if (resIndex === keys.length) {
                if (reject) {
                  reject(errors)
                }
              }
            })
          })
        }
      })
    },
    nodeStyle (item) {
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
    }
  },
  updated() {
    this.$emit('updated', this.$el)
  },
  mounted() {
    document.removeEventListener('keydown', this.keydown)
    document.addEventListener('keydown', this.keydown)
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
.mt_node{
  display: inline-block;
  cursor: move;
  position: absolute;
  outline: none;
}
.mt_canvas_position {
  margin: 0 auto;
}

.mt_node_base {
  box-sizing: content-box;
  border: 1px dashed #000;
}

.mt_node_view {
  box-sizing: content-box;
  border: 0px solid rgba(0, 0, 0, 0);
}

.mt_node_active {
  box-sizing: content-box;
  border: 1px dashed #2d8cf0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.node_resize {
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
