<script lang="jsx">
import {RouterLink} from "vue-router";
import {isExternal} from "@/packages/xxWeb-box/utils";
export default function render(_props, _context){

  const context = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  }
  const { to, mode } = context.props
  function _render(to, mode) {
    switch (mode) {
      case 'event': {
        return <a onClick={handleClick} class="box-item-link" href="javascript:;">
          {(context.children.default())}
        </a>
      }
      case 'router':
      default: {
        if (isExternal(to)) {
          return <a onClick={handleClick} class="box-item-link" href={to} target="_blank">
            {(context.children.default())}
          </a>
        }else{
          return <RouterLink class="box-item-link" to={to}>
            {(context.children.default())}
          </RouterLink>
        }
      }
    }
  }
  function handleClick() {
    if (this.mode === 'event') {
      this.$bus.$emit('menuClick', this.to)
    }
  }
  return _render(to,mode)
}
</script>
