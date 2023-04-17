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
        <div class="mt-16 chartStyle">
              <el-tabs type="border-card" class="demo-tabs" v-model="activeName" @tab-click = 'tabTitle'>
                    <el-tab-pane label="表格" name='table'>
                        <div>
                            <el-table
                                :data="formInline"
                                :header-cell-style="{ background: '#d9ecff' }" 
                                border
                                style="width: 100%"
                            >
                                <el-table-column label="序号" min-width="7%">
                                <template #default="requestscope">
                                            <span >{{
                                            requestscope.$index+1
                                            }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="userName" label="客户名称" min-width="10%" />
                                <el-table-column prop="powerStationName" label="电站单元名称" min-width="18%" />
                                <el-table-column prop="powerStationTitle" label="电站名称" min-width="15%" />
                                <el-table-column prop="powerStationAddress" label="电站地址" min-width="15%" />
                                <el-table-column prop="month" label="月度" min-width="15%" />
                                <el-table-column prop="distributionAmount" label="发放金额" min-width="15%" />
                                <el-table-column prop="distributionTime" label="发放时间" min-width="15%" />
                                <template #empty>
                                    <el-empty v-loading="isloading"></el-empty>
                                </template>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="图表" name = 'chart'>
                        <div id="barchart"></div>
                    </el-tab-pane>
                </el-tabs>
        </div>
        <div class="showChart">
        </div>
    </el-dialog>
  </div>
</template>
<script  setup>
import { defineProps, ref,getCurrentInstance } from "vue";
import { reactive, watch, defineEmits } from "vue";
import { ElNotification  } from "element-plus";
import { saveCar as saveCar } from '@/api/index'
import store from '@/store'
const { proxy } = getCurrentInstance();
const emits = defineEmits(["update:modelValue"]);
const addform = ref();
const formLabelWidth = "60%";
const activeName = ref('table')
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
  userName: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
  powerStationName: [{ required: true, message: "请输入电站单元名称", trigger: "blur" }],
  powerStationAddress: [{ required: true, message: "请输入电站地址", trigger: "blur" }],
  refundAmount: [{ required: true, message: "请输入返还金额", trigger: "blur" }],
  returnStatus : [{ required: true, message: "请选择返还状态", trigger: "Change" }],

});

let titile = ref("");
const imageUrl = ref("");
let formInline = [{
    id: '',
    userName: "客户名称",
    powerStationName: "电站单元名称",
    powerStationTitle:'电站名称',
    powerStationAddress:"电站地址",
    month:'月度',
    distributionAmount: "发放金额",
    distributionTime:'发放时间',
}];
watch(
  () => props,
  () => {
    titile.value = props.dialogTitile;
  },
  { deep: true, immediate: true }
);
const close = () => {
  emits("update:modelValue", false);
};
const tabTitle = (tab,event)=>{
    console.log(tab.props.name)
    if(tab.props.name === "chart"){
        setTimeout(()=>{initbarchart()},100)
        
    }
}
const initbarchart = () => {
  if (proxy.$echarts.getInstanceByDom(document.getElementById("barchart"))) {
    proxy.$echarts.dispose(document.getElementById("barchart"));
  }
  const barchartBox = proxy.$echarts.init(document.getElementById("barchart"));
  console.log(barchartBox)
//   let barData = JSON.parse(JSON.stringify(repCountChartVo.value));
  const option = {
    title: {
      text: "车辆维修统计",
      textStyle: {
        color: "#333333",
        fontStyle: "normal",
        fontWeight: "bold",
        fontFamily: '"Microsoft YaHei"',
        fontSize: 16,
      },
    },
    tooltip: {
      formatter:(parmes) =>{
        console.log(parmes)
        return `${parmes.name}<br/> <ul><li class = 'countNum'><i style="display: inline-block;margin-right:16px ;width: 10px;height: 10px;background: 
                ${parmes.color} ;border-radius: 50%;}"></i>车辆维修统计:&nbsp;&nbsp; ${parmes.data}(车次)<li><ul>`
      }
    },

    grid: {
      left: "3%",
      right: "7%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        name: "日",
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name: "车次",
        type: "value",
      },
    ],
    series: [
      {
        name: "车辆维修统计",
        type: "bar",
        barWidth: "60%",
        data: [10,45,45,8,78,45,65,54,452,56,21,21],
      },
    ],
  };
  barchartBox.setOption(option, true);
  window.addEventListener("resize", function () {
    barchartBox.resize();
  });
};
</script>



<style lang = 'less' scoped>
.lz-dialog {
  .dia-suc {
    margin-left: 16px !important;
  }

  :deep(.el-input){
    width: 300px;
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
  width: 300px;
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
:deep(.el-tabs--border-card){
    height: 100%;
}
.chartStyle{
    width: 100%;
    height: 50vh;

}
#barchart{
    width: 100%;
    height: calc(50vh - 70px);
}
</style>
