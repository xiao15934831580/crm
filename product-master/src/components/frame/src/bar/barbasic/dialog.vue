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
              <el-form-item label="品牌型号" prop="carBrandType" required>
                <el-input
                  placeholder="请输入品牌型号"
                  :disabled="titile === '编辑'"
                  v-model="formInline.carBrandType"
                />
              </el-form-item>
              <p class="basicinfo"><span>保养项目明细</span></p>
              <div>
                <el-table
                  :data="formInline.maintainItems"
                  :header-cell-style="{ background: 'rgba(64, 158, 255, 0.1)' }"
                  border
                  style="width: 100%"
                >
                  <el-table-column label="序号" min-width="7%">
                    <template #default="requestscope">
                      <span class="elispice">{{ requestscope.$index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="maintainItem" label="保养项目/内容" min-width="10%">
                    <template #default="scope">
                      <el-select
                        v-model="scope.row.maintainItem"
                        size="medium"
                        style="width: 100%"
                      >
                        <el-option v-for="item in formInline.dropDowns.maintainItem" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="maintainCycle" label="保养周期（h）" min-width="10%">
                    <template #default="scope">
                      <el-input
                      placeholder="请输入保养周期（h）"
                      v-model="scope.row.maintainCycle"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="replacement"
                    label="油品或滤芯型号"
                    min-width="10%"
                 >
                  <template #default="scope">
                      <el-input
                      placeholder="请输入油品或滤芯型号"
                      v-model="scope.row.replacement"
                      />
                    </template>
                 </el-table-column>
                  <el-table-column
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
                <p class="addcolum"  @click="addcolum">+</p>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="btn-mixins-clear-default" @click="deleteType"
            >删除</el-button
          >
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
import { ElMessage,ElNotification } from "element-plus";
import { saveMaintain as saveMaintain,deletecarBrandType as deletecarBrandType} from '@/api/index'
import store from '@/store'
const emits = defineEmits(["update:modelValue"]);
const addform = ref();
const formLabelWidth = "60%";
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
let titile = ref("");
const imageUrl = ref("");
let formInline = reactive({
            "id": "",
            "carBrandType": "",
            "dropDowns":{
              maintainItem:[
                {
                  label:"发动机油",
                  value:"FDJY"
                },
                {
                  label:"驱动桥油",
                  value:"QDQY"
                },
                {
                  label:"变速箱油",
                  value:"BSXY"
                },
                {
                  label:"液压油",
                  value:"YYY"
                },
                {
                  label:"空气内外滤芯",
                  value:"KQNWLX"
                },
                {
                  label:"空调外滤",
                  value:"KTWL"
                },
                {
                  label:"燃油呼吸器",
                  value:"RYHXQ"
                },
                {
                  label:"发动滤芯",
                  value:"FDLX"
                }
              ]
            },
            'maintainItems':[
                {
                  'carBrandType':'',
                    "maintainItem": "",
                    "maintainCycle": "",
                    "replacement": ""
                }
            ]

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
const rules = reactive({
  carBrandType:[{ required: true, message: '请输入品牌型号', trigger: 'blur' },],
 
})
const isvoild = () => {
  let isclick = ref(true);
  if(!formInline.carBrandType){
    isclick.value = false;
  }
  if (formInline.maintainItems.length == 0) {
    isclick.value = false;
  }
  formInline.maintainItems.forEach((item, index) => {
    if (!item.maintainItem || !item.maintainCycle || !item.replacement) {
      isclick.value = false;
    }
  });
  return isclick;
};
const success = () => {
  let isclick = isvoild();
  if(isclick.value){
    console.log(formInline.maintainItems)
    formInline.maintainItems.forEach((item)=>{
      item.carBrandType = formInline.carBrandType
    })
    saveMaintain(formInline.maintainItems).then((res)=>{
     if(res.code ===200){
        close();
     }else{
       if (res.msg && res.msg.indexOf("token已过期") > -1) {
          ElNotification({
            title: "Warning",
            message: res.msg,
            type: "warning",
          });
          store.dispatch("app/logout");
        }   
     }
    })
  }else{
    alert("请检查保养项目明细是否有未填写说明");
  }

};
const addcolum = () => {
  let obj = {
            carBrandType:formInline.carBrandType,
            "maintainItem": "",
            "maintainCycle": "",
            "replacement": ""
  };
  formInline.maintainItems.push(obj);
};
const handleRemove = (index) => {
  formInline.maintainItems.splice(index, 1);
};
const surelook = () => {
  emits("update:modelValue", false);
};
const deleteType = ()=>{
  console.log(formInline.carBrandType)
  deletecarBrandType(formInline.carBrandType).then((res)=>{
     console.log(res)
    if(res.code === 200){
      emits("update:modelValue", false);
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
      font-size: 16px;
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
/deep/ .el-table td.el-table__cell div{
  width: 100%;
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
.addcolum {
  border-bottom: 1px solid #ebeef5;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  cursor: pointer;
}
/deep/ .el-input__inner{
  width: 100%;
}
</style>
