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
          <el-form
            :model="formInline"
            :inline="true"
            label-width="80px"
            :rules="rules"
            ref="addform"
            require-asterisk-position="left"
            size="default"
            scroll-to-error="true"
          >
            <div class="basicstyle">
              <el-form-item label="姓名" prop="staffName" required>
                  <el-input
                    placeholder="请输入姓名"
                    :disabled = "titile==='查看'"
                    v-model="formInline.staffName"
                  />
              </el-form-item>
              <el-form-item label="性别" prop="sex" required>
                <el-select :disabled = "titile==='查看'" v-model="formInline.sex" placeholder="请选择性别">
                  <el-option v-for="item in dowpdown.sex" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="在职状态" prop="status" required>
                <el-select :disabled = "titile==='查看'"
                  v-model="formInline.status"
                  placeholder="请选择在职状态"
                >
                  <el-option v-for="item in dowpdown.status" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工号" prop="staffCode" required>
                  <el-input
                    :disabled = "titile==='查看'||titile==='编辑'"
                    placeholder="请输入工号"
                    v-model="formInline.staffCode"
                  />
              </el-form-item>
              <el-form-item label="工种" prop="jobType" required>
                <el-select
                  :disabled = "titile==='查看'"
                  v-model="formInline.jobType"
                  placeholder="请选择工种"
                >
                  <el-option v-for="item in dowpdown.jobType" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班组" prop="team" required>
                <el-select :disabled = "titile==='查看'" v-model="formInline.team" placeholder="请选择班组">
                    <el-option v-for="item in dowpdown.team" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号" prop="idNumber" required>
                  <el-input
                    :disabled = "titile==='查看'"
                    placeholder="请输入身份证号"
                    v-model="formInline.idNumber"
                  />
              </el-form-item>
              <el-form-item label="手机号码" prop="phoneNum" required>
                  <el-input
                    :disabled = "titile==='查看'"
                    placeholder="请输入手机号码"
                    v-model="formInline.phoneNum"
                  />
              </el-form-item>
              <el-form-item label="年龄" >
                  <el-input
                  :disabled = "titile==='查看'"
                    placeholder="请输入年龄"
                    v-model="formInline.age"
                  />
              </el-form-item>
              <el-form-item label="婚否">
                <el-select
                  :disabled = "titile==='查看'"
                  v-model="formInline.marriage"
                  placeholder="请选择婚姻状态"
                >
                  <el-option v-for="item in dowpdown.marriage" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族">
                <el-select :disabled = "titile==='查看'" v-model="formInline.nation" placeholder="请选择民族">
                   <el-option v-for="item in dowpdown.nation" :key="item.label" :label="item.label" :value="item.value" required>
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select
                  :disabled = "titile==='查看'"
                  v-model="formInline.poloticsStatus"
                  placeholder="请选择政治面貌"
                >
                  <el-option v-for="item in dowpdown.poloticsStatus" :key="item.label" :label="item.label" :value="item.value" required>
                  </el-option>
                </el-select>
              </el-form-item> 
            </div>
            <div>

            <div class="address">
              <el-form-item label-width="120px" label="籍贯">
                <el-input
                  :disabled = "titile==='查看'"
                  placeholder="请输入籍贯"
                  v-model="formInline.nativeplace"
                />
              </el-form-item>
              <el-form-item label-width="120px" label="现住址">
                <el-input
                  :disabled = "titile==='查看'"
                  placeholder="请输入现住址"
                  v-model="formInline.currentAddress"
                />
              </el-form-item>
              <el-form-item label-width="120px" label="紧急联系人姓名">
                <el-input
                  :disabled = "titile==='查看'"
                  placeholder="请输入紧急联系人姓名"
                  v-model="formInline.contactName"
                />
              </el-form-item>
              <el-form-item label-width="120px"  prop="contactPhone" label="紧急联系人电话">
                <el-input
                  :disabled = "titile==='查看'"
                  placeholder="请输入紧急联系人电话"
                  v-model="formInline.contactPhone"
                />
              </el-form-item>
            </div>

            </div>
            <!-- 证书信息 -->
            <p class="basicinfo"><span>证书信息</span></p>
            <!-- <template v-if="formInline.idinfo&&formInline.idinfo.lengt>0"> -->
              <div class="idinfo" v-for="(item,index) in formInline.certList" :key="item.idnum">
                <el-form-item label="证件类型">
                  <el-select :disabled = "titile==='查看'" v-model="item.certType" placeholder="请选择证件类型">
                    <el-option v-for="item in dowpdown.certType" :key="item.label" :label="item.label" :value="item.value" required>
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号">
                  <el-input :disabled = "titile==='查看'"  placeholder="请输入证件号" v-model="item.certNumber" />
                </el-form-item>
                <el-form-item label="有效期">
                  <el-date-picker
                              :disabled = "titile === '查看'"
                              v-model="item.validityDate"
                              type="date"
                              placeholder="请选择有效期"
                          />
                </el-form-item>
                <el-icon v-if="titile!=='查看'" class="removeidinfo" @click="removeidinfo(index)"><Remove /></el-icon>
            </div>
            <!-- </template> -->
            
            <el-button v-if="titile!=='查看'&&formInline.certList&& formInline.certList.length<5" class="btn-mixins-clear-default" @click="addid"
                >添加证件</el-button>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="titile!=='查看'" class="btn-mixins-clear-default" @click="close"
            >取消</el-button>
          <el-button v-if="titile!=='查看'" class="btn-mixins dia-suc" @click="success(addform)"
            >保存</el-button>
          <el-button v-if="titile==='查看'" class="btn-mixins dia-suc" @click="surelook"
            >确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script  setup>
import { defineProps, ref } from "vue";
import { reactive, watch, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { saveRepairman as saveRepairman } from '@/api/index'
import { ElNotification } from "element-plus";
import store from '@/store'
const emits = defineEmits(["update:modelValue"]);
const addform = ref()
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
let dowpdown = props.dropdownValue.value
const checkIphonenum = (rule,value,callback)=>{
  if(value === '') {
     callback(new Error('请输入电话号码'))
  }else if(!/^[0-9]*$/.test(value)){
      callback(new Error('电话号码只能输入数字'))
  } else{
      callback()
  }
}
const checknum = (rule,value,callback)=>{
  if(!/^[0-9]*$/.test(value)){
    callback(new Error('电话号码只能输入数字'))
  }else{
    callback()
  }
}
const rules = reactive({
  staffName:[{ required: true, message: '请输入姓名', trigger: 'blur' },],
  sex:[{ required: true, message: '请选择性别', trigger: 'change' },],
  status:[{ required: true, message: '请选择在职状态', trigger: 'change' },],
  staffCode:[{ required: true, message: '请输入工号', trigger: 'blur' }, ],
  jobType:[{ required: true, message: '请选择工种', trigger: 'change' }, ],
  team:[{ required: true, message: '请选择班组', trigger: 'change' }, ],
  idNumber:[{ required: true, message: '请输入身份证号', trigger: 'blur' },],
  phoneNum:[{ required: true, message: '请输入电话号码', trigger: 'blur' },
              { validator: checkIphonenum,trigger: 'blur' }],
  contactPhone:[{ validator: checknum,trigger: 'blur' }]
})

let titile = ref("");
const imageUrl = ref("");
let formInline = reactive({
     
        "age": "",
        "certList": [
          {
            "certNumber": "",
            "certType": "",
            "certTypeLbl": "",
            "id": "",
            "validityDate": ""
          },
        ],
        "contactName": "",
        "contactPhone": "",
        "currentAddress": "",
        "id": "",
        "idNumber": "",
        "jobType": "",
        "jobTypeLbl": "",
        "marriage": "",
        "marriageLbl": "",
        "nation": "",
        "nationLbl": "",
        "nativePlace": "",
        "phoneNum": "",
        "poloticsStatus": "",
        "poloticsStatusLbl": "",
        "sex": "",
        "sexLbl": "",
        "staffCode": "",
        "staffName": "",
        "status": "",
        "statusLbl": "",
        "team": "",
        "teamLbl": ""
});
watch(
  () => props,
  () => {
    titile.value = props.dialogTitile;
    if (titile.value === "编辑" || titile.value === "查看") formInline = props.dialogTableValue.value;
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
  if (!addform) return
  addform.validate(async (valid) => {
    if (valid) {
      console.log(formInline)
      let obj = JSON.parse(JSON.stringify(formInline))
      obj.certList.forEach((item) => {
        if(item.validityDate){
            item.validityDate = getymd(item.validityDate);
        }
      });
      saveRepairman(obj)
        .then((res)=>{
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
const addid = ()=>{
  let obj = {
           "certNumber": "",
            "certType": "",
            "certTypeLbl": "",
            "id": "",
            "validityDate": ""
           }
  formInline.certList.push(obj);
}
const removeidinfo = (index)=>{
    formInline.certList.splice(index,1)
}
const surelook = ()=>{
  emits("update:modelValue", false);
}
</script>



<style lang = 'less' scoped>
.lz-dialog {
  .dia-suc {
    margin-left: 16px !important;
  }
      :deep(.el-input){
    width: 200px;
  }
  .address{
          :deep(.el-input){
    width: 280px;
  }
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
 :deep( .el-dialog__footer){
    padding-top: 16px;
  }
  :deep( .el-dialog__body ){
    padding: 0;
    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  :deep( .el-dialog__header) {
    border-bottom: 1px solid #cccccc;
    padding: 0;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep( .el-dialog__title ){
    color: #409eff;
    font-size: 20px;
    height: 40px;
    width: 100px;
    border-bottom: 4px solid #409eff;
  }
  :deep( .el-dialog) {
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
:deep(.el-form-item__label ){
  font-size: 14px;
}
:deep( .el-form ){
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
:deep( .avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
:deep( .el-form-item__content) {
  width: 200px;
}
:deep( .el-input__inner) {
  width: 156px;
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

/* .basicstyle {
  width: 83%;
} */
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
.idinfo{
  position: relative;
  .removeidinfo{
      margin-left: 24px;
      font-size: 20px;
      position: absolute;
      margin-top: 5px;
  }
}


</style>
