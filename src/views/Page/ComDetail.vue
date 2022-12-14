<template>
 <div id="comDetail" class="comDetail">
   <DynamicComponent :template="template" :js="js"></DynamicComponent>
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
    return (<myComponent/>)
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
      js:null
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

  }
}
</script>

<style scoped>
.comDetail{
  text-align: left;
  min-width: 868px;
  max-width: 1366px;
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
