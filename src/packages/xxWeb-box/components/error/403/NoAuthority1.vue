<template>
  <div class="xxWeb">
    <div class="no-authority-1">
      <slot>
        <div class="img"></div>
        <div class="content">
          <h1>{{ code }}</h1>
          <div class="desc">{{ text }}</div>
          <div class="action">
            <Button type="primary" size="small" v-if="show.home" @click="goHome"
              >返回首页</Button
            >
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { ElButton as Button } from 'element-plus'
import '../../../assets/css/403/403-1.less'

export default {
  name: 'NoAuthority1',
  props: {
    code: {
      type: String,
      default: '403',
    },
    text: {
      type: String,
      default: '抱歉，你无权访问！',
    },
    show: {
      type: Object,
      default() {
        return {
          home: true,
        }
      },
    },
    link: {
      type: Object,
      default() {
        return {
          home: 'javascript:;',
        }
      },
    },
  },
  components: {
    Button,
  },
  methods: {
    goHome() {
      this.$emit( 'goHome')
      if (this.link.home) {
        window.location.href = this.link.home
      }
    },
  },
  emits: ['goHome'],
}
</script>
