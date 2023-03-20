<template>
  <div class="lz-dialog">
    <el-dialog
      ref="ruleFormRef"
      :model-value="dialogFormVisible"
      :title="titile"
      :before-close="close"
      :width="formLabelWidth"
      :close-on-click-modal ="false"
      draggable
    >
      <div>
        <!-- 基础信息 -->
        <p class="basictitle">基础信息</p>
        <div>
          <div class="showinfo">
            <p class="showstyle">单号：{{ formInline.billCode }}</p>
            <p class="showstyle">报修人：{{ formInline.creator }}</p>
            <p class="showstyle">创建日期：{{ formInline.createdDate }}</p>
          </div>
          <div class="showinfo">
            <p class="showstyle">报修车辆编号：{{ formInline.carCode }}</p>
            <p class="showstyle">车牌号：{{ formInline.carNumber }}</p>
            <p class="showstyle">品牌型号：{{ formInline.carBrandType }}</p>
          </div>
        </div>

        <p class="basicinfo"><span>故障明细</span></p>
        <div>
          <el-table
            :data="formInline.repairDetails"
            :header-cell-style="{ background: 'rgba(64, 158, 255, 0.1)' }"
            border
            style="width: 100%"
          >
            <el-table-column label="序号" min-width="7%">
              <template #default="requestscope">
                <span class="elispice">{{ requestscope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="faultType" label="故障分类" min-width="10%">
              <template #default="scope">
                  <el-select :disabled = "titile==='查看'"  v-model="scope.row.faultType" size="medium"  style="width:100%">
                      <el-option v-for="item in dowpdown.faultType" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="faultPart" label="故障部件" min-width="10%">
              <template #default="scope">
                  <el-select :disabled = "titile==='查看'"  v-model="scope.row.faultPart" size="medium"  style="width:100%">
                      <el-option v-for="item in dowpdown.faultPart" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column  prop="faultSituation" label="故障现象" min-width="10%">
              <template #default="scope">
                  <el-select :disabled = "titile==='查看'"  v-model="scope.row.faultSituation" size="medium"  style="width:100%" required>
                      <el-option v-for="item in dowpdown.faultSituation" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="otherDesc"
              label="其他说明"
              min-width="10%"
             />
            <el-table-column
              prop="urgencyLevel"
              label="紧急程度"
              min-width="10%"
            >
            <template #default="scope">
                  <el-select :disabled = "titile==='查看'"  v-model="scope.row.urgencyLevel" size="medium"  style="width:100%" required>
                      <el-option v-for="item in dowpdown.urgencyLevel" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column
              v-if="titile == '编辑'"
              label="操作"
              min-width="10%"
            >
              <template #default="scope">
                <el-button
                  size="small"
                  @click="handleRemove(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <p class="addcolum" v-if="titile == '编辑'" @click="addcolum">+</p>
        </div>
        <p class="basicinfo"><span>审批明细</span></p>
        <div>
          <el-table
            :data="formInline.apvDetails"
            :header-cell-style="{ background: 'rgba(64, 158, 255, 0.1)' }"
            border
            style="width: 100%"
          >
            <el-table-column label="序号" min-width="7%">
              <template #default="requestscope">
                <span class="elispice">{{ requestscope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="apvNode" label="审批节点" min-width="10%" />
            <el-table-column prop="approver" label="审批人" min-width="10%" />
            <el-table-column prop="apvTime" label="审批时间" min-width="10%" />
            <el-table-column prop="apvDesc" label="审批结果" min-width="10%" />
          </el-table>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="titile=='编辑'" class="btn-mixins-clear-default" @click="distribution"
            >分配点检员</el-button>
          <el-button v-if="titile=='编辑'" class="btn-mixins-clear-default" @click="exit"
            >退回</el-button>
          <el-button v-if="titile=='编辑'" class="btn-mixins-clear-default" @click="save"
            >保存</el-button>
          <el-button class="btn-mixins-clear-default" @click="close"
            >返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- 分配点检员 -->
  <div>
    <el-dialog
      ref="inspectorRef"
      :model-value="dialogInspectorVisible"
      title="分配点检员"
      :before-close="closeInspector"
      width="40%"
      :close-on-click-modal ="false"
      draggable
    >
    <div class="mlr-24">分配点检员：
      <el-select  v-model="inspector" placeholder="请选择点检员">
          <el-option label="张三" value="张三" />
          <el-option label="李四" value="李四" />
        </el-select>
    </div>
    <template #footer>
        <span class="dialog-footer">
          <el-button class="btn-mixins-clear-default" @click="saveInspector"
            >确定</el-button>
          <el-button class="btn-mixins-clear-default" @click="closeInspector"
            >返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- 退回说明 -->
  <div>
     <el-dialog
      ref="exitRef"
      :model-value="dialogExitVisible"
      title="退回说明"
      :before-close="closeExit"
      width="40%"
      :close-on-click-modal ="false"
      draggable
    >
        <div>退回说明：</div>
        <template #footer>
        <span class="dialog-footer">
          <el-button class="btn-mixins-clear-default" @click="saveExit"
            >确定</el-button>
          <el-button class="btn-mixins-clear-default" @click="closeExit"
            >返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script  setup>
import { defineProps, ref } from "vue";
import { reactive, watch, defineEmits } from "vue";
import { ElMessage } from "element-plus";
const emits = defineEmits(["update:modelValue"]);
const addform = ref();
const formLabelWidth = "70%";
let dialogInspectorVisible = ref(false);
let dialogExitVisible = ref(false)
let props = defineProps({
  dialogFormVisible: {
    type: Boolean,
  },
  dialogTitile: {
    type: String,
  },
  dialogTableValue: {
    type: Object,
    default: () => {},
  },
  dropdownValue:{
    type: Object,
    default: () => {},
  },
});
let titile = ref("");
const imageUrl = ref("");
let formInline = reactive();
const inspector = ref("");
const isinspector = ref(false)
let dowpdown = props.dropdownValue.value
watch(
  () => props,
  () => {
    titile.value = props.dialogTitile;
    formInline = props.dialogTableValue.value;
  },
  { deep: true, immediate: true }
);
const close = () => {
  // addform.value.resetFields();
  emits("update:modelValue", false);
};
const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      // props.dialogTitile==='添加用户' ? await adduser(form.value) : await editUser(form.value)
      // props.dialogTitile==='添加用户' ? ElMessage.success("添加成功"):ElMessage.success("修改成功")
      // emits("initUserList");
      close();
    } else {
      // props.dialogTitile==='添加用户' ? ElMessage.error('"添加失败'):ElMessage.success("修改失败")
      return false;
    }
  });
};
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
const handleRemove=(index)=>{
  formInline.repairDetails.splice(index, 1);
}
const addcolum = () => {
  console.log(formInline.repairDetails)
  let obj = {
					"faultType": "",
					"faultPart": "",
					"faultSituation": "",
					"otherDesc": "",
					"urgencyLevel": "",
          'faultTypeOption':formInline.faultTypeOption,
          'faultPartOption':formInline.faultPartOption,
          'faultSituationOption':formInline.faultSituationOption
  };
  formInline.repairDetails.push(obj);
};
const removeidinfo = (index) => {
  formInline.idinfo.splice(index, 1);
};
const surelook = () => {
  emits("update:modelValue", false);
};
const isvoild = ()=>{
  let isclick = ref(true);
  if(formInline.repairDetails.length==0){
     isclick.value =  false;
  }
  formInline.repairDetails.forEach((item,index) => {
    if(!item.faultType || !item.faultPart||!item.faultSituation){
      isclick.value =  false;
    }
  });
  return isclick;
  
}
const distribution = () =>{
  let voild = isvoild();
  console.log(voild)
  if(voild.value)
  {dialogInspectorVisible.value = true;}
  else{
    alert('请检查故障明细是否有未选择的故障')
  }

}
const save= ()=>{
  let voild = isvoild();
  if(voild.value)
   {emits("update:modelValue", false);}
  else{
    alert('请检查故障明细是否有未选择的故障')
  }

}
const closeInspector = ()=>{
  dialogInspectorVisible.value = false;
}
const saveInspector = ()=>{
  console.log(inspector)
  if(inspector.value !==''){
    emits("update:modelValue", false);
  }else {
    alert('请选择点检员')
  }

}
const exit = ()=>{
   let voild = isvoild();
  if(voild.value)
  {dialogExitVisible.value = true;}
  else{
    alert('请检查故障明细是否有未选择的故障')
  }
}
const closeExit =()=>{
  dialogExitVisible.value = false;
}
const saveExit = ()=>{
  emits("update:modelValue", false);
}
</script>



<style lang = 'less' scoped>
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
      border-bottom: 2px solid #409eff;
      display: block;
    }
  }
  :deep(.el-dialog__footer) {
    padding-top: 16px;
  }
  :deep( .el-dialog__body) {
    padding: 0;
    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  :deep(.el-dialog__header) {
    border-bottom: 1px solid #cccccc;
    padding: 0;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep( .el-dialog__title) {
    color: #409eff;
    font-size: 20px;
    height: 40px;
    width: 100px;
    border-bottom: 4px solid #409eff;
  }
  :deep( .el-dialog ){
    padding: 24px;
  }
  :deep( .el-dialog__headerbtn) {
    position: static;
    top: 0px;
    right: 0;
    padding: 0;
    width: auto;
    height: auto;
  }
}
:deep(.el-form-item__label) {
  font-size: 14px;
}
:deep( .el-form) {
  position: relative;
}
.imgstyle {
  position: absolute;
  right: 0;
  top: 0;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep( .avatar-uploader .el-upload ){
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
:deep( .el-form-item__content ){
  width: 200px;
}
.address {
  :deep( .el-form-item__content) {
    width: 350px;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 150px;
  text-align: center;
}
.uploadimg {
  text-align: center;
  background-color: rgba(64, 158, 255, 0.1);
  span {
    color: #409eff;
  }
}

.showinfo {
  display: flex;
  margin-bottom: 16px;
}
.imgstyle {
  width: 15%;
  :deep( .el-form-item) {
    margin: 0;
  }
  :deep( .el-form-item__content) {
    width: 100%;
  }
  :deep( .el-icon) {
    width: 120px;
  }
}
.idinfo {
  position: relative;
  .removeidinfo {
    margin-left: 24px;
    font-size: 20px;
    position: absolute;
    margin-top: 5px;
  }
}
.showstyle {
  margin-right: 24px;
  width: 250px;
}
.labstyle {
  width: 100px;
  background-color: #409eff;
  margin: 24px 0;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
}
.addcolum{
   border-bottom: 1px solid #ebeef5;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    cursor: pointer;
}
.errordom{
    float: left;
    width: 200px;
    margin-top: -6px;
    position: relative;
}
.errorselect{
  :deep( .el-input__wrapper){
    box-shadow: 0 0 0 1px #f56c6c inset;
  }
  
}
.labelinspector{
  width: 100px;
    float: left;

}
.errorinfo{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 2px;
    position: absolute;
    top: 100%;
    left: 0;
}
:deep( .el-input){
  width: 100%;
}
</style>
