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
            label-width="120px"
            :rules="rules"
            ref="addform"
            require-asterisk-position="left"
            size="default"
            scroll-to-error="true"
            clearable='true'
            style="max-width: 400px"
          >
            <div class="basicstyle">
              <el-form-item label="角色名称" prop="roleName" required>
                <el-input
                  :rows="10"
                  placeholder="请输入角色名称"
                  :disabled="titile === '编辑'"
                  v-model="formInline.roleName"
                />
              </el-form-item>
              <el-form-item label="角色说明" prop="roleDesc" >
                <el-input
                  placeholder="请输入角色说明"
                  v-model="formInline.roleDesc"
                />
              </el-form-item>
              <el-form-item label="角色编码" prop="roleCode" required>
                <el-input
                :disabled="titile === '编辑'"
                  placeholder="请输入角色编码"
                  v-model="formInline.roleCode"
                />
              </el-form-item>
              <el-form-item label="角色菜单" prop="menu" required>
                  <!-- <el-select
                    v-model="formInline.menu"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="请选择角色菜单"
                    >
                    <el-option
                        v-for="item in dropdown.menu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select> -->
              </el-form-item>
              <el-form-item label="角色状态" prop="status" required>
                <!-- <el-select
                  v-model="formInline.status"
                  placeholder="请选择角色状态"
                >
                  <el-option  v-for="item in dropdown.status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                  />
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
import { ElNotification } from "element-plus";
// import { saveOrUpdate as saveOrUpdate } from '@/api/index'
import store from '@/store'
const emits = defineEmits(["update:modelValue"]);
const addform = ref();
const formLabelWidth = "30%";
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
const rules = reactive({
  roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  status: [{ required: true, message: "请选择角色状态", trigger: "change" }],
  menu: [{ required: true, message: "请选择角色菜单", trigger: "change" }],
  roleCode: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
});

let titile = ref("");
let formInline = reactive({
        'roleName':"",
        "roleDesc": "",
        "status": "",
        "menu": [],
        // createdDate:'',
        roleCode:''
        // {
  // "createdDate": "2022-12-14 15:32:35",
  // "id": "string",
  // "menu": ["carrepair", "/system", "role", "bararchives", "maintenance", "dispatch", "/barrepair", "workhour",…]
  // "menuLbl":["车辆维修记录", "系统管理", "角色管理", "车辆档案", "车辆保养明细", "车辆派修记录", "车辆维修管理", "维修人员工时记录", "车辆基础信息管理", "车辆报修记录",…]
  // "roleCode": "JS001",
  // "roleDesc": "string",
  // "roleName": "测试管理员",
  // "status": "ENABLE",
  // "statusLbl": "启用"
// }
});
let dropdown = props.dropdownValue.value
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
  console.log(JSON.parse(JSON.stringify(formInline)))
  addform.validate(async (valid) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(formInline))
      saveOrUpdate(obj).then((res)=>{
        if(res.code === 200){
          close();
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
/* /deep/ .el-input__inner {
  width: 236px;
} */
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
