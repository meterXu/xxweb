import {Menu,Submenu,MenuItem} from 'element-ui'
export default {
  name:'DynamicMenu',
  props:['isCollapse','permission'],
  components:{
    Menu,
    Submenu,
    MenuItem
  },
  methods:{
      renderIcon(icon){
          if(typeof(icon)==='object'){
              return icon
          }else {
              return (<i class={icon}></i>)
          }
      },
      renderSubMenu(){
          let sMenu= []
          this.permission.forEach(menu=>{
              if(menu.children instanceof Array){
                  let xx = []
                  menu.children.forEach(c=>{
                      xx.push(
                          <MenuItem index={c.path}>
                              {this.renderIcon(c.meta.icon)}
                              {c.meta.title}
                          </MenuItem>)
                  })
                  sMenu.push(
                      <Submenu index={menu.path}>
                          <template slot="title">
                              {this.renderIcon(menu.meta.icon)}
                              <span>{menu.meta.title}</span>
                          </template>
                          {xx}
                      </Submenu>)
              }else{
                  sMenu.push(
                      <MenuItem index={menu.path}>
                          {this.renderIcon(menu.meta.icon)}
                          {menu.meta.title}
                      </MenuItem>
                  )
              }
          })
          return sMenu
      }
  },
  render() {
      const sMenu = this.renderSubMenu()
      return (
        <div class="dynamic-menu">
          <Menu
          collapse={this.isCollapse}>
              {sMenu}
        </Menu>
      </div>
    )
  }
}

