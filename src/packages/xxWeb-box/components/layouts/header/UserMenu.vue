<template>
  <div class="user-wrapper">
    <Dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <i v-if="appConfig.config.head.user.username" class="el-icon-user"></i>
        <slot name="userName">
          <span>管理员</span>
        </slot>
      </span>
      <DropdownMenu v-if="appConfig.config.head.user.menu.show" slot="dropdown">
        <slot name="dropdownMenuItem" :menu="appConfig.config.head.user.menu">
          <DropdownItem command="clearCache" v-if="appConfig.config.head.user.menu.clearCache" icon="el-icon-delete">清除缓存</DropdownItem>
          <DropdownItem command="changePwd" v-if="appConfig.config.head.user.menu.changePwd" icon="el-icon-edit">修改密码</DropdownItem>
          <DropdownItem command="exitSystem" v-if="appConfig.config.head.user.menu.exitSystem" icon="el-icon-close">退出系统</DropdownItem>
        </slot>
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
  mixins:[mixin],
  methods:{
    handleCommand(command){
      this.$bus.$emit('dropdownMenuClick',command)
    }
  }
}
</script>
