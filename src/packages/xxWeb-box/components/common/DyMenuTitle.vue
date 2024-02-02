<script lang="jsx">
import * as Vue from 'vue'
export default function render(_props, _context) {
  const context = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  }
  const { meta } = context.props
  if (meta.title) {
    return <span>{meta.title}</span>
  } else {
    return null
  }
}
</script>
