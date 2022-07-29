
<template>
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '../../utils';

export default {
  name:'ItemLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(to) {
      if (isExternal(to)) {
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
}
</script>
