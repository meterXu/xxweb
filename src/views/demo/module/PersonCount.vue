<template>
  <el-row class="txtChart-container" :gutter="16">
    <el-col :span="4" v-for="(item,i) in txtChartData" :key="i">
      <el-card>
        <div class="txtChart-item">
          <div class="txtChart-num">{{item.num}}</div>
          <div class="txtChart-txt">{{item.text}}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "PersonCount",
  data(){
    return {
      url:{
        personCount:'/statistics/getPersonCount'
      },
      txtChartData:[
        {
          num:0,
          text:'建筑工地人口总数'
        },
        {
          num:0,
          text:'工地普通人群'
        },
        {
          num:0,
          text:'工地重点人群'
        },
        {
          num:0,
          text:'在职人员'
        },
        {
          num:0,
          text:'离职人员'
        },
        {
          num:0,
          text:'项目总数'
        }
      ]
    }
  },
  methods:{
    getPersonCount(){
      const res = {
        data:{
          totalPerson:0,
          commonPerson:0,
          importantPerson:0,
          inWorkPerson:0,
          quitePerson:0,
          projectSize:0
        }
      }
      this.txtChartData[0].num=res.data.totalPerson
      this.txtChartData[1].num=res.data.commonPerson
      this.txtChartData[2].num=res.data.importantPerson
      this.txtChartData[3].num=res.data.inWorkPerson
      this.txtChartData[4].num=res.data.quitePerson
      this.txtChartData[5].num=res.data.projectSize
    }
  },
  created() {
    this.getPersonCount()
  }
}
</script>

<style scoped>
.txtChart-container{
  height: 80px;
  margin: 0;
  padding: 0;
}
.txtChart-item{
  display: inline-block;
  margin: 0 auto;
  text-align: left;
}
.txtChart-num{
  font-weight: bold;
  font-size: 18px;
}
.txtChart-txt{
  margin-top: 6px;
}
</style>
