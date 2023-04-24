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
        <div>
          <el-form
            :model="formInline"
            :inline="true"
            label-width="120px"
            :rules="rules"
            ref="addform"
            require-asterisk-position="left"
            size="default"
            scroll-to-error="true"
          >
            <div class="basicstyle">
              <el-form-item label="用户名" prop="username" required>
                <el-input
                  placeholder="请输入用户名"
                  :disabled="titile === '编辑'"
                  v-model="formInline.username"
                />
              </el-form-item>
              <el-form-item label="姓名" prop="realName" required>
                <el-input
                  placeholder="请输入姓名"
                  :disabled="titile === '编辑'"
                  v-model="formInline.realName"
                />
              </el-form-item>
              <el-form-item label="性别" required >
                <!-- <el-select
                  v-model="formInline.sex"
                  placeholder="请选择性别"
                >
                  <el-option v-for="item in dowpdown.sex" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="手机号码" prop="phoneNum" required>
                <el-input
                  placeholder="请输入手机号码"
                  v-model="formInline.phoneNum"
                />
              </el-form-item>
              <el-form-item label="角色" prop="role" required>
                <!-- <el-select
                  v-model="formInline.role"
                  placeholder="请选择角色"
                >
                  <el-option v-for="item in dowpdown.role" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="登录设备" prop="loginClient" required>
                <!-- <el-select
                  v-model="formInline.loginClient"
                  placeholder="请选择登录设备"
                >
                   <el-option v-for="item in dowpdown.loginClient" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="账号状态" prop="status" required>
                <!-- <el-select
                  v-model="formInline.status"
                  placeholder="请选择账号状态"
                >
                   <el-option v-for="item in dowpdown.status" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select> -->
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="btn-mixins-clear-default" @click="close"
            >取消</el-button
          >
          <el-button class="btn-mixins dia-suc" @click="success(addform)"
            >保存</el-button
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
// import { saveOrUpdateUser as saveOrUpdateUser } from '@/api/index'
import { ElNotification } from "element-plus";
import store from '@/store'
const emits = defineEmits(['update:modelValue','inituserlist']);
const addform = ref();
const formLabelWidth = "40%";
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
  inituserlist:{
    type:Boolean
  }
});
const checkIphonenum = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入电话号码"));
  } else if (!/^[0-9]*$/.test(value)) {
    callback(new Error("电话号码只能输入数字"));
  } else if(!/^1\d{10}$/.test(value)){
    callback(new Error('电话号码输入不正确'));
  }else{
    callback()
  }
};
const rules = reactive({
  realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  status: [{ required: true, message: "请选择账号状态", trigger: "change" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
  loginClient: [{ required: true, message: "请选择设备名称", trigger: "change" }],
  sex:[{ required: true, message: "请选择性别", trigger: "change" }],
  phoneNum: [{ validator: checkIphonenum, trigger: "blur" },],
});

let titile = ref("");
const imageUrl = ref("");
let dowpdown = props.dropdownValue.value
let formInline = reactive({
    id:'',
    "loginClient": "",
    "phoneNum": "",
    "realName": "",
    "role": "",
    "sex": "",
    "status": "",
    "username": ""
});
watch(
  () => props,
  () => {
    titile.value = props.dialogTitile;
    if (titile.value === "编辑" )
      formInline = props.dialogTableValue.value;
  },
  { deep: true, immediate: true }
);
const close = () => {
  addform.value.resetFields();
  emits("update:modelValue", false);
};
const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      saveOrUpdateUser(JSON.parse(JSON.stringify(formInline)))
        .then((res)=>{
          if(res.code ===200){
            close()
          }else{
              ElNotification({
                title: 'Warning',
                message: res.message,
                type: 'warning',
              })
              if(res.message.indexOf('token已过期')>-1  ){
                    store.dispatch('app/logout')
                }
          }
        })
    } else {
      // props.dialogTitile==='添加用户' ? ElMessage.error('"添加失败'):ElMessage.success("修改失败")
      return false;
    }
  });
};

</script>



<style lang = 'less' scoped>
.lz-dialog {
  .dia-suc {
    margin-left: 16px !important;
  }
    :deep(.el-input){
    width: 200px;
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
    margin-bottom: 32px;
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

/* .basicstyle {
  width: 83%;
} */
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
</style>
