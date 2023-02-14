<template>
  <div class="data-components">
    <div class="top-radio">
      <el-radio v-model="value.source.type" :label="2">静态数据</el-radio>
      <el-radio v-model="value.source.type" :label="3">动态数据</el-radio>
    </div>
    <div v-show="value.source.type===2" class="static-data">
      <div v-if="value.type==='echarts'" class="spreadsheet">
        <el-button size="small" @click="handleSheet">配置数据</el-button>
      </div>
      <div v-else class="static-form">
        DOM数据
      </div>
    </div >
    <div v-show="value.source.type===3" class="dynamic-data">
        动态数据
    </div>
    <tableDialog v-model="dialogVisible" :tableData="tableData" @changeData="changeData"></tableDialog>
  </div>
</template>

<script>
// import { HotTable } from '@handsontable/vue';
// import { registerAllModules } from 'handsontable/registry';
// import 'handsontable/dist/handsontable.full.css';
import tableDialog from './tableDialog'
export default {
  name: "DataComponents",
  props:['value'],
  model:{
    prop:'value',
    event:'change'
  },
  components: {
    tableDialog
  },
  data() {
    return {
      dialogVisible: false,
      tableData:[],
      hotSettings: {
        colHeaders: true,
        rowHeaders: true,
        minCols: 10,
        minRows: 10,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  methods:{
    handleSheet() {
      this.dialogVisible = true
    },
    changeData(data) {
      console.log(data)
    }
  },
}
</script>

<style lang="less" scoped>
.data-components {
  width: 100%;
  height: 100%;
}
</style>
