<script>
export default {
  name: "DynamicIcon",
  props:['meta'],
  functional:true,
  render(createElement, context) {
    const { meta } = context.props;
    if (meta.icon) {
      if (typeof (meta.icon) === 'object'){
        return (meta.icon)
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
