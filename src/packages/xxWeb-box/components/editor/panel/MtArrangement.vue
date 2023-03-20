<!--
 * @Author: zhangyuc
 * @Date: 2023-03-17 10:27:03
 * @LastEditors: zhangyuc
 * @LastEditTime: 2023-03-20 14:34:50
 * @Description: 布局 组件
-->
<template>
  <div class="arrangement">
    <div>
      <div class="left-top" :class="judgeActive('left', 'top')" @click="change('left', 'top')">
        <div style="width:12px;height: 4px;"></div>
      </div>
      <div class="center-top" :class="judgeActive('center', 'top')" @click="change('center', 'top')">
        <div style="width:24px;height: 4px;"></div>
      </div>
      <div class="right-top" :class="judgeActive('right', 'top')" @click="change('right', 'top')">
        <div style="width:12px;height: 4px;"></div>
      </div>
    </div>
    <div>
      <div class="left-center" :class="judgeActive('left', 'center')" @click="change('left', 'center')">
        <div style="width:4px;height: 12px;"></div>
      </div>
      <div class="center-center"></div>
      <div class="right-center" :class="judgeActive('right', 'center')" @click="change('right', 'center')">
        <div style="width:4px;height: 12px;"></div>
      </div>
    </div>
    <div>
      <div class="left-bottom" :class="judgeActive('left', 'bottom')" @click="change('left', 'bottom')">
        <div style="width:12px;height: 4px;"></div>
      </div>
      <div class="center-bottom" :class="judgeActive('center', 'bottom')" @click="change('center', 'bottom')">
        <div style="width:24px;height: 4px;"></div>
      </div>
      <div class="right-bottom" :class="judgeActive('right', 'bottom')" @click="change('right', 'bottom')">
        <div style="width:12px;height: 4px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MtArrangement",
  props: ['left', 'top'],
  methods: {
    judgeActive(left, top) {
      return (this.left === left && this.top === top)?'active':'';
    },
    change(left, top) {
      this.$emit('changeArrange', { left, top })
    },
  }
}
</script>
<style lang="less" scoped>
.arrangement {
  width: 152px;

  div {
    display: flex;
    justify-content: space-between;

    div {
      width: 45px;
      height: 24px;
      border: 1px solid #DDDDDD;
      margin-top: 5px;
      cursor: pointer;
      div {
        background-color: #DDDDDD;
        margin: 4px 6px;
      }
    }

    .active {
      border-color: #4634EE;
      div {
        background-color: #4634EE;
      }
    }

    .left-top {
      border-radius: 6px 0px 0px 0px;
    }

    .center-top {
      display: flex;
      justify-content: center;
    }

    .right-top {
      display: flex;
      justify-content: end;
      border-radius: 0px 6px 0px 0px;
    }

    .left-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .center-center {
      background-color: #DDDDDD;
      cursor: default;
    }

    .right-center {
      display: flex;
      justify-content: end;
      align-items: center;
    }

    .left-bottom {
      display: flex;
      flex-direction: column;
      justify-content: end;
      border-radius: 0px 0px 0px 6px;
    }

    .center-bottom {
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center;
    }

    .right-bottom {
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: end;
      border-radius: 0px 0px 6px 0px;
    }

  }
}
</style>

