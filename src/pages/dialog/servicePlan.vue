<!--
 * @Description: 服务规划
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-17 11:37:32
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 14:48:58
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\servicePlan.vue
 -->


<template>
      <el-dialog v-model="dialogVisible" :title="`规划实例-`+ `${ activeServiceData.ByName }` " @close="dialogCancel" width="33%" custom-class="service-plan">
        <el-form :model="form">
          <div class="service-num">
              <el-form-item label="服务数量">
                <el-input  v-model="form.num" type="number" :min="1" @change='numChange'/>
              </el-form-item>
          </div>
          <div class="service-config">
            <el-form-item label="CPU" :label-width="formLabelWidth" >
                <el-input  v-model="form.cpu" type="number" :min="0"/>
                <span class="from-item-tail">核</span>
              </el-form-item>
              <el-form-item label="内存" :label-width="formLabelWidth"  >
                <el-input  v-model="form.memory" type="number"  :min="0"/>
                <span class="from-item-tail">G</span>
              </el-form-item>
            <el-form-item label="GPU" :label-width="formLabelWidth" >
                <el-input  v-model="form.gpu" type="number" :min="0"/>
              </el-form-item>
          </div>
          <div class="vessel-prot">
            <el-form-item label="容器端口">
              <el-input  v-model="form.vesselProt" />
            </el-form-item>
          </div>
          <div  class="allude-prot contant-scroll">
            <el-form-item label="映射端口" >
              <el-input v-for="item,index in form.alludeProts" :key="index" v-model="item.value" clearable />
            </el-form-item>
          </div>
          <div class="log-type">
          <el-form-item label="日志采集类型">
            <el-select v-model="form.logType">
              <el-option v-for="item in logTypeList" :key="item.value" 
              :value="item.value" :label="item.label">
              </el-option>
            </el-select> 
          </el-form-item> 
        </div>
        </el-form>
        <template #footer>
          <span class="dialog-footer"> 
            <el-botton class="btn-cancel" @click="dialogCancel">取消</el-botton>
            <el-botton class="btn-primary" type="primary" @click="dialogPrimary">确定</el-botton>

          </span>
        </template>
      </el-dialog>
</template>

<script setup>
import { ref,defineProps,watch ,reactive, defineEmits} from "vue";
import { globalStore } from "@/store/globalManage.ts"
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus"

const globalStoreData = globalStore()
const { activeSystemData, activeServiceData } = storeToRefs(globalStoreData)

// props
const props = defineProps ({
  openServicePlan:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)
const formLabelWidth = '140px'
const logTypeList = reactive([{
  value:'TopSim',
  label:'服务运行日志（类型标识:FWYXRZ）'
},{
  value:'TopSim2',
  label:'nginx（类型标识:BXSYYW）'
},{
  value:'TopSim3',
  label:'云服务日志（类型标识:YFWRZ'
}])
const form = reactive ({
  num:'1',
  cpu:'4',
  memory:'100',
  gpu:'1', 
  vesselProt:'1001',
  logType:'TopSim',
  alludeProts:[{
    value:''
  }]
})

// 输入框
const numChange = (item) => {
  if (item < 1) {
    form.num = 1
    item = 1
  }
  if ( form.alludeProts.length > item ) {
    form.alludeProts.splice( item-1,  form.alludeProts.length - item)
  } else {
    let _num = item - form.alludeProts.length
    for (let i = 0; i < _num ; i++) {
      form.alludeProts.push({
        value:''
      })
    }
  }
}
// 确认
const dialogPrimary = () => {

let _arr = form.alludeProts.map(ele => {
  return ele.value
})
  if ( !form.num || !form.cpu || !form.memory || !form.gpu || !form.vesselProt || !form.num || !_arr.length ) {
      ElMessage({
        message: '输入框不能为空',
        type:'warning'
    })
  return 
}
  globalStoreData.addserviceinstance({
    data:{
      LogType:'TopSim',
      SystemName:activeSystemData.value.Name,
      SystemServiceBundleName:activeServiceData.value.Name,
      Count: Number(form.num),
      CpuLimit: form.cpu,
      MemoryLimit:form.memory,
      GpuLimit:form.gpu,
      ServicePort:form.vesselProt,
      Port: _arr
    }
  }).then(()=> {
    globalStoreData.getSystemServiceBundle( {
      data: {
        SystemName:activeSystemData.value.Name
      }
    })
  })
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
  form.cpu = '4'
  form.memory = '100'
  form.gpu = '1'
  form.num = '1'
  form.logType = 'TopSim'
  form.logType = 'TopSim'
}


watch ( () => props.openServicePlan,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style lang='scss'  >
   .service-plan {
     .el-input {
       width: 90px
     }
     .el-input__wrapper {
        padding-right: 0;
    }
     .service-config {
       display: flex;
        .from-item-tail {
            margin-left: 10px;
        }
        .el-form-item__content {
           flex-wrap: inherit;
        }
        .el-form-item:nth-child(2), .el-form-item:nth-child(3) {
          .el-form-item__label {
            width: 70px !important;
          }
        }
     }
     .allude-prot {
       .el-form-item__content {
          max-height: 60px;
          display: grid;
          grid-template-columns: repeat(5, 90px);
          grid-gap: 10px;
       }
    
     }
     .log-type .el-input{
         width: 280px;
        .el-input__wrapper {
          padding-right: 10px; 
       }
     }
   }
</style>