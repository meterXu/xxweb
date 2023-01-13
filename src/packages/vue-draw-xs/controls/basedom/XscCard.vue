<template>
  <div class="d_mtCard" :style="containerStyle">
    <div class="d_mtCard_title" :style="titleStyle">{{options.title.text}}</div>
    <div class="d_mtCard_content"></div>
  </div>
</template>

<script>
export default {
  name: 'XscCard',
  props: {
    options: Object,
    themeData: Object,
    theme: String
  },
  computed: {
    colorPalette () {
      if (this.theme) {
        return this.themeData[this.theme || 'light'].colorPalette
      } else {
        return {}
      }
    },
    titleStyle () {
      return {
        'color': this.options.title.color || this.colorPalette.color,
        'font-size': this.options.title.fontSize + 'px',
        'font-weight': this.options.title.fontWeight,
        'font-family': this.options.title.fontFamily,
        'text-align':this.options.title.textAlign,
        'height': this.options.title.height + 'px',
        'line-height': this.options.title.lineHeight + 'px',
        'background-color': this.options.title.background.backgroundColor || this.colorPalette.backgroundColor,
        'background-image': 'url(\'' + this.options.title.background.backgroundImg + '\')',
        'background-size': this.options.title.background.backgroundSize,
        'background-repeat': this.options.title.background.backgroundRepeat,
        'border-bottom-width': this.options.title.border.borderBottomWidth + 'px',
        'border-bottom-style': this.options.title.border.borderBottomStyle,
        'border-bottom-color': this.options.title.border.borderBottomColor || this.colorPalette.border
      }
    },
    containerStyle () {
      return {
        'background-color': this.options.background.backgroundColor || this.colorPalette.backgroundColor,
        'background-image': 'url(\'' + this.options.background.backgroundImg + '\')',
        'background-size': this.options.background.backgroundSize,
        'background-repeat': this.options.background.backgroundRepeat,
        'border': this.options.border.borderWidth + 'px ' + this.options.border.borderStyle + ' ' + (this.options.border.borderColor || this.colorPalette.border),
        'border-radius': this.options.border.borderRadius+'px',
      }
    }
  }
}
</script>

<style scoped>
  .d_mtCard{
    width: 100%;
    height: 100%;
  }
  .d_mtCard_title{
    width: 100%;
    text-indent: 10px;
  }
</style>
