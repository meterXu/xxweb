<template>
<!--  <canvas ref="widthways" :style="getRuleStyle" style="flex: none"></canvas>-->
  <div>
    <div class="ruler-container-top" v-on:changeGuides="onChangeTop">
    </div>
    <div class="ruler-container-right" v-on:changeGuides="onChangeRight">
    </div>
  </div>
</template>

<script>

import Guides from "@scena/guides";

export default {
  name: 'RulerScale',
  props: {
    scale: Number,
    location: Object,
    theme: String,
    mode: 'horizontal' | 'vertical'
  },
  data() {
    return {
      linesTop:[{
        x:24,
        canvasX:0
      }],
      linesRight:[{
        y:24,
        canvasY:0
      }]
    }
  },
  watch: {
    location: {
      deep: true,
      handler(nv,ov) {
        this.guides1.scrollGuides(-nv.y/this.scale); // line
        this.guides1.scroll(-nv.x/this.scale); // scale
        this.guides2.scrollGuides(-nv.x/this.scale);
        this.guides2.scroll(-nv.y/this.scale);
      }
    },
    scale(nv,ov){
      // this.linesTop.forEach(l=>{
      //   l.x = l.canvasX*nv+this.location.x
      // })
      // this.linesRight.forEach(l=>{
      //   l.y = l.canvasY*nv+this.location.y
      // })
      this.guides1.zoom  = nv
      this.guides1.resize()
      this.guides2.zoom  = nv
      this.guides2.resize()
      // console.log(this.location.x)
      // console.log(this.location.y)
      // this.guides1.scrollGuides(-(this.location.y/this.scale));
      this.guides1.scroll(-this.location.x/this.scale);
      // this.guides2.scrollGuides(-this.location.x/this.scale);
      this.guides2.scroll(-this.location.y/this.scale);
    }
  },
  computed: {
    getRuleStyle() {
      return {
        width: props.mode === 'horizontal' ? '100%' : '30px',
        height: props.mode === 'horizontal' ? '30px' : '100%',
        backgroundColor: 'white',
        zIndex: 996,
        display: 'block',
        cursor: props.mode === 'horizontal' ? 'row-resize' : 'col-resize'
      }
    }
  },
  methods: {
    onChangeTop(guides) {
      console.log('Top:')
      console.log(guides)
      this.lines = guides
    },
    onChangeRight(guides) {
      console.log('Right:')
      console.log(guides)
      this.linesY = guides
    },
    getFixed(sparsity) {
      const pointIdx = String(sparsity).indexOf('.')
      const len = String(sparsity).length
      return pointIdx < 0 ? 0 : len - pointIdx - 1
    },
    isCloseToInteger(num) {
      return Math.abs(num - Math.round(num)) < 0.0000001
    },
    getSparsity(scale) {
      if (scale <= 1) {
        return 100
      } else if (scale <= 3) {
        return 50
      } else if (scale <= 4) {
        return 20
      } else if (scale <= 5) {
        return 10
      }
      return 5
    },
    renderWidthWays() {
      const canvas = widthways.value
      if (!canvas) {
        return
      }
      const {width, height} = canvas.getBoundingClientRect()
      const dpi = 2
      canvas.width = width * dpi
      canvas.height = height * dpi
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      let {width: w, height: h} = canvas
      w /= dpi
      h /= dpi
      const ctx = canvas.getContext('2d')
      !
          ctx.scale(dpi, dpi)
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.lineWidth = 1
      ctx.strokeStyle = '#d9d9d9'
      ctx.fillStyle = '#232323'
      ctx.font = '12px serif'
      ctx.beginPath()
      const {offsetX, offsetY, scale} = props.options
      const offset = props.mode === 'horizontal' ? offsetX : offsetY
      // 间隔
      const sparsity = this.getSparsity(scale)
      // 间隔内有多少条线
      const part = 10
      const pixelPerUnit = scale * sparsity
      const gap = pixelPerUnit / part
      const fixed = this.getFixed(sparsity)
      let index = offset % gap > 0 ? gap - (offset % gap) : -offset % gap
      if (props.mode === 'horizontal') {
        ctx.translate(29.5, 0)
        do {
          const num = ((offset + index) / pixelPerUnit) * sparsity
          if (this.isCloseToInteger(num / sparsity)) {
            ctx.moveTo(index, h * 0.5)
            ctx.lineTo(index, h)
            const text = num.toFixed(fixed)
            const textWidth = ctx.measureText(text).width
            ctx.fillText(text, index - textWidth / 2, 10)
          } else {
            ctx.moveTo(index, h * 0.7)
            ctx.lineTo(index, h)
          }
          index += gap
        } while (index < w)
      } else {
        ctx.translate(0, -0.5)
        do {
          const num = ((offset + index) / pixelPerUnit) * sparsity
          if (this.isCloseToInteger(num / sparsity)) {
            ctx.moveTo(w * 0.5, index)
            ctx.lineTo(w, index)
            const text = num.toFixed(fixed)
            ctx.save()
            ctx.rotate((-90 * Math.PI) / 180)
            const textWidth = ctx.measureText(text).width
            ctx.fillText(text, -(index + textWidth / 2), 12)
            ctx.rotate((0 * Math.PI) / 180)
            ctx.restore()
          } else {
            ctx.moveTo(w * 0.7, index)
            ctx.lineTo(w, index)
          }
          index += gap
        } while (index < h)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }
  },
  mounted() {
    let optionsH = {
      type: "horizontal",
      displayDragPos: true,
      zoom: this.scale,
    }
    let optionsV = {
      type: "vertical",
      displayDragPos: true,
      zoom: this.scale,
    }
    if(this.theme==='light') {
      optionsH.textColor= '#000'
      optionsH.backgroundColor= '#fff'
      optionsV.textColor= '#000'
      optionsV.backgroundColor= '#fff'
    }
      this.guides1 =new Guides(document.querySelector(".ruler-container-top"), optionsH).on("changeGuides", ({ guides }) => {
        this.onChangeTop(guides)
      });
      this.guides2 =new Guides(document.querySelector(".ruler-container-right"), optionsV).on("changeGuides", ({ guides }) => {
        this.onChangeRight(guides)
      });
  }
}
</script>
<style>
.rCS1g1q24i .scena-guides-guide {
  background: #009DFF !important;
}
.rCS1g1q24i .scena-guides-display-drag {
  color: #009DFF !important;
}
</style>
