<template>
  <div style="height: 320px">
    <div ref="chart" class="chart"></div>
  </div>
</template>
<script>
import ApexCharts from 'apexcharts'
export default {
  name:'BarChart',
  data(){
    return{
      options:{
        series: [44, 55, 13, 33],
        chart: {
          type: 'donut',
          height: 320
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            donut: {
              size: '88%'
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        stroke:{
          show:false
        },
        legend: {
          show:true,
          position: 'bottom',
          horizontalAlign: 'center'
        }
      }
    }
  },
  methods:{
    initChart() {
      const chart = new ApexCharts(this.$refs.chart, this.options);
      chart.render();
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>
<style scoped>
</style>
