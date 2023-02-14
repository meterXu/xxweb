<template>
  <el-dialog
      title="静态数据"
      :visible.sync="visible"
      width="60%"
      @close="onCancel">
    <div class="hot--box">
      <hot-table ref="staticTable" :settings="hotSettings"></hot-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="handleSuccess">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { HotTable } from '@handsontable/vue';
// import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
export default {
  name: "tableDialog",
  props:['visible','tableData'],
  model:{
    prop:'visible',
    event:'change'
  },
  components: {
    HotTable
  },
  watch:{
    tableData(nv) {
      console.log(nv)
      this.data=nv
    }
  },
  data() {
    return {
      hotSettings: {
        data: [
          ['A1', 'B1', 'C1', 'D1'],
          ['A2', 'B2', 'C2', 'D2'],
          ['A3', 'B3', 'C3', 'D3'],
          ['A4', 'B4', 'C4', 'D4'],
        ],
        colHeaders: true,
        rowHeaders: true,
        minCols: 26,
        minRows: 37,
        height: 500,
        afterChange: this.afterChange,
        licenseKey: 'non-commercial-and-evaluation'
      },
      maxRow:0,
      maxCol:0
    }
  },
  methods:{
    onCancel() {
      this.$emit('change',false)
    },
    handleSuccess(){
      this.$emit('changeData',this.tableData)
      // this.$emit('change',false)
    },
    afterChange(changes, source) {
      if(changes) {
        if(this.maxRow<changes[0][0]) {
          this.maxRow=changes[0][0]
        }
        if(this.maxCol<changes[0][1]) {
          this.maxCol=changes[0][1]
        }
        console.log(this.$refs.staticTable.hotInstance.getDataAtRow(0))
        console.log(this.$refs.staticTable.hotInstance.getDataAtCol(0))
        // this.data = this.$refs.staticTable.hotInstance.getData(this.maxRow,this.maxCol)
        const row = this.removeEmptyArray(this.$refs.staticTable.hotInstance.getDataAtRow(0))
        const col =  this.removeEmptyArray(this.$refs.staticTable.hotInstance.getDataAtCol(0))
        console.log(row,col)
        this.data = this.$refs.staticTable.hotInstance.getData(row,col)
        console.log(this.data)
      }
    },
    removeEmptyArray(data) {
      let num = 0
      data.some((item,index) => {
        if(!item) {
          num = index
          return true
        }
      })
      return num-1
    }
  }
}
</script>

<style scoped>
.hot-table-box {
  /*width: 100%;*/
  /*height: 600px;*/
  /*overflow: auto;*/
}
</style>
