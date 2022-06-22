<script>
import {Menu, Submenu, MenuItem} from 'element-ui'
import mixin from "../../../mixin/mixin";
import DyMenuItem from './DyMenuItem.vue'
import ItemLink from './ItemLink.vue'

export default {
  name: 'DynamicMenu',
  props: ['isCollapse','defaultActive'],
  functional: true,
  mixins: [mixin],
  components: {
    Menu,
    Submenu,
    MenuItem,
    DyMenuItem
  },
  render(h, context) {
    const {isCollapse, defaultActive} = context.props;
    const permission = context.injections.permission
    function renderSubMenu() {
      let sMenu = []
      permission.forEach(m => {
        if (m.children instanceof Array) {
          let vcs = []
          m.children.forEach(c => {
            if(c.meta){
              vcs.push(
                  <ItemLink to={c.path}>
                    <MenuItem index={c.path}>
                      <template slot="title">
                        <DyMenuItem meta={c.meta}/>
                      </template>
                    </MenuItem>
                  </ItemLink>
              )
            }
          })
          sMenu.push(
              <Submenu index={m.path}>
                <template slot="title">
                  <DyMenuItem meta={m.meta}/>
                </template>
                {vcs}
              </Submenu>)
        } else {
          if(m.meta){
            sMenu.push(
                <ItemLink to={m.path}>
                  <MenuItem index={m.path}>
                    <template slot="title">
                      <DyMenuItem meta={m.meta}/>
                    </template>
                  </MenuItem>
                </ItemLink>
            )
          }
        }
      })
      return sMenu
    }

    return (
        <div class="dynamic-menu">
          <Menu
              collapse={isCollapse}
              default-active={defaultActive}>
            {renderSubMenu()}
          </Menu>
        </div>
    )
  }
}
</script>

