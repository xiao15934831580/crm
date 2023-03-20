<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入报修单号/车辆编号/车牌号"
          
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
        <el-table-column fixed  label="序号" min-width="5%" >
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column fixed prop="billCode" label="报修单号" width="200" min-width="10%" >
           <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.billCode"
            >
              <template #reference>
                <span class="elispice underline" @click="handleLook(scope.$index, scope.row)">{{
                  scope.row.billCode}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column fixed prop="carCode" label="车辆编号"    min-width="8%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="scope.row.carCode"
            >
              <template #reference>
                <span class="elispice">{{
                  scope.row.carCode}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column fixed prop="carNumber" label="车牌号"  min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="100"
              trigger="hover"
              :content="scope.row.carNumber"
            >
              <template #reference>
                <span class="elispice">{{
                  scope.row.carNumber}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="faultType" label="故障分类"  min-width="20%" >
          <template #default="menuLblScope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="menuLblScope.row.faultType"
            >
              <template #reference>
                <span class="elispice">{{
                  menuLblScope.row.faultType}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="faultPart" label="故障部件"    min-width="20%" >
          <template #default="menuLblScope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="menuLblScope.row.faultPart"
            >
              <template #reference>
                <span class="elispice">{{
                  menuLblScope.row.faultPart}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="faultSituation" label="故障现象"   min-width="20%">
          <template #default="menuLblScope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="menuLblScope.row.faultSituation"
            >
              <template #reference>
                <span class="elispice">{{
                  menuLblScope.row.faultSituation}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="assignDate" label="派修时间"  min-width="15%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.assignDate"
            >
              <template #reference>
                <span class="elispice">{{
                  scope.row.assignDate}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="inspector" label="点检员" min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="scope.row.inspector"
            >
              <template #reference>
                <span class="elispice" >{{
                  scope.row.inspector}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="repairman" label="维修人员"  min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="scope.row.repairman"
            >
              <template #reference>
                <span class="elispice" >{{
                  scope.row.repairman}}</span>
              </template>
            </el-popover>
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
import DiaLog from './dialog.vue';
import { reactive, ref, watch } from "vue";
import { markRaw, onBeforeMount } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import store from '@/store'
import { getDispatchAll as getDispatchAll,queryDispatch as queryDispatch } from '@/api/index'
const searchvalue = ref("");
let tableData = [
  {
            "id": "8d599ab71da841f79bb35d720439f9a7",
            "billCode": "FT202211230001",
            "carCode": "001",
            "carNumber": "陕A12345",
            "faultType": "元部件损坏",
            "carBrandType": "沃尔沃L220",
            "faultPart": "轴承",
            "faultSituation": "异响",
            "inspector_name": "张三",
            "repairman_name": "李四",
            "assign_date": "2022/11/23 13:52:09",
            "creator": "张三",
            "itemList": [
				{
					"id": "8d599ab71da841f79bb35d720439f222",
					"faultType": "元部件故障",
					"faultPart": "轴承",
					"faultSituation": "损坏",
					"otherDesc": "",
					"urgencyLevel": "紧急",
          
				},
				{
					"id": "8d599ab71da841f79bb35d720439f223",
					"faultType": "元部件故障",
					"faultPart": "轮胎",
					"faultSituation": "没气",
					"otherDesc": "",
					"urgencyLevel": "紧急"
				}
			],
			"apvList": [
				{
					"id": "8d599ab71da841f79bb35d720439f333",
					"apvNode": "设备副班长",
					"approver": "李四",
					"apvTime": "2022/11/23 16:52:09",
					"apvDesc": "同意"
				}
			]
  },
];
const dialogFormVisible = ref(false);
const dialogUploadVisible = ref(false);
const dialogUploadWidth = "20%";
let dialogTitile = ref("编辑");
let dialogTableValue = reactive({});
let dropdownValue =  reactive({});
// 上传列表
let fileList = reactive([]);
let files = reactive([]);
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
  isloading.value = true;
  const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  getDispatchAll(parms)
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

onBeforeMount(() => {
  queryTableData();
});
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
//点击查询
const searchData = ()=>{
  isloading.value = true;
  isQuery.value = true;
  let parmes = {
    condition:searchvalue.value,
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
    queryDispatch(parmes).then((res)=>{
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
  :deep( .el-table__header thead tr) {
    background-color: rgba(64, 158, 255, 0.1);
  }
  :deep( .el-col-3) {
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
.underline{
  text-decoration: underline;
    cursor: pointer;
}
:deep( .el-table--fit){
  height:100%;
}
:deep( .el-table__body-wrapper){
  overflow-y: auto;
}
</style>