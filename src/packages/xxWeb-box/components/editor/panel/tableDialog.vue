<!--
 * @Author: zhangyuc
 * @Date: 2023-03-25 10:40:45
 * @LastEditors: zhangyuc
 * @LastEditTime: 2023-03-29 16:07:12
 * @Description: 
-->
<template>
  <el-dialog
      title="静态数据"
      :visible="visible"
      width="60%"
      append-to-body
      @close="onCancel">
    <div class="hot--box">
      <hot-table ref="staticTable" :data="tableData" :settings="hotSettings"></hot-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel" class="cancle">取 消</el-button>
      <el-button type="primary" @click="handleSuccess" class="confirm-button">确 定</el-button>
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
    visible(nv) {
      if(nv) {
        this.$nextTick(()=>{
          this.$refs.staticTable.hotInstance.updateData(this.tableData)
        })
      }
    }
  },
  data() {
    return {
      hotSettings: {
        colHeaders: true,
        rowHeaders: true,
        minCols: 26,
        minRows: 37,
        height: 500,
        afterChange: this.afterChange,
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  methods:{
    onCancel() {
      this.$emit('change',false)
    },
    handleSuccess() {
      this.afterChange(true)
      this.$emit('changeData',this.data)
      this.$emit('change',false)
    },
    afterChange(changes, source) {
      if(changes) {
        let row = this.removeEmptyArray(this.$refs.staticTable.hotInstance.getDataAtRow(0)) - 1
        let col =  this.removeEmptyArray(this.$refs.staticTable.hotInstance.getDataAtCol(0)) - 1
        this.data = this.$refs.staticTable.hotInstance.getData(col,row)
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
      return num
    }
  }
}
</script>
<class lang="less" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  .confirm-button {
    border-color: #4634EE;
    background: #4634EE;
    display: flex;
    text-align: center;
    height: 32px;
    margin-left: 50px;
    align-items: center;
  }
}
</class>