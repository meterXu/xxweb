<template>
  <component v-bind="linkProps(to, mode)" @click="handleClick">
    <slot />
  </component>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
import { isExternal } from '../../utils'

export default {
  name: 'ItemLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: 'router',
    },
  },
  methods: {
    linkProps(to, mode) {
      switch (mode) {
        case 'event': {
          return {
            is: 'a',
            class: 'box-item-link',
            href: 'javascript:;',
          }
          break
        }
        case 'router':
        default: {
          if (isExternal(to)) {
            return {
              is: 'a',
              class: 'box-item-link',
              href: to,
              target: '_blank',
            }
          }
          return {
            is: 'router-link',
            class: 'box-item-link',
            to: to,
          }
        }
      }
    },
    handleClick() {
      if (this.mode === 'event') {
        $emit(this.$bus, 'menuClick', this.to)
      }
    },
  },
  emits: ['menuClick'],
}
</script>
