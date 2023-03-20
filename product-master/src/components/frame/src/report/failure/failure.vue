<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-date-picker
        v-model="searchvalue"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="defaultTime"
      />
      </el-col>
      <el-button size="small" class="searchbutton" @click="searchData">查询</el-button>
    </div>
    <div class="chartstyle">
      <div class="showCarInfo">
        <div>维修车次： {{repairNum}}</div>
        <div>维修合格率： {{passrate}}</div>
      </div>
      <div id="failureBox" style="width:auto;height:100%;margin-top:16px"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref,getCurrentInstance  } from "vue";
import { ElNotification } from "element-plus";
import store from '@/store'
import { getRepFaultCountAll as getRepFaultCountAll,queryRepFaultCount as queryRepFaultCount } from '@/api/index'
const searchvalue = ref("");
const repairNum = ref('21');
const passrate = ref('80%');
const chartData = ref('')
let chartBox;
const {proxy} = getCurrentInstance();
//查询

const queryTableData = () => {
  getRepFaultCountAll()
    .then((res)=>{
      if(res.code === 200){
        chartData.value = res.data.faultChartVos;
        repairNum.value = res.data.repairCount;
        passrate.value = res.data.passRate;
        initchart()
        // console.log(chartData.value)
      }else{
        ElNotification({
              title: 'Warning',
              message: res.msg,
              type: 'warning',
            })
            if(res.msg.indexOf('token已过期')>-1  ){
                    store.dispatch('app/logout')
                }
      }
    })
    .catch(()=>{})
};

onMounted(() => {
  queryTableData();
});
// onMounted(()=>{
//   initchart()
// })
const getymd = (dateStr) => {
    let d = new Date(dateStr);
    let resDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    return resDate;
}
const initchart=()=>{
  if (proxy.$echarts.getInstanceByDom(document.getElementById("failureBox"))) {
    proxy.$echarts.dispose(document.getElementById("failureBox"));
  }
  console.log('111')
  const chartBox = proxy.$echarts.init(document.getElementById('failureBox'));
  let initData;
  initData = !chartData.value?initData = []:JSON.parse(JSON.stringify(chartData.value))
  const option = {
  title: {
    text: '车辆故障原因汇总',
    left: 'left',
    textStyle: {
      color: "#333333",
      fontStyle: "normal",
      fontWeight: "bold",
      fontFamily: '"Microsoft YaHei"',
      fontSize: 16,
    },
  },
  tooltip: {
    trigger: 'item',
    formatter:'{b}:&nbsp;&nbsp;{c}(车次)'
  },
  legend: {
    orient: 'vertical',
    right:20,
    bottom:32,
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      data: initData,
      label: {
          formatter: "{b}\n{d}%",
          edgeDistance: 1,
          lineHeight: 15,
          textStyle:{
            fontSize:14
          },
          rich: {
            time: {
              fontSize: 15,
              color: "#999",
            },
          },
        },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
  };
  chartBox.setOption(option,true)
  window.addEventListener('resize',function(){
    chartBox.resize()
  })
}
const searchData = ()=>{
  console.log(searchvalue.value)
  let parmes = {}
  if(searchvalue.value){
    parmes = {
      endDate:searchvalue.value?getymd(searchvalue.value[1]):'',
      startDate:searchvalue.value?getymd(searchvalue.value[0]):''
    }
  }
        queryRepFaultCount(parmes).then((res)=>{
    
      if(res.code === 200){
         chartData.value = res.data.faultChartVos;
          repairNum.value = res.data.repairCount;
          passrate.value = res.data.passRate;
          initchart()
      } else{
        ElNotification({
                title: 'Warning',
                message: res.msg,
                type: 'warning',
              })
              if(res.msg.indexOf('token已过期')>-1  ){
                    store.dispatch('app/logout')
                }
      }
    })
}
</script>
<style lang = 'less' scoped>
.tablestyle {
  position: relative;
  :deep( .el-table__header thead tr) {
    background-color: rgba(64, 158, 255, 0.1);
  }
  :deep(  .el-col-3) {
    max-width: none;
  }
}
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .showmodal {
    width: 400px;
    height: 200px;
    background-color: aqua;
    z-index: 200;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.editinfo {
  width: 30%;
  background-color: orange;
  height: 500px;
}
.lz-dialog {
  .dia-suc {
    margin-left: 16px !important;
  }
}
.search {
  position: relative;
  .batchimport {
    position: absolute;
    right: 24px;
  }
}
.demo-pagination-block {
  margin-top: 24px;
  position: absolute;
  bottom: 32px;
  right: 32px;
}
.elispice {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
}
.showCarInfo{
  display: flex;
  div{
    margin: 0 32px;
    width: 45%;
    background-color: #ecf5ff;
    padding: 8px 16px;
    font-size: 14px;
    color: #606266;
    text-align: center;
  }
}
:deep(  .el-table--fit){
  height:100%;
}
:deep(  .el-table__body-wrapper){
  overflow-y: auto;
}
</style>