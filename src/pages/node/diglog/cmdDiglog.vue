<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-06 15:03:22
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-06 16:55:10
 * @FilePath: \sim-application-web(应用云)\src\pages\node\diglog\cmdDiglog.vue
 -->

<template>
      <el-dialog v-model="dialogVisible" title="命令干预" @close="dialogCancel" width="610px" custom-class="cmd-diglog" append-to-body="true">
        <div class="cmd-header">
            <span class="btn-default" v-for="item,index in cmdList" :key="index" @click="btnHandle(item)">{{ item.name }}</span>
        </div>
        <div  class="cmd-main">
            <div>
                <i></i><el-input  v-model="cmdModel" />
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
import { ref, defineProps, watch, defineEmits, reactive } from "vue";
import { nodeStore } from "@/store/nodeManage.ts"
const nodeStoreData = nodeStore()
  
// props
const props = defineProps ({
  openCmdDiglog:Boolean,
  ipData: String
})

// 
const emit = defineEmits (['closeDialog'])
const dialogVisible = ref(false)

const cmdList  = reactive([
        {
          name: '立即关机',
          cmd: 'shutdown -s -t 0'
        },
        {
          name: '立即重启',
          cmd: 'shutdown -r -t 0'
        },
        {
          name: '30s自动关机',
          cmd: 'shutdown -s -t 30'
        },
        {
          name: '30s自动重启',
          cmd: 'shutdown -r -t 30'
        }, 
        {
          name: '启动系统服务',
          cmd: 'NET start 服务名'
        },
        {
          name: '取消自动重启/关机',
          cmd: 'shutdown -a'
        },
       
        {
          name: '停止系统服务',
          cmd: 'NET stop 服务名'
        }
])



const cmdModel = ref('')
// const cmdChange = () => {
//     console.log('ces ces ces ', cmdModel.value)
// }

const btnHandle = (item) => {
    cmdModel.value = item.cmd
}
// 确认
const dialogPrimary = () => {
nodeStoreData.cmdCommand({
    data:{
        ip:props.ipData,
        command:cmdModel.value
    }
})
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
    cmdModel.value = ''
  dialogVisible.value = false
}



watch ( () => props.openCmdDiglog,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style  lang='scss' >
   .cmd-diglog {
       .btn-default {
           margin-bottom: 10px;
       }
       .cmd-main {
            height: 334px;
            background-color: #ffffff;
            border-radius: 4px;
            border: solid 1px #e1e3e4;
            .el-input  .el-input__wrapper{
                box-shadow:none;
            }
       }
   }
</style>