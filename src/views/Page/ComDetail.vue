<template>
 <div style="width: 868px;margin: 0 auto">
   <DemoBlock>
     <template v-slot:source>
       <div style="width: 800px;height: 500px">
         <JeecgLogin :config="config"></JeecgLogin>
       </div>
     </template>
     <template v-slot:highlight>
       <pre><code class="language-html">{{code}}</code></pre>
     </template>
   </DemoBlock>
 </div>
</template>

<script>
import DemoBlock from '../doc/DemoBlock'
import {JeecgLogin} from "@/packages/xxWeb-box";
import axios from 'axios'
import Vue from "vue";
import hljs from "highlight.js";
export default {
  name: "ComDetail",
  props:['title'],
  components:{
    JeecgLogin,
    DemoBlock
  },
  data(){
    return {
      config:{
        logo: "./static/imgs/logo-white.png",
        title: "xxWebBox",
        login: {
          title: "xxWebBox",
          desc: "请输入你的账号",
        },
        footer: {
          show: false
        }
      },
      code:null
    }
  },
  async created() {
    axios.get("./static/doc/JeecgLogin.data").then(res=>{
      this.code = res.data
      Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
      });
    })

  }
}
</script>

<style scoped>

</style>
