<template>
 <div id="comDetail" class="comDetail">
   <el-button icon="el-icon-arrow-left" type="text" @click="onBack">返回</el-button>
   <DynamicComponent :template="template" :js="js"></DynamicComponent>
   <div v-html="attributes"></div>
 </div>
</template>

<script>
import axios from 'axios'
import Vue from "vue";
import hljs from "highlight.js";
import md_it from 'markdown-it'
import containers from '../../md-loader/containers'
import {stripScript,safeStringToObj} from '../../md-loader/util'
const DynamicComponent={
  props:['template','js'],
  name:'DynamicComponent',
  computed:{
    myComponent(){
      let res = {
        template:this.template,
        render:undefined
      }
      Object.assign(res,this.js)
      return res
    }
  },
  render(){
    const {myComponent} = this
    if(myComponent.template){
      return (<myComponent/>)
    }else{
      return (<template/>)
    }
  }
}

export default {
  name: "ComDetail",
  props:['type','title'],
  components:{
    DynamicComponent
  },
  data(){
    return {
      template:null,
      js:null,
      attributes:null
    }
  },
  methods:{
    onBack(){
      this.$bus.$emit('deleteTab',this.$route.fullPath)
      this.$router.back()
    }
  },
  created() {
    const md = new md_it()
    containers({})(md)
    axios.get(`./static/doc/${this.type}/${this.title}.md`).then(res=>{
      this.template = `<div>${md.render(res.data)}</div>`
      this.js = safeStringToObj(stripScript(res.data))
      Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
      });
    })
    axios.get(`./static/doc/${this.type}/attributes.md`).then(res=>{
      this.attributes = `<div>${md.render(res.data)}</div>`
    })
  }
}
</script>

<style scoped>
.comDetail{
  background-color: #fff;
  padding: 20px 100px 40px 100px;
  text-align: left;
  min-width: 1000px;
  margin: 0 auto
}
</style>
<style lang="less">
.demo-table{
  width: 100%;
  font-size: 14px;
  color: #606266;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid #ebeef5;
  thead{
    color: #909399;
    font-weight: 500;
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }
  th{
    font-weight: 700;
  }
  th,td{
    padding: 12px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding-left: 10px;
    padding-right: 10px;
  }
  tbody tr:hover,tbody tr:nth-child(even){
    background: #f6f8fa;
  }
}
</style>
