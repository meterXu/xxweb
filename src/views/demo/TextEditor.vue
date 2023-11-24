<template>
<div class="markdown-editor-warp">
  <TextEditor/>
</div>
</template>
<script>
import TextEditor from "../../packages/text-editor";
export default {
  name: "TextEditorDemo",
  components:{TextEditor}
}
</script>
<style scoped>
.markdown-editor-warp {
  width: 500px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
