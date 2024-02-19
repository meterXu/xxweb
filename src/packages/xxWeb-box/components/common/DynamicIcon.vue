<script lang="jsx">
import {h} from 'vue'
import {ElIcon} from "element-plus";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default function render(_props, _context) {
  const context = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  }
  const { type, meta } = context.props
  if (meta && meta.icon) {
    if (typeof meta.icon === 'object'&& typeof meta.icon.render==='function') {
      return meta.icon.render()
    } else if (typeof meta.icon === 'function') {
      return meta.icon()
    } else {
      let metaIcon = Object.entries(ElementPlusIconsVue).find(c=>c[0]===meta.icon)
      return metaIcon?h(ElIcon,()=>[h(metaIcon[1])]):''
    }
  } else {
    return null
  }
}
</script>
