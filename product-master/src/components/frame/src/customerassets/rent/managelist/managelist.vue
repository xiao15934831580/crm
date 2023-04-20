<template>
<div class="totalStyle">
  <div class="tablestyle">
    <div class="searchsize">
      <el-col :span="12" >
        <el-input
          class="w-10 m-2 mr-16"
          v-model="searchvalue.name"
          placeholder="请输入姓名"
        />
        <el-select class="w-10 m-2" v-model="searchvalue.customerLevel" placeholder="请选择返还状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        
      </el-col>
      <div class="searchButtonBox">
        <el-button  class="searchbutton" @click="searchbutton"
            >查询</el-button>
        <el-button  class="searchbutton " @click="sendAll"
            >一键外呼</el-button>
        <el-button  class="searchbutton" @click="sendAll"
            >一键发送</el-button>
            <el-button  class="searchbutton " @click="importXlsx"
            >导入</el-button>
            <el-button  class="searchbutton " @click="exportXlsx"
            >导出</el-button>
            <el-button  class="searchbutton" @click="addButton"
            >新建</el-button>
      </div>

    </div>
    <div class="chartstyle">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        :header-cell-style="{ background: '#d9ecff' }" 
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" min-width="7%">
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="userName" label="客户名称" min-width="10%" />
        <el-table-column prop="powerStationName" label="电站单元名称" min-width="10%" />
        <el-table-column prop="powerStationAddress" label="电站地址" min-width="10%" />
        <el-table-column prop="refundAmount" label="返还金额" min-width="18%" />
        <el-table-column prop="returnStatus" label="返还状态" min-width="15%" />
        <el-table-column label="操作列" width="250" min-width="28%">
          <template #default="scope">
            <el-button size="small" @click="detail(scope.row.id)"
              >删除</el-button>
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
        :dialogTitile="dialogTitile"
        :dialogTableValue="dialogTableValue"
    ></DiaLog>
</div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { markRaw, onBeforeMount } from "vue";
// import { getLog as getLog,queryLog as queryLog } from '@/api/index'
import { ElNotification } from "element-plus";
import { ElTable } from 'element-plus'
import store from '@/store'
import DiaLog from './dialog.vue'
import * as XLSX from 'xlsx' 
const searchvalue = reactive({
  name:'',
  phoneNumber:'',
  customerLevel:'',
  customerCode:'',
  IDNumber:'',
});
const multipleSelection=ref ([])
const multipleTableRef = ref();
const dialogTitile = ref('')
let tableData = [
  {
    id:'0',
    userName: "张三",
    powerStationName: "电站",
    powerStationAddress:"三峡",
    refundAmount: "100",
    returnStatus:'已返还',
  },
  {
    id:'0',
    userName: "李四",
    powerStationName: "一号电站",
    powerStationAddress:"三峡",
    refundAmount: "200",
    returnStatus:'未返还',
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
//新建
const addButton=()=>{
  dialogTitile.value = '新建'
  dialogFormVisible.value = true;
}
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
const  handleSelectionChange=(val)=> {
        // this.multipleSelection = val;
        multipleSelection.value = [];
        val.forEach((item)=>{
            const id = item.id
			// 判断数组中是否包含这个 id 
			if (multipleSelection.value.indexOf(id) == -1) {
				multipleSelection.value.push(id)
			}
        })
        console.log(multipleSelection)
      }
// 批量发送短信
const sendAll =()=>{
    console.log(multipleSelection._rawValue)  //当前所选中的用户id
}
//余额
const showRemainder=(index,row)=>{
  console.log('1111122')
  dialogTableValue.value = row.remainder
  dialogFormVisible.value = true
}

const exportXlsx = ()=>{
   // 创建工作表
   let head = {
      userName: "客户名称",
      powerStationName: "电站单元名称",
      powerStationAddress:"电站地址",
      refundAmount: "返还金额",
      returnStatus:'返还状态',
    }
    const list = tableData.map(item => {
      const obj = {}
      for (const k in item) {
        if (head[k]) {
          obj[head[k]] = item[k]
        } 
      }
      return obj
    })
  const data = XLSX.utils.json_to_sheet(list)

  // 创建工作簿
  const wb = XLSX.utils.book_new()
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, data, '返还金管理列表')
  // 生成文件并下载
  XLSX.writeFile(wb, '返还金管理列表.xlsx')
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
.searchButtonBox{
  float: right;
}
.chartstyle{
  height: calc(100% - 76px);
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
.searchBox{
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.searchsize {
    position: relative;
    width: 100%;
    border: 1px solid #ecf5ff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0px 0px 6px #d9ecff;
    display: flex;
    justify-content: space-between;
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
.underline{
  text-decoration: underline;
    cursor: pointer;
}
</style>