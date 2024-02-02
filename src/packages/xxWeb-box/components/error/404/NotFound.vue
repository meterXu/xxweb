<template>
  <div class="xxWeb">
    <div class="not-found">
      <slot>
        <div class="not-found-content">
          <div class="code">{{ code }}</div>
          <div class="info">{{ text }}</div>
          <slot name="img">
            <div class="mark"></div>
          </slot>
          <a
            class="home-button"
            v-if="show.home"
            href="javascript:;"
            @click="goHome"
            >返回首页</a
          >
        </div>
      </slot>
      <div class="cloud"></div>
    </div>
  </div>
</template>

<script>
import '../../../assets/css/404/404.less'
export default {
  name: 'NotFound',
  props: {
    code: {
      type: String,
      default: '404',
    },
    text: {
      type: String,
      default: 'OMG，我们找不到页面了！',
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
