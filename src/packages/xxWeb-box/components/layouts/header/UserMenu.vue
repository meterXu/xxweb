<template>
  <div class="user-wrapper">
    <Dropdown>
      <span class="el-dropdown-link">
        <i v-if="appConfig.config.head.user.username" class="el-icon-user"></i> <span>管理员</span>
      </span>
      <DropdownMenu v-if="appConfig.config.head.user.menu.show" slot="dropdown" >
        <DropdownItem v-if="appConfig.config.head.user.menu.cache" icon="el-icon-delete">清除缓存</DropdownItem>
        <DropdownItem v-if="appConfig.config.head.user.menu.password" icon="el-icon-edit">修改密码</DropdownItem>
        <DropdownItem v-if="appConfig.config.head.user.menu.exit" icon="el-icon-close">退出系统</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
import mixin from "../../../mixin/mixin";
export default {
  name: "UserMenu",
  components:{
    Dropdown,
    DropdownMenu,
    DropdownItem
  },
  mixins:[mixin]
}
</script>
