<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入品牌型号"
        />
      </el-col>
      <el-button size="small" class="searchbutton" @click="searchData">查询</el-button>
      <el-button size="small" @click="handleBuild">新建</el-button>
    </div>
    <div class="chartstyle">
      <el-table
        :data="state.tableData1"
        :header-cell-style="{ background: '#d9ecff' }" 
        
        border
        style="width: 100%"
      >
        <el-table-column label="序号" min-width="5%">
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="carBrandType" label="品牌型号" min-width="10%" />
        <el-table-column
          prop="maintainItemLbl"
          label="保养项目/内容"
          min-width="10%"
        />
        <el-table-column
          prop="maintainCycle"
          label="保养周期（h）"
          min-width="10%"
        />
        <el-table-column
          prop="replacement"
          label="油品或滤芯型号"
          min-width="10%"
        />
        <el-table-column label="操作列" min-width="5%">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
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
import { reactive, ref, markRaw,watch } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { getMaintain as getMaintain,queryMaintain as queryMaintain,editMaintain as editMaintain} from '@/api/index'
const searchvalue = ref("");
const dialogFormVisible = ref(false);
let dialogTitile = ref("编辑");
let dialogTableValue = reactive({});
let isQuery = ref(false);
//分页
let tableData = [
  {
    carBrandType: "沃尔沃L220",
    maintainItem: "发动机油",
    maintainCycle: "<500",
    replacement: "VDS-3",
    id: "8d599ab71da841f79bb35d720439f9a7",
    itemList: [
      {
        maintainItem: "发动机油",
        maintainCycle: "<500",
        replacement: "VDS-3",
      },
    ],
  },
];
const isloading = ref('false')
const state = reactive({
  tableLoading: false,
  CurrentPage: 1,
  PageSize: 10,
  Total: 0,
  TotalList: [],
  tableData1: [],
});
const queryTableData = () => {
  isloading.value = true;
  const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  getMaintain(parms)
    .then((res)=>{
      isloading.value = false;
      if(res.code === 200){
        let data = res.data;
        state.tableData1=data.records;
        state.Total = data.total;
        // dropdownValue.value = data.dropDowns;
        // console.log(dropdownValue.value)
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
  queryTableData();
});
const searchData = ()=>{
  isQuery.value = true;
   isloading.value = true;
  let parmes = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
    condition: searchvalue.value
  }
    queryMaintain(parmes).then((res)=>{
      console.log(res)
      isloading.value = false;
      if(res.code === 200){
          let data = res.data;
          state.tableData1=data&&data.records?data.records:[];
          state.Total = data&&data.total?data.total:0;
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
//切换一页显示多少条数据
const handleSizeChange = (val) => {
state.PageSize = val;
  searchvalue.value&&isQuery.value?searchUserData():queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchUserData():queryTableData();
  }
//新建
const handleBuild = () => {
  dialogTitile.value = "新建";
  dialogFormVisible.value = true;
};
//编辑
const handleEdit = (index, row) => {
  dialogTitile.value = "编辑";
  editMaintain(row.carBrandType).then((res)=>{
    if(res.code === 200){
      dialogTableValue.value = res.data;
      console.log(dialogTableValue.value)
      dialogFormVisible.value = true;
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
};
//删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm("你确定删除此人员信息吗?", "删除", {
    type: "warning",
    icon: markRaw(Delete),
  })
    .then(() => {
      state.tableData1.splice(index, 1);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
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