<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入姓名/等级/手机号"
        />
      </el-col>

      <el-button size="small" class="searchbutton" @click="searchbutton"
        >查询</el-button>
    </div>
    <div class="chartstyle">
      <el-table
        :data="tableData"
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
        <el-table-column prop="userName" label="姓名" min-width="10%" />
        <el-table-column prop="IDNumber" label="证件号" min-width="18%" />
        <el-table-column prop="phoneNumber" label="手机号" min-width="15%" />
        <!-- :show-overflow-tooltip='true' -->
        <el-table-column prop="customerLevel" label="客户等级" min-width="15%">
          <template #default="requestscope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="requestscope.row.customerLevel"
            >
              <template #reference>
                <span class="elispice">{{
                  requestscope.row.customerLevel
                }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="市" min-width="15%">
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.city"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.city }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="county" label="县" min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.county"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.county }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="town" label="镇" min-width="12%" />
        <el-table-column prop="detailAddress" label="详细地址" min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.detailAddress"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.detailAddress }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="investmentMethod" label="投资方式" min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.investmentMethod"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.investmentMethod }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="customerType" label="新/老客户" min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.customerType"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.customerType }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="installationCapacity" label="安装容量" min-width="10%" >
          <template #default="scope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="scope.row.installationCapacity"
            >
              <template #reference>
                <span class="elispice">{{ scope.row.installationCapacity }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作列" width="250" min-width="28%">
          <template #default="scope">
            <el-button size="small" @click="detail(scope.row.id)"
              >详情</el-button
            >
          </template>
        </el-table-column>
        <template #empty>
            <el-empty v-loading="isloading"></el-empty>
        </template>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          :currentPage="state.currentPage"
          :page-size="state.pageSize"
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
    <DiaLog
        v-model="dialogFormVisible"
        v-if="dialogFormVisible"
        :dialogFormVisible="dialogFormVisible"
    ></DiaLog>
</template>
<script setup>
import { reactive, ref } from "vue";
import { markRaw, onBeforeMount } from "vue";
import { getLog as getLog,queryLog as queryLog } from '@/api/index'
import { ElNotification } from "element-plus";
import store from '@/store'
import DiaLog from './dialog.vue'
const searchvalue = ref("");
let tableData = [
  {
    id:'1212',
    userName: "设备副班长",
    IDNumber: "111",
    phoneNumber:"13456456",
    customerLevel: "一级",
    city: '西安',
    county: "22",
    town:'11',
    detailAddress:'45451215',
    investmentMethod:'5454',
    customerType: "new",
    installationCapacity:'545L'
  },
  {
    userId: 1235665656,
    userName: "设备副班长",
    IDNumber: "111",
    phoneNumber:"13456456",
    customerLevel: "一级",
    city: '西安',
    county: "22",
    town:'11',
    detailAddress:'45451215',
    investmentMethod:'5454',
    customerType: "new",
    installationCapacity:'545L'
  },
];
let isQuery = ref(false);
// 分页
const dialogFormVisible = ref(false)
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
        // state.tableData1=data&&data.records?data.records:[];
        // state.Total = data&&data.total?data.total:0;
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
//   queryTableData();
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
//详情
const detail = (id)=>{
    dialogFormVisible.value = true;
}
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