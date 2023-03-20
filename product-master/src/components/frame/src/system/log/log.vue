<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-select
          clearable="true"
          v-model="searchvalue"
          placeholder="请选择查询类型"
        >
          <el-option label="登录" value="LOGIN" />
          <el-option label="添加" value="INSERT" />
          <el-option label="更新" value="UPDATE" />
          <el-option label="删除" value="DELETE" />
        </el-select>
      </el-col>

      <el-button size="small" class="searchbutton" @click="searchbutton"
        >查询</el-button
      >
    </div>
    <div class="chartstyle">
      <el-table
        :data="state.tableData1"
        :header-cell-style="{ background: '#d9ecff' }" 
        
        border
        style="width: 100%"
      >
        <el-table-column label="序号" min-width="7%">
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="username" label="操作人员" min-width="10%" />
        <el-table-column prop="requestTime" label="请求时间" min-width="18%" />
        <el-table-column prop="ipAddr" label="IP地址" min-width="15%" />
        <!-- :show-overflow-tooltip='true' -->
        <el-table-column prop="requestMethod" label="请求方法" min-width="15%">
          <template #default="requestscope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="requestscope.row.requestMethod"
            >
              <template #reference>
                <span class="elispice">{{
                  requestscope.row.requestMethod
                }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="requestParam" label="请求参数" min-width="15%">
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.requestParam"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.requestParam }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="requestDesc" label="请求描述" min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.requestDesc"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.requestDesc }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="methodType" label="请求类型" min-width="12%" />
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
</template>
<script setup>
import { reactive, ref } from "vue";
import { markRaw, onBeforeMount } from "vue";
import { getLog as getLog,queryLog as queryLog } from '@/api/index'
import { ElNotification } from "element-plus";
import store from '@/store'
const searchvalue = ref("");
let tableData = [
  {
    userId: 1235665656,
    userName: "设备副班长",
    ipAddr: "113.219.138.174",
    requestMethod:
      "com.allen.inspection.controller.SysUserController.updateRole",
    requestTime: "2022-11-16 18:22:30",
    requestParam: '[{"roleId":7,"username":"17885542585",}]',
    requestDesc: "更新角色信息",
    methodType: "UPDATE",
  },
  {
    userId: 1235665656,
    userName: "点检员",
    ipAddr: "113.219.138.174",
    requestMethod:
      "com.allen.inspection.controller.SysUserController.updateRole",
    requestTime: "2022-11-16 18:22:30",
    requestParam: '[{"roleId":7,"username":"17885542585"}]',
    requestDesc: "更新角色信息",
    methodType: "INSERT",
  },
];
let isQuery = ref(false);
// 分页
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
    isQuery.value = true;
     isloading.value = true;
    let obj = {
    limit:state.PageSize,
    pageNum: state.CurrentPage 
  }
  getLog(obj).then((res)=>{
    isloading.value = false;
    if(res.code === 200){
      let data = res.data;
        state.tableData1=data&&data.records?data.records:[];
        state.Total = data&&data.total?data.total:0;
    }else {
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

onBeforeMount(() => {
  queryTableData();
});
//查询
const searchbutton = () => {
  isloading.value = true;
  let parmes = {
    condition: searchvalue.value,
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  queryLog(parmes).then((res)=>{
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
};

//切换一页显示多少条数据
const handleSizeChange = (val) => {
  state.PageSize = val;
  searchvalue.value&&isQuery.value?searchbutton():queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchbutton():queryTableData();
};
</script>
<style lang = 'less' scoped>
.tablestyle {
  position: relative;
  ::v-deep .el-table__header thead tr {
    background-color: rgba(64, 158, 255, 0.1);
  }
  ::v-deep .el-col-3 {
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
::v-deep .el-table--fit{
  height:100%;
}
::v-deep .el-table__body-wrapper{
  overflow-y: auto;
}
</style>