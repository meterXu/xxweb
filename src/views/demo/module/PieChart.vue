<template>
  <div style="position: relative">
    <div ref="chart" class="chart">
    </div>
    <div class="head">
      <div class="head-item">周期：</div>
      <div class="head-item">
        <el-select v-model="periodId" :options="periodListOptions" @change="changePeriod"></el-select>
      </div>
    </div>
    <div class="title">
      {{title}}<br/>{{totalPersonCount}}人
    </div>
    <ul class="legend">
      <li><el-tag :color="colors[0]">已核酸：</el-tag><span>{{option.series[0].data[0].value}}人，
        </span><span>{{(option.series[0].data[0].value*100/totalPersonCount).toFixed(2)}}%</span>
      </li>
      <li>
        <el-tag :color="colors[1]">未核酸：</el-tag><span>{{option.series[0].data[1].value}}人，
        </span><span>{{(option.series[0].data[1].value*100/totalPersonCount).toFixed(2)}}%</span>
      </li>
      <li>
        <el-tag :color="colors[2]">解除预警：</el-tag><span>{{option.series[0].data[2].value}}人，
        </span><span>{{(option.series[0].data[2].value*100/totalPersonCount).toFixed(2)}}%</span>
      </li>
    </ul>
  </div>

</template>

<script>
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);
import {colors} from '../mixin'
export default {
  name: "PieChart",
  props:['title','isImportant'],
  data(){
    return {
      myChart:null,
      colors:colors,
      option:{
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter:'{b}：{d}%，{c}人'
        },
        legend: {
          show:false
        },
        series: [
          {
            name: this.title.text,
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            label: {
              show: false,
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 0, name: '已核酸' },
              { value: 0, name: '未核酸' },
              { value: 0, name: '解除预警' },
            ]
          }
        ]
      },
      periodListOptions:[],
      periodId:null,
      totalPersonCount:null
    }
  },
  methods:{
    getPeriod(){
      const res = {
        data:[{
          startTime:'',
          endTime:'',
          guid:''
        }]
      }
      for(let i=0;i<res.data.length;i++) {
        let startArr = res.data[i].startTime.substr(0,10).split('-')
        let endArr = res.data[i].endTime.substr(0,10).split('-')
        let label = `${startArr[0]+'年'+startArr[1]+'月'+startArr[2]+'日'}-${endArr[0]+'年'+endArr[1]+'月'+endArr[2]+'日'}`
        let value = res.data[i].guid
        this.periodListOptions.push({
          label:label,value:value
        })
      }
      this.periodId = this.periodListOptions[0].value
      this.getChartData()
    },
    changePeriod(){
      this.getChartData()
    },
    async getChartData(){
      let res = {
        data:{
          acidCount:0,
          noAcidCount:0,
          cancelWarnCount:0
        }
      }
      this.totalPersonCount = res.data.totalPersonCount
      this.option.series[0].data[0].value = res.data.acidCount
      this.option.series[0].data[1].value = res.data.noAcidCount
      this.option.series[0].data[2].value = res.data.cancelWarnCount
      this.myChart.setOption(this.option)
    }
  },
  mounted() {
    setTimeout(()=>{
      this.myChart = echarts.init(this.$refs.chart);
      this.getPeriod()
    },500)
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
.head{
  position: absolute;
  display: flex;
  top: 0;
  width: 100%;
  justify-content:left;
  align-items: center;
}
.head-item{
  display: inline-block;
}
.title{
  position: absolute;
  top: 35%;
  display: block;
  width: 100%;
  text-align: center;
}
.legend{
  display: inline-block;
  margin: 0 auto;
  padding: 0;
  margin-left: 40px;
}
.legend li{
  line-height: 30px;
  height: 30px;
  list-style: none;
}
</style>
