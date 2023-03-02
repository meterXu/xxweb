<template>
  <div class="xxWeb">
    <div class="no-authority-2">
      <slot>
        <div class="img"></div>
        <div class="content">
          <h1 class="h1">{{code}}</h1>
          <div class="desc">
            {{text}}
          </div>
          <div class="action">
            <Button class="btn" type="primary" v-if="show.home" @click="goHome">{{btnText||返回首页}}</Button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import {Button} from 'element-ui'
import '../../../assets/css/403/403-2.less'

export default {
  name: "NoAuthority2",
  props: {
    code: {
      type: String,
      default: '抱歉'
    },
    text: {
      type: String,
      default: '你无权访问此页面，请联系管理员！'
    },
    btnText:{
      type: String,
      default: '返回首页'
    },
    show: {
      type: Object,
      default() {
        return {
          home: true
        }
      }
    },
    link: {
      type: Object,
      default() {
        return {
          home: "javascript:;"
        };
      }
    }
  },
  components: {
    Button
  },
  methods:{
    goHome(){
      window.location.href=this.link.home
    }
  }
}
</script>