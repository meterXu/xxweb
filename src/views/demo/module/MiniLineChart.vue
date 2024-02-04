<template>
  <div style="height: 70px">
    <div ref="chart" className="chart"></div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  name: "MiniLineChart",
  data(){
    return {
      options:{
        series: [{
          name: "Desktops",
          data: [10, 0, 40, 5, 18, 8, 38, 39, 58]
        }],
        chart: {
          height: 70,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar:{
            show: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors:['#8fc4f2'],
          width:3
        },
        grid: {
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5
          },
          yaxis: {
            lines: {
              show: false,
            }
          },
          xaxis: {
            lines: {
              show: false,
            }
          },
          padding:{
            top:-30,
            bottom:-10,
            left:-20,
            right:0
          }
        },
        legend: {
          show: false
        },
        yaxis:{
          labels: {
            show: false,
          }
        },
        tooltip:{
          enabled:false
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          labels: {
            show: false,
          },
          axisBorder:{
            show:false
          }
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
