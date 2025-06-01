<script lang="jsx">
export default function render(_props, _context) {
  const context = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  }
  const { type, meta } = context.props
  if (meta && meta.icon) {
    if (typeof meta.icon === 'object' && typeof meta.icon.render==='function') {
      return meta.icon.render()
    } else if (typeof meta.icon === 'function') {
      return meta.icon()
    }
  } else {
    return null
  }
}
</script>
