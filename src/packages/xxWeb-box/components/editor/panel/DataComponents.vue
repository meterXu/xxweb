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
      <el-form label-position="left" label-width="60px" :model="source" size="small">
        <el-form-item class="none-label">
          <el-row type="flex" justify="space-between">
            <el-col :span="12">
              <el-checkbox v-model="source.autoupdate">自动更新请求</el-checkbox>
            </el-col>
            <el-col v-if="source.autoupdate" :span="11" style="display: flex;justify-content: flex-end">
              <el-input v-model.number="source.autoupdateTime"></el-input>
              <span style="width: 60px;margin-left: 4px;font-size: 12px">秒/次</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <span slot="label">数据服务</span>
          <span style="font-size: 12px;">{{source.method}}</span>
        </el-form-item>
        <el-form-item>
          <span slot="label">Url</span>
          <el-input style="width: 70%" v-model="source.url"></el-input>
        </el-form-item>
      </el-form>
      <div style="width: 100%;display: flex;justify-content: flex-end">
        <el-button size="small" style="margin-top: 10px" @click="handleDynamicData">确认</el-button>
      </div>
      <div style="background-color: #F5F5F5">
        <span>服务结果示例</span>
        <i style="margin-left: 10px" class="el-icon-arrow-up"></i>
      </div>
      <codemirror ref="cmExpressionsRef" style="width:100%" v-model="source.params" :options="cmOptions"></codemirror>
    </div>
    <tableDialog v-model="dialogVisible" :tableData="tableData" @changeData="changeData"></tableDialog>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/javascript/javascript.js'
import tableDialog from './tableDialog'
export default {
  name: "DataComponents",
  props:['value'],
  model:{
    prop:'value',
    event:'change'
  },
  components: {
    tableDialog,
    codemirror
  },
  watch:{
    'value.source':{
      deep:true,
      handler(nv) {
        this.source = Object.assign({},nv)
      }
    }
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
      },
      cmOptions: {
        readOnly: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        theme: 'base16-light',
      },
      source: {}
    }
  },
  methods:{
    handleSheet() {
      this.dialogVisible = true
    },
    changeData(data) {
      this.value.source.json = JSON.stringify(data)
    },
    handleDynamicData() {
      this.$emit('updateData',{
        url:this.source.url,
        method:this.source.method,
        autoupdate:this.source.autoupdate,
        autoupdateTime: this.source.autoupdateTime,
        type: this.value.type,
      })
    }
  },
  updated() {
    if(this.value.source.type==3) {
      this.$refs.cmExpressionsRef.refresh()
    }
  },
  mounted() {
    this.source = Object.assign({},this.value.source)
    this.tableData = JSON.parse(this.value.source.json)
  }
}
</script>

<style lang="less" scoped>
.none-label /deep/ .el-form-item__content {
  margin-left: 0 !important;
}
.data-components {
  width: 100%;
  height: 100%;
}
/deep/ .el-input--small .el-input__inner {
  height: 26px;
  line-height: 26px;
}
</style>
