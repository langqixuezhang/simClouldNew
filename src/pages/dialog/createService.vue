<!--
 * @Description: 创建新系统
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-14 17:46:24
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 18:50:08
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\createSystem.vue
 -->
<template>
      <el-dialog v-model="dialogVisible" title="添加新服务" @close="dialogCancel" width="40%" custom-class="add-new-service">
        <el-form>
            <el-form-item label="添加类型">
                <el-radio-group v-model="serviceTypee">
                    <el-radio label="新服务包"/> 
                    <el-radio label="新版本服务包"/> 
                </el-radio-group>
            </el-form-item>
            <el-form-item label="运行系统">
               <el-select v-model="runSyetem"  placeholder="请选择系统">
                   <el-option v-for="item in selectList" :key="item.value" 
                    :value="item.value" :label="item.label">
                    </el-option>
               </el-select> 
            </el-form-item>  
          <el-form-item label="服务名称" :label-width="formLabelWidth" >
            <el-input v-model="serviceName" autocomplete="off" maxlength="20" placeholder="请输入系统名称" show-word-limit/>
          </el-form-item>

          <el-form-item label="服务描述" :label-width="formLabelWidth" >
            <el-input v-model="serviceDescribe" autocomplete="off" placeholder="服务描述" type="textarea" :rows='4' resize="none"/>
          </el-form-item>
          <el-form-item label="版本信息" :label-width="formLabelWidth">
            <el-input v-model="versionInfo" autocomplete="off" placeholder="版本信息"  type="textarea" :rows='2' resize="none"  v-show="serviceTypee === '新服务包'" />
            <div class="update-main" v-show="serviceTypee !== '新服务包'">
                <div class="info-step" :class="{ 'step-active':activeStep === 1 }" >
                    <div @click="stepHandle(1)"><i class="update-icon"></i><span>主版本</span></div>
                    <div><span class="active1">1</span> . <span>0</span> . <span>0</span><i></i><span class="active2">2</span> . <span>0</span> . <span>0</span></div>
                </div>
                <div class="info-step" :class="{ 'step-active':activeStep === 2 }">
                    <div  @click="stepHandle(2)"><i class="update-icon"></i><span>副版本</span></div>
                    <div><span class="">1</span> . <span class="active2">1</span> . <span>0</span><i></i><span >1</span> . <span class="active2">2</span> . <span>0</span></div>
                </div>
                    <div class="info-step" :class="{ 'step-active':activeStep === 3 }">
                    <div  @click="stepHandle(3)"><i class="update-icon"></i><span>版本补丁</span></div>
                    <div><span>1</span> . <span>1</span> . <span class="active2">1</span><i></i><span>1</span> . <span>1</span> . <span class="active2">2</span></div>
                </div>
            </div>
          </el-form-item>
          <el-form-item label="命令参数" class="from-item-title">
          </el-form-item>
          <el-form-item label="启动命令" :label-width="formLabelWidth">
            <el-input v-model="RunParam" autocomplete="off"  placeholder="" />
          </el-form-item>
           <el-form-item label="停止命令" :label-width="formLabelWidth">
            <el-input v-model="StopParam" autocomplete="off"  placeholder="" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer"> 
            <el-botton class="btn-cancel"  @click="dialogCancel">取消</el-botton>
            <el-botton class="btn-primary"  type="primary" @click="dialogPrimary">确定</el-botton>
          </span>
        </template>
        <el-upload ref="upload" class="upload-demo"  :on-success="handleSuccess" :limit="1" :on-exceed="handleExceed" 
          v-model:file-list="fileList" :http-request="uploadFile"  :show-file-list="true">
          <span class="btn-default upload-btn"><i></i>上传服务包</span>
        </el-upload>
      </el-dialog>
</template>

<script setup>
import { ref,defineProps,watch ,reactive, defineEmits} from "vue";
  import { manageStore } from "@/store/systemManage.ts"
import { globalStore } from "@/store/globalManage.ts"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia";
// import axios from '@/utils/http.js'
import axios from 'axios'

import { genFileId } from "element-plus";

const store = globalStore()
const manageStoreData = manageStore()
const upload = ref()
const { activeSystemData  } = storeToRefs(store)
const {  isHostPage } = storeToRefs(manageStoreData)

// props
const props = defineProps ({
  openNewService:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 版本切换
const activeStep = ref(1)
const stepHandle = (item) => {
  activeStep.value= item
}
// 
const selectList = reactive([{
    value:'Windows系统',
    label:'Windows系统'
},{
    value:'RedHat系统',
    label:'RedHat系统'
},{
    value:'centos系统',
    label:'centos系统'
},{
    value:'ubuntu系统',
    label:'ubuntu系统'
},{
    value:'Kylin系统',
    label:'Kylin系统'
},{
    value:'Mac Os系统',
    label:'Mac Os系统'
}])
const dialogVisible = ref(false) // dialog 
const formLabelWidth = '140px'

const  serviceTypee = ref('新服务包')
const  runSyetem = ref('')
const  serviceName = ref('')
const  serviceDescribe = ref('')
const  versionInfo = ref('')
const  RunParam = ref('')
const  StopParam = ref('')
const   PackagePath = ref('')

// 文件上传
const fileList = ref([])
const handleSuccess =(files)=> {
  console.log('sahngchuancgenggong',files )
}

const uploadFileInfo = ref('')

const isFile = ref(false) // 是否有文件
const ServiceType = ref('') // 服务Name
const uploadFile = (item) => {    // 文件上传
  upload.value && upload.value.clearFiles()

  const headers = {
        'Content-Type': 'multipart/form-data'
  }
  
  let formData = new FormData()
  formData.append('File', item.file)
  formData.append('FileName', item.name)
  formData.append('Version', '1.0.0')
  formData.append('BaseSystem', 'ubuntu')
  formData.append('BaseSystemVersion', 'latest')
  formData.append('SystemName', activeSystemData.value.Name)

  axios.post('/api/action?command=serviceupLoad', formData, { headers })
      .then( _ => {
        uploadFileInfo.value = _.data.data
        ServiceType.value =  _.data.data.ServiceType
        serviceDescribe.value =  _.data.data.Description
        RunParam.value =  _.data.data.StopParams
        StopParam.value =  _.data.data.RunParams
        PackagePath.value = _.data.data.PackagePath
        serviceName.value = _.data.data.Name
        isFile.value = true
      })
      .catch(err => {
            ElMessage({
                message: err,
                type:'error'
            })
      })

}
const handleExceed = (files) => { // exeed效验
  upload.value && upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value && upload.value.handleStart(file)
}
// 确认
const dialogPrimary = () => {
    if (!uploadFileInfo.value) {
          ElMessage({
          message: `请先上传服务包`,
          type:'warning'
        })
      return
    }
    if ( !runSyetem.value || !serviceName.value || !serviceDescribe.value || !versionInfo.value || !RunParam.value || !StopParam.value ) {
        ElMessage({
          message: `${ !runSyetem.value? '请选择运行系统' : !serviceName.value ? '请输入服务名称' : !serviceDescribe.value  ? '请输入服务描述' 
          : !versionInfo.value ? '请输入版本信息' : !RunParam.value ? '请输入启动命令' : '请输入停止命令'}`,
          type:'warning'
        })
        return
    }

  store.addServiceBundle({
    data:{
      SystemName:activeSystemData.value.Name,
      Name:ServiceType.value,
      ByName: serviceName.value,
      Description:serviceDescribe.value,
      Version:serviceTypee.value === '新服务包' ? '1.0.0' : versionInfo.value,
      PackageUrl: PackagePath.value,
      RunParams:RunParam.value,
      StopParams:StopParam.value,
      BaseSystem:isHostPage.value === 0 ? 'ubuntu' : 'Windows', // 主机 ubuntu 其他 Windows
      BaseSystemVersion: isHostPage.value === 0 ? 'latest' : 'Windows'
    }
  }).then( _ => {
      store.addSystemServiceBundle({
        data:{
          SystemName:activeSystemData.value.Name,
          ServiceBundleName:_.data.ServiceBundleName,
        }
    }).then(() => {
      store.getSystemServiceBundle( {
        data: {
          SystemName:activeSystemData.value.Name
        }
      })
    })
  })
 dialogCancel()
}

// const dialogPrimary = () => {
//   store.addSystemServiceBundle({
//     data:{
//       SystemName:activeSystemData.value.Name,
//       ServiceBundleName:serviceName.value,
//     }
//   })
//   store.addServiceBundle({
//     data:{
//       SystemName:activeSystemData.value.Name,
//       Name:serviceName.value,
//       Description:serviceDescribe.value,
//       Version:versionInfo.value,
//       PackageUrl: PackagePath.value,
//       RunParams:RunParam.value,
//       StopParams:StopParam.value
//     }
//   }).then(()=> {
//       store.getSystemServiceBundle( {
//       data: {
//         SystemName:activeSystemData.value.Name
//       }
//     })
//   })
//   dialogCancel()
// }
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false

  serviceTypee.value = '新服务包'
  runSyetem.value = ''
  serviceName.value = ''
  ServiceType.value = ''
  serviceDescribe.value = ''
  versionInfo.value = ''
  RunParam.value = ''
  StopParam.value = ''
  uploadFileInfo.value=''
}

watch ( () => props.openNewService,  (newValue) => {

  dialogVisible.value = newValue
})




</script>

<style lang='scss'>
.add-new-service {
  .el-form-item {
    margin-bottom: 10px;
  }
  .upload-btn {
    position: absolute;
    top: 76px;
    right: 18px;
  }
  .update-main {
      width: 70%;
      background-color: #fafafa;
      border-radius: 6px;
      padding: 5px 20px;
      .info-step {
     
          display: flex;
          justify-content: space-between;
          line-height: 20px;
          margin: 13px 0;
          font-size: 14px;
          color: #474f57;
         
          &>:first-child {
              cursor: pointer;
              i {
                  margin-right: 6px;
                  position: relative;
                  top: 3px;
              }
              .update-icon {
                  width: 16px;
                  height: 16px;
                  border-radius: 8px;
                  display: inline-block;
                  border: 1px solid #dcdfe6;
              }
          }
          &>:last-child {
              span {
                  display: inline-block;
                  padding: 0 6px;
                  color: #185db1;
              }
              i {
                  display: inline-block;
                  width: 12px;
                  height: 10px;
                  margin: 0 15px;
                  vertical-align: middle;
                  // background: url('../../../assets/images/arrow_double.png') no-repeat;
              }
              .active1 {
                  color: #90a4bb;;
                  background-color: #e6ebf1;

              }
                .active2 {
                  color: #90a4bb;
                  background-color: #e6ebf1;
              }
          }
      }
      .step-active {
        &>:first-child {
           .update-icon{
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background: #409eff;
            display: inline-block;
            &::before {
                position: absolute;
                display: block;
                content: '';
                top: 2px;
                left: 2px;
                width: 12px;
                height: 12px;
                border-radius: 6px;
                background: #fff;
            }
            &:after{
                position: absolute;
                display: block;
                content: '';
                top: 4px;
                left: 4px;
                width: 8px;
                height: 8px;
                border-radius: 6px;
                background: #409eff;
            }
        }
        }
      
          &>:last-child {
            .active1 {
                  color: #185db1;
                  background-color: #d5e8ff;
              }
              .active2 {
                color: #185db1;
                background-color: #d5e8ff;
            }
          }
      }
    
    }
}
</style>