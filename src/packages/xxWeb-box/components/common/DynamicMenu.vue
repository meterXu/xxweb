<script>
import { Menu, Submenu, MenuItem } from 'element-ui'
import mixin from '../../mixin/mixin';
import DyMenuTitle from './DyMenuTitle.vue'
import DynamicIcon from './DynamicIcon.vue'
import ItemLink from './ItemLink.vue'

export default {
  name: 'DynamicMenu',
  props: ['defaultActive', 'mode', 'isCollapse'],
  functional: true,
  mixins: [mixin],
  components: {
    Menu,
    Submenu,
    MenuItem,
    DyMenuTitle,
    DynamicIcon
  },
  render(h, context) {
    const { defaultActive, mode, isCollapse } = context.props;
    const permission = context.injections.app.permission;
    const appConfig = context.injections.app.appConfig;
    // 回溯解决嵌套多层 bug
    function dfsMenu(m, sMenu) {
      if (m.children instanceof Array) {
        let vcs = []
        m.children.filter(c=>!c.meta?.hide).forEach(c => {
          dfsMenu(c, vcs);
        })
        if (m.path) {
          sMenu.push(
              <Submenu index={m.path} popper-class={'xxWeb-xxWebBox-' + appConfig.style.theme}>
                <template slot="title">
                  <DynamicIcon type="menu" meta={m.meta} />
                  <DyMenuTitle meta={m.meta} />
                </template>
                {vcs}
              </Submenu>
          )
        }
      } else {
        if (m.meta && m.path) {
          sMenu.push(
              <ItemLink to={m.path} mode={appConfig.config.menu.mode}>
                <MenuItem index={m.path}>
                  <DynamicIcon type="menu" meta={m.meta} />
                  <template slot="title">
                    <DyMenuTitle meta={m.meta} />
                  </template>
                </MenuItem>
              </ItemLink>
          )
        }
      }
    }
    function renderSubMenu() {
      let sMenu = []
      permission.filter(c=>!c.meta?.hide).forEach(m => {
        dfsMenu(m, sMenu);
      })
      return sMenu
    }

    if (mode === 'vertical') {
      let active_page = mixin.methods.searchMenuByPath(permission, defaultActive)
      if (active_page) {
        return (
            <div class={isCollapse ? 'is-Collapse dynamic-menu' : 'dynamic-menu'}>
              <Menu
                  collapse={isCollapse}
                  default-active={defaultActive}
                  mode={mode}>
                {renderSubMenu()}
              </Menu>
            </div>
        )
      } else {
        return (
            <div class={isCollapse ? 'is-Collapse dynamic-menu' : 'dynamic-menu'}>
              <Menu
                  collapse={isCollapse}
                  mode={mode}>
                {renderSubMenu()}
              </Menu>
            </div>
        )
      }
    } else {
      return (
          <div class={isCollapse ? 'is-Collapse dynamic-menu' : 'dynamic-menu'}>
            <Menu
                collapse={isCollapse}
                mode={mode}>
              {renderSubMenu()}
            </Menu>
          </div>
      )
    }
  }
}
</script>

