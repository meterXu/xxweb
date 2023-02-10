<template>
  <div class="mtScale" ref="mtScale" :theme="config.theme">
    <template v-if="config.isRuler">
      <RulerScale :scale="scale" :location="location" :theme="config.theme" v-model="lines"></RulerScale>
    </template>
    <div ref="mtScale-container" :class="mtScaleContainerStyle"
         @contextmenu="(event)=>{event.preventDefault()}">
      <div v-if="config.isAlign" class="align-btn">
        <MtIcon icon="LeftAlign" :size="16" class="align-icon" title="左对齐" @click="clickAlign('left')"></MtIcon>
        <MtIcon icon="RightAlign" :size="16" class="align-icon" title="右对齐" @click="clickAlign('right')"></MtIcon>
        <MtIcon icon="TopAlign" :size="16" class="align-icon" title="上对齐" @click="clickAlign('top')"></MtIcon>
        <MtIcon icon="BottomAlign" :size="16" class="align-icon" title="下对齐" @click="clickAlign('bottom')"></MtIcon>
        <MtIcon icon="VerticallyAlign" :size="16" class="align-icon" title="垂直对齐" @click="clickAlign('vertically')"></MtIcon>
        <MtIcon icon="HorizontallyAlign" :size="16" class="align-icon" title="水平对齐" @click="clickAlign('horizontally')"></MtIcon>
      </div>
      <div ref="mtScale-content" class="mtScale-content" :style="mtScaleContentStyle">
        <div ref="mtScale-view" @dragstart="()=>{return false}" @mousedown="canvasMousedown" class="mtScale-view" :style="mtScaleViewStyle">
          <slot :scale="scale" :view="false"/>
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
        <div  class="mtScale-control-item">
          <MtIcon icon="DoOverallReduction" :size="16" class="control-icon" title="适应画布" @click="fitCanvas"></MtIcon>
        </div>
        <div class="mtScale-control-item">
          <MtIcon icon="DoOneToOne" :size="16" class="control-icon" title="100%" @click="fullCanvas"></MtIcon>
        </div>
      </template>
      <div v-if="config.isNavigate" class="mtScale-control-item">
        <MtIcon icon="DoGps" :size="16" class="control-icon" title="导航" @click="showNavigate"></MtIcon>
      </div>
    </div>
    <Navigate v-show="toggleNavigate" :config="navigateConf" @navigateMove="navigateMove">
      <slot :scale="scale" :view="true"/>
    </Navigate>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/mtView.less'
import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
import MtIcon from "./MtIcon";
import Navigate from "./Navigate";
import RulerScale from "./RulerScale";
import {add as 加,subtract as 减,multiply as 乘,divide as 除,floor as 四舍五入} from 'lodash'
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
          isAlign:true,
          containerPadding:30,
          backgroundClass:'default-bg',
          navigateConf:{
            canvasWidth:224,
            canvasHeight:160
          }
        }
      }
    },
    lines:{
      type:Object,
      default() {
        return {
          top:[],
          left:[]
        };
      }
    },
  },
  components:{
    MtIcon,
    Navigate,
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
      toggleNavigate:false,
      moveLine:null,
      navigateConf:{
        canvasWidth:this.config.navigateConf.canvasWidth,
        canvasHeight:this.config.navigateConf.canvasHeight,
        viewWidth:0,
        viewHeight:0,
        canvasScale:0.1,
        eyeScale:1,
        location:{
          x:0,
          y:0
        }
      }
    }
  },
  computed:{
    percentage(){
      let scale = this.scale*100
      return `${scale.toFixed(2)}%`
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
    }
  },
  watch:{
    scale(nv,ov){
      this.navigateConf.eyeScale = nv
      this.$emit('scaleChange',nv)
    },
    location:{
      handler(nv){
        this.navigateConf.location.x = nv.x*this.navigateConf.canvasScale
        this.navigateConf.location.y = nv.y*this.navigateConf.canvasScale
      },
      deep:true
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
          this.resetMtLocation(command)
        }break;
      }
    },
    fitCanvas(){
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      if(mtCanvas){
        this.scale = 除(mtScaleContainer.clientWidth,(mtCanvas.clientWidth+60))
        this.scale =this.scale>1?1:this.scale
        this.zoomLevel = this.getZoomLevel()
        this.resetMtLocation()
      }
    },
    fullCanvas(){
      this.scale = 1
      this.zoomLevel = 5
      this.resetMtLocation(this.scale)
    },
    showNavigate(){
      this.toggleNavigate = !this.toggleNavigate
    },
    canvasMousedown(event){
      event.preventDefault()
      const mouseEvent = {
        0: ()=>{},
        2: () => {
          if(this.config.isDrag){
            this.$refs['mtScale-view'].classList.add('cursor-move')
            const ownerRect = this.$refs['mtScale-content'].getBoundingClientRect()
            this.shift.x= 减(event.clientX-ownerRect.left)
            this.shift.y= 减(event.clientY-ownerRect.top)
            document.removeEventListener('mousemove',this.mousemove)
            document.addEventListener('mousemove',this.mousemove)
            document.removeEventListener('mouseup', this.mouseup)
            document.addEventListener('mouseup', this.mouseup)
          }
        }
      }
      mouseEvent[ event.button ]();
    },
    mousemove(event){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.location.x = 减(event.pageX,加(ownerRect.left,this.shift.x))
      this.location.y = 减(event.pageY,加(ownerRect.top,this.shift.y))
    },
    mouseup(){
      if(this.$refs['mtScale-view']&&this.$refs['mtScale-view'].classList){
        this.$refs['mtScale-view'].classList.remove('cursor-move')
      }
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
    resetMtLocation(scale){
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      const viewWidth = 减(mtScaleContainer.clientWidth,this.config.containerPadding*2)
      const viewHeight = 减(mtScaleContainer.clientHeight,this.config.containerPadding*2)
      let mtCanvasWidth = mtCanvas.clientWidth
      let mtCanvasHeight = mtCanvas.clientHeight
      if(mtCanvas){
        let res = this.resetCanvas(scale,{width:viewWidth,height:viewHeight},{width:mtCanvasWidth,height:mtCanvasHeight},this.config.containerPadding)

        this.scale = res.scale

        this.location.x = res.location.x
        this.location.y = res.location.y
      }
    },
    resetCanvas(scale,viewSize,canvasSize){
      let withScale,heightScale=1
      let res = {
        scale,
        location:{
          x:0,
          y:0
        }
      }
      if(scale){
        canvasSize.width = 乘(canvasSize.width,this.scale)
        canvasSize.height = 乘(canvasSize.height,this.scale)
        if(viewSize.width>canvasSize.width){
          res.location.x=减(viewSize.width,canvasSize.width)/2
        }else {
          res.location.x=0
        }
        if(viewSize.height>canvasSize.height){
          res.location.y=减(viewSize.height,canvasSize.height)/2
        }else{
          res.location.y=0
        }
      }else{
        if(viewSize.width<=canvasSize.width){
          withScale = 除(viewSize.width,canvasSize.width)
        }
        if(viewSize.height<=canvasSize.height){
          heightScale = 除(viewSize.height,canvasSize.height)
        }
        if(withScale<=heightScale){
          res.scale =四舍五入(withScale,2)
          res.location.x = 减(viewSize.width,乘(canvasSize.width,withScale))/2
          res.location.y = 减(viewSize.height,乘(canvasSize.height,withScale))/2
        }else{
          res.scale =四舍五入(heightScale,2)
          res.location.x = 减(viewSize.width,乘(canvasSize.width,heightScale))/2
          res.location.y = 减(viewSize.height,乘(canvasSize.height,heightScale))/2
        }
        res.location.x = res.location.x<0?this.config.containerPadding:加(this.config.containerPadding,res.location.x)
        res.location.y = res.location.y<0?this.config.containerPadding:加(this.config.containerPadding,res.location.y)
      }
      return res
    },
    setNavigateConf(){
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      let mtCanvasWidth = mtCanvas.clientWidth
      let mtCanvasHeight = mtCanvas.clientHeight
      if(mtCanvas){
        const res = this.resetCanvas(
            null,
            {width:224,height:160},
            {width:mtCanvasWidth,height:mtCanvasHeight},
            0)
        this.navigateConf.canvasScale = res.scale
        this.navigateConf.location.x = 乘(this.location.x,res.scale)
        this.navigateConf.location.y = 乘(this.location.y,res.scale)
        this.navigateConf.canvasWidth = 乘(mtCanvasWidth,res.scale)
        this.navigateConf.canvasHeight = 乘(mtCanvasHeight,res.scale)
        this.navigateConf.viewWidth = 乘(mtScaleContainer.clientWidth,res.scale)
        this.navigateConf.viewHeight = 乘(mtScaleContainer.clientHeight,res.scale)
      }
    },
    navigateMove(location){
      this.location.x = -location.x
      this.location.y = -location.y
    },
    clickAlign(type) {
      this.$emit('viewAlign',type)
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.resetMtLocation()
      this.setNavigateConf()
    })
  }
}
</script>
