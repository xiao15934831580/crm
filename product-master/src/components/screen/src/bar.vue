<template>
  <div class="Echarts">
    <div id="main" style="width: 600px;height: 400px;"></div>
    <!-- <div class="givedata" @click="givedata()" ></div> -->
  </div>
</template>
<script>
export default {
  name: 'BarChart',
  data(){
      return{
          msg:"Welcome to Your Vue"
      }
  },
  methods: {
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('main'));
      //配置图表
      var option = {
        title: {
          text: '总量',
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5,20,36,10,10,20]
        }]
      };
      myChart.setOption(option);
    },
    // givedata(){
    //     this.$emit("changedata", this.msg)
    // }
  },
  mounted(){
    this.myEcharts();
  }
}
</script>
 
<style>
</style>