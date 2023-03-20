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
      <el-button size="small" class="searchbutton" @click="searchCarData">查询</el-button>
      <el-button size="small" @click="handleBuild">新建</el-button>
    </div>
    <div class="chartstyle">
      <el-table
        :data="state.tableData1"
        :header-cell-style="{ background: '#d9ecff' }" 
        
        border
        style="width: 100%"
      >
        <el-table-column fixed label="序号"  min-width="7%">
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column fixed prop="code" label="车辆编号"  min-width="10%" />
        <el-table-column fixed prop="carNumber" label="车牌号" min-width="10%" />
        <el-table-column prop="brandType" label="品牌型号"  min-width="10%" />
        <el-table-column prop="purchaseDate" label="购买日期" min-width="10%" />
        <el-table-column prop="scrapDate" label="报废日期"  min-width="10%" />
        <el-table-column
          prop="bucketCapacity"
          label="铲斗容量（m³）"
          min-width="15%"
          width="140"
        />
        <el-table-column  fixed='right' label="操作列" width="200" min-width="20%">
          <template #default="scope">
            <el-button size="small" @click="handleLook(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
    :dropdownValue = 'dropdownValue'
  ></DiaLog>
</template>
<script setup>
import DiaLog from "./dialog.vue";
import { onBeforeMount } from "vue";
import store from '@/store'
import { reactive, ref, markRaw,watch } from "vue";
import { ElMessage,ElNotification,ElMessageBox } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { getAllCar as getAllCar,queryCar as queryCar ,deleteCar as deleteCar } from '@/api/index'
const searchvalue  = ref("");
let dropdownValue =  reactive({});
const dialogFormVisible = ref(false);
let dialogTitile = ref("编辑");
let dialogTableValue = reactive({});
let isQuery = ref(false);
const state = reactive({
  tableLoading: false,
  CurrentPage: 1,
  PageSize: 10,
  Total: 0,
  TotalList: [],
  tableData1: [],
});
// const getdata = () =>{
//   http.get('/getdata').then((res)=>{
//     console.log(res)
//   })
// }
const isloading = ref('false')
const queryTableData = () => {
  isloading.value = true;
  const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  getAllCar(parms)
    .then((res)=>{
      isloading.value = false;
      if(res.code === 200){
        let data = res.data;
        state.tableData1=data.records;
        state.Total = data.total;
        dropdownValue.value = data.dropDowns;
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

const searchCarData = ()=>{
  isloading.value = true;
  isQuery.value = true;
  let parmes = {
    condition: searchvalue.value,
    limit:state.PageSize,
    pageNum:state.CurrentPage,
    
  }
    queryCar(parmes).then((res)=>{
      isloading.value = false;
      console.log(res)
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
onBeforeMount(() => {
  // getdata();
  // queryTableData();
});
//切换一页显示多少条数据
const handleSizeChange = (val) => {
 state.PageSize = val;
  searchvalue.value&&isQuery.value?searchCarData():queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchCarData():queryTableData();
};
const handleLook = (index, row) => {
  dialogTitile.value = "查看";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
};
//新建
const handleBuild = () => {
  dialogTitile.value = "新建";
  dialogFormVisible.value = true;
};
//编辑
const handleEdit = (index, row) => {
  dialogTitile.value = "编辑";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
};
//删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm("你确定删除此人员信息吗?", "删除", {
    type: "warning",
    icon: markRaw(Delete),
  })
    .then(() => {
      deleteCar(row.id).then((res)=>{
        if(res.code === 200){
            state.tableData1.splice(index, 1);
            if(state.tableData1.length === 0&& state.CurrentPage>1){
              state.CurrentPage = state.CurrentPage -1;
            }
            searchvalue.value&&isQuery.value?searchCarData():queryTableData();
            console.log('111111')
            ElMessage({
              type: "success",
              message: "删除成功",
            });
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
      })
};
</script>
<style  lang = 'less' scoped>
.tablestyle {
  position: relative;
  :deep( .el-table__header thead tr) {
    background-color: rgba(64, 158, 255, 0.1);
  }
  :deep( .el-col-3) {
    max-width: none;
  }
}
.demo-pagination-block {
  margin-top: 16px;
  position: absolute;
  bottom: 32px;
  right: 32px;
}
:deep( .el-table--fit){
  height:100%;
}
:deep(.el-table__body-wrapper) {
  overflow-y: auto;
}
/* :deep(.el-table--border::after){
  width: 0px;
} */
/* :deep(.el-table__inner-wrapper::before){
  height: 0;
} */
/* :deep(.el-table--border::before){
  width: 0px;
}
:deep(.el-table__border-left-patch){
  width: 0;
}
:deep(.el-table__body){
  border-left: 1px solid #ebeef5;
}
:deep(.el-scrollbar__view){
  border-left: 1px solid #ebeef5;
} */
</style>