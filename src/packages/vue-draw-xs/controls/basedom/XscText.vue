<template>
    <div class="d_box_style" :style="boxStyle">
      <span :style="textStyle">{{options.text.content}}</span>
    </div>
</template>

<script>
export default {
  name: 'XscText',
  props: {
    options: Object,
    themeData: Object,
    theme: String
  },
  computed: {
    textStyle () {
      return {
        'font-size': this.options.text.textStyle.fontSize + 'px',
        'font-style': this.options.text.textStyle.fontFamily,
        'font-weight': this.options.text.textStyle.fontWeight,
        'color': this.options.text.textStyle.color,
        'user-select':'none'
      }
    },
    boxStyle () {
      return {
        'line-height': this.options.boxSpace.lineHeight + 'px',
        'text-align': this.options.boxSpace.textAlign,
        'background-color': this.options.background.color,
        'border-width': this.options.border.width + 'px',
        'border-top-style': this.options.border.style,
        'border-bottom-style': this.options.border.style,
        'border-left-style': this.options.border.style,
        'border-right-style': this.options.border.style,
        'border-color': this.options.border.color
      }
    }
  }
}
</script>

<style scoped>
  .d_box_style{
    width: 100%;
    height: 100%;
  }
</style>
