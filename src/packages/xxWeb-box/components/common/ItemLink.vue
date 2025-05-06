
<template>
  <component v-bind="linkProps(to,mode)" @click="handleClick">
    <slot />
  </component>
</template>

<script>
import mixin from '../../mixin/mixin';
export default {
  name:'ItemLink',
  props: {
    to: {
      type: String,
      required: true
    },
    mode:{
      type: String,
      default:'router'
    }
  },
  mixins:[mixin],
  methods: {
    linkProps(to,mode) {
      switch (mode){
        case 'event':{
          return {
            is: 'a',
            class:"box-item-link",
            href: 'javascript:;'
          };
        }
        case 'router':
        default:
          {
          if (this.isExternal(to)) {
            return {
              is: 'a',
              class:"box-item-link",
              href: to,
              target: '_blank'
            };
          }
          return {
            is: 'router-link',
            class:'box-item-link',
            to: to
          };
        }
      }
    },
    handleClick(){
      if(this.mode==='event'){
        this.$bus.$emit('menuClick',this.to);
      }
    }
  }
}
</script>
