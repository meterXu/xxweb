<template>
  <Drawer :visible="visible"
          direction="ltr"
          :show-close="false"
          custom-class="mobile-drawer"
          :before-close="handleClose">
    <slot name="leftSide" :data="{isCollapse:false,permission:this.permission}">
      <SideMenu :isCollapse="false" mode="vertical"></SideMenu>
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
  computed:{
    width(){
      return this.isCollapse?'65px': this.appConfig.config.sideMenu.width
    }
  },
  methods:{
    handleClose(){
      this.$emit('change',false)
    }
  }
}
</script>

<style scoped>

</style>
