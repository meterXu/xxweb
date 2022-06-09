<script>
import {Menu, Submenu, MenuItem} from 'element-ui'
import mixin from "../../../mixin/mixin";
import DyMenuItem from './DyMenuItem'
import ItemLink from './ItemLink'

export default {
  name: 'DynamicMenu',
  props: ['isCollapse', 'permission'],
  functional: true,
  mixins: [mixin],
  components: {
    Menu,
    Submenu,
    MenuItem,
    DyMenuItem
  },
  render(h, context) {
    const {isCollapse, permission} = context.props;
    const {appConfig} = context.injections

    function renderSubMenu() {
      let sMenu = []
      permission.forEach(m => {
        if (m.children instanceof Array) {
          let vcs = []
          m.children.forEach(c => {
            vcs.push(
                <ItemLink v-if={c.meta} to={c.path}>
                  <MenuItem index={c.path}>
                    <template slot="title">
                      <DyMenuItem meta={c.meta}/>
                    </template>
                  </MenuItem>
                </ItemLink>
            )
          })
          sMenu.push(
              <Submenu index={m.path}>
                <template slot="title">
                  <DyMenuItem meta={m.meta}/>
                </template>
                {vcs}
              </Submenu>)
        } else {
          sMenu.push(
              <ItemLink v-if={c.meta} to={c.path}>
                <MenuItem index={m.path}>
                  <template slot="title">
                    <DyMenuItem meta={m.meta}/>
                  </template>
                </MenuItem>
              </ItemLink>
          )
        }
      })
      return sMenu
    }

    return (
        <div class="dynamic-menu">
          <Menu
              collapse={isCollapse}
              default-active={appConfig.redirect.index}>
            {renderSubMenu()}
          </Menu>
        </div>
    )
  }
}
</script>

