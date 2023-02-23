<template>
  <div class="editor">
    <MtView :config="config">
      <XscColumnLayout v-model="activeItem" :chart="chart" :view="false">
        <template v-slot="{view,item,index}">
         <div :style="{width: item.config.box.width+'px',height: item.config.box.height+'px',background:'#333',color:'#fff'}">
           <VueDrawXs :view="view" :item="item"></VueDrawXs>
         </div>
        </template>
      </XscColumnLayout>
    </MtView>
  </div>
</template>

<script>
import {MtView,XscRowLayout} from "../../packages/xxWeb-box";
import charts from './charts'
import VueDrawXs from "../../packages/vue-draw-xs/Index";
import XscColumnLayout from "../../packages/xxWeb-box/components/editor/layout/XscColumnLayout";
export default {
  name: "ColumnLayoutEditor",
  components:{
    XscColumnLayout,
    MtView,
    XscRowLayout,
    VueDrawXs
  },
  data(){
    return {
      chart:{
        items:charts
      },
      activeItem:null,
      config:{
        theme:'light',
        isRuler:false,
        isScale:true,
        isDrag:true,
        isNavigate:true,
        isAlign:false,
        containerPadding:30,
        initScale:1,
        backgroundClass:'default-bg',
        navigateConf:{
          canvasWidth:224,
          canvasHeight:160
        }
      }
    }
  }
}
</script>

<style scoped>
.editor{
  display: flex;
  overflow: hidden;
  flex: 1;
  position: absolute;
  top: 40px;
  bottom: 0;
  right: 0;
  left: 1px;
  z-index: 99;
}
</style>