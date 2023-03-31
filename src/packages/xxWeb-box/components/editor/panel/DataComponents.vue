<template>
  <div class="data-components" v-if="value">
    <div class="top-radio">
      <div class="top-radio-title">数据类型</div>
      <el-radio-group class="group" v-model="value.source.type" @change='changeSourceType' text-color="#606266"
        fill="black">
        <!-- <el-radio :label="2">静态数据</el-radio>
        <el-radio :label="3">动态数据</el-radio> -->
        <el-radio v-for='val in labelOption' :label="val.label" :key='val.label'>{{ val.value }}</el-radio>
      </el-radio-group>
    </div>
    <div v-show="value.source.type === 2" class="static-data">
      <div v-if="['echarts', 'staticList', 'scrollList'].includes(value.type)" class="spreadsheet">
        <el-button size="small" @click="handleSheet">配置数据</el-button>
      </div>
      <!-- 静态输入框 -->
      <div v-else-if="value.type === 'staticInput'" class="spreadsheet" style='display: flex;'>
        <div v-if='value.staticInputLabel' class="label" style='width: 100px'>{{ value.staticInputLabel }}</div>
        <el-input v-model="value.source.json" size="mini" clearable @change="changeData"></el-input>
      </div>
      <!-- 静态表单 -->
      <div v-else-if="value.type === 'staticForm'" class="spreadsheet">
        <!-- <el-input v-model="value.source.json" size="mini" clearable @change="changeData"></el-input> -->
        <el-form ref="form" :inline="true" :model="value.source.json | convertType" label-width="40px">
          <el-form-item :label="item.label" v-for='item in formoption' :key='item.key'>
            <el-input :value="get(config, item.key)" @input='changeForm($event, item.key)'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="static-form">
        DOM数据
      </div>
    </div>
    <div v-show="value.source.type === 3" class="dynamic-data">
      <div v-if='chartType === "media"' class='upload-box'>
        <div class="label">本地</div>
        <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else class="avatar-uploader-icon">

          </div>
        </el-upload> -->
      </div>
      <div class='dynamic-data-box' v-else>
        <el-form label-position="left" :model="source" size="small">
          <el-form-item class="none-label">
            <el-row type="flex" justify="space-between">
              <el-col :span="15">
                <el-checkbox class="check" v-model="source.autoupdate"> 自动更新请求</el-checkbox>
              </el-col>
              <el-col v-show="source.autoupdate" :span="9" style="display: flex;justify-content: flex-end">
                <el-input v-model.number="source.autoupdateTime" style="width: 80px;"></el-input>
                <span style="width: 60px;margin-left: 4px;font-size: 12px">秒/次</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label-width="80px">
            <span slot="label">数据服务:</span>
            <span style="font-size: 12px;">{{ source.method }}</span>
          </el-form-item>
          <el-form-item label-width="80px">
            <span slot="label">Url</span>
            <el-input style="width: 100%" v-model="source.url" placeholder="http://"
              @change='handleDynamicData'></el-input>
          </el-form-item>
        </el-form>
        <!-- <div style="width: 100%;margin-bottom:10px; display: flex;justify-content: flex-start">
          <el-button size="small" type="primary" class="confirm-button" style="margin-top: 10px" @click="handleDynamicData">确认</el-button>
        </div> -->
        <div class="res-box">
          <div class="res-title">
            服务结果示例<i style="margin-left: 10px;font-weight: 700;" class="el-icon-arrow-up"></i>
          </div>
          <VueJsonPretty :showLine='false' showLineNumber collapsedOnClickBrackets :data="parseStrObj(source.params)" />
        </div>
      </div>
    </div>
    <tableDialog v-model="dialogVisible" :tableData="tableData" @changeData="changeData"></tableDialog>
  </div>
</template>

<script>
import { get, set } from 'lodash'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import tableDialog from './tableDialog'
export default {
  name: "DataComponents",
  props: ['value', 'formoption', 'config'],
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    tableDialog,
    VueJsonPretty
  },
  // 转换json数据，因为动态数据中会存在JSON类型
  // 此时静态数据v-show的表单中，绑定的对象类型会报错
  filters: {
    convertType(val) {
      try {
        return JSON.parse(val)
      } catch (error) {
        return val
      }
    }
  },
  watch: {
    'value.source': {
      deep: true,
      handler(nv) {
        if(nv){
          if (['echarts', 'staticList', 'scrollList'].includes(this.value.type)) {
          this.tableData = JSON.parse(this.value.source.json)
        } else {
          this.tableData = this.value.source.json
        }
        }
      }
    }
  },
  computed: {
    source: {
      get() {
        return this.value.source
      },
      set(val) {
        this.value.source = val
      }
    },
    chartType: {
      // 多媒体-图片、视频，使用的是不同的label
      // 通过云管平台的chart 属性匹配
      get() {
        const mediaArr = ['img', 'video']
        if (mediaArr.includes(this.config.config.chart)) {
          return 'media'
        }
        return false
      }
    },
    labelOption: {
      get() {
        // 多媒体-图片、视频，使用的是不同的label
        // 通过云管平台的chart 属性匹配
        if (this.chartType === 'media') {
          return [
            // {
            //   label: 3,
            //   value: '本地'
            // },
            {
              label: 2,
              value: '在线'
            }
          ]
        } else {
          return [
            {
              label: 2,
              value: '静态数据'
            },
            {
              label: 3,
              value: '动态数据'
            }
          ]
        }
      }
    },
  },
  data() {
    return {
      imageUrl: '',
      // 配置为静态 input框数据
      staticInput: '',
      dialogVisible: false,
      tableData: [],
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
      // source: {}
    }
  },
  methods: {
    parseStrObj(val) {
      let res
      try {
        res = eval("(" + val + ")")
      } catch (error) {
        // 处理老数据的错误信息
        val = val.replaceAll('‘', '\'')
        val = val.replaceAll('’', '\'')
        res = eval("(" + val + ")")
      }
      return res
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt5M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt5M;
    },
    get,
    changeForm(val, key) {
      set(this.config, key, val)
    },
    // 切换静态数据和动态数据按钮
    // 2 静态
    // 3 动态
    changeSourceType(val) {
      // 切换为静态时存储一下临时数据
      if (['echarts'].includes(this.value.type)) {
        return
      }
      if (val === 2) {
        this.value.source.dynamicJson = this.value.source.json
        this.value.source.json = this.value.source.staticJson
      } else {
        // echarts staticForm 给到的默认值为{}
        // staticList 给到的默认值为 []
        // 避免表单对象undefined报错
        if (['echarts', 'staticList', 'staticForm', 'scrollList'].includes(this.value.type)) {
          let defaultJson
          let JSONType
          try {
            JSONType = typeof (JSON.parse(this.value.source.dynamicJson))
          } catch (error) {
            JSONType = typeof (this.value.source.dynamicJson)
          }
          if (JSONType === 'string') {
            defaultJson = {}
          } else if (['echarts', 'staticForm'].includes(this.value.type)) {
            defaultJson = JSON.stringify({})
          } else {
            defaultJson = JSON.stringify([])
          }
          this.value.source.dynamicJson = defaultJson
          // this.value.source.dynamicJson = typeof (this.value.source.dynamicJson) === 'string' ? {} : (['echarts', 'staticForm'].includes(this.value.type) ? JSON.stringify({}) : JSON.stringify([]))
        }
        // 其他类型默认值为 ''
        this.value.source.staticJson = this.value.source.json ? this.value.source.json : ''
        this.value.source.json = this.value.source.dynamicJson
        // 如果存在服务地址，切换tab时就要请求一次
        if (this.source.url) {
          this.handleDynamicData()
        }
      }
    },
    handleSheet() {
      this.dialogVisible = true
    },
    changeData(data) {
      if (['echarts', 'staticList', 'scrollList'].includes(this.value.type)) {
        this.value.source.json = JSON.stringify(data)
      } else {
        this.value.source.json = data
      }
    },
    handleDynamicData() {
      this.$emit('updateData', {
        url: this.source.url,
        method: this.source.method,
        autoupdate: this.source.autoupdate,
        autoupdateTime: this.source.autoupdateTime,
        type: this.value.type,
      })
    }
  },
  updated() {
    // 特殊的配置类型 不需要刷新code面板
    if (!this.chartType &&this.value&& this.value.source.type == 3) {
      // this.$refs.cmExpressionsRef.refresh()
    }
  },
  mounted() {
    if(this.value){
      this.source = Object.assign({}, this.value.source)
      if (['echarts', 'staticList', 'scrollList'].includes(this.value.type)) {
        this.tableData = JSON.parse(this.value.source.json)
      } else {
        this.tableData = this.value.source.json
      }
    }
  }
}
</script>

<style lang='less'>
.top-radio {
  border-bottom: 1px dotted #E9E9EB;
  padding-bottom: 12px;

  .top-radio-title {
    font-weight: bold;
    color: #333333;
    margin-bottom: 5px;
  }

  .group {
    .el-radio__label {
      color: #333333 !important;
    }

    .el-radio__input.is-checked .el-radio__inner {
      border-color: #4634EE;
      background: #4634EE;
    }
  }
}

.check {
  margin-left: 13px;

  .el-checkbox__label {
    color: #333333 !important;
    margin-left: 13px;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #4634EE !important;
    border-color: #4634EE !important;
  }
}

.confirm-button {
  border-color: #4634EE;
  background: #4634EE;
  height: 28px;
  display: flex;
  text-align: center;
  align-items: center;
}

.upload-box {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 121px;
    height: 81px;
    line-height: 81px;
    text-align: center;
    background: url('../assets/img/img.png');
    background-size: 100% 100%;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

.static-data {
  margin-top: 20px;
}

.upload-box {
  margin-top: 20px;
  display: flex;

  .label {
    font-size: 14px;
    width: 50px;
  }
}

.dynamic-data-box {
  margin-top: 15px;

  .el-form-item__label {
    font-weight: bold;
  }
}

.res-box {
  margin: 0 -20px;

  .res-title {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: #F1F4F8;
  }

  .vjs-tree {
    padding-left: 40px !important;

    .vjs-node-index {
      width: 36px;
      text-align: end;
      padding-right: 10px;
      box-sizing: border-box;
      background: #F1F4F8;
    }
  }

  .vjs-node-index {
    user-select: none;
  }
}

.el-tab-pane {
  min-height: 100%;

  .single-con {
    min-height: 100%;
  }
}</style>
