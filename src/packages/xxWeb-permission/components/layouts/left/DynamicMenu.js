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
  },
  render() {

      let sMenu= null
      this.permission.forEach(menu=>{
          if(typeof menu === 'Array'){
              let xx = null
              menu.forEach(c=>{
                  xx +=(<MenuItem index={c.path}><i class="el-icon-s-data"></i>{c.meta.title}</MenuItem>)
              })
              sMenu+=(<Submenu index="1">{xx}</Submenu>)
          }
      })

    return (
        <div class="dynamic-menu">
          <Menu
          collapse={this.isCollapse}>
          <Submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航一</span>
            </template>
            <MenuItem index="1-4-1"><i class="el-icon-s-data"></i>选项1</MenuItem>
            <MenuItem index="1-4-2"><i class="el-icon-s-data"></i>选项2</MenuItem>
          </Submenu>
          <MenuItem index="2">
            <i class="el-icon-s-platform"></i>
            <span slot="title">导航二</span>
          </MenuItem>
          <MenuItem index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </MenuItem>

        </Menu>
      </div>
    )
  }
}

