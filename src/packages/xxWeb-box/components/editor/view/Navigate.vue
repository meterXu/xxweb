<template>
  <div class="navigation-container" :style="{width:`${config.width}px`,height:`${config.height}px`}">
    <div :style="{position: 'relative',transform: `scale(${config.scale})`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigate",
  props:['config'],
  mounted() {

  }
}
</script>

<style scoped>
.navigation-container{
  width: 224px;
  height: 160px;
  border: 1px solid #42516c;
  background-color: rgba(24,31,41,.5);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  z-index: 1000;
  overflow: hidden;
  right: 16px;
  bottom: 40px;
  pointer-events: all;
  cursor: default;
}
</style>