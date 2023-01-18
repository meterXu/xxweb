<template>
  <div class="editor">
    <MtView @topAlign="topAlign" :config="config">
      <template v-slot="{scale,view}">
        <XscStaticLayout ref="xsc-static-layout" @selectedItems="selectedItems" :options="options" :charts="charts" :scale="scale" :view="view">
          <template v-slot="{view,item}">
            <VueDrawXs :view="view" :item="item"></VueDrawXs>
          </template>
        </XscStaticLayout>
      </template>
    </MtView>
  </div>
</template>

<script>
import {MtView,XscStaticLayout} from "../../packages/xxWeb-box";
import VueDrawXs from "../../packages/vue-draw-xs/Index";
export default {
  name: "Editor",
  components:{
    MtView,
    XscStaticLayout,
    VueDrawXs
  },
  data(){
    return {
      config:{
        theme:'dark',
        isRuler:true,
        isScale:true,
        isDrag:true,
        isNavigate:true,
        containerPadding:30,
        backgroundClass:'default-bg',
        navigateConf:{
          canvasWidth:224,
          canvasHeight:160
        }
      },
      options:{
        "id": 1673488946179,
        "name": "新的画布",
        "width": 1920,
        "height": 1080,
        "changeSize":false,
        "backgroundColor": 'transparent',
        "backgroundImage": "https://ts1.cn.mm.bing.net/th/id/R-C.413a7faf761101bdb1f267de68e8ff25?rik=v4iL9jBH%2f4zWXw&riu=http%3a%2f%2fimg.cgmodel.com%2fimage%2f2017%2f0520%2fbig%2f660125-1945092628.jpg&ehk=VYoWzhMNcmdlgpIvXbc6DzPNautyUCieMDNryF4yg5E%3d&risl=&pid=ImgRaw&r=0",
        "backgroundSize": "cover",
        "backgroundRepeat": "no-repeat",
        "baseUrl": "."
      }
      ,
      charts:[
        {
          "id": 1673489030749,
          "type": "eCharts",
          "chart": "gauge",
          "config": {
            "box": {
              "width": 400,
              "height": 300,
              "x": 71,
              "y": 363,
              "zIndex": 101
            },
            "theme": "chalk",
            "options": {
              "grid": {
                "show": false,
                "left": "10%",
                "right": "10%",
                "top": "60",
                "bottom": "60"
              },
              "title": {
                "text": "简单仪表盘",
                "subtext": "",
                "textStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "bold",
                  "fontSize": 18,
                  "lineHeight": 18
                },
                "subtextStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "normal",
                  "fontSize": 12,
                  "lineHeight": 12
                },
                "x": "center",
                "show": true
              },
              "tooltip": {
                "formatter": "{a} <br/>{b} : {c}%",
                "show": true
              },
              "series": {
                "name": "业务指标",
                "type": "gauge",
                "detail": {
                  "formatter": "{value}%",
                  "show": true,
                  "fontSize": 15,
                  "lineHeight": 56
                },
                "data": [
                  {
                    "name": "完成率",
                    "value": 60
                  }
                ],
                "title": {
                  "show": true
                },
                "radius": "75%",
                "startAngle": 225,
                "endAngle": -45,
                "clockwise": true,
                "min": 0,
                "max": 100,
                "splitNumber": 10,
                "pointer": {
                  "show": true,
                  "length": "80%",
                  "width": 8
                },
                "itemStyle": {},
                "axisLine": {
                  "show": true
                },
                "splitLine": {
                  "show": false
                },
                "axisTick": {
                  "show": true
                },
                "axisLabel": {
                  "show": true
                }
              }
            },
            "data": {
              "coordinate": "pie",
              "loop": false,
              "interval": 30,
              "source": [
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"value\": 60, \"name\": \"完成率\"}]",
                  "name": "name",
                  "value": "value",
                  "s": "业务指标",
                  "sto": [
                    "series/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                }
              ]
            }
          }
        },
        {
          "id": 1673489064078,
          "type": "eCharts",
          "chart": "barNegative",
          "config": {
            "box": {
              "width": 400,
              "height": 300,
              "x": 1427,
              "y": 31,
              "zIndex": 100
            },
            "theme": "chalk",
            "options": {
              "grid": {
                "show": false,
                "left": "10%",
                "right": "10%",
                "top": "60",
                "bottom": "60"
              },
              "title": {
                "show": true,
                "text": "正负条形图",
                "subtext": "",
                "textStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "bold",
                  "fontSize": 18,
                  "lineHeight": 18
                },
                "subtextStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "normal",
                  "fontSize": 12,
                  "lineHeight": 12
                },
                "x": "center"
              },
              "tooltip": {
                "show": true,
                "trigger": "axis",
                "axisPointer": {
                  "type": "shadow"
                }
              },
              "legend": {
                "data": [
                  "收入",
                  "支出"
                ],
                "show": true,
                "x": "center",
                "y": "bottom",
                "textStyle": {}
              },
              "xAxis": {
                "show": true,
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto",
                  "rotate": 0
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "splitLine": {
                  "lineStyle": {}
                },
                "min": null,
                "max": "dataMax"
              },
              "yAxis": {
                "type": "category",
                "axisTick": {
                  "show": false
                },
                "data": [
                  "周一",
                  "周二",
                  "周三",
                  "周四",
                  "周五",
                  "周六",
                  "周日"
                ],
                "show": true,
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto"
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "splitLine": {
                  "lineStyle": {}
                },
                "interval": null,
                "min": null,
                "max": "dataMax"
              },
              "series": [
                {
                  "name": "收入",
                  "type": "bar",
                  "stack": "总量",
                  "data": [
                    320,
                    302,
                    341,
                    374,
                    390,
                    450,
                    420
                  ],
                  "itemStyle": {},
                  "label": {
                    "show": true,
                    "formatter": "{c}",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "position": "right"
                  }
                },
                {
                  "name": "支出",
                  "type": "bar",
                  "stack": "总量",
                  "data": [
                    -120,
                    -132,
                    -101,
                    -134,
                    -190,
                    -230,
                    -210
                  ],
                  "itemStyle": {},
                  "label": {
                    "show": true,
                    "formatter": "{c}",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "position": "left"
                  }
                }
              ]
            },
            "data": {
              "coordinate": "rightAngle",
              "loop": false,
              "interval": 30,
              "source": [
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"week\":\"周一\",\"value\":320},\n{\"week\":\"周二\",\"value\":302},\n{\"week\":\"周三\",\"value\":341},\n{\"week\":\"周四\",\"value\":374},\n{\"week\":\"周五\",\"value\":390},\n{\"week\":\"周六\",\"value\":450},\n{\"week\":\"周日\",\"value\":420}]",
                  "x": "value",
                  "y": "week",
                  "s": "收入",
                  "xto": "series/0/data",
                  "yto": "yAxis/data",
                  "sto": [
                    "legend/data/0",
                    "series/0/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                },
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"week\":\"周一\",\"value\":-120},\n{\"week\":\"周二\",\"value\":-132},\n{\"week\":\"周三\",\"value\":-101},\n{\"week\":\"周四\",\"value\":-134},\n{\"week\":\"周五\",\"value\":-190},\n{\"week\":\"周六\",\"value\":-230},\n{\"week\":\"周日\",\"value\":-210}]",
                  "x": "value",
                  "y": "week",
                  "s": "支出",
                  "xto": "series/1/data",
                  "yto": "yAxis/data",
                  "sto": [
                    "legend/data/1",
                    "series/1/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                }
              ]
            }
          }
        },
        {
          "id": 1673489066864,
          "type": "eCharts",
          "chart": "barStack",
          "config": {
            "box": {
              "width": 400,
              "height": 300,
              "x": 1427,
              "y": 367,
              "zIndex": 100
            },
            "theme": "chalk",
            "options": {
              "grid": {
                "show": false,
                "left": "10%",
                "right": "10%",
                "top": "60",
                "bottom": "60"
              },
              "title": {
                "text": "堆叠柱状图",
                "subtext": "",
                "textStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "bold",
                  "fontSize": 18,
                  "lineHeight": 18
                },
                "subtextStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "normal",
                  "fontSize": 12,
                  "lineHeight": 12
                },
                "x": "center",
                "show": true
              },
              "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                  "type": "shadow"
                },
                "show": true
              },
              "legend": {
                "data": [
                  "百度",
                  "谷歌",
                  "必应"
                ],
                "show": true,
                "x": "center",
                "y": "bottom",
                "textStyle": {}
              },
              "xAxis": {
                "type": "category",
                "data": [
                  "周一",
                  "周二",
                  "周三",
                  "周四",
                  "周五",
                  "周六",
                  "周日"
                ],
                "show": true,
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto",
                  "rotate": 0
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "min": null,
                "max": "dataMax"
              },
              "yAxis": {
                "show": true,
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto"
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "splitLine": {
                  "lineStyle": {}
                },
                "interval": null,
                "min": null,
                "max": "dataMax"
              },
              "series": [
                {
                  "name": "百度",
                  "type": "bar",
                  "stack": "mtEditor",
                  "data": [
                    620,
                    732,
                    701,
                    734,
                    1090,
                    1130,
                    1120
                  ],
                  "itemStyle": {},
                  "label": {
                    "show": true,
                    "formatter": "{c}",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "position": "inside"
                  }
                },
                {
                  "name": "谷歌",
                  "type": "bar",
                  "stack": "mtEditor",
                  "data": [
                    130,
                    142,
                    161,
                    134,
                    290,
                    230,
                    220
                  ],
                  "itemStyle": {},
                  "label": {
                    "show": true,
                    "formatter": "{c}",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "position": "inside"
                  }
                },
                {
                  "name": "必应",
                  "type": "bar",
                  "stack": "mtEditor",
                  "data": [
                    180,
                    172,
                    171,
                    174,
                    190,
                    230,
                    210
                  ],
                  "itemStyle": {},
                  "label": {
                    "show": true,
                    "formatter": "{c}",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "position": "inside"
                  }
                }
              ]
            },
            "data": {
              "coordinate": "rightAngle",
              "loop": false,
              "interval": 30,
              "source": [
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"week\":\"周一\",\"value\":620},\n{\"week\":\"周二\",\"value\":732},\n{\"week\":\"周三\",\"value\":701},\n{\"week\":\"周四\",\"value\":734},\n{\"week\":\"周五\",\"value\":1090},\n{\"week\":\"周六\",\"value\":1130},\n{\"week\":\"周日\",\"value\":1120}]",
                  "x": "week",
                  "y": "value",
                  "s": "百度",
                  "xto": "xAxis/data",
                  "yto": "series/0/data",
                  "sto": [
                    "legend/data/0",
                    "series/0/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                },
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"week\":\"周一\",\"value\":130},\n{\"week\":\"周二\",\"value\":142},\n{\"week\":\"周三\",\"value\":161},\n{\"week\":\"周四\",\"value\":134},\n{\"week\":\"周五\",\"value\":290},\n{\"week\":\"周六\",\"value\":230},\n{\"week\":\"周日\",\"value\":220}]",
                  "x": "week",
                  "y": "value",
                  "s": "谷歌",
                  "xto": "xAxis/data",
                  "yto": "series/1/data",
                  "sto": [
                    "legend/data/1",
                    "series/1/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                },
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"week\":\"周一\",\"value\":180},\n{\"week\":\"周二\",\"value\":172},\n{\"week\":\"周三\",\"value\":171},\n{\"week\":\"周四\",\"value\":174},\n{\"week\":\"周五\",\"value\":190},\n{\"week\":\"周六\",\"value\":230},\n{\"week\":\"周日\",\"value\":210}]",
                  "x": "week",
                  "y": "value",
                  "s": "必应",
                  "xto": "xAxis/data",
                  "yto": "series/2/data",
                  "sto": [
                    "legend/data/2",
                    "series/2/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                }
              ]
            }
          }
        },
        {
          "id": 1673489075499,
          "type": "eCharts",
          "chart": "pieRose",
          "config": {
            "box": {
              "width": 400,
              "height": 300,
              "x": 73,
              "y": 703,
              "zIndex": 100
            },
            "theme": "chalk",
            "options": {
              "grid": {
                "show": false,
                "left": "10%",
                "right": "10%",
                "top": "60",
                "bottom": "60"
              },
              "title": {
                "text": "南丁格尔图",
                "subtext": "",
                "textStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "bold",
                  "fontSize": 18,
                  "lineHeight": 18
                },
                "subtextStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "normal",
                  "fontSize": 12,
                  "lineHeight": 12
                },
                "x": "center",
                "show": true
              },
              "tooltip": {
                "trigger": "item",
                "formatter": "{a} <br/>{b} : {c} ({d}%)",
                "show": true
              },
              "legend": {
                "show": false,
                "type": "scroll",
                "orient": "vertical",
                "x": "center",
                "y": "bottom",
                "left": 0,
                "right": 0,
                "top": 20,
                "bottom": 0,
                "data": [
                  "rose1",
                  "rose2",
                  "rose3",
                  "rose4",
                  "rose5",
                  "rose6",
                  "rose7",
                  "rose8"
                ],
                "textStyle": {}
              },
              "series": {
                "name": "面积模式",
                "type": "pie",
                "radius": [
                  30,
                  110
                ],
                "roseType": "area",
                "label": {
                  "show": true,
                  "formatter": "{b}:{c}",
                  "fontSize": 12,
                  "fontWeight": "normal",
                  "position": "outside"
                },
                "data": [
                  {
                    "name": "rose1",
                    "value": 10
                  },
                  {
                    "name": "rose2",
                    "value": 5
                  },
                  {
                    "name": "rose3",
                    "value": 15
                  },
                  {
                    "name": "rose4",
                    "value": 25
                  },
                  {
                    "name": "rose5",
                    "value": 20
                  },
                  {
                    "name": "rose6",
                    "value": 35
                  },
                  {
                    "name": "rose7",
                    "value": 30
                  },
                  {
                    "name": "rose8",
                    "value": 40
                  }
                ],
                "itemStyle": {
                  "emphasis": {
                    "shadowBlur": 10,
                    "shadowOffsetX": 0,
                    "shadowColor": "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            },
            "data": {
              "coordinate": "pie",
              "loop": false,
              "interval": 30,
              "source": [
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"name\":\"rose1\",\"value\":10},\n{\"name\":\"rose2\",\"value\":5},\n{\"name\":\"rose3\",\"value\":15},\n{\"name\":\"rose4\",\"value\":25},\n{\"name\":\"rose5\",\"value\":20},\n{\"name\":\"rose6\",\"value\":35},\n{\"name\":\"rose7\",\"value\":30},\n{\"name\":\"rose8\",\"value\":40}]",
                  "name": "name",
                  "value": "value",
                  "s": "面积模式",
                  "sto": [
                    "series/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                }
              ]
            }
          }
        },
        {
          "id": 1673489220587,
          "type": "eCharts",
          "chart": "line",
          "config": {
            "box": {
              "width": 400,
              "height": 300,
              "x": 1425,
              "y": 699,
              "zIndex": 100
            },
            "theme": "chalk",
            "options": {
              "grid": {
                "show": false,
                "left": "10%",
                "right": "10%",
                "top": "60",
                "bottom": "60"
              },
              "title": {
                "text": "简单折线图",
                "subtext": "",
                "textStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "bold",
                  "fontSize": 18,
                  "lineHeight": 18
                },
                "subtextStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "normal",
                  "fontSize": 12,
                  "lineHeight": 12
                },
                "x": "center",
                "show": true
              },
              "tooltip": {
                "trigger": "axis",
                "formatter": "{a} <br/>{b} : {c}",
                "axisPointer": {
                  "type": "shadow"
                },
                "show": true
              },
              "xAxis": {
                "type": "category",
                "data": [
                  "一月",
                  "二月",
                  "三月",
                  "四月",
                  "五月",
                  "六月",
                  "七月"
                ],
                "show": true,
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto",
                  "rotate": 0
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "min": null,
                "max": null
              },
              "legend": {
                "data": [
                  "数值"
                ],
                "show": true,
                "x": "center",
                "y": "bottom",
                "textStyle": {}
              },
              "yAxis": {
                "type": "value",
                "show": true,
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto"
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "splitLine": {
                  "lineStyle": {}
                },
                "interval": null,
                "min": null,
                "max": null
              },
              "series": [
                {
                  "name": "数值",
                  "data": [
                    802,
                    932,
                    901,
                    934,
                    1290,
                    1330,
                    1320
                  ],
                  "type": "line",
                  "itemStyle": {},
                  "label": {
                    "show": true,
                    "formatter": "{c}",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "position": "top"
                  }
                }
              ]
            },
            "data": {
              "coordinate": "rightAngle",
              "loop": false,
              "interval": 30,
              "source": [
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"month\":\"一月\",\"value\":802},\n{\"month\":\"二月\",\"value\":932},\n{\"month\":\"三月\",\"value\":901},\n{\"month\":\"四月\",\"value\":934},\n{\"month\":\"五月\",\"value\":1290},\n{\"month\":\"六月\",\"value\":1330},\n{\"month\":\"七月\",\"value\":1320}]",
                  "x": "month",
                  "y": "value",
                  "s": "数值",
                  "xto": "xAxis/data",
                  "yto": "series/0/data",
                  "sto": [
                    "legend/data/0",
                    "series/0/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                }
              ]
            }
          }
        },
        {
          "id": 1673490448922,
          "type": "eCharts",
          "chart": "bar",
          "config": {
            "box": {
              "width": 400,
              "height": 300,
              "x": 70,
              "y": 24,
              "zIndex": 100
            },
            "theme": "chalk",
            "options": {
              "grid": {
                "show": false,
                "left": "10%",
                "right": "10%",
                "top": "60",
                "bottom": "60"
              },
              "title": {
                "text": "简单柱状图",
                "subtext": "",
                "textStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "bold",
                  "fontSize": 18,
                  "lineHeight": 18
                },
                "subtextStyle": {
                  "fontStyle": "normal",
                  "fontWeight": "normal",
                  "fontSize": 12,
                  "lineHeight": 12
                },
                "x": "center",
                "show": true
              },
              "tooltip": {
                "trigger": "axis",
                "formatter": "{a} <br/>{b} : {c}",
                "axisPointer": {
                  "type": "shadow"
                },
                "show": true
              },
              "legend": {
                "data": [
                  "数值"
                ],
                "show": true,
                "x": "center",
                "y": "bottom",
                "textStyle": {}
              },
              "xAxis": {
                "data": [
                  "a",
                  "b",
                  "c",
                  "d",
                  "e",
                  "f"
                ],
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto",
                  "rotate": 0
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "show": true,
                "min": null,
                "max": "dataMax"
              },
              "yAxis": {
                "show": true,
                "axisLabel": {
                  "fontSize": 12,
                  "interval": "auto"
                },
                "axisLine": {
                  "lineStyle": {}
                },
                "splitLine": {
                  "lineStyle": {}
                },
                "interval": null,
                "min": null,
                "max": "dataMax"
              },
              "series": [
                {
                  "name": "数值",
                  "type": "bar",
                  "data": [
                    5,
                    20,
                    36,
                    10,
                    10,
                    20
                  ],
                  "itemStyle": {},
                  "label": {
                    "show": true,
                    "formatter": "{c}",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "position": "top"
                  }
                }
              ]
            },
            "data": {
              "coordinate": "rightAngle",
              "loop": false,
              "interval": 30,
              "source": [
                {
                  "type": 2,
                  "db": "",
                  "sql": "",
                  "json": "[{\"text\":\"a\",\"value\":5},\n{\"text\":\"b\",\"value\":20},\n{\"text\":\"c\",\"value\":36},\n{\"text\":\"d\",\"value\":10},\n{\"text\":\"e\",\"value\":10},\n{\"text\":\"f\",\"value\":20}]",
                  "x": "text",
                  "y": "value",
                  "s": "数值",
                  "xto": "xAxis/data",
                  "yto": "series/0/data",
                  "sto": [
                    "legend/data/0",
                    "series/0/name"
                  ],
                  "url": "",
                  "method": "",
                  "params": "",
                  "apiConf": "",
                  "proPath": ""
                }
              ]
            }
          }
        },
        {
          "id": 1673490800977,
          "type": "dom",
          "chart": "text",
          "config": {
            "box": {
              "width": 417,
              "height": 38,
              "x": 766,
              "y": 10,
              "zIndex": 100
            },
            "type": "text",
            "theme": "dark",
            "options": {
              "text": {
                "fontFamily": "智慧城市",
                "content": "智慧城市",
                "fontSize": 30,
                "color": null,
                "fontWeight": "normal"
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
              }
            }
          }
        }
      ]
    }
  },
  methods:{
    topAlign(){
      this.$emit('xsc-static-layout').topAlign()
    }
  }
}
</script>

<style>
html,body,#app{
  overflow: hidden;
}
.editor{
  display: flex;
  overflow: hidden;
  flex: 1;
  position: absolute;
  top: 40px;
  bottom: 0;
  right: 0;
  left: 1px;
  z-index: 99;
}
</style>
