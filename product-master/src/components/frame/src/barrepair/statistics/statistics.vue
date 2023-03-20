<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入维修人员姓名"
        />
      </el-col>
      <el-button size="small" class="searchbutton"  @click="searchData">查询</el-button>
    </div>
    <div class="chartstyle">
      <el-table
        :data="state.tableData1"
        :header-cell-style="{ background: '#d9ecff' }" 
        
        border
        style="width: 100%"
      >
        <el-table-column fixed  label="序号" min-width="7%" >
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" min-width="10%"/>
        <el-table-column prop="date" label="日期" min-width="10%" />
        <el-table-column prop="manHour" label="工时/h" min-width="10%" />
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
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import store from '@/store'
import { getManHourCountAll as getManHourCountAll,queryRepManHourCount as queryRepManHourCount } from '@/api/index'
const searchvalue = ref("");

let tableData = [
  {
      "userId":2236876483,
      "userName": "张三",
      "date": "2022-11-16 18:22:30",
      "manHour":8.5
  },
  {
      "userId":2236876483,
      "userName": "李四",
      "date": "2022-11-16 18:22:30",
      "manHour":10.2
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
  isloading.value = true;
 const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  getManHourCountAll(parms)
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
//查询
const searchData = ()=>{
  isQuery.value = true;
  isloading.value = true;
  let parmes = {
    condition:searchvalue.value,
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
    queryRepManHourCount(parmes).then((res)=>{
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
const filterTag = (value, row) => {
  return row.tag === value;
};
const handleEdit = (index, row) => {
  dialogTitile.value = "编辑";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
};
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
const handleLook = (index, row) => {
  dialogTitile.value = "查看";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
};
// 新建
const handleBuild = () => {
  dialogTitile.value = "新建";
  dialogFormVisible.value = true;
};

// 批量导入
const batchimport = () => {
  dialogUploadVisible.value = true;
};
const cancle = () => {
  dialogUploadVisible.value = false;
};
//删除前的钩子
const beforeRemove = (file, fileList) => {
  return ElMessageBox.confirm(`你确定删除${file.name}?`);
};

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
/deep/ .el-table--fit{
  height:100%;
}
/deep/ .el-table__body-wrapper{
  overflow-y: auto;
}
</style>