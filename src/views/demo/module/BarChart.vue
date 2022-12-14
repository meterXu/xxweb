<template>
  <div style="position: relative">
    <div ref="chart" class="chart"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

import {colors} from '../mixin'
export default {
  name:'BarChart',
  data(){
    return{
      myChart:null,
      option:{
        colors:colors,
        tooltip:{
          show:true,
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value',
          name:'项目数量',
          axisLine:{
            show: true
          }
        },
        series: [
          {
            data: [],
            type: 'bar',
            label: {
              show: true
            },
          }
        ]
      }
    }
  },
  methods:{
    getChartData(){
      const res={
        data:[]
      }
      this.option.xAxis.data=[]
      this.option.series[0].data=[]
      Object.keys(res.data).forEach(c=>{
        this.option.xAxis.data.push(c)
        this.option.series[0].data.push(res.data[c])
      })
      this.myChart.setOption(this.option)
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    this.getChartData()
  }
}
</script>
<style scoped>
.chart {
  width: 100%;
  height: 415px;
}
.head{
  position: absolute;
  top: 0;
  right: 0;
}
</style>
