<template>
  <div class='icon-box'>
    <div class="icon-list" v-for='(item, index) in colorList' :key='index' :class='index === active ? "active" : ""'>
      <div class="icon-color" v-for='val in item.color' :key='val' :style='{ background: val }'>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['fItem', 'modelPro'],
  data() {
    return {
      active: 0,
      colorList: [
        {
          color: ['#A162F7', '#6F88FE', '#45E3FF', '#FDFFF2']
        }
      ]
    }
  },
}
</script>
<style lang="less" scoped>
.icon-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .icon-list.active {
    background-color: #F1F4F8;
  }

  .icon-list:hover {
    background-color: #F1F4F8;
  }

  .icon-list {
    padding: 4px 6px;
    display: flex;
    width: 50%;
    border-radius: 4px;
    cursor: pointer;

    .icon-color {
      height: 14px;
      width: 14px;
    }

    .icon-color:not(:last-child) {
      margin-right: 5px;
    }
  }
}</style>