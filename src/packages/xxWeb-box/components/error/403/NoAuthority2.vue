<template>
  <div class="xxWeb">
    <div class="no-authority-2">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
import {Button} from 'element-ui'
import '../../../assets/css/403/403-2.less'

export default {
  name: "NoAuthority1",
  props: {
    code: {
      type: String,
      default: '403'
    },
    text: {
      type: String,
      default: '抱歉，你无权访问！'
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