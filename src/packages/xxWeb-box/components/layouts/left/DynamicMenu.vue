<template>
  <div class="dynamic-menu">
    <Menu
        :collapse="isCollapse">
      <Submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航一</span>
        </template>
        <MenuItem index="1-4-1"><i class="el-icon-s-data"></i>选项1</MenuItem>
        <MenuItem index="1-4-2"><i class="el-icon-s-data"></i>选项2</MenuItem>
      </Submenu>
      <MenuItem index="2">
        <i class="el-icon-s-platform"></i>
        <span slot="title">导航二</span>
      </MenuItem>
      <MenuItem index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </MenuItem>

    </Menu>
  </div>
</template>
<script>
import {Menu,Submenu,MenuItem} from 'element-ui'
export default {
  name:'DynamicMenu',
  props:['isCollapse','permission'],
  components:{
    Menu,
    Submenu,
    MenuItem
  },
  methods:{
  },
  created() {
  }
}
</script>

<script>
export default {
  name:'SMenu',
  render() {
    return (
        <div>1111</div>
    )
  }
}
</script>

