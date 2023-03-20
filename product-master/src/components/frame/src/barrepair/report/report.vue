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
        <el-table-column fixed   label="序号"  min-width="4%">
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column   prop="billCode" label="报修单号" width="200px"  min-width="15%">
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
        <el-table-column  prop="carCode" label="车辆编号"  min-width="6%">
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
        <el-table-column  prop="carNumber" label="车牌号"  min-width="7%">
          <template #default="scope">
            <el-popover
              placement="top-start"
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
        <el-table-column  prop="carBrandType" label="品牌型号"  min-width="8%">
           <template #default="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="scope.row.carBrandType"
            >
              <template #reference>
                <span class="elispice">{{
                  scope.row.carBrandType}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="createdDate" label="报修时间"   min-width="13%">
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.createdDate"
            >
              <template #reference>
                <span class="elispice">{{
                  scope.row.createdDate}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="faultType" label="故障分类"  min-width="12%">
          <template #default="menuLblScope">
            <el-popover
              placement="top-start"
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
        <el-table-column prop="faultPart" label="故障部件"  min-width="12%">
          <template #default="menuLblScope">
            <el-popover
              placement="top-start"
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
        <el-table-column prop="faultSituation" label="故障现象"  min-width="10%">
           <template #default="menuLblScope">
            <el-popover
              placement="top-start"
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
        <el-table-column prop="approver" label="当前审批人"  min-width="7%">
          <template #default="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="scope.row.approver"
            >
              <template #reference>
                <span class="elispice" >{{
                  scope.row.approver}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  prop="apvStatusLbl" label="单据状态"  min-width="7%">
          <template #default="menuLblScope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="menuLblScope.row.apvStatusLbl"
            >
              <template #reference>
                <span class="elispice">{{
                  menuLblScope.row.apvStatusLbl}}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column fixed="right"  label="操作列"  width="150px" min-width="10%">
          <template #default="scope">
            <el-button size="small" @click="handleLook(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="small" v-if="isShowEdit&&scope.row.apvStatusLbl === '审批中'" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
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
import DiaLog from './dialog.vue';
import { reactive, ref, watch ,onMounted} from "vue";
import { markRaw, onBeforeMount } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import store from '@/store'
import { getReportRepAll as getReportRepAll,queryReportRep as queryReportRep} from '@/api/index'
const searchvalue = ref("");
let tableData = [
{
			"id": "8d599ab71da841f79bb35d720439f9a7",
			"billCode": "FT202211240002",
			"carCode": "002",
			"carNumber": "陕A12345",
			"carBrandType": "沃尔沃L220",
			"createdDate": "2022/11/23 16:52:09",
			"faultType": "元部件故障",
			"faultPart": "轴承,轮胎",
			"faultSituation": "损坏,没气",
			"approver": "王五",
			"approvalStatus": "IN_APPV",
			"creator": "张三",
      'faultTypeOption':[
            {
              label:'元部件故障',
              value:'1'
            },
            {
              label:'主部件故障',
              value:'2'
            },
            {
              label:'故障',
              value:'3'
            }
          ],
          'faultPartOption':[
            {
              label:'元部件',
              value:'a'
            },
            {
              label:'主部件',
              value:'b'
            },
            {
              label:'部件',
              value:'c'
            }
          ],
          'faultSituationOption':[
            {
              label:'损坏',
              value:'1'
            },
            {
              label:'没气',
              value:'2'
            },
            {
              label:'漏油',
              value:'3'
            }
          ],
			"itemList": [
				{
					"id": "8d599ab71da841f79bb35d720439f222",
					"faultType": {
						"id": "8d599ab71da841f79bb35d720439f112",
						"value": "1",
						"label": "元部件故障"
					},
					"faultPart": "b",
					"faultSituation": "3",
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
		}
];
const dialogFormVisible = ref(false);
const dialogUploadVisible = ref(false);
const dialogUploadWidth = "20%";
let dialogTitile = ref("编辑");
let dropdownValue =  reactive({});
let dialogTableValue = reactive({});
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
const isShowEdit = ref('')
const queryTableData = () => {
  isloading.value = true;
  state.tableData1 = []
  const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  getReportRepAll(parms)
    .then((res)=>{
      isloading.value = false;
      if(res.code === 200){
        let data = res.data;
        state.tableData1=data.records;
        state.Total = data.total;
        dropdownValue.value = data.dropDowns;
      }else{
        if(res.code === 500){
          ElNotification({
              title: 'Warning',
              message: '服务器异常',
              type: 'warning',
            })
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

      }
    })
    .catch(()=>{})
};
watch(
    () => dialogFormVisible.value,
    () => {
      if(!dialogFormVisible.value && dialogTitile.value == "编辑"){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)
onBeforeMount(() => {
  JSON.parse(localStorage.getItem('userData')).roleName === '超级管理员'|| JSON.parse(localStorage.getItem('userData')).roleName === '设备副班长'?isShowEdit.value = true:isShowEdit.value = false
  console.log(isShowEdit.value)
});
const searchData = ()=>{
  isQuery.value = true;
  isloading.value = true;
  state.tableData1 = []
  let parmes = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
    condition: searchvalue.value
  }
    queryReportRep(parmes).then((res)=>{
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

const handleLook = (index, row) => {
  console.log(row)
  dialogTitile.value = "查看";
  dialogTableValue.value = JSON.parse(JSON.stringify(row));
  dialogFormVisible.value = true;
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
  //判断总共页数和一页显示多少条数据
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
.underline{
  text-decoration: underline;
    cursor: pointer;
}
/deep/ .el-table--fit{
  height:100%;
}
/deep/ .el-table__body-wrapper{
  overflow-y: auto;
}
.elispice {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
}
</style>