<template>
  <div class="nav">
    <div ref="nav-container" class="nav-container" :style="{width:`${config.canvasWidth}px`,height:`${config.canvasHeight}px`}">
      <div class="nav-canvas" :style="navCanvasStyle">
        <slot></slot>
      </div>
      <div @mousedown="eyeDown" ref="nav-eye" class="nav-eye" :style="eyeStyle"></div>
    </div>
  </div>
</template>

<script>
import {add as 加,subtract as 减,multiply as 乘,divide as 除,ceil as 四舍五入} from 'lodash'
export default {
  name: "Navigate",
  props:['config'],
  data(){
    return{
      location:{
        x:0,
        y:0
      },
      shift:{
        x:0,
        y:0,
        eyeMove:false
      }
    }
  },
  watch:{
    'config.location':{
      deep:true,
      handler(nv){
       this.location = {
         x:-nv.x,
         y:-nv.y
       }
      }
    }
  },
  computed:{
    eyeStyle(){
      return {
        transform:`translate(${除(this.location.x,this.config.eyeScale)}px, ${除(this.location.y,this.config.eyeScale)}px)`,
        width:`${除(this.config.viewWidth,this.config.eyeScale)}px`,
        height: `${除(this.config.viewHeight,this.config.eyeScale)}px`
      }
    },
    navCanvasStyle(){
      return {
        transform: `scale(${this.config.canvasScale})`,
      }
    }
  },
  methods:{
    eyeDown(){
      event.stopPropagation()
      const ownerRect = this.$refs['nav-eye'].getBoundingClientRect()
      this.shift.x= 减(event.clientX,ownerRect.left)
      this.shift.y= 减(event.clientY,ownerRect.top)
      document.removeEventListener('mousemove',this.eyeMove)
      document.addEventListener('mousemove',this.eyeMove)
      document.removeEventListener('mouseup', this.eyeUp)
      document.addEventListener('mouseup', this.eyeUp)
    },
    eyeUp(){
      event.stopPropagation()
      document.removeEventListener('mousemove',this.eyeMove)
    },
    eyeMove(){
      event.stopPropagation()
      const ownerRect = this.$refs['nav-container'].getBoundingClientRect()
      const x = 减(event.pageX,加(ownerRect.left,this.shift.x))
      const y = 减(event.pageY,加(ownerRect.top,this.shift.y))
      this.$emit('navigateMove',{
        x:乘(除(x,this.config.canvasScale),this.config.eyeScale),
        y:乘(除(y,this.config.canvasScale),this.config.eyeScale),
      })
    }
  },
  mounted() {
    this.location = {
      x:-this.config.location.x,
      y:-this.config.location.y
    }
  }
}
</script>

<style scoped>
.nav{
  width: 224px;
  height: 160px;
  border: 1px solid #42516c;
  background-color: rgba(24,31,41,.5);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  z-index: 1000;
  overflow: hidden;
  right: 16px;
  bottom: 40px;
  pointer-events: all;
  cursor: default;
}
.nav-container{
  position: relative;
}
.nav-eye{
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border: 1px solid #009DFF;
}
.nav-canvas{
  position: absolute;
  top:0;
  left:0;
  transform-origin: 0 0;
}
</style>