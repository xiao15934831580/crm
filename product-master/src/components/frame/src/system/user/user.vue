<template>
<div>
    <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入用户名/姓名/账号状态"
        />
      </el-col>
      <el-button size="small" class="searchbutton" @click="searchUserData">查询</el-button>
      <el-button size="small" @click="handleBuild">新建</el-button>
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
        <el-table-column prop="username" label="用户名" min-width="10%" />
        <el-table-column prop="realName" label="姓名" min-width="10%" />
        <el-table-column prop="sexLbl" label="性别" min-width="7%" />
        <el-table-column prop="roleLbl" label="角色" min-width="15%" />
        <el-table-column prop="loginClientLbl" label="登录设备" min-width="10%" />
        <el-table-column prop="phoneNum" label="电话号码" min-width="15%" />
        <el-table-column prop="statusLbl" label="账号状态" min-width="10%">
          <template #default="scope">
            <el-tag
              :type="scope.row.statusLbl === '启用' ? 'success' : ''"
              disable-transitions
              >{{ scope.row.statusLbl }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作列" width="250" min-width="28%">
          <template #default="scope">
            <el-button size="small" @click="changePassword(scope.row.id)"
              >重置密码</el-button
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
        <!-- <el-pagination
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
        /> -->
      </div>
    </div>
  </div>
  <!-- 编辑 -->
  <EditUser
    v-model="dialogFormVisible"
    v-if="dialogFormVisible"
    :dialogFormVisible="dialogFormVisible"
    :dialogTitile="dialogTitile"
    :dialogTableValue="dialogTableValue"
    :dropdownValue = 'dropdownValue'
  ></EditUser>
  <!-- 修改密码 -->
  <div class="lz-dialog">
        <el-dialog
        ref="posswordRef"
        :model-value="dialogPasswordVisible"
        title="重置密码"
        :before-close="closePassword"
        width="30%"
        :close-on-click-modal ="false"
        draggable
        >
            <div class="userPassword">
                <el-form
                :model="formPassword"
                :inline="true"
                label-width="80px"
                :rules="rules"
                ref="passwordform"
                require-asterisk-position="left"
                size="default"
                scroll-to-error="true"
            >
                <el-form-item label="新密码" prop="new" required>
                    <el-input
                        placeholder="请输入新密码"
                        type="password"
                        show-password
                        v-model="formPassword.new"
                    />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm" required>
                    <el-input
                        placeholder="请输入原始密码"
                        type="password"
                        v-model="formPassword.confirm"
                        show-password
                    />
                </el-form-item>
            </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                <el-button class="btn-mixins-clear-default" @click="savePassword(posswordRef)"
                    >确定</el-button>
                <el-button class="btn-mixins-clear-default" @click="closePassword"
                    >返回</el-button>
                </span>
        </template>
        </el-dialog>
  </div>
</div>

</template>
<script setup>
import EditUser from "./edituser.vue";
import { onBeforeMount, watch, getCurrentInstance } from "vue";
import { reactive, ref, markRaw } from "vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import store from '@/store'
import { getAllUserInfo as getAllUserInfo,resetPassword as resetPassword ,queryUser as queryUser ,deleteUser as deleteUser} from '@/api/index'
const {proxy} = getCurrentInstance();
const searchvalue = ref("");
const dialogFormVisible = ref(false);
let dialogTitile = ref("编辑");
let dialogPasswordVisible  = ref(false);
let dialogTableValue = reactive({});
const posswordRef = ref('');
let dropdownValue =  reactive({});
let isQuery = ref(false);
let formPassword = reactive({
  new:'',
  confirm:'',
  id:''
})
const rules = reactive({
  new: [{  required: true, message: "密码必须是6-12位，不能有连续或者重复的字母或者数字并且大小写字母,数字,特殊符号必须包含两种以上",  trigger: "blur" }],
  confirm: [{ required: true, message: "密码必须是6-12位，不能有连续或者重复的字母或者数字并且大小写字母,数字,特殊符号必须包含两种以上",trigger: "blur" }],
});
let state = reactive({
            tableLoading: false,
            CurrentPage: 1,
            PageSize: 10,
            Total:0,
            tableData1: [],
          });
const isloading = ref('false')
const queryTableData = () => {
  isloading.value = true;
  const parms = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  getAllUserInfo(parms)
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

  
onBeforeMount(() => {
  // getdata();
  // queryTableData();
});
//点击查询
const searchUserData = ()=>{
  isQuery.value = true;
  isloading.value = true;
  let parmes = {
    limit:state.PageSize,
    pageNum:state.CurrentPage,
    query: searchvalue.value
  }
    queryUser(parmes).then((res)=>{
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
  searchvalue.value&&isQuery.value?searchUserData():queryTableData();

};
// 点击跳转到第几页
const handleCurrentChange = (val) => {
  state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchUserData():queryTableData();
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
      deleteUser(row.id).then((res)=>{
        if(res.code === 200){
            state.tableData1.splice(index, 1);
            if(state.tableData1.length === 0&& state.CurrentPage>1){
              state.CurrentPage = state.CurrentPage -1;
            }
            searchvalue.value&&isQuery.value?searchUserData():queryTableData();
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
//修改密码
const changePassword = (id) => {
  formPassword.id = id;
  dialogPasswordVisible.value = true;
} 
const savePassword = (posswordRef)=>{
  console.log(posswordRef)
  if(!posswordRef) return false
  // posswordRef.validate(async (valid) => {
    // if(valid){
      let obj = {
      "confirmPassword": proxy.$Base64.encode(formPassword.confirm),
      "newPassword": proxy.$Base64.encode(formPassword.new),
      "oldPassword": "",
      "userId": formPassword.id
  }
  resetPassword(obj).then((res)=>{
      if(res.code !== 200){
        ElNotification({
              title: 'Warning',
              message: res.msg,
              type: 'warning',
            })
            if(res.msg.indexOf('token已过期')>-1  ){
                    store.dispatch('app/logout')
                }
      }else{
        dialogPasswordVisible.value = false;
      }
  })
}
const closePassword = ()=>{
   dialogPasswordVisible.value = false;
}
</script>
<style  lang = 'less' scoped>
/deep/ .el-table--fit{
  height:100%;
}
/deep/ .el-table__body-wrapper{
  overflow-y: auto;
}
.tablestyle {
  position: relative;
  /deep/ .el-table__header thead tr {
    background-color: rgba(64, 158, 255, 0.1);
  }
  /deep/ .el-col-3 {
    max-width: none;
  }
}
.demo-pagination-block {
  margin-top: 16px;
  position: absolute;
  bottom: 32px;
  right: 32px;
}
.lz-dialog {
  .dia-suc {
    margin-left: 16px !important;
  }
  .basictitle {
    font-size: 18px;
    margin: 16px 0 24px;
    color: #333333;
  }
  .basicinfo {
    font-size: 18px;
    margin: 16px 0 24px;
    color: #333333;
    border-bottom: 1px solid #cccccc;
    span {
      color: #333333;
      font-size: 20px;
      height: 40px;
      width: 100px;
      border-bottom: 4px solid #409eff;
      display: block;
    }
  }
  /deep/ .el-dialog__footer {
    padding-top: 16px;
  }
  /deep/ .el-dialog__body {
    padding: 0;
    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #cccccc;
    padding: 0;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
  }
  /deep/ .el-dialog__title {
    color: #409eff;
    font-size: 20px;
    height: 40px;
    width: 120px;
    border-bottom: 4px solid #409eff;
  }
  /deep/ .el-dialog {
    padding: 24px;
  }
  /deep/ .el-dialog__headerbtn {
    position: static;
    top: 0px;
    right: 0;
    padding: 0;
    width: auto;
    height: auto;
  }
  /deep/ .userPassword .el-form--inline .el-form-item{
    margin-left: 32px;
    margin-bottom: 48px;
  }
}
</style>