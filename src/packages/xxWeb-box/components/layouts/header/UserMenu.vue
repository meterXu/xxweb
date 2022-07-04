<template>
  <div class="user-wrapper">
    <div class="user-wrapper-container">
      <div class="user-wrapper-avatar" v-if="type==='avatar'">
        <Avatar :size="55" :src="circleUrl"></Avatar>
      </div>
      <div class="user-wrapper-username">
        <Dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i v-if="type==='text'" class="el-icon-user"></i>
          <slot name="userName" v-if="appConfig.config.head.user.username">
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
        <div class="user-vip" v-if="type==='avatar'">
          <div class="user-vip-img">&nbsp;</div>
          <div class="user-vip-text">vip6</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Dropdown,DropdownMenu,DropdownItem,Avatar} from 'element-ui'
import mixin from "../../../mixin/mixin";
export default {
  name: "UserMenu",
  props:['type'],
  components:{
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar
  },
  data(){
    return {
      circleUrl:require('../../../assets/imgs/sharpicons_Monkey.png')
    }
  },
  mixins:[mixin],
  methods:{
    handleCommand(command){
      this.$bus.$emit('dropdownMenuClick',command)
    }
  }
}
</script>
