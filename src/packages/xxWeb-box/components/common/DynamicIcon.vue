<script>
export default {
  name: "DynamicIcon",
  props:['type','meta'],
  functional:true,
  render(h, context) {
    const { type,meta } = context.props;
    if (meta&&meta.icon) {
      if (typeof (meta.icon) === 'object'&&meta.icon.hasOwnProperty('render')){
        return h(meta.icon,{
          class:type==='menu'?'el-icon-dog-icon':''
        })
      }
      else {
        return (<i class={meta.icon} />)
      }
    }else{
      return null;
    }
  }
}
</script>