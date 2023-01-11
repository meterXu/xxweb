<template>
  <div class="mtScale" ref="mtScale" :theme="config.theme">
    <template v-if="config.isRuler">
      <div class="ruler-container-top">
        <canvas style="width: 100%;height: 100%"></canvas>
      </div>
      <div class="ruler-container-right">
        <canvas style="width: 100%;height: 100%"></canvas>
      </div>
    </template>
    <div ref="mtScale-container" :class="config.isRuler?['mtScale-container','mtScale-has-ruler',this.config.backgroundClass]:['mtScale-container',this.config.backgroundClass]"
         @contextmenu="(event)=>{event.preventDefault()}">
      <div ref="mtScale-content" class="mtScale-content" @contextmenu="contextmenu" @mouseup="mouseup" :style="mtScaleContentStyle">
        <div ref="mtScale-view" @dragstart="()=>{return false}" class="mtScale-view" :style="'transform-origin: 0px 0px;transform: scale('+scale+')'">
          <slot v-bind:scale="scale"/>
        </div>
      </div>
      <div v-if="config.isRuler" class="ruler-content">
        <div v-for="(item,index) in lines" :key="index" class="ruler-item" @mousedown="lineMouseDown(item)" @mouseup="removeLineMouseMove" :style="'left: '+item.x+'px;'">
          <span class="ruler-text">{{item.canvasX}}px,{{item.x}}</span>
          <div class="ruler-line"></div>
        </div>
      </div>
    </div>
    <div class="mtScale-control">
      <template v-if="config.isScale">
        <div class="mtScale-control-item" style="text-align: center">
          <i @click="zoomOut" class="el-icon-remove" style="font-size: 13px;margin-right: 3px;color: #E6A23C"></i>
          <Dropdown placement="top" @on-click="percentageChange">
            <span class="el-dropdown-link">
              {{percentage}}
            </span>
            <DropdownMenu slot="dropdown">
              <DropdownItem v-for="item in scaleList" :name="item" :key="item">{{`${item*100}%`}}</DropdownItem>
              <DropdownItem divided name="fitCanvas">适应画布</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <i @click="zoomIn" class="el-icon-circle-plus" style="font-size: 13px;margin-left: 3px;color: #67C23A"></i>
        </div>
        <div class="mtScale-control-item">
          <i class="el-icon-full-screen control-icon" title="100%" @click="fullCanvas"></i>
        </div>
        <div  class="mtScale-control-item">
          <i class="el-icon-crop control-icon" title="适应画布" @click="fitCanvas"></i>
        </div>
      </template>
      <div v-if="config.isNavigate" class="mtScale-control-item">
        <i class="el-icon-position control-icon" title="导航"></i>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
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
          backgroundClass:'photoshop-bg'
        }
      }
    }
  },
  components:{
    Dropdown,
    DropdownMenu,
    DropdownItem
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
    }
  },
  watch:{
    scale(nv,ov){
      this.lines.forEach(l=>{
        l.x = l.canvasX*nv
      })
    }

  },
  methods:{
    percentageChange(nv){
      switch (nv){
        case 'fitCanvas':{
          this.fitCanvas()
        }break;
        default:{
          this.scale = nv
          this.zoomLevel = this.getZoomLevel()
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
    contextmenu(){
      event.preventDefault()
      if(this.config.isDrag){
        this.$refs['mtScale-view'].classList.add('cursor-move')
        const ownerRect = this.$refs['mtScale-content'].getBoundingClientRect()
        this.shift.x= event.clientX-ownerRect.left
        this.shift.y= event.clientY-ownerRect.top
        document.removeEventListener('mousemove',this.mousemove)
        document.addEventListener('mousemove',this.mousemove)
      }
    },
    lineMouseDown(line){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.shift.x= ownerRect.left
      this.shift.y= ownerRect.top
      this.moveLine  = line
      document.removeEventListener('mousemove',this.lineMousemove)
      document.addEventListener('mousemove',this.lineMousemove)
    },
    mousemove(event){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.location.x = event.pageX-ownerRect.left-this.shift.x
      this.location.y = event.pageY-ownerRect.top-this.shift.y
    },
    lineMousemove(event){
      this.moveLine.x = parseInt(event.pageX-this.shift.x)
      this.moveLine.canvasX = parseInt(this.moveLine.x-this.location.x)
    },
    removeLineMouseMove(){
      document.removeEventListener('mousemove',this.lineMousemove)
    },
    mouseup(){
      this.$refs['mtScale-view'].classList.remove('cursor-move')
      document.removeEventListener('mousemove',this.mousemove)
    },
    fullCanvas(){
      this.scale = 1
      this.zoomLevel = 5
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
  }
}
</script>

<style lang="less" scoped>
.mtScale[theme='light']{
  --background-color:#e9e9eb;
  --link-color:#409EFF;
  --border-color:#DCDFE6;
  --tool-bg:#fff;
  --ruler-bg:#e9e9eb;
  --ruler-color:#409EFF;
  --line-bg:#409EFF;
  --tool-icon:#909399;
}
.mtScale[theme='dark']{
  --background-color:#e9e9eb;
  --link-color:#409EFF;
  --border-color:#DCDFE6;
  --tool-bg:#fff;
  --ruler-bg:#e9e9eb;
  --ruler-color:#409EFF;
  --line-bg:#409EFF;
  --tool-icon:#909399;
}

.mtScale{
  position: relative;
  overflow: hidden;
  flex: 1;
  display: inline-flex;
  flex-flow: column;
  justify-content: flex-start;
  background-color: var(--background-color);
  .el-dropdown-link {
    cursor: pointer;
    color: var(--link-color);
    user-select: none;
  }
  .mtScale-view{
    transition: all ease 0.3s;
  }
  .mtScale-container{
    background-repeat: repeat repeat;
    flex: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .mtScale-has-ruler{
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin-left: 20px;
    margin-top: 20px;
  }
  .mtScale-control{
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    z-index: 10000;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-top: 1px solid var(--border-color);
    background-color: var(--tool-bg);
    text-align: right;
  }
  .mtScale-control-item{
    display: inline-block;
    cursor: pointer;
  }
  .mtScale-control-item+.mtScale-control-item{
    margin-left: 10px;
  }
  .ruler-container-top,.ruler-container-right{
    box-sizing: border-box;
    border-color: var(--border-color);
    background: #e9e9eb;
    border-style: solid;
  }
  .ruler-container-top{
    height: 20px;
    position:absolute;
    top: 0;
    left: 20px;
    right:0;
    z-index: 2;
    box-sizing: border-box;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom-width: 1px;
  }
  .ruler-container-right{
    width: 20px;
    position:absolute;
    top: 20px;
    left: 0;
    bottom:0;
    z-index: 2;
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-right-width: 1px;
  }
  .cursor-move{
    cursor: move;
  }
  .ruler-content{
    z-index: 9999;
  }
  .ruler-item{
    position: absolute;
    top: 0px;
    height: 100%;
    cursor: ew-resize;
  }
  .ruler-text{
    color: var(--ruler-color);
    text-indent: 4px;
    position: absolute;
    user-select:none;
  }
  .ruler-line{
    width: 1px;
    height: 100%;
    background-color: var(--line-bg)
  }
  .control-icon{
    color: var(--tool-icon)
  }
  .photoshop-bg{
    background-image: url("../assets/img/scaleBg.png");
  }
}
</style>
