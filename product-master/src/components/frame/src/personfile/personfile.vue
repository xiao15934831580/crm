<template>
  <div class="tablestyle">
    <div class="search">
      <el-col :span="3">
        <el-input
          class="w-10 m-2"
          v-model="searchvalue"
          placeholder="请输入姓名/工号"
        />
      </el-col>
      <el-button size="small" class="searchbutton" @click="searchbutton">查询</el-button>
      <el-button size="small" @click="handleBuild">新建</el-button>
      <!-- <el-button size="small" class="batchimport" @click="batchimport"
        >批量导入</el-button
      > -->
    </div>
    <div class="chartstyle">
      <el-table
      :data="state.tableData1"
      :header-cell-style="{ background: '#d9ecff' }" 
      border
      style="width: 100%"
    >
      <el-table-column fixed  label="序号" min-width="7%">
        <template #default="requestscope">
                    <span >{{
                      requestscope.$index+1 + (state.PageSize*(state.CurrentPage-1))
                    }}</span>
              </template>
      </el-table-column>
      <el-table-column fixed  prop="staffCode" label="工号" min-width="10%" />
      <el-table-column   prop="staffName" label="姓名" min-width="13%" />
      <el-table-column   prop="jobTypeLbl" label="工种" min-width="10%" />
      <el-table-column   prop="teamLbl" label="班组" min-width="10%" />
      <el-table-column   prop="phoneNum" label="电话号码" min-width="15%" />
      <el-table-column   prop="status" label="在职状态" min-width="10%">
        <template #default="scope">
          <el-tag
            :type="scope.row.statusLbl === '启用' ? 'success' : ''"
            disable-transitions
            >{{ scope.row.statusLbl }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right"  width="250" label="操作列" min-width="25%">
        <template #default="scope">
          <el-button size="small" @click="handleLook(scope.$index, scope.row)"
            >查看</el-button
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
      <el-pagination
        v-model:currentPage="state.currentPage"
        v-model:page-size="state.pageSize"
        :page-sizes="[5,10, 15, 20]"
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
  <EditDialog
    v-model="dialogFormVisible"
    v-if="dialogFormVisible"
    :dialogFormVisible="dialogFormVisible"
    :dialogTitile="dialogTitile"
    :dialogTableValue="dialogTableValue"
    :dropdownValue = 'dropdownValue'
  ></EditDialog>
  <!-- 批量导入 -->
  <!-- <div class="lz-dialog">
    <el-dialog
      :model-value="dialogUploadVisible"
      :before-close="cancle"
      :width="dialogUploadWidth"
      draggable
    >
      <div style="float: left">
        <el-upload
          class="upload-demo"
          ref="upload"
          :limit="10"
          accept=".txt, .txts, .pdf, .docx"
          :multiple="true"
          action=" "
          :on-change="handleFileChange"
          :on-remove="onRemove"
          :before-remove="beforeRemove"
          :on-exceed="fileExceed"
          :auto-upload="false"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选取附件</el-button>
          <el-button
            style="margin-left: 10px"
            v-if="fileList && fileList.length > 0"
            size="small"
            type="success"
            @click="submitFileForm"
            >上传附件</el-button
          >
        </el-upload>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="btn-mixins-clear-default" @click="cancle"
            >取消</el-button
          >
          <el-button class="btn-mixins dia-suc" @click="submitFileForm"
            >上传</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div> -->
</template>
<script setup>
import EditDialog from "./editdialog.vue";
import { reactive, ref, watch } from "vue";
import { markRaw ,onBeforeMount  } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox,ElNotification } from "element-plus";
import store from '@/store'
import { getRepairman as getRepairman,deleteRepairman as deleteRepairman, queryRepairman as queryRepairman } from '@/api/index'
const searchvalue = ref("");
let dropdownValue =  reactive({});
let tableData = [
  {
        "age": "",
        "certList": [
          {
            "certNumber": "61868699103121887777",
            "certType": "QCDQWX",
            "certTypeLbl": "汽车电器维修工证书",
            "id": "8001",
            "validityDate": "2022-12-20 00:00:00"
          },
          {
            "certNumber": "61868699103121887666",
            "certType": "QCWXJY",
            "certTypeLbl": "汽车维修检验工证书",
            "id": "8002",
            "validityDate": "2022-12-20 00:00:00"
          }
        ],
        "contactName": "",
        "contactPhone": "",
        "currentAddress": "",
        "id": "7001",
        "idNumber": "618686999988887777",
        "jobType": "BJG",
        "jobTypeLbl": "钣金工",
        "marriage": "WH",
        "marriageLbl": "未婚",
        "nation": "HZ",
        "nationLbl": "汉族",
        "nativePlace": "",
        "phoneNum": "18388889999",
        "poloticsStatus": "DY",
        "poloticsStatusLbl": "党员",
        "sex": "MAN",
        "sexLbl": "男",
        "staffCode": "T0001",
        "staffName": "测试员工1",
        "status": "ENABLE",
        "statusLbl": "启用",
        "team": "WXYB",
        "teamLbl": "维修一班"
  },
];
let isQuery = ref(false);
const dialogFormVisible = ref(false);
const dialogUploadVisible = ref(false);
const dialogUploadWidth = "20%";
let dialogTitile = ref("编辑");
let dialogTableValue = reactive({});

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
      tableData1:[],
});
const isloading = ref('false')
const queryTableData=() =>{
      
      isloading.value = true;
      let obj = {
        limit:state.PageSize,
        pageNum: state.CurrentPage 
      }
      getRepairman(obj).then((res)=>{
        isloading.value = false;
        if(res.code === 200){
          let data = res.data;
            state.tableData1=data&&data.records?data.records:[];
            state.Total = data&&data.total?data.total:0;
            dropdownValue.value = res.data.dropDowns
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
    }
watch(
    () => dialogFormVisible.value,
    () => {
      if(!dialogFormVisible.value){
        queryTableData();
      }
    },
    { deep: true, immediate: true }
)
onBeforeMount(()=>{
  // queryTableData()
})   
//查询
const searchbutton = () => {
  isloading.value = true;
  isQuery.value = true;
  let parmes = {
    condition: searchvalue.value,
    limit:state.PageSize,
    pageNum:state.CurrentPage,
  }
  queryRepairman(parmes).then((res)=>{
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
      deleteRepairman(row.id).then((res)=>{
        if(res.code === 200){
            state.tableData1.splice(index, 1);
            searchvalue.value&&isQuery.value?searchbutton():queryTableData();
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
//上传文件之前
const beforeUpload = (file) => {
  fileList.forEach((item) => {
    if (isEquael(item.fileName, file.name)) {
      return ElMessageBox.confirm("该文件已存在", {
        type: "warning",
      });
    }
  });
};
// 上传发生变化钩子
const handleFileChange = (file, fileList) => {
  console.log(file, fileList);
  files = fileList;
  fileList.push(file);
};
//文件个数超过最大限制时
const fileExceed = (file, fileList) => {
  if (fileList.length > 10) {
    ElMessageBox.confirm("附件个数不能超过十个", {
      type: "warning",
    });
  }
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
const getFiles = () => {
  var articleId = 0;
  articleId = store.state.articleMsg.row.id;
  console.log(articleId);
  this.$store.dispatch("fileManage/getFiles", articleId).then((res) => {
    if (res.succeeded) {
      res.data.forEach((file) => {
        this.fileList.push({ name: file.fileName, id: file.fileId });
      });
    } else {
      this.$message({
        type: "error",
        message: "获取附件失败",
      });
    }
  });
};
//删除的钩子
// const onRemove=(file,fileList)=>{
//      if(file.status==="success")
//      {
//        var requestData=file.id
//       this.$store.dispatch('fileManage/deleteFile',requestData).then(res=>{
//         if(res.succeeded){

//           this.fileList.pop(file)
//           this.fileList=[];
//           this.files = fileList;
//           this.$message({
//             type: 'success',
//             message: '删除成功!'
//           });
//            this.getFiles()
//         }else{
//           this.$message({
//             type: 'error',
//             message: '删除失败!'
//           });
//         }
//       }).catch(()=>{
//          this.$message({
//             type: 'error',
//             message: '请求失败!'
//           });
//       })
//      }
//     }
// 提交的方法
// 提交上传文件
const submitFileForm = () => {
  //判断是否有文件再上传
  // if (this.files.length === 0) {
  //     return this.$message.warning('请选取文件后再上传')
  // }
  // //-- 创建新的数据对象 -->
  // let formData = new FormData();
  // //-- 将上传的文件放到数据对象中 -->
  // this.files.forEach((file) =>{

  //   formData.append('files',file.raw)
  // })
  //   //拿到文章id
  // var articleid=store.state.articleMsg.row.id
  // formData.append('articleid',articleid)
  // this.$store.dispatch('fileManage/uploadFile',formData)
  //   .then(res => {
  //     if(res.succeeded){
  //       this.$message.success('上传成功！');
  //       this.fileList=[]
  //       this.getFiles()
  //     }else{
  //       this.$message.error('上传失败');
  //     }
  //   })
  //   .catch(error => {
  //     this.$message.error('上传失败！');
  //   });
  // this.dialogVisible=false
  console.log("上传成功");
};


//切换一页显示多少条数据
const handleSizeChange=(val)=>{
  state.PageSize = val;
  searchvalue.value&&isQuery.value?searchbutton():queryTableData();
}
// 点击跳转到第几页
const handleCurrentChange=(val)=>{
  state.CurrentPage = val;
  searchvalue.value&&isQuery.value?searchbutton():queryTableData();
  
}
// const submitFileForm = () => {console.log('上传成功')};
</script>
<style lang = 'less' scoped>
.tablestyle {
  position: relative;
  :deep( .el-table__header thead tr) {
    background-color: rgba(64, 158, 255, 0.1);
  }
  :deep( .el-col-3){
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
.demo-pagination-block{
    margin-top: 16px;
    position: absolute;
    bottom: 32px;
    right: 32px;
}
:deep( .el-table--fit){
  height:100%;
}
:deep( .el-table__body-wrapper){
  overflow-y: auto;
}
</style>