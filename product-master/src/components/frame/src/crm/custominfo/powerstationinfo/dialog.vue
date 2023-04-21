<template>
  <div class="lz-dialog">
    <el-dialog
      ref="ruleFormRef"
      :model-value="dialogFormVisible"
      :title="titile"
      :before-close="close"
      :width="formLabelWidth"
      :close-on-click-modal="false"
      draggable
    >
      <div>
        <!-- 基础信息 -->
        <p class="basictitle">电站业主信息</p>
        <div>
          <div class="showinfo">
            <p class="showstyle">姓名：{{ formInline.data.userName }}</p>
            <p class="showstyle">身份证号：{{ formInline.data.idNumber }}</p>
            <p class="showstyle">手机号码：{{ formInline.data.phoneNumber }}</p> 
            <p class="showstyle">产权单位/投资商：{{ formInline.data.unit }}</p>
            <p class="showstyle">业务来源：{{ formInline.data.businessSource }}</p>
          </div>
          <div class="showinfo">
            <p class="showstyle">住址：{{ formInline.data.address }}</p>
          </div>
        </div>
        <!-- <p class="basicinfo"><span>电站信息</span></p> -->
        <p class="basictitle">电站信息</p>
        <div>
          <div class="showinfo">
            <p class="showstyle">电站单元名称：{{ formInline.data.powerStationName }}</p>
            <p class="showstyle">组件型号：{{ formInline.data.moduleType }}</p>
            <p class="showstyle">设备数量：{{ formInline.data.devicesNumber }}</p> 
            <p class="showstyle">并网类型：{{ formInline.data.gridConnectionType }}</p>
            <p class="showstyle">投资类型：{{ formInline.data.investmentType }}</p>
          </div>
          <div class="showinfo">
            <p class="showstyle">电站类型：{{ formInline.data.powerStationType }}</p>
            <p class="showstyle">电站地址：{{ formInline.data.powerStationAddress }}</p> 
            <p class="showstyle">采集器厂商：{{ formInline.data.collectorManufacturer }}</p>
            <p class="showstyle">采集器编号：{{ formInline.data.collectorNumber }}</p>
            <p class="showstyle">逆变器功率：{{ formInline.data.inverterPower }}</p>
          </div>
          <div class="showinfo">
            <p class="showstyle">逆变器厂商：{{ formInline.data.inverterManufacturer }}</p>
            <p class="showstyle">逆变器型号：{{ formInline.data.inverterModel }}</p> 
            <p class="showstyle">逆变器序列号：{{ formInline.data.inverterSerialNumber }}</p>
            <p class="showstyle">电站质保期：{{ formInline.data.powerStationWarranty }}</p>
          </div>
        </div>
        <p class="basicinfo"><span>安装及维修记录</span></p>
        <div>
          <el-table
            :data="formInline.data.installationData"
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
              prop="repairMan"
              label="维修人员"
              min-width="10%"
            />
            <el-table-column
              prop="reason"
              label="原因"
              min-width="10%"
            />
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
import { ElMessage ,ElNotification} from "element-plus";
import store from '@/store'
import { getUserPowerInfo as getUserPowerInfo} from '@/api/index'
const emits = defineEmits(["update:modelValue"]);
const addform = ref();
const formLabelWidth = "70%";
let dialogInspectorVisible = ref(false);
let dialogExitVisible = ref(false);
let props = defineProps({
  dialogFormVisible: {
    type: Boolean,
  },
  dataId: {
  },
//   dialogTableValue: {
//     type: Object,
//     default: () => {},
//   },
//   dropdownValue:{
//     type: Object,
//     default: () => {},
//   },
});
let titile = ref("");
const imageUrl = ref("");
let formInline = reactive({
  data:{}
    // userName:'',
    // IDNumber:'',
    // phoneNumber:'手机号码',
    // unit:'产权单位/投资商',
    // businessSource:'业务来源',
    // address:'地址',
    // powerStationName:'电站单元名称',
    // moduleType:'组件型号',
    // devicesNumber:'设备数量',
    // gridConnectionType:'并网类型',
    // investmentType:'投资类型',
    // powerStationType:'电站类型',
    // powerStationAddress:'电站地址',
    // collectorManufacturer:'采集器厂商',
    // collectorNumber:'采集器编号',
    // inverterPower:'逆变器功率',
    // inverterManufacturer:'逆变器厂商',
    // inverterModel:'逆变器型号',
    // inverterSerialNumber:'',//逆变器序列号
    // powerStationWarranty:'', //电站质保期
    // installationData:[ //安装及维修详情
    //     {
    //         powerStationName:'ssd',
    //         userName:'客户名称',
    //         phoneNumber:'联系方式',
    //         repairMan:'维修人员',
    //         reason:'原因',
    //     }
    // ]
});
const inspector = ref("");
const exitvalue = ref("");
const isinspector = ref(false);
// let dowpdown = props.dropdownValue.value
watch(
  () => props,
  () => {
    titile.value = '查看';
    // formInline = props.dialogTableValue.value;
    getUserPowerInfo(props.dataId).then((res)=>{
      if(res.code === 200){
        formInline.data = res.body;
        console.log(formInline.data)
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
  },
  { deep: true, immediate: true }
);
const close = () => {
  // addform.value.resetFields();
  emits("update:modelValue", false);
};
const isvoild = () => {
  let isclick = ref(true);
  if (formInline.repairDetails.length == 0) {
    isclick.value = false;
  }
  formInline.repairDetails.forEach((item, index) => {
    if (!item.faultType || !item.faultPart || !item.faultSituation||!item.urgencyLevel) {
      isclick.value = false;
    }
  });
  return isclick;
};
const savebutton = () => {
  let isclick = isvoild();
  if(isclick.value){
    saveRepDatails(JSON.parse(JSON.stringify(formInline)).repairDetails).then((res)=>{
     if(res.code ===200){
        close();
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
  }else{
    alert("请检查故障明细是否有未选择的故障");
  }
};

const handleRemove = (index) => {
  formInline.repairDetails.splice(index, 1);
};
const addcolum = () => {
  console.log(formInline.repairDetails);
  let obj = {
    faultType: "",
    faultPart: "",
    faultSituation: "",
    otherDesc: "",
    urgencyLevel: "",
    billMainId:JSON.parse(JSON.stringify(formInline)).id,
    faultTypeOption: formInline.faultTypeOption,
    faultPartOption: formInline.faultPartOption,
    faultSituationOption: formInline.faultSituationOption,
  };
  formInline.repairDetails.push(obj);
};

const distribution = () => {
  let voild = isvoild();
  console.log(voild);
  if (voild.value) {
    saveRepDatails(JSON.parse(JSON.stringify(formInline)).repairDetails).then((res)=>{
     if(res.code ===200){
        dialogInspectorVisible.value = true;
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
    alert("请检查故障明细是否有未选择的故障");
  }
};
const closeInspector = () => {
  dialogInspectorVisible.value = false;
};
const saveInspectorbutton = () => {
  if (inspector.value !== "") {
    saveInspector(JSON.parse(JSON.stringify(formInline)).id,inspector.value).then((res)=>{
      if(res.code ===200){
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
    
  } else {
    alert("请选择点检员");
  }
};
const exit = () => {
  let voild = isvoild();
  if (voild.value) {
    saveRepDatails(JSON.parse(JSON.stringify(formInline)).repairDetails).then((res)=>{
     if(res.code ===200){
        dialogExitVisible.value = true
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
    ;
  } else {
    alert("请检查故障明细是否有未选择的故障");
  }
};
const closeExit = () => {
  dialogExitVisible.value = false;
};
const saveExit = () => {
  if(exitvalue.value!==''){
    let params={
      billMainId:JSON.parse(JSON.stringify(formInline)).id,
      desc:exitvalue.value
    }
    saveGoback(params).then((res)=>{
       if(res.code ===200){
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
  } else {
    alert("请输入退回说明");
  }
 
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
    margin: 24px 0;
    color: #333333;
    border-bottom: 1px solid #cccccc;
    span {
      color: #333333;
      font-size: 20px;
      height: 40px;
      width: 150px;
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
/deep/ .el-input{
  width: 100%;
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
.labstyle {
  width: 100px;
  background-color: #409eff;
  margin: 24px 0;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
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
.errordom {
  float: left;
  width: 200px;
  margin-top: -6px;
  position: relative;
}
.errorselect {
  /deep/ .el-input__wrapper {
    box-shadow: 0 0 0 1px #f56c6c inset;
  }
}
.labelinspector {
  width: 100px;
  float: left;
}
.errorinfo {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
