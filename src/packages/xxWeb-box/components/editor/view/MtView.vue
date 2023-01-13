<template>
  <div class="mtScale" ref="mtScale" :theme="config.theme">
    <template v-if="config.isRuler">
      <RulerScale :scale="scale" :location="location" :theme="config.theme"></RulerScale>
    </template>
    <div ref="mtScale-container" :class="mtScaleContainerStyle"
         @contextmenu="(event)=>{event.preventDefault()}">
      <div ref="mtScale-content" class="mtScale-content" :style="mtScaleContentStyle">
        <div ref="mtScale-view" @dragstart="()=>{return false}" @mousedown="canvasMousedown" @mouseup="mouseup" class="mtScale-view" :style="mtScaleViewStyle">
          <slot v-bind:scale="scale"/>
        </div>
      </div>
      <div v-if="config.isRuler" class="ruler-content">
        <div v-for="(item,index) in lines" class="ruler-item" @mousedown="lineMouseDown(item,'x')" @mouseup="removeLineMouseMove('x')" :style="'left: '+item.x+'px;'">
          <span class="ruler-text">{{item.canvasX}}px,{{item.x}}</span>
<!--          <div :style="mtScaleLineStyleX" class="ruler-line"></div>-->
          <div class="ruler-line"></div>
        </div>
        <div v-for="(item,index) in linesY" class="ruler-item-y" @mousedown="lineMouseDown(item,'y')" @mouseup="removeLineMouseMove('y')" :style="'top: '+item.y+'px;'">
          <span class="ruler-text-y">{{item.canvasY}}px,{{item.y}}</span>
<!--          <div :style="mtScaleLineStyleY" class="ruler-line-y"></div>-->
          <div class="ruler-line-y"></div>
        </div>
      </div>
    </div>
    <div class="mtScale-control">
      <template v-if="config.isScale">
        <div class="mtScale-control-item" style="text-align: center">
          <i @click="zoomOut" class="el-icon-remove icon-zoom" style="color: #E6A23C"></i>
          <Dropdown placement="top" @command="percentageChange">
            <span class="el-dropdown-link">
              {{percentage}}
            </span>
            <DropdownMenu slot="dropdown">
              <DropdownItem v-for="item in scaleList" :key="item" :command="item">{{`${item*100}%`}}</DropdownItem>
              <DropdownItem divided command="fitCanvas">适应画布</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <i @click="zoomIn" class="el-icon-circle-plus icon-zoom" style="color: #67C23A"></i>
        </div>
        <div class="mtScale-control-item">
          <MtIcon icon="DoOneToOne" :size="16" class="control-icon" title="100%" @click="fullCanvas"></MtIcon>
        </div>
        <div  class="mtScale-control-item">
          <MtIcon icon="DoOverallReduction" :size="16" class="control-icon" title="适应画布" @click="fitCanvas"></MtIcon>
        </div>
      </template>
      <div v-if="config.isNavigate" class="mtScale-control-item">
        <MtIcon icon="DoGps" :size="16" class="control-icon" title="导航"></MtIcon>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/mtView.less'
import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
import MtIcon from "./MtIcon";
import Guides from "@scena/guides";
import RulerScale from "./RulerScale";
export default {
  name: 'MtView',
  props:{
    config:{
      type:Object,
      default(){
        return {
          theme:'dark',
          isRuler:true,
          isScale:true,
          isDrag:true,
          isNavigate:true,
          backgroundClass:'dark-bg'
        }
      }
    }
  },
  components:{
    MtIcon,
    // RulerScale,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    RulerScale
  },
  data(){
    return {
      scale:1,
      scaleList:[0.1, 0.25, 0.33, 0.5, 0.75, 1, 2, 3, 4],
      zoomLevel:5,
      location:{
        x:0,
        y:0
      },
      shift:{
        x:0,
        y:0
      },
      lines:[{
        x:24,
        canvasX:0
      }],
      linesY:[{
        y:24,
        canvasY:0
      }],
      moveLine:null
    }
  },
  computed:{
    percentage(){
      return `${this.scale*100}%`
    },
    mtScaleContentStyle(){
      return {
        transform:`translate(${this.location.x}px, ${this.location.y}px)`
      }
    },
    mtScaleViewStyle(){
      return {
        transformOrigin: '0px 0px',
        transform: `scale(${this.scale})`
      }
    },
    mtScaleContainerStyle(){
      return this.config.isRuler?
          ['mtScale-container','mtScale-has-ruler',this.config.backgroundClass]
          :['mtScale-container',this.config.backgroundClass]
    },
    mtScaleLineStyleX(){
      return {
        transformOrigin: '0px 0px',
        transform: `scaleX(${this.scale})`
      }
    },
    mtScaleLineStyleY(){
      return {
        transformOrigin: '0px 0px',
        transform: `scaleY(${this.scale})`
      }
    },
  },
  watch:{
    scale(nv,ov){
      this.lines.forEach(l=>{
        l.x = l.canvasX*nv+this.location.x
      })
      this.linesY.forEach(l=>{
        l.y = l.canvasY*nv+this.location.y
      })

      // this.guides1.zoom  = nv
      // this.guides1.resize()
      // this.guides2.zoom  = nv
      // this.guides2.resize()
    }

  },
  methods:{
    percentageChange(command){
      switch (command){
        case 'fitCanvas':{
          this.fitCanvas()
        }break;
        default:{
          this.scale = command
          this.zoomLevel = this.getZoomLevel()
          this.resetLocation()
        }break;
      }
    },
    fitCanvas(){
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      if(mtCanvas){
        this.scale = parseFloat((mtScaleContainer.clientWidth/(mtCanvas.clientWidth+60)).toFixed(2))
        this.scale =this.scale>1?1:this.scale
        this.zoomLevel = this.getZoomLevel()
        this.resetLocation()
      }
    },
    fullCanvas(){
      this.scale = 1
      this.zoomLevel = 5
      this.resetLocation()
    },
    canvasMousedown(event){
      event.preventDefault()
      const mouseEvent = {
        0: ()=>{},
        2: () => {
          if(this.config.isDrag){
            this.$refs['mtScale-view'].classList.add('cursor-move')
            const ownerRect = this.$refs['mtScale-content'].getBoundingClientRect()
            this.shift.x= event.clientX-ownerRect.left
            this.shift.y= event.clientY-ownerRect.top
            document.removeEventListener('mousemove',this.mousemove)
            document.addEventListener('mousemove',this.mousemove)
          }
        }
      }
      mouseEvent[ event.button ]();
    },
    lineMouseDown(line,type){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.shift.x= ownerRect.left
      this.shift.y= ownerRect.top
      this.moveLine  = line
      if(type==='x') {
        document.removeEventListener('mousemove',this.lineMousemove)
        document.addEventListener('mousemove',this.lineMousemove)
      } else {
        document.removeEventListener('mousemove',this.lineMousemoveY)
        document.addEventListener('mousemove',this.lineMousemoveY)
      }

    },
    mousemove(event){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.location.x = event.pageX-ownerRect.left-this.shift.x
      this.location.y = event.pageY-ownerRect.top-this.shift.y
    },
    lineMousemove(event){
      this.moveLine.x = parseInt(event.pageX-this.shift.x)
      this.moveLine.canvasX = parseInt((this.moveLine.x-this.location.x)*(1/this.scale))
      // this.moveLine.canvasX = parseInt(this.moveLine.x-this.location.x)
    },
    lineMousemoveY(event){
      this.moveLine.y = parseInt(event.pageY-this.shift.y)
      this.moveLine.canvasY = parseInt((this.moveLine.y-this.location.y)*(1/this.scale))
    },
    removeLineMouseMove(type){
      if(type==='x') {
        document.removeEventListener('mousemove',this.lineMousemove)
      } else {
        document.removeEventListener('mousemove',this.lineMousemoveY)
      }
    },
    mouseup(){
      this.$refs['mtScale-view'].classList.remove('cursor-move')
      document.removeEventListener('mousemove',this.mousemove)
    },
    getZoomLevel(){
      let level = 0
      this.scaleList.forEach((n,i)=>{
        if(this.scale>=n){
          level = i
          return;
        }
      })
      return level
    },
    zoomOut(){
      this.zoomLevel--
      if(this.zoomLevel<5){
        this.scale = (this.zoomLevel-1)*0.25
        this.scale = this.scale<=0.25?0.25:this.scale
        this.zoomLevel = this.zoomLevel<=0?0:this.zoomLevel
      }else{
        this.scale = 4*0.25+(this.zoomLevel-5)*0.5
      }
    },
    zoomIn(){
      this.zoomLevel++
      if(this.zoomLevel<5){
        this.scale = (this.zoomLevel-1)*0.25
        this.scale = this.scale<=0.25?0.25:this.scale
      }else{
        this.scale = 4*0.25+(this.zoomLevel-5)*0.5
        this.scale = this.scale>=4?4:this.scale
        this.zoomLevel = this.zoomLevel>=11?11:this.zoomLevel
      }
    },
    resetLocation(){
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      if(mtCanvas){
        this.location.x=(mtScaleContainer.clientWidth-mtCanvas.clientWidth*this.scale)/2
        this.location.y=this.location.x>30?30:this.location.x
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.resetLocation()
    })
  }
}
</script>
