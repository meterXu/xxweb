<template>
  <div class="xxWeb">
    <div class="not-found-dark">
      <div class="not-found-left">
        <slot>
          <div class="code-dark">{{code}}</div>
          <div class="info-dark">{{text}}</div>
          <a class="help-button" v-if="show.help" :href="link.help">帮助</a>
          <a class="home-button" v-if="show.home" :href="link.home">首页</a>
        </slot>
      </div>
      <div class="mark">
        <slot name="img">
          <img src="../../../assets/imgs/mark.png"/>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../assets/css/404/404dark.less'
export default {
  name: "NotFoundDark",
  props:{
    code:{
      type:String,
      default:'404'
    },
    text:{
      type:String,
      default:'您要查找的页面不存在、名称已更改或暂时不可用。'
    },
    show:{
      type:Object,
      default(){
        return {
          help:true,
          home:true
        }
      }
    },
    link:{
      type:Object,
      default() {
        return {
          home:"javascript:;",
          help:"javascript:;"
        };
      }
    }
  }
}
</script>
