<template>
  <div
      class="demo-block"
      :class="[blockClass, { 'hover': hovering }]"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight language-html">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
        class="demo-block-control"
        ref="control"
        :class="{ 'is-fixed': fixedControl }"
        @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <span
          v-show="!copied"
          :class="['copy-action', { 'copying ': copied }]"
          @click.stop="copyCode"
      >{{ copiedText }}</span>
      <transition name="bounce">
        <span v-show="copied" class="copy-action copy-action-success">{{ copiedText }}</span>
      </transition>
    </div>
  </div>
</template>
<script>
import {Tooltip,Button } from 'element-ui';
export default {
  data() {
    return {
      hovering: false,
      copied: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null
    };
  },
  components:{Tooltip,Button},
  methods: {
    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
      this.fixedControl = bottom > document.documentElement.clientHeight &&
          top + 44 <= document.documentElement.clientHeight;
      this.$refs.control.style.left = this.fixedControl ? `${ left }px` : '0';
    },
    removeScrollHandler() {
      this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    },
    copyCode() {
      if (this.copied) {
        return;
      }
      const pre = this.$el.querySelectorAll("pre")[0];
      pre.setAttribute("contenteditable", "true");
      pre.focus();
      document.execCommand("selectAll", false, null);
      this.copied = document.execCommand("copy");
      pre.removeAttribute("contenteditable");
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    }
  },
  computed: {
    lang() {
      return this.$route.path.split('/')[1];
    },
    langConfig() {
      return {
        "hide-text": "隐藏代码",
        "show-text": "显示代码",
        "copied-text":"复制代码",
        "copied-success":"复制成功"
      };
    },
    blockClass() {
      return `demo-${ this.lang } demo-${ this.$router.currentRoute.path.split('/').pop() }`;
    },
    iconClass() {
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
    },
    controlText() {
      return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
    },
    copiedText() {
      return this.copied ? this.langConfig['copied-success'] : this.langConfig['copied-text'];
    },
    codeArea() {
      return this.$el.getElementsByClassName('meta')[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
            this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight;
    }
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
      if (!val) {
        this.fixedControl = false;
        this.$refs.control.style.left = '0';
        this.removeScrollHandler();
        return;
      }
      setTimeout(() => {
        this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
        this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
      }, 200);
    }
  },
  created() {
    const highlight = this.$slots.highlight;
    if (highlight && highlight[0]) {
      let code = '';
      let cur = highlight[0];
      if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
        cur = cur.children[0];
        if (cur.tag === 'code') {
          code = cur.children[0].text;
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let highlight = this.$el.getElementsByClassName('highlight')[0];
      if (this.$el.getElementsByClassName('description').length === 0) {
        highlight.style.width = '100%';
        highlight.borderRight = 'none';
      }
    });
  },
  beforeDestroy() {
    this.removeScrollHandler();
  }
};
</script>
<style lang="less">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: .2s;
  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
  }
  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }
  .demo-button {
    float: right;
  }
  .source {
    padding: 24px;
  }
  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height .2s;
    div[class*=language-]{
      position: relative;
    }
    div[class*="language-"]::before {
      color: #3182bd;
      position: absolute;
      z-index: 3;
      top: 0.8em;
      right: 1em;
      font-size: .75rem;
    }
    div[class~=language-html]:before{
      content: "html"
    }
  }
  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
    p {
      margin: 0;
      line-height: 26px;
    }
    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }
  .highlight {
    text-align: left;
    pre {
      margin: 0;
      padding: 12px;
      background: transparent;
      line-height: 1.4;
      font-size: 14px;
    }
    code.hljs {
      background: transparent;
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;
      &::before {
        content: none;
      }
    }
  }
  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    &.is-fixed {
      position: fixed;
      bottom: 24px;
      width: 868px;
    }
    i {
      font-size: 16px;
      line-height: 44px;
      transition: .3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }
    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: .3s;
      display: inline-block;
    }
    .copy-action{
      right: 0px;
      color: #409eff;
    }
    &.copying{
      transform: translateX(-44px);
    }
    &:hover {
      color: #409EFF;
      background-color: #f9fafc;
    }
    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }
}
</style>