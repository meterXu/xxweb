<template>
  <div class="user-wrapper">
    <Dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-user"></i> <span>管理员</span>
      </span>
      <DropdownMenu slot="dropdown">
        <DropdownItem icon="el-icon-delete">清除缓存</DropdownItem>
        <DropdownItem icon="el-icon-edit">修改密码</DropdownItem>
        <DropdownItem icon="el-icon-close">退出系统</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
export default {
  name: "UserMenu",
  components:{
    Dropdown,
    DropdownMenu,
    DropdownItem
  }
}
</script>

<style scoped>
.el-icon-user{
  font-size: 16px
}
.user-wrapper{
  text-align: right;
}
.el-dropdown-link{
  cursor: pointer;
}
</style>
