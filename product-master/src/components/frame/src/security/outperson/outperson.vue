<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入所属公司"
        />
      </el-col>
      <el-button size="small" class="searchbutton" @click="searchData">查询</el-button>
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
        <el-table-column prop="visitTime" label="入场时间" min-width="20%" />
        <el-table-column prop="company" label="所属公司" min-width="15%" />
        <el-table-column prop="visitorCount" label="入场人数" min-width="10%" />
        <el-table-column prop="leader" label="负责人" min-width="10%" />
        <el-table-column
          prop="leaderPhoneNum"
          label="负责人电话"
          min-width="15%"
        />
        <el-table-column prop="receiver" label="接待人" min-width="10%" />
        <el-table-column
          prop="receiverPhoneNum"
          label="接待人电话"
          min-width="15%"
        />
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
  <!-- <EditDialog
    v-model="dialogFormVisible"
    v-if="dialogFormVisible"
    :dialogFormVisible="dialogFormVisible"
    :dialogTitile="dialogTitile"
    :dialogTableValue="dialogTableValue"
  ></EditDialog> -->
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { markRaw, onBeforeMount } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import store from '@/store'
import { getVisitor as getVisitor,queryVisitor as queryVisitor } from '@/api/index'
const searchvalue = ref("");
let tableData = [
  {
    id: "8d599ab71da841f79bb35d720439f9a7",
    visitTime: "2022/11/23 13:52:09",
    visitorCount: "4",
    company: "歌尔集团",
    leader: "张三",
    leaderPhoneNum: "18300901234",
    receiver: "李四",
    receiverPhoneNum: "18300904321",
  },
];
const dialogFormVisible = ref(false);
const dialogUploadVisible = ref(false);
const dialogUploadWidth = "20%";
let dialogTitile = ref("编辑");
let dialogTableValue = reactive({});
let isQuery = ref(false);
// 上传列表
let fileList = reactive([]);
let files = reactive([]);
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
const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  isloading.value = true;
  getVisitor(parms)
    .then((res)=>{
      isloading.value = false;
      if(res.code === 200){
        let data = res.data;
        state.tableData1=data.records;
        state.Total = data.total;
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

onBeforeMount(() => {
  queryTableData();
});
const searchData = ()=>{
  isQuery.value = true;
  isloading.value = true;
  let parmes = {
    condition:searchvalue.value,
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
    queryVisitor(parmes).then((res)=>{
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
  searchvalue.value&&isQuery.value?searchData():queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchData():queryTableData();
};
// const submitFileForm = () => {console.log('上传成功')};
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
/deep/ .el-table--fit{
  height:100%;
}
/deep/ .el-table__body-wrapper{
  overflow-y: auto;
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
</style>