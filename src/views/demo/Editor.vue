<template>
  <div class="editor">
    <MtView>
      <div style="width: 1024px;height: 768px;background-color: #fff"></div>
    </MtView>
  </div>
</template>

<script>
export default {
  name: "EditorView"
}
</script>

<style>
html,body,#app{
  overflow: hidden;
}
.editor{
  display: flex;
  overflow: hidden;
  flex: 1;
  position: absolute;
  top: 41px;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>