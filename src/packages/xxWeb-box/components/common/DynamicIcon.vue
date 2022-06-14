<script>
export default {
  name: "DynamicIcon",
  props:['icon'],
  functional:true,
  render(createElement, context) {
    if (context.props.icon) {
      if (typeof (context.props.icon) === 'object'){
        return (context.props.icon)
      }
      else {
        return (<i class={context.props.icon} />)
      }
    }else{
      return null;
    }
  }
}
</script>