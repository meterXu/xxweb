<template>
  <div class="user-wrapper">
    <div class="user-wrapper-container">
      <div class="user-wrapper-avatar" v-if="type==='avatar'">
        <Dropdown  v-if="isCollapse" @command="handleCommand">
          <Avatar class="avatar-img" :size="50" :src="circleUrl"></Avatar>
          <DropdownMenu v-if="user.menu.show" slot="dropdown">
            <slot name="user-dropdownMenuItem" :menu="user.menu">
              <DropdownItem command="clearCache" v-if="user.menu.clearCache" icon="el-icon-delete">清除缓存</DropdownItem>
              <DropdownItem command="changePwd" v-if="user.menu.changePwd" icon="el-icon-edit">修改密码</DropdownItem>
              <DropdownItem command="exitSystem" v-if="user.menu.exitSystem" icon="el-icon-close">退出系统</DropdownItem>
            </slot>
          </DropdownMenu>
        </Dropdown>
        <Avatar v-if="!isCollapse" class="avatar-img" :size="50" :src="circleUrl"></Avatar>
      </div>
      <div class="user-wrapper-username" v-if="!isCollapse">
        <Dropdown @command="handleCommand">
        <span class="el-dropdown-link flex-middle">
          <i v-if="type==='text'" class="el-icon-user"></i>
          <span class="user-userName" v-if="user.username">
            <slot name="user-userName">
             管理员
            </slot>
          </span>
          <i style="line-height: 20px" class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <DropdownMenu v-if="user.menu.show" slot="dropdown">
            <slot name="user-dropdownMenuItem" :menu="user.menu">
              <DropdownItem command="clearCache" v-if="user.menu.clearCache" icon="el-icon-delete">清除缓存</DropdownItem>
              <DropdownItem command="changePwd" v-if="user.menu.changePwd" icon="el-icon-edit">修改密码</DropdownItem>
              <DropdownItem command="exitSystem" v-if="user.menu.exitSystem" icon="el-icon-close">退出系统</DropdownItem>
            </slot>
          </DropdownMenu>
        </Dropdown>
        <div class="user-vip" v-if="type==='avatar'&&user.tag">
          <slot name="user-tag">
            <div class="user-vip-img">&nbsp;</div>
            <div class="user-vip-text">
              <slot name="user-tag-text">
                vip6
              </slot>
            </div>
          </slot>
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
  props:['type','isCollapse','user'],
  components:{
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar
  },
  data(){
    return {
      circleUrl:require('../../../assets/imgs/user.png')
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
