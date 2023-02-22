<template>
  <div class="editor">
    <MtView :config="config">
      <XscRowLayout v-model="activeItem" :chart="chart" :view="false">
        <template v-slot="{view,item}">
         <div :style="{width: item.config.box.width+'px',height: item.config.box.height+'px'}">
           <VueDrawXs :view="view" :item="item"></VueDrawXs>
         </div>
        </template>
      </XscRowLayout>
    </MtView>
  </div>
</template>

<script>
import {MtView,XscRowLayout} from "../../packages/xxWeb-box";
import charts from './charts'
import VueDrawXs from "../../packages/vue-draw-xs/Index";
export default {
  name: "RowLayoutEditor",
  components:{
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