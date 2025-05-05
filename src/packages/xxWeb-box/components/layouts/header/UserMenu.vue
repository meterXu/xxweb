<template>
  <div class="user-wrapper">
    <div class="user-wrapper-container">
      <div class="user-wrapper-avatar" v-if="type === 'avatar'">
        <Dropdown v-if="isCollapse" @command="handleCommand" tabindex="">
          <div class="avatar-warp">
            <Avatar class="avatar-img" :size="50" :src="circleUrl"></Avatar>
            <slot name="user-wrapper-avatar-icon"></slot>
          </div>
          <template v-slot:dropdown>
            <DropdownMenu v-if="app.appConfig.config.head.user.menu.show">
              <slot
                name="side-user-dropdownMenuItem"
                :menu="app.appConfig.config.head.user.menu"
              >
                <DropdownItem
                  command="clearCache"
                  v-if="app.appConfig.config.head.user.menu.clearCache"
                  icon="delete"
                  >清除缓存</DropdownItem
                >
                <DropdownItem
                  command="changePwd"
                  v-if="app.appConfig.config.head.user.menu.changePwd"
                  icon="edit"
                  >修改密码</DropdownItem
                >
                <DropdownItem
                  command="exitSystem"
                  v-if="app.appConfig.config.head.user.menu.exitSystem"
                  icon="close"
                  >退出系统</DropdownItem
                >
              </slot>
            </DropdownMenu>
          </template>
        </Dropdown>
        <div class="avatar-warp" v-if="!isCollapse">
          <Avatar class="avatar-img" :size="50" :src="circleUrl"></Avatar>
          <slot name="user-wrapper-avatar-icon"></slot>
        </div>
      </div>
      <div class="user-wrapper-username" v-if="!isCollapse">
        <Dropdown @command="handleCommand" tabindex="">
          <span class="el-dropdown-link flex-middle">
            <el-icon v-if="type==='text'"><User/></el-icon>
            <span
              class="side-user-userName"
              v-if="app.appConfig.config.head.user.username"
            >
              <slot name="side-user-userName"> 管理员 </slot>
            </span>
            <el-icon style="line-height: 20px" class="el-icon--right"><ArrowDown /></el-icon>
          </span>
          <template v-slot:dropdown>
            <DropdownMenu v-if="app.appConfig.config.head.user.menu.show">
              <slot
                name="side-user-dropdownMenuItem"
                :menu="app.appConfig.config.head.user.menu"
              >
                <DropdownItem
                  command="clearCache"
                  v-if="app.appConfig.config.head.user.menu.clearCache"
                  icon="delete"
                  >清除缓存</DropdownItem
                >
                <DropdownItem
                  command="changePwd"
                  v-if="app.appConfig.config.head.user.menu.changePwd"
                  icon="edit"
                  >修改密码</DropdownItem
                >
                <DropdownItem
                  command="exitSystem"
                  v-if="app.appConfig.config.head.user.menu.exitSystem"
                  icon="close"
                  >退出系统</DropdownItem
                >
              </slot>
            </DropdownMenu>
          </template>
        </Dropdown>
        <div
          class="user-vip"
          v-if="type === 'avatar' && app.appConfig.config.sideMenu.user.tag"
        >
          <slot name="side-user-tag">
            <div class="user-vip-img">&nbsp;</div>
            <div class="user-vip-text">
              <slot name="side-user-tag-text"> vip6 </slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElDropdown as Dropdown,
  ElDropdownMenu as DropdownMenu,
  ElDropdownItem as DropdownItem,
  ElAvatar as Avatar,
} from 'element-plus'
import mixin from '../../../mixin/mixin.js'
import UserImg from '../../../assets/imgs/user.webp'
export default {
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar,
  },
  name: 'UserMenu',
  props: ['type', 'isCollapse'],
  data() {
    return {
      circleUrl: UserImg,
    }
  },
  mixins: [mixin],
  methods: {
    handleCommand(command) {
      this.$bus.$emit('dropdownMenuClick', command)
    },
  }
}
</script>
