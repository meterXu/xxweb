<template>
  <el-icon class="menu-search-icon full-screen-icon">
    <FullScreenIcon @click="handleFullScreen"/>
  </el-icon>
</template>

<script>
import {FullScreen as FullScreenIcon} from '@element-plus/icons-vue'
import mixin from '../../../mixin/mixin'
export default {
  name: 'FullScreen',
  components:{
    FullScreenIcon
  },
  mixins:[mixin],
  methods: {
    handleFullScreen() {
      const element = document.querySelector("body");
      if (element) {
        this.$bus.$emit('fullScreen',element)
      }
    },
  },
}
</script>
