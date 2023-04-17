<template>
<div class="totalStyle">
  <div class="tablestyle">
    <div class="searchsize">
      <el-col class="searchBox">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue.name"
          placeholder="请输入姓名"
        />
        <el-input
          class="w-10 m-2"
          v-model="searchvalue.phoneNumber"
          placeholder="请输入手机号"
        />
        <el-input
          class="w-10 m-2"
          v-model="searchvalue.customerCode"
          placeholder="请输入客户编码"
        />
         <el-input
          class="w-10 m-2"
          v-model="searchvalue.IDNumber"
          placeholder="请输入证件号"
        />
      </el-col>
      <div class="searchButtonBox">
        <el-button  class="searchbutton mt-16 " @click="sendAll"
            >批量发送短信</el-button>
        <el-button  class="searchbutton mt-16 " @click="searchbutton"
            >查询</el-button>
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
        :row-key="getRowKeys"
      >
      <el-table-column type="selection" width="55" :reserve-selection="true"/>
        <el-table-column label="序号" min-width="7%">
          <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
        </el-table-column>
        <el-table-column prop="customerCode" label="客户编码" min-width="10%" />
        <el-table-column prop="userName" label="姓名" min-width="10%" />
        <el-table-column prop="IDNumber" label="证件号" min-width="18%" />
        <el-table-column prop="phoneNumber" label="手机号" min-width="15%" />
        <!-- :show-overflow-tooltip='true' -->
        <el-table-column prop="maintainType" label="关怀类型" min-width="15%">
          <template #default="requestscope">
            <el-popover
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="requestscope.row.maintainType"
            >
              <template #reference>
                <span class="elispice">{{
                  requestscope.row.maintainType
                }}</span>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作列" width="250" min-width="28%">
          <template #default="scope">
            <el-button size="small" @click="sendMsg(scope.row)"
              >发送短信</el-button>
              <el-button size="small" @click="callPhone(scope.row)"
              >呼叫</el-button>
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
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { markRaw, onBeforeMount } from "vue";
// import { getLog as getLog,queryLog as queryLog } from '@/api/index'
import { ElNotification } from "element-plus";
import { ElTable } from 'element-plus'
import {smsGetTowns as smsGetTowns, sendSmsList as sendSmsList} from '@/api/common'
import store from '@/store'
import YSF from '@neysf/qiyu-web-sdk';
// const { APIs } = window.SoftPhoneSDK;
// const { SoftPhone } = window.SoftPhoneSDK;
// const softPhone = SoftPhone.getInstance();
const searchvalue = reactive({
  name:'',
  phoneNumber:'',
  customerLevel:'',
  customerCode:'',
  IDNumber:'',
});
const multipleSelection=ref ([])
const multipleTableRef = ref();
let tableData = [
  {
    id:'0',
    customerCode:'11',
    userName: "设备副班长",
    IDNumber: "111",
    phoneNumber:"18729538420",
    maintainType: "vip",
    detailAddress:'45451215',
  },
  {
    id:'1',
    userId: 1235665656,
    userName: "设备副班长",
    IDNumber: "111",
    phoneNumber:"18729538420",
    maintainType: "一级",
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
  // YSF.init('6e03e391cbb9e26e1cdb868f15de52e9');
  // YSF.init('6c5351b62b27bf83cd30a533652d315f', {
  //       templateId: 123, // templateId表示自定义会话邀请的模板标识
  //       shuntId: 123, // shuntId表示访客选择多入口分流模版id
  //       sessionInvite: false, // sessionInvite表示是否开启会话邀请设置
  //       hidden: 1 // hidden表示是否隐藏访客端默认入口
  //   }).then(ysf => {
  //       ysf('open');
  //   }).catch(error => {
  //       console.log('sdk加载失败---', error);
  //   });
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
const getRowKeys=(row)=> {
    return row.code;
}
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
    console.log(multipleSelection)
    sendSmsList()
}
//发送短信
const sendMsg = (item)=>{
  // let obj={
  //   phone:item.phoneNumber
  // }
  smsGetTowns(item.phoneNumber).then((res)=>{
    console.log(res)
  })
}
const callPhone = (item)=>{
  
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
  height: calc(100% - 124px);
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
    height: 114px;
    border: 1px solid #ecf5ff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0px 0px 6px #d9ecff;
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