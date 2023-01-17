<template>
  <div class="mtScale" ref="mtScale" :theme="config.theme">
    <template v-if="config.isRuler">
      <RulerScale :scale="scale" :location="location" :theme="config.theme"></RulerScale>
    </template>
    <div ref="mtScale-container" :class="mtScaleContainerStyle"
         @contextmenu="(event)=>{event.preventDefault()}">
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
        <Navigate :config="navigateConf">
          <slot :view="true"/>
        </Navigate>
        <MtIcon icon="DoGps" :size="16" class="control-icon" title="导航" @click="showNavigate"></MtIcon>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/mtView.less'
import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
import MtIcon from "./MtIcon";
// import RulerScale from "./RulerScale";
import Navigate from "./Navigate";
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
          backgroundClass:'dark-bg',
          navigateConf:{
            width:224,
            height:160
          }
        }
      }
    }
  },
  components:{
    MtIcon,
    Navigate,
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
      lines:[],
      moveLine:null,
      navigateConf:{
        width:this.config.navigateConf.width,
        height:this.config.navigateConf.height,
        scale:0.1,
        location:{
          x:0,
          y:0
        }
      }
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
          this.resetMtLocation()
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
        this.resetMtLocation()
      }
    },
    fullCanvas(){
      this.scale = 1
      this.zoomLevel = 5
      this.resetMtLocation(this.scale)
    },
    showNavigate(){

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
            document.removeEventListener('mouseup', this.mouseup)
            document.addEventListener('mouseup', this.mouseup)
          }
        }
      }
      mouseEvent[ event.button ]();
    },
    mousemove(event){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.location.x = event.pageX-ownerRect.left-this.shift.x
      this.location.y = event.pageY-ownerRect.top-this.shift.y
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
    resetMtLocation(scale){
      const padding = 30
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      const viewWidth = mtScaleContainer.clientWidth-padding*2
      const viewHeight = mtScaleContainer.clientHeight-padding*2
      let mtCanvasWidth = mtCanvas.clientWidth
      let mtCanvasHeight = mtCanvas.clientHeight
      if(mtCanvas){
        let res = this.resetCanvas(scale,{width:viewWidth,height:viewHeight},{width:mtCanvasWidth,height:mtCanvasHeight},padding)
        this.scale = res.scale
        this.location.x = res.location.x
        this.location.y = res.location.y
      }
    },
    resetCanvas(scale,viewSize,canvasSize,padding=30){
      let withScale,heightScale=0
      let res = {
        scale:1,
        location:{
          x:0,
          y:0
        }
      }
      if(scale){
        canvasSize.width = canvasSize.width*this.scale
        canvasSize.height = canvasSize.height*this.scale
        if(viewSize.width>canvasSize.width){
          this.location.x=(viewSize.width-canvasSize.width)/2
        }else {
          this.location.x=0
        }
        if(viewSize.height>canvasSize.height){
          this.location.y=(viewSize.height-canvasSize.height)/2
        }else{
          this.location.y=0
        }
      }else{
        if(viewSize.width<=canvasSize.width){
          withScale = parseFloat((viewSize.width/canvasSize.width).toFixed(2))
        }
        if(viewSize.height<=canvasSize.height){
          heightScale = parseFloat((viewSize.height/canvasSize.height).toFixed(2))
        }
        if(withScale<=heightScale){
          res.scale =withScale
          res.location.x=(viewSize.width-canvasSize.width*withScale)/2
          res.location.y = (viewSize.height-canvasSize.height*withScale)/2
        }else{
          res.scale =heightScale
          res.location.x=(viewSize.width-canvasSize.width*heightScale)/2
          res.location.y = (viewSize.height-canvasSize.height*heightScale)/2
        }
        res.location.x = res.location.x<0?padding:(padding+res.location.x)
        res.location.y = res.location.y<0?padding:(padding+res.location.y)
        return res
      }
    },
    setNavigateConf(){
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      let mtCanvasWidth = mtCanvas.clientWidth
      let mtCanvasHeight = mtCanvas.clientHeight
      if(mtCanvas){
        const res = this.resetCanvas(
            null,
            {width:this.config.navigateConf.width,height:this.config.navigateConf.height},
            {width:mtCanvasWidth,height:mtCanvasHeight},
            0)
        this.navigateConf.scale = res.scale
        this.navigateConf.location = res.location
      }
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
