<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入车牌号/车辆编号/品牌型号"
        />
      </el-col>
      <el-button size="small" class="searchbutton" @click="searchData">查询</el-button>
      <!-- <el-button size="small" @click="handleBuild">新建</el-button> -->
    </div>
    <div class="chartstyle">
      <el-table
        :data="state.tableData1"
        :header-cell-style="{ background: '#d9ecff' }" 
        
        border
        style="width: 100%"
      >
        <el-table-column fixed label="序号" min-width="7%">
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="billCode" label="保养单号"  min-width="15%" />
        <el-table-column prop="carCode" label="车辆编号"  min-width="10%" />
        <el-table-column prop="carNumber" label="车牌号"  min-width="10%" />
        <el-table-column prop="carBrandType" label="品牌型号"   min-width="10%" />
        <el-table-column prop="apvStatusLbl" label="审批状态"  min-width="10%" />
        <!-- <el-table-column prop="iphonenum" label="维保人员" min-width="10%" />
        <el-table-column prop="iphonenum" label="保养开始时间" min-width="10%" />
        <el-table-column prop="iphonenum" label="保养结束时间" min-width="10%" /> -->
        <el-table-column label="操作列"  min-width="10%">
          <template #default="scope">
            <el-button size="small" @click="handleLook(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <template #empty>
            <el-empty v-loading="isloading"></el-empty>
        </template>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:currentPage="state.currentPage"
          v-model:page-size="state.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="state.Total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <!-- 编辑 -->
  <DiaLog
    v-model="dialogFormVisible"
    v-if="dialogFormVisible"
    :dialogFormVisible="dialogFormVisible"
    :dialogTitile="dialogTitile"
    :dialogTableValue="dialogTableValue"
  ></DiaLog>
</template>
<script setup>
import DiaLog from "./dialog.vue";
import { onBeforeMount } from "vue";
import { reactive, ref, markRaw ,watch} from "vue";
import { ElMessage, ElMessageBox ,ElNotification} from "element-plus";
import store from '@/store'
import { getBillMaintain as getBillMaintain,queryBillMaintain as queryBillMaintain} from '@/api/index'
const searchvalue = ref("");
const dialogFormVisible = ref(false);
let dialogTitile = ref("编辑");
let isQuery = ref(false);
let dialogTableValue = reactive({});
//分页
let tableData = [
  {
    id: "8d599ab71da841f79bb35d720439f9a7",
    billCode: "FT202211240002",
    carCode: "002",
    carNumber: "陕A12345",
    carBrandType: "沃尔沃L220",
    apvStatus: "IN_APPV",
    creator: "2022/11/23 08:45:09",
    createdDate: "2022/11/23 08:45:09",
    itemList: [
      {
        id: "8d599ab71da841f79bb35d720439f222",
        maintainItem: "发动机油",
        maintainCycle: "<500",
        replacement: "VDS-3",
        lastExecHour: 1200,
        planExecHour: 1500,
        realExecDate: "2022/11/23 16:52:09",
        realExecHour: 1700,
        executor: "张三",
        remark: "",
      },
    ],
    apvList: [
      {
        id: "8d599ab71da841f79bb35d720439f333",
        apvNode: "设备副班长",
        approver: "李四",
        apvTime: "2022/11/23 16:52:09",
        apvDesc: "同意",
      },
    ],
  },
];
const state = reactive({
  tableLoading: false,
  CurrentPage: 1,
  PageSize: 10,
  Total: 0,
  TotalList: [],
  tableData1: [],
});
const isloading = ref('false')
const queryTableData = () => {
  const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  isloading.value = true;
  getBillMaintain(parms)
    .then((res)=>{
      isloading.value = false;
      if(res.code === 200){
        let data = res.data;
        state.tableData1=data.records;
        state.Total = data.total;
      }else{
        if (res.msg && res.msg.indexOf("token已过期") > -1) {
          ElNotification({
            title: "Warning",
            message: res.msg,
            type: "warning",
          });
          store.dispatch("app/logout");
        }
      }
    })
    .catch(()=>{})
};
watch(
    () => dialogFormVisible.value,
    () => {
      if(!dialogFormVisible.value){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)
onBeforeMount(() => {
  // getdata();
  // queryTableData();
});
const searchData = ()=>{
  isQuery.value = true;
   isloading.value = true;
  let parmes = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
    condition: searchvalue.value
  }
    queryBillMaintain(parmes).then((res)=>{
      console.log(res)
      isloading.value = false;
      if(res.code === 200){
          let data = res.data;
          state.tableData1=data&&data.records?data.records:[];
          state.Total = data&&data.total?data.total:0;
      } else{
        if (res.msg && res.msg.indexOf("token已过期") > -1) {
          ElNotification({
            title: "Warning",
            message: res.msg,
            type: "warning",
          });
          store.dispatch("app/logout");
        }
      }
    })
}
//切换一页显示多少条数据
const handleSizeChange = (val) => {
  state.PageSize = val;
  searchvalue.value&&isQuery.value?searchUserData():queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchUserData():queryTableData();
};
const handleBuild = () => {
  dialogTitile.value = "新建";
  // dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
};
//查看
const handleLook = (index, row) => {
  dialogTitile.value = "查看";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
};
</script>
<style  lang = 'less' scoped>
.tablestyle {
  position: relative;
  /deep/ .el-table__header thead tr {
    background-color: rgba(64, 158, 255, 0.1);
  }
  /deep/ .el-col-3 {
    max-width: none;
  }
}
.demo-pagination-block {
  margin-top: 16px;
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
/deep/ .el-table--fit{
  height:100%;
}
/deep/ .el-table__body-wrapper{
  overflow-y: auto;
}
</style>