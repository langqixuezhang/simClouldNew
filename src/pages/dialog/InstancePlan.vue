<!--
 * @Description: 规划实例
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-21 16:23:54
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-08 14:27:25
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\InstancePlanPlan.vue
 -->

<template>
      <el-dialog v-model="dialogVisible" title="规划实例" @close="dialogCancel" width="38%" custom-class="instance-plan">
        <div class="instance-header fz-m">
          <span class="title">添加网段</span>
          <span class="">从</span> <ipAddressInput @ipInputData='ipAddressChange1'></ipAddressInput><span>到</span><ipAddressInput  @ipInputData='ipAddressChange2'></ipAddressInput>
          <span class="" @click="addSegment()">
            <i></i>
          </span>
        </div>
        <div class="instance-content contant-scroll">
          <div > 
            <span class="fz-mid" v-for="(item,index) in segmentList" :key="index" >
             {{ item.startIp }} - {{ item.endIp }} <i class=""></i>
            </span>
          </div> 
        </div>
        <div class="instance-node">
          <div class="prot-node">
            <span class="space-biggerlrspace">单个节点服务数量</span>
            <el-input class="space-biggerlrspace" v-model="serviceNum" type="number" :min="0"/>
          </div>
        </div>
       
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
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia";
import ipAddressInput from "@/components/ipAddressInput";
const globalStoreData = globalStore()

const { activeSystemData, activeServiceData } = storeToRefs(globalStoreData)

// props
const props = defineProps ({
  openInstancePlan:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)

const segmentList = reactive([]) // 网段数据
const startAddress = ref(0)
const ipAddressChange1 = (item) => {
  startAddress.value = item.map( (ele) => {
    return ele.value
  })
}

const endAddress = ref(0)
const ipAddressChange2 = (item) => {
    endAddress.value = item.map( (ele) => {
    return ele.value
  })
}
const addSegment = () => {
  if (!startAddress.value && !endAddress.value ) {
    return
  }
  let  _isAdd =  ref(false)
  segmentList.forEach(ele => {
   _isAdd.value =  ele.startIp === startAddress.value.join('.') && ele.endIp === endAddress.value.join('.')
  })
  if (_isAdd.value) {
    ElMessage({
        message: '请勿重复添加',
        type:'warning'
    })
    return
  }
  let _arr =  reactive([])
  let stateNum = startAddress.value[3] < endAddress.value[3] ? startAddress.value[3] : endAddress.value[3]
  let endNum = startAddress.value[3] > endAddress.value[3] ? startAddress.value[3]  : endAddress.value[3]

  for (let i = stateNum; i <= endNum; i++) {
    let _ip=  startAddress.value[0] + '.' + startAddress.value[1] + '.' +  startAddress.value[2]+ '.'  + i
    _arr.push(_ip)
  }
  let Obj = {
    startIp : startAddress.value.join('.'),
    endIp: endAddress.value.join('.'),
    segMent: _arr
  }
  segmentList.push(Obj)
}


const serviceNum = ref(1) // 单个节点服务数量
// const planPort = ref('自动规划端口号')
// const isManual = ref(false)
// const radioChange  = () => {
//   console.log('radioChangeradioChange',  planPort.value)
//   isManual.value =  planPort.value === '手动规划端口号'
// }



// 确认
const dialogPrimary = () => {
  let _arr = reactive([])
  segmentList.map(ele => {
    _arr.push(...ele.segMent)
  })


  globalStoreData.addserviceinstance({
    data:{
      SystemName:activeSystemData.value.Name,
      SystemServiceBundleName:activeServiceData.value.Name,
      Count: Number(serviceNum.value),
      Ip: _arr,
      Port:['10009'],
      CpuLimit:2,
      MemoryLimit:3
    }
  })
  .then(()=> {
     globalStoreData.getSystemServiceBundle({
         data: {
            SystemName:activeSystemData.value.Name,
          }
     })
  })
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
}


watch ( () => props.openInstancePlan,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style lang='scss' >
.instance-plan {
   .instance-header {
     display: flex;
     span {
       display: inline-block;
       line-height: 36px;
        &:nth-child(1) {
         margin-right: 36px;
       }
       &:nth-child(2) {
         margin-right: 10px;

       }
       &:nth-child(4) {
         margin: 0 10px;
       }
        &:nth-child(6) {
          margin: 0 10px;
          padding: 0;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: solid 1px #d9dbdb;
          cursor: pointer;
          text-align: center;
          line-height: 34px;
         i {
           display: inline-block;
           width: 16px;
           height: 16px;
           background: url('@/assets/images/manage/add_nomal.png') no-repeat;
         }
         &:hover {
            background-color: #0675f1;
            border: solid 1px #0675f1;
           i {
                background: url('@/assets/images/manage/add_hover.png') no-repeat;
           }
         }
       }
     }
   }
   .instance-content {
    height: 294px;
    background-color: #f7f8fa;
    border-radius: 3px;
    margin: 16px 0;
    padding: 0 10px;
    span {
      display: inline-block;
      line-height: 49px;
      width: calc(100% - 16px);
      & + span {
        border-top: 1px solid  #e4e7ee;
      }
      i {
           float: right;
           cursor: pointer;
           width: 16px;
           height: 16px;
           margin-top: 15px;
           display: none;
           background: url('@/assets/images/common/delet_icon.png') no-repeat;
      }
      &:hover {
        i {
          display: block;
        }
      }
    }
   }
   .instance-node {
    //  height: 80px;
     .prot-node  {
       display: flex;
       /deep/.el-input {
         width: 100px;
       }
       .el-input__wrapper {
         padding-right: 0;
       }
       span {
         line-height: 32px;
       }
     }
   }
}

</style>