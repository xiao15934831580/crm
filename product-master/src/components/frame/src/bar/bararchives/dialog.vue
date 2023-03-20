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
        <p class="basicinfo"><span>车辆信息</span></p>
        <div>
          <el-form
            :model="formInline"
            :inline="true"
            label-width="100px"
            :rules="rules"
            ref="addform"
            require-asterisk-position="left"
            size="default"
            scroll-to-error="true"
          >
            <div class="basicstyle">
              <el-form-item label="车辆编号" prop="code" required>
                <el-input
                  placeholder="请输入车辆编号"
                  :disabled="titile === '查看'"
                  v-model="formInline.code"
                />
              </el-form-item>
              <el-form-item label="品牌型号" prop="brandType" required>
                 <el-input
                  placeholder="请输入品牌编号"
                  :disabled="titile === '查看'"
                  v-model="formInline.brandType"
                />
              </el-form-item>
              <el-form-item label="车牌号" prop="carNumber" required>
                <el-input
                  placeholder="请输入车牌号"
                  :disabled="titile === '查看'"
                  v-model="formInline.carNumber"
                />
              </el-form-item>
              <el-form-item label="购买日期" prop="purchaseDate" required>
                      <el-date-picker
                            :disabled="titile === '查看'"
                            v-model="formInline.purchaseDate"
                            type="date"
                            placeholder="请选择购买日期"
                        />
              </el-form-item>
              <el-form-item label="报废日期" prop="scrapDate" required>
                 <el-date-picker
                  :disabled="titile === '查看'"
                  placeholder="请选择报废日期"
                  v-model="formInline.scrapDate"
                  type="date"
                />
              </el-form-item>
              <el-form-item label="年检日期" prop="motDate" required>
                <el-date-picker
                  :disabled="titile === '查看'"
                  placeholder="请选择年检日期"
                  v-model="formInline.motDate"
                  type="date"
                />
              </el-form-item>
              <el-form-item label="发动机型号" prop="engineType" >
                 <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入发动机型号"
                  v-model="formInline.engineType"
                />
              </el-form-item>
              <el-form-item label="整车尺寸" prop="size" >
                 <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入整车尺寸"
                  v-model="formInline.size"
                />
              </el-form-item>
              <el-form-item label="轴距" prop="wheelBase">
                <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入轴距"
                  v-model="formInline.wheelBase"
                />
              </el-form-item>
              <el-form-item label="柴油机型号" prop="dieselEngineType">
                <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入柴油机型号"
                  v-model="formInline.dieselEngineType"
                />
              </el-form-item>
              <el-form-item label="铲斗宽度">
                <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入铲斗宽度"
                  v-model="formInline.bucketWidth"
                />
              </el-form-item>
              <el-form-item label="车桥">
                <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入车桥"
                  v-model="formInline.axleType"
                />
              </el-form-item>
              <el-form-item label="变速箱型号">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入变速箱型号"
                  v-model="formInline.gearboxType"
                />
              </el-form-item>
              <el-form-item label="举高高度">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入举高高度"
                  v-model="formInline.liftHeight"
                />
              </el-form-item>
              <el-form-item label="轮距">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入轮距"
                  v-model="formInline.wheelGauge"
                />
              </el-form-item>
              <el-form-item label="轮胎型号">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入轮胎型号"
                  v-model="formInline.tyreType"
                />
              </el-form-item>
              <el-form-item label="整机自重">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入整机自重"
                  v-model="formInline.weight"
                />
              </el-form-item>
              <el-form-item label="卸载距离">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入卸载距离"
                  v-model="formInline.unloadDistance"
                />
              </el-form-item>
              <el-form-item label="卸载高度">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入卸载高度"
                  v-model="formInline.unloadHeight"
                />
              </el-form-item>
              <el-form-item label="铲斗容量">
               <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入铲斗容量"
                  v-model="formInline.bucketCapacity"
                />
              </el-form-item>
            </div>
            <!-- 证书信息 -->
            <p class="basicinfo"><span>保险信息</span></p>
            <!-- <template v-if="formInline.idinfo&&formInline.idinfo.lengt>0"> -->
            <div class="idinfo" >
                <p>交强险</p>
                <el-form-item label="保单号" prop="clivatNumber">
                    <el-input
                    placeholder="请输入保单号"
                    :disabled="titile === '查看'"
                    v-model="formInline.clivatNumber"
                    />
              </el-form-item>
              <el-form-item label="投保公司">
                <el-select
                  :disabled="titile === '查看'"
                  v-model="formInline.clivatCompany"
                  placeholder="请选择投保公司"
                >
                  <el-option v-for="item in dowpdown.insCompany" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投保日期">
                <el-date-picker
                        :disabled="titile === '查看'"
                        v-model="formInline.clivatDate"
                        type="date"
                        placeholder="请输入投保日期"
                    />
              </el-form-item>
              <el-form-item label="到期日期">
                  <el-date-picker
                        :disabled="titile === '查看'"
                        v-model="formInline.clivatDeadline"
                        type="date"
                        placeholder="请选择到期日期"
                    />
              </el-form-item>
              <el-form-item label="交强险金额">
                <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入交强险金额"
                  v-model="formInline.clivatAmount"
                />
              </el-form-item>
              <p>商业险</p>
                <el-form-item label="保单号" prop="ciNumber">
                    <el-input
                    placeholder="请输入保单号"
                    :disabled="titile === '查看'"
                    v-model="formInline.ciNumber"
                    />
              </el-form-item>
              <el-form-item label="投保公司">
                <el-select
                  :disabled="titile === '查看'"
                  v-model="formInline.ciCompany"
                  placeholder="请选择投保公司"
                >
                  <el-option v-for="item in dowpdown.insCompany" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投保日期">
                  <el-date-picker
                        :disabled="titile === '查看'"
                        v-model="formInline.ciDate"
                        type="date"
                        placeholder="请输入投保日期"
                    />
              </el-form-item>
              <el-form-item label="到期日期">
                  <el-date-picker
                        :disabled="titile === '查看'"
                        v-model="formInline.ciDeadline"
                        type="date"
                        placeholder="请选择到期日期"
                    />
              </el-form-item>
              <el-form-item label="交强险金额">
                <el-input
                  :disabled="titile === '查看'"
                  placeholder="请输入交强险金额"
                  v-model="formInline.ciAmount"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            v-if="titile !== '查看'"
            class="btn-mixins-clear-default"
            @click="close"
            >取消</el-button
          >
          <el-button
            v-if="titile !== '查看'"
            class="btn-mixins dia-suc"
            @click="success(addform)"
            >保存</el-button
          >
          <el-button
            v-if="titile === '查看'"
            class="btn-mixins dia-suc"
            @click="surelook"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script  setup>
import { defineProps, ref } from "vue";
import { reactive, watch, defineEmits } from "vue";
import { ElNotification  } from "element-plus";
import { saveCar as saveCar } from '@/api/index'
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
    dropdownValue:{
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
let dowpdown = props.dropdownValue.value
const rules = reactive({
  code: [{ required: true, message: "请输入车辆编号", trigger: "blur" }],
  carNumber: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
  brandType: [{ required: true, message: "请输入品牌型号", trigger: "blur" }],
  purchaseDate : [{ required: true, message: "请选择购买日期", trigger: "Change" }],
  scrapDate: [{ required: true, message: "请选择报废日期", trigger: "change" }],
  motDate: [{ required: true, message: "请选择年检日期", trigger: "change" }],
});

let titile = ref("");
const imageUrl = ref("");
let formInline = reactive({
  id: '',
  code: "",
  carNumber: "",
  brandType: "",
  purchaseDate: "",
  scrapDate: "",
  motDate: "",
  engineType: "",
  gearboxType: "",
  dieselEngineType: "",
  tyreType: "",
  size: "",
  weight: '',
  axleType: "",
  wheelGauge: '',
  wheelBase: '',
  liftHeight: '',
  bucketWidth: '',
  bucketCapacity: '',
  unloadDistance: '',
  unloadHeight: '',
  clivatNumber: "",
  clivatCompany: "",
  clivatDate: "",
  clivatDeadline: "",
  clivatAmount: "",
  ciNumber: "",
  ciCompany: "",
  ciDate: "",
  ciDeadline: "",
  ciAmount: "",
});
watch(
  () => props,
  () => {
    titile.value = props.dialogTitile;
    if (titile.value === "编辑" || titile.value === "查看")
      formInline = props.dialogTableValue.value;
  },
  { deep: true, immediate: true }
);
const close = () => {
  addform.value.resetFields();
  emits("update:modelValue", false);
};
const getymd = (dateStr) => {
    let d = new Date(dateStr);
    let resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    return resDate;
}
const success = (addform) => {
  if (!addform) return;
  addform.validate(async (valid) => {
    if (valid) {
      let obj = JSON.parse(JSON.stringify(formInline));
      obj.purchaseDate = obj.purchaseDate? getymd(obj.purchaseDate):'';
      obj.scrapDate = obj.scrapDate?getymd(obj.scrapDate):'';
      obj.motDate = obj.motDate?getymd(obj.motDate):'';
      obj.clivatDeadline = obj.clivatDeadline?getymd(obj.clivatDeadline):'';
      obj.clivatDate = obj.clivatDate?getymd(obj.clivatDate):'';
      obj.ciDeadline = obj.ciDeadline?getymd(obj.ciDeadline):'';
      obj.ciDate = obj.ciDate?getymd(obj.ciDate):'';
      saveCar(obj).then((res)=>{
        if(res.code ===200){
            close()
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
    } else {
      return false;
    }
  });
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
