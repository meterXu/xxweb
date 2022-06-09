<script>
export default {
  name: 'DyMenuItem',
  functional: true,
  props:['meta'],
  render(h, context) {
    const { meta } = context.props;
    const vnodes = [];
    if(meta){
      if (meta.icon) {
        if (typeof (meta.icon) === 'object'){
          vnodes.push(meta.icon)
        }
        else {
          vnodes.push(<i class={meta.icon} />);
        }
      }
      if (meta.title) {
        vnodes.push(<span>{meta.title}</span>);
      }
    }
    return vnodes;
  }
};
</script>
