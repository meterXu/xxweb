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
          class:'xxweb-box-icon'
        })
      }
      else {
        return (<i class={[meta.icon,'xxweb-box-icon']} />)
      }
    }else{
      return null;
    }
  }
}
</script>