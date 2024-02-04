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
      this.chart = new ApexCharts(this.$refs.chart, this.options);
      this.chart.render();
    }
  },
  mounted() {
    this.initChart()
  },
  unmounted() {
    this.chart.destroy()
  }
}
</script>
<style scoped>
</style>
