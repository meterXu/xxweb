<script lang="jsx">
import { plantRenderPara } from '../../utils/gogocodeTransfer.js'
import * as Vue from 'vue'
export default function render(_props, _context) {
  const context = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  }
  const { type, meta } = context.props
  if (meta && meta.icon) {
    if (typeof meta.icon === 'object') {
      if (meta.icon.hasOwnProperty('render')) {
        return Vue.h(
          meta.icon,
          plantRenderPara({
            class: type === 'menu' ? 'el-icon-dog-icon' : '',
          })
        )
      } else {
        return Vue.h(
          'DoIcon',
          plantRenderPara({
            props: {
              icon: meta.icon.icon,
              conf: Object.assign(
                type === 'menu'
                  ? { size: 18, fill: 'currentColor' }
                  : { size: 14, fill: 'currentColor' },
                meta.icon.conf
              ),
            },
            class: type === 'menu' ? 'el-icon-dog-icon' : '',
          })
        )
      }
    } else if (typeof meta.icon === 'function') {
    } else {
      return <i class={meta.icon} />
    }
  } else {
    return null
  }
}
</script>
