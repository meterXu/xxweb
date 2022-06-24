<template>
  <Drawer :visible="visible"
          direction="ltr"
          :before-close="handleClose">
    <slot name="leftSide" :data="{isCollapse:visible,permission:this.permission}">
      <SideMenu :isCollapse="visible" mode="vertical"></SideMenu>
    </slot>
  </Drawer>
</template>

<script>
import mixin from "../../../mixin/mixin";
import SideMenu from './SideMenu'
import {Drawer} from 'element-ui'
export default {
  name: "DrawerMenu",
  props:['visible'],
  model:{
    prop:'visible',
    event:'change'
  },
  mixins:[mixin],
  components:{SideMenu,Drawer},
  methods:{
    handleClose(){
      this.$emit('change',false)
    }
  }
}
</script>

<style scoped>

</style>
