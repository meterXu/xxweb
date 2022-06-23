<script>
import DynamicIcon from "./DynamicIcon.vue";
export default {
  name: 'DyMenuItem',
  functional: true,
  props:['meta'],
  components:{
    DynamicIcon
  },
  render(h, context) {
    const { meta } = context.props;
    const vnodes = [];
    if(meta){
      if (meta.icon) {
        vnodes.push(<DynamicIcon icon={meta.icon}/>)
      }
      if (meta.title) {
        vnodes.push(<span>{meta.title}</span>);
      }
    }
    return vnodes;
  }
};
</script>
