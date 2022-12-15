<template>
  <div class="xxWeb">
    <div class="not-found-2">
      <slot>
        <div class="img"></div>
        <div class="content">
          <h1>{{code}}</h1>
          <div class="desc">{{text}}</div>
          <div class="action">
            <Button type="primary" size="small" v-if="show.home" @click="goHome">返回首页</Button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import {Button} from 'element-ui'
import '../../../assets/css/404/404-2.less'

export default {
  name: "NotFound2",
  props: {
    code: {
      type: String,
      default: '404'
    },
    text: {
      type: String,
      default: '抱歉，你访问的页面不存在或无权访问！'
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
