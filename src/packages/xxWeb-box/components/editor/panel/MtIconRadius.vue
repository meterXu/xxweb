<!-- 圆角icon -->
<template>
  <div class='radius-box'>
    <div class="radius" :style='style'></div>
  </div>
</template>
<script>
export default {
  props: ['value', 'items', 'isSame'],
  computed: {
    style() {
      const keys = Object.keys(this.value)
      let radius = ''
      keys.map(key => {
        radius += `${this.value[key]}px `
      })
      return `borderRadius: ${radius}`
    }
  }
}
</script>
<style lang="less" scoped>
.radius-box {
  width: 26px;
  height: 26px;
  background: #F1F4F8;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  .radius {
    height: 14px;
    width: 14px;
    border: 1px solid #333;
  }
}
</style>