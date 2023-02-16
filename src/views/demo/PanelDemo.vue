<template>
  <div style="display: flex;justify-content: flex-start">
    <div style="width: 400px;height: 100%">
      <ProPanel :controlledObj="activeItem" :config="panelConfigs.dom.text" @updateData="updateData"></ProPanel>
    </div>
    <div style="margin-left: 20px;width: 800px">
      <el-card>
        {{JSON.stringify(this.activeItem.config,null,"  ")}}
      </el-card>
      <el-card style="margin-top: 20px">
        <VueDrawXs :item="activeItem" :view="true"></VueDrawXs>
      </el-card>
    </div>
  </div>
</template>
<script>
import {ProPanel} from "../../packages/xxWeb-box";
import panelConfigs from "@/views/demo/panelConfigs";
import VueDrawXs from "@/packages/vue-draw-xs/Index";
export default {
  name:'PanelDemo',
  components:{
    VueDrawXs,
    ProPanel
  },
  data(){
    return {
      activeItem:{
        "id": 1673490800977,
        "type": "echarts",
        "chart": "text",
        "config": {
          "box": {
            "show":true,
            "width": 417,
            "height": 38,
            "x": 766,
            "y": 10,
            "zIndex": 100,
            "name":"文字"
          },
          "type": "text",
          "options": {
            "text": {
              "content": "智慧城市",
              "tips": [1,2,4],
              "textStyle":{
                "fontSize": 30,
                "color": null,
                "fontWeight": "normal",
                "fontStyle": "normal",
              },
              "data": 1
            },
            "boxSpace": {
              "lineHeight": 40,
              "textAlign": "center"
            },
            "background": {
              "color": "transparent"
            },
            "border": {
              "width": 0,
              "style": "solid",
              "color": "transparent"
            },
            "verticalList": [
              {
                "id": '1',
                "name": "子标题1"
              },
              {
                "id": '2',
                "name": "子标题2"
              }
            ],
            "verticalList2": [
              {
                "id": '3',
                "name": "子标题1"
              }
            ],
            "activeList":'1'
          },
          data: {
            type: "echarts",
            coordinate: 'rightAngle', // 直角坐标系
            loop: false,
            interval: 30,
            source:
              { type: 2,
                db: '',
                sql: '',
                json: '[["信访量","系列1","系列2","系列3"],["类别1","40","50","80"],["类别2","50","20","40"],["类别3","20","80","30"]]',
                x: 'week',
                y: 'value',
                s: '信访量',
                xto: 'xAxis/data',
                yto: 'series/0/data',
                sto: ['legend/data/0', 'series/0/name'],
                url:'http://xxx/yyy',
                method:'Get',
                params: `{
  code:200,
  success:true,
  data: {
    colunms: {
      column1: "系列",
      colume2: "类别"
    },
    records: [
      ["类别","系列1","系列2","系列3"],
      ["类别1","40","50","80"],
      ["类别1","40","50","80"],
      ["类别3","20","80","30"]
    ],
    page:{
      total:100,
      currentPage:1,
      pageSize:10
    }
  }
}`,
                autoupdate:false,
                autoupdateTime: 0,
                apiConf:'',
                proPath:''}
          }
        }
      },
      panelConfigs:panelConfigs
    }
  },
  methods: {
    updateData(data) {
      console.log(data)
    }
  }
}
</script>
