<template>
  <div class="vertical-control">
    <div v-if="value.length > 0">
      <el-radio-group v-model="innerActiveKey">
        <el-row v-for="(item, index) in value" :key="item.id">
          <el-col>
            <el-radio :label='value[index].id'>
              <el-input v-model="value[index].name" size="mini"></el-input>
              <div class="event-box">
                <el-select size="mini" v-model="value[index].target" placeholder="请选择">
                  <template slot='prefix'>
                    <i class='el-icon-link' style='color: #333; line-height: 28px;'></i>
                  </template>
                  <el-option :key='undefined' label='不跳转' :value='undefined'></el-option>
                  <el-option v-for="item in app.panel" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
    </div>
    <el-row v-else>
      <i class="el-icon-plus" @click="addItem"></i>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MtIcon from '../view/MtIcon.vue'
export default {
  name: "ArrayControl",
  props: ['value', 'activeKey'],
  components: { MtIcon },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      innerActiveKey: null
    }
  },
  computed: {
    ...mapGetters(['app'])
  },
  watch: {
    activeKey(nv){
      this.innerActiveKey = nv
    },
    innerActiveKey(newVal) {
      this.$emit('changeActive', newVal)
    }
  },
  methods: {
    addItem() {
      this.value.push({
        id: "array_" + new Date().valueOf(),
        name: `子标题${this.value.length + 1}`
      })
      this.$emit('change', this.value)
    },
    reduceItem(index) {
      this.value.splice(index, 1)
      this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-radio__label,
/deep/.el-radio {
  display: flex;
  align-items: center;

  .el-input--prefix {
    input {
      padding: 0 25px 0 18px;
    }
  }
}

/deep/.el-radio {
  margin-bottom: 10px;
}

/deep/.el-radio__label {
  &>div:first-child {
    margin-right: 10px;
  }
}
</style>