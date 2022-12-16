<template>
  <div style="height: 70px">
    <div ref="chart" className="chart"></div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  name: "MinColumnChart",
  data(){
    return {
      options:{
        series: [{
          name: 'Net Profit',
          data: [44, 35, 57, 70, 40, 57, 63, 42, 66,58, 63, 70, 66]
        }],
        chart: {
          type: 'bar',
          height: 70,
          toolbar:{
            show: false,
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '20%',
            endingShape: 'rounded'
          },
        },
        colors: ['#86dce2'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 0,
          colors: ['transparent']
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
            bottom:-30,
            left:-20,
            right:0
          }
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          labels:{
            show:false
          }
        },
        yaxis: {
          labels:{
            show:false
          }
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          enabled: false
        }
      }
    }
  },
  methods:{
    initChart(){
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