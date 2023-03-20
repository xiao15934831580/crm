<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入违规人所属/违规人姓名"
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
        <el-table-column prop="recordTime" label="违规时间" min-width="20%" />
        <el-table-column prop="belongType" label="违规人所属" min-width="15%" />
        <el-table-column
          prop="violatorName"
          label="违规人姓名"
          min-width="15%"
        />
        <el-table-column prop="itemLbl" label="违规项目" min-width="15%" />
        <el-table-column prop="description" label="违规说明" min-width="15%" />
        <el-table-column label="违规照片（查看）" min-width="15%">
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
  <div class="lz-dialog">
        <el-dialog
        ref="imgRef"
        :model-value="dialogimgVisible"
        title="违规照片"
        :before-close="closeImg"
        width="30%"
        :close-on-click-modal ="false"
        draggable
        >
            <div class="userPassword">
              <el-image
              :src="imgurl"
              :zoom-rate="1.2"
              :initial-index="4"
              fit="cover"
            />

            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button class="btn-mixins-clear-default" @click="closeImg"
                    >返回</el-button>
                </span>
        </template>
      </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { markRaw, onBeforeMount } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import store from '@/store'
import { getViolation as getViolation,queryViolation as queryViolation } from '@/api/index'
const searchvalue = ref("");
let tableData = [
  {
    id: "11111",
    recordTime: "2022-11-16 18:22:30",
    belongType: "内部",
    violatorName: "张三",
    item: "未佩戴安全帽",
    description: "hhhh",
    photoPath:
      "https://img0.baidu.com/it/u=3970275284,1564100911&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
  },
  {
    id: "11111",
    recordTime: "2022-11-16 18:22:30",
    belongType: "日照集团",
    violatorName: "张三",
    item: "未系安全带",
    description: "hhhhh",
    photoPath:
      "https://img0.baidu.com/it/u=3970275284,1564100911&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
  },
];
let dialogimgVisible = ref(false);
const dialogUploadVisible = ref(false);
const dialogUploadWidth = "20%";
let dialogTitile = ref("编辑");
let dialogTableValue = reactive({});
let isQuery = ref(false);
let imgurl = ref("")
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
  getViolation(parms)
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
    queryViolation(parmes).then((res)=>{
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
  searchvalue.value&&isQuery.value?searchData():queryTableData();
};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  //判断总共页数和一页显示多少条数据
state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchData():queryTableData();
};
const closeImg = ()=>{
  dialogimgVisible.value = false;
}
const handleLook = (index,row)=>{
  imgurl.value = row.imgBase64;
   dialogimgVisible.value = true;
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