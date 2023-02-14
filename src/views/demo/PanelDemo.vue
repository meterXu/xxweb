<template>
  <div style="display: flex;justify-content: flex-start">
    <div style="width: 400px;height: 100%">
      <ProPanel :controlledObj="activeItem" :config="panelConfigs.dom.text"></ProPanel>
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
                json: '[{"month":"周一","value":90},\n' +
                    '{"month":"周二","value":50},\n' +
                    '{"month":"周三","value":110},\n' +
                    '{"month":"周四","value":120},\n' +
                    '{"month":"周五","value":90},\n' +
                    '{"month":"周六","value":100},\n' +
                    '{"month":"周日","value":80}]',
                x: 'week',
                y: 'value',
                s: '信访量',
                xto: 'xAxis/data',
                yto: 'series/0/data',
                sto: ['legend/data/0', 'series/0/name'],
                url:'',
                method:'',
                params:'',
                apiConf:'',
                proPath:''}
          }
        }
      },
      panelConfigs:panelConfigs
    }
  }
}
</script>
