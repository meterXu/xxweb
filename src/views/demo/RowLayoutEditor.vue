<template>
  <div class="editor">
    <MtView :config="config">
      <XscRowLayout :charts="charts" :view="false">
        <div style="width: 800px;height: 200px;background: green"></div>
      </XscRowLayout>
    </MtView>
  </div>
</template>

<script>
import {MtView,XscRowLayout} from "../../packages/xxWeb-box";
import charts from './charts'
export default {
  name: "RowLayoutEditor",
  components:{
    MtView,
    XscRowLayout
  },
  data(){
    return {
      charts:charts,
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