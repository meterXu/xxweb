<script>
export default {
  name: 'DyMenuItem',
  functional: true,
  props:['meta'],
  render(h, context) {
    function createIcon(icon){
      if (icon) {
        if (typeof (icon) === 'object'){
          return (icon)
        }
        else {
          return (<i class={icon} />)
        }
      }
    }
    const { meta } = context.props;
    const vnodes = [];
    if(meta){
      if (meta.icon) {
        vnodes.push(createIcon(meta.icon))
      }
      if (meta.title) {
        vnodes.push(<span>{meta.title}</span>);
      }
    }
    return vnodes;
  }
};
</script>
