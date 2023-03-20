<template>
  <div class="lz-dialog">
    <el-dialog
      ref="ruleFormRef"
      :model-value="dialogFormVisible"
      :title="titile"
      :before-close="close"
      :width="formLabelWidth"
      draggable
    >
      <div>
        <!-- 基础信息 -->
        <p class="basictitle">基础信息</p>
        <div>
          <div class="showinfo">
            <p class="showstyle">创建人：{{ formInline.creator }}</p>
            <p class="showstyle">创建日期：{{ formInline.createdDate }}</p>
            <p class="showstyle">单号：{{ formInline.billCode }}</p>
          </div>
          <div class="showinfo">
            <p class="showstyle">车牌号：{{ formInline.carNumber }}</p>
            <p class="showstyle">车牌编号：{{ formInline.carCode }}</p>
            <p class="showstyle">品牌型号：{{ formInline.carBrandType }}</p>
          </div>
        </div>

        <p class="basicinfo"><span>保养明细</span></p>
        <div>
          <el-table
            :data="formInline.maintainDetails"
            :header-cell-style="{ background: 'rgba(64, 158, 255, 0.1)' }"
            border
            style="width: 100%"
          >
            <el-table-column label="序号" min-width="7%">
              <template #default="requestscope">
                <span class="elispice">{{ requestscope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="maintainItemLbl"
              label="保养项目"
              min-width="10%"
            />
            <el-table-column
              prop="maintainCycle"
              label="保养周期（h）"
              min-width="10%"
            />
            <el-table-column
              prop="lastExecHour"
              label="上次执行台时/h"
              min-width="10%"
            />
            <el-table-column
              prop="planExecHour"
              label="本次计划执行台时/h"
              min-width="10%"
            />
            <el-table-column
              prop="realExecDate"
              label="实际执行日期"
              min-width="10%"
            />
            <el-table-column
              prop="realExecHour"
              label="实际执行台时/h"
              min-width="10%"
            />
            <el-table-column prop="executor" label="责任人" min-width="10%" />
            <el-table-column prop="remark" label="备注" min-width="10%">
            </el-table-column>
          </el-table>
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
                <span class="elispice">{{ requestscope.row.number }}</span>
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
          <el-button class="btn-mixins-clear-default" @click="close"
            >返回</el-button
          >
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
});
const checkIphonenum = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入电话号码"));
  } else if (!/^[0-9]*$/.test(value)) {
    callback(new Error("电话号码只能输入数字"));
  } else {
    callback();
  }
};
const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  status: [{ required: true, message: "请选择账号状态", trigger: "change" }],
  jobno: [{ required: true, message: "请输入工号", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
  usertype: [{ required: true, message: "请选择角色类型", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  iphonenum: [{ validator: checkIphonenum, trigger: "blur" }],
  ispassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
});

let titile = ref("");
const imageUrl = ref("");
let formInline = reactive({
    //   id: "",
    billCode: "",
    billType:'',
    carCode: "",
    carNumber: "",
    carBrandType: "",
    apvStatus: "",
    apvStatusLbl: "审批中",
    creator: "",
    createdDate: "",
    maintainDetails: [
      {
        id: "",
        maintainItem: "",
        maintainItemLbl:'',
        maintainCycle: "",
        replacement: "",
        lastExecHour: '',
        planExecHour: '',
        realExecDate: "",
        realExecHour: '',
        executor: "",
        remark: "",
      },
    ],
    apvDetails: [
      {
        id: "",
        apvNode: "",
        approver: "",
        apvTime: "",
        apvDesc: "",
      },
    ],
});
watch(
  () => props,
  () => {
    titile.value = props.dialogTitile;
    if (titile.value === "查看") {
      formInline = props.dialogTableValue.value;
      console.log(formInline)
    }
    formInline.maintainDetails.forEach((item, index) => {
      item.number = index + 1;
    });
    formInline.apvDetails.forEach((item, index) => {
      item.number = index + 1;
    });
  },
  { deep: true, immediate: true }
);
const close = () => {
  // addform.value.resetFields();
  emits("update:modelValue", false);
};
//  const emits = defineEmits(['update:modelValue','initUserList'])
// const rules = reactive({
//   pass: [{ validator: validatePass, trigger: 'blur' }],
//   checkPass: [{ validator: validatePass2, trigger: 'blur' }],
//   age: [{ validator: checkAge, trigger: 'blur' }],
// })
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
const addid = () => {
  let obj = {
    idtype: "",
    idnum: "",
    validitydate: "",
  };
  formInline.idinfo.push(obj);
};
const removeidinfo = (index) => {
  formInline.idinfo.splice(index, 1);
};
const surelook = () => {
  emits("update:modelValue", false);
};
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
  }
  /deep/ .el-dialog__title {
    color: #409eff;
    font-size: 20px;
    height: 40px;
    width: 100px;
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
}
/deep/ .el-form-item__label {
  font-size: 14px;
}
/deep/ .el-form {
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
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
/deep/ .el-form-item__content {
  width: 200px;
}
/deep/ .el-input__inner {
  width: 156px;
}
.address {
  /deep/ .el-form-item__content {
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
  /deep/ .el-form-item {
    margin: 0;
  }
  /deep/ .el-form-item__content {
    width: 100%;
  }
  /deep/ .el-icon {
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
</style>
