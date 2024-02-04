<template>
  <div style="height: 320px">
    <div ref="chart" class="chart">

    </div>
  </div>
</template>
<script>
import ApexCharts from 'apexcharts'
export default {
  name:'BarChart',
  data(){
    return{
      options:{
        series: [{
          data: [44, 55, 41, 64, 22, 43, 21]
        }, {
          data: [53, 32, 33, 52, 13, 44, 32]
        }],
        chart: {
          type: 'bar',
          height:320,
          toolbar:{
            show: false,
          }
        },
        grid:{
          strokeDashArray: 3,
          yaxis: {
            lines: {
              show: false,
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '36%',
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 5,
          colors: ['transparent']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        legend:{
          show:true,
          position: 'top',
          horizontalAlign: 'right',
        },
        xaxis: {
          categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        }
      }
    }
  },
  methods:{
    initChart(){
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
