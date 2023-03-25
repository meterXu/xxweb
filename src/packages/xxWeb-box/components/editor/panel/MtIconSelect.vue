<template>
  <div class='select-box'>
    <div class="icon-drop" :title='val.text' v-for='val in items' :key='val.icon'
      :class='value === val.value ? "active" : ""'>
      <MtIcon :icon='val.icon' size='20' @click='handleClick(val)'></MtIcon>
    </div>
  </div>
</template>
<script>
import MtIcon from "../view/MtIcon"
export default {
  name: "MtIconSelect",
  props: ['value', 'items'],
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    MtIcon
  },
  methods: {
    handleClick(item) {
      this.$emit('change', item.value)
    }
  }
}
</script>
<style scoped lang='less'>
.select-box {
  display: flex;

  .icon-drop {
    margin-right: 6px;
    height: 28px;
    cursor: pointer;
  }

  .icon-drop.active {
    background: #F1F4F8;
  }
}</style>
