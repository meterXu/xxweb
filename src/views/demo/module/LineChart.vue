<template>
  <div style="height: 380px">
    <div ref="chart" className="chart"></div>
  </div>
</template>
<script>
export default {
  name: 'BarChart',
  data() {
    return {
      options:{
        series: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      }
    }
  },
  methods: {
    initChart(){
      const chart = new ApexCharts(this.$refs.chart, options);
      chart.render();
      this.$on('hook:beforeDestroy',()=>{
        chart.destroy()
      })
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>
<style scoped>
</style>
