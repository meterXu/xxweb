<template>
  <div class="user-wrapper">
    <Dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <i v-if="appConfig.config.head.user.username" class="el-icon-user"></i> <span>管理员</span>
      </span>
      <DropdownMenu v-if="appConfig.config.head.user.menu.show" slot="dropdown">
        <DropdownItem command="clearCache" v-if="appConfig.config.head.user.menu.cache" icon="el-icon-delete">清除缓存</DropdownItem>
        <DropdownItem command="changePwd" v-if="appConfig.config.head.user.menu.password" icon="el-icon-edit">修改密码</DropdownItem>
        <DropdownItem command="exitSystem" v-if="appConfig.config.head.user.menu.exit" icon="el-icon-close">退出系统</DropdownItem>
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
      switch (command){
        case 'clearCache':{
          this.$bus.$emit('clearCache')
        }break;
        case 'changePwd':{
          this.$bus.$emit('changePwd')
        }break;
        case 'exitSystem':{
          this.$bus.$emit('exitSystem')
        }break;
      }
    }
  }
}
</script>
