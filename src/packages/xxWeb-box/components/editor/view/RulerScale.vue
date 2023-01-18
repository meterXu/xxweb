<template>
  <div>
    <div class="ruler-container-top">
    </div>
    <div class="ruler-container-right">
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
    lines:{
      type: Object,
      default(){
        return {
          top:[],
          left:[]
        }
      }
    }
  },
  model:{
    prop:'lines',
    event:'change'
  },
  data() {
    return {
      linesTop:[],
      linesRight:[]
    }
  },
  watch: {
    location: {
      deep: true,
      handler(nv,ov) {
        this.guides1.scrollGuides(-nv.y/this.scale,this.scale); // line
        this.guides1.scroll(-nv.x/this.scale,this.scale); // scale
        this.guides2.scrollGuides(-nv.x/this.scale,this.scale);
        this.guides2.scroll(-nv.y/this.scale,this.scale);
      }
    },
    scale(nv,ov){
      this.guides1.zoom  = nv
      this.guides1.resize()
      this.guides2.zoom  = nv
      this.guides2.resize()
      this.guides1.scroll(-this.location.x/nv,nv);
      this.guides2.scroll(-this.location.y/nv,nv);
      this.guides1.scrollGuides(-this.location.y/nv,nv);
      this.guides2.scrollGuides(-this.location.x/nv,nv);

    }
  },
  computed: {
  },
  methods: {
    onChangeTop(guides) {
      console.log(guides)
      this.lines.top = guides
      console.log(this.lines)
    },
    onChangeLeft(guides) {
      console.log(guides)
      this.lines.left = guides
      console.log(this.lines)
    },
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
    } else {
      optionsH.textColor= '#96A2BA'
      optionsH.backgroundColor= '#1E2532'
      optionsV.textColor= '#96A2BA'
      optionsV.backgroundColor= '#1E2532'
    }
      this.guides1 =new Guides(document.querySelector(".ruler-container-top"), optionsH).on("changeGuides", ({ guides }) => {
        this.onChangeTop(guides)
      });
      this.guides2 =new Guides(document.querySelector(".ruler-container-right"), optionsV).on("changeGuides", ({ guides }) => {
        this.onChangeLeft(guides)
      });
      this.guides1.loadGuides(this.lines.top)
      this.guides2.loadGuides(this.lines.left)
  }
}
</script>
