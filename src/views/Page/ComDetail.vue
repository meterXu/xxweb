<template>
 <div style="width: 868px;margin: 0 auto">
   <DemoBlock>
     <template v-slot:source>
       <div style="width: 800px;height: 500px">
         <JeecgLogin :config="config"></JeecgLogin>
       </div>
     </template>
     <template v-slot:highlight>
       <pre><code class="language-html">{{xxxx}}</code></pre>
     </template>
   </DemoBlock>
 </div>
</template>

<script>
import DemoBlock from '../doc/DemoBlock'
import {JeecgLogin} from "@/packages/xxWeb-box";
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
      xxxx:'<template style="height: 100%">\n' +
          '  <JeecgLogin :config="config"></JeecgLogin>\n' +
          '</template>'
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
