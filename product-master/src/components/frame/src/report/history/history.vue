<template>
  <div class="tablestyle">
    <div class="search">
        <el-button @click="date = 'year'" :class="{active:date == 'year'}" color="#ecf5ff" >年</el-button>
        <el-button @click="date = 'month'" color="#ecf5ff"  :class="{active:date == 'month'}">月</el-button>
        <el-button  @click="date = 'day'" color="#ecf5ff" :class="{active:date == 'day'}">日</el-button>
      <el-col style="margin-left:16px" :span="3" v-if="date === 'day'">
        <el-date-picker 
            v-model="searchvalue"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="至"
        />
      </el-col>
      <el-col style="margin-left:16px" :span="3" v-if="date === 'month'">
        <el-date-picker
            v-model="searchvalue"
            type="monthrange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
        />
      </el-col>
      <el-col style="margin-left:16px;display:flex;align-item:center;justify-content: space-arround;" :span="4" v-if="date === 'year'">
        <el-select
            v-model="searchStart"
            size="medium"
                >
            <el-option
            v-for="item in years"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            required
            >
            </el-option>
        </el-select>
        <p class="todate">至</p>
        <el-select
            v-model="searchEnd"
            size="medium"
                >
            <el-option
            v-for="item in years"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            required
            >
            </el-option>
        </el-select>
      </el-col>
      <el-button size="small" class="searchbutton" @click="searchData()">查询</el-button>
    </div>
    <div class="chartstyle">
      <div id="failureBox" style="width:auto;height:100%;margin-top:16px"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref,getCurrentInstance  } from "vue";
import { ElNotification } from "element-plus";
import store from '@/store'
import { getRepHistoryAll as getRepHistoryAll,queryRepHistory as queryRepHistory } from '@/api/index'
const searchvalue = ref("");
const cuttenTime = ref('')
const {proxy} = getCurrentInstance();
//查询
const date = ref('day')
const chartData = ref('')
const term = ref('')
const years= ref([])
const searchStart = ref('')
const searchEnd = ref('')
const unit = ref('')
const queryTableData = () => {
  getRepHistoryAll()
    .then((res)=>{
      if(res.code === 200){
          console.log(res)
        chartData.value = res.data.data;
        term.value = res.data.term;
        years.value = res.data.dropDownYear
        unit.value = res.data.unit
        initchart()
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
const getymd = (dateStr) => {
    let d = new Date(dateStr);
    let resDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    return resDate;
}
const initchart=()=>{
  const chartBox = proxy.$echarts.init(document.getElementById('failureBox'));
  console.log(JSON.parse(JSON.stringify(chartData.value)))
  const option = {
  title: {
    text: '维修量历史数据汇总',
    left: 'left',
    textStyle: {
      color: "#333333",
      fontStyle: "normal",
      fontWeight: "bold",
      fontFamily: '"Microsoft YaHei"',
      fontSize: 16,
    },
  },
  grid: {
      left: "2%",
      right: "3%",
      bottom: "2%",
      containLabel: true,
    },
  xAxis: {
    type: 'category',
    data: JSON.parse(JSON.stringify(term.value)),
    name: unit.value,
  },
  yAxis: {
    type: 'value',
    name: "车次",
  },
  tooltip: {
    // trigger: 'axis',
    formatter:(parmes) =>{
      console.log(parmes)
      return `${parmes.name}<br/> <ul><li class = 'countNum'><li class = 'countNum'><i style="display: inline-block;margin-right:16px ;width: 10px;height: 10px;background: 
                ${parmes.color} ;border-radius: 50%;}"></i>维修量统计:&nbsp;&nbsp; ${parmes.data}(车次)<li><ul>`
    }
  },
  series: [
    {
       name: "维修量统计",
      type: 'bar',
      data: JSON.parse(JSON.stringify(chartData.value)),
    }
  ]
  };
  chartBox.setOption(option,true)
  window.addEventListener('resize',function(){
    chartBox.resize()
  })
}
const searchData = ()=>{
  console.log(date.value)
  let parmes = {
    type:date.value
  }
  let startDate,endDate;
  if(date.value === 'year'){
      startDate = searchStart?searchStart.value:''
      endDate = searchEnd?searchEnd.value:''
  }else{
    startDate = searchvalue.value?getymd(searchvalue.value[0]):'';
    endDate = searchvalue.value?getymd(searchvalue.value[1]):''
  }
  if(startDate&&endDate){
    parmes = {
      endDate:endDate,
      startDate:startDate,
      type:date.value
    }
    console.log(parmes)
  }
      queryRepHistory(parmes).then((res)=>{
      if(res.code === 200){
         chartData.value = res.data.data;
            term.value = res.data.term;
            years.value = res.data.dropDownYear;
            unit.value = res.data.unit
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
  /deep/ .el-table__header thead tr {
    background-color: rgba(64, 158, 255, 0.1);
  }
  /deep/ .el-col-3 {
    max-width: none;
  }
}
:deep(.el-input) {
    width: 100px;
}
.todate{
    line-height: 32px;
    font-size: 14px;
    color: #666;
    margin: 0 16px;
}
.active{
    background-color: #e7eaf0;
}

.search {
  position: relative;
  .batchimport {
    position: absolute;
    right: 24px;
  }
}
.countNum{
  list-style-type: circle;
}

</style>