<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-29 15:52:43
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 14:29:20
 * @FilePath: \sim-application-web(应用云)\src\pages\node\nodeListChild.vue
 -->
<template>
 
  <div class="node-child" :class="{ 'off-node-child' : isOff }">
      <p class="title">
        <el-tooltip :content="nodeCardData.HostName" placement="top">
          <span class="ellipsis"><i></i>{{ nodeCardData.HostName }}</span>
         </el-tooltip>
        <span class="fz-mid line-cmd" @click="cmdHandle()" v-if="!isOff">CMD</span>
        <span class="space-lrspace fz-mid" @click="onlineHandle()"  v-if="!isOff">上线</span>
        <span class="fz-mid line-delete" @click="deleteHandle()"  v-if="isOff">删除</span>
      </p>
      <p class="ip-info fz-mid">
          <span >IP：{{ nodeCardData.Ip }}</span>
          <span v-if="!isOff">{{ nodeCardData.OperatingSystem }}  {{ nodeCardData.OsArchitecture }}</span>
      </p>
      <p class="core fz-mid" v-if="!isOff">
          <span>内存: {{nodeCardData.TotalMemory }}</span>
          <span>{{ nodeCardData.CpuNumOfCores }}核</span>
      </p>
  </div>
  <onlineDiglog :openOnlineDiglog ='openOnlineDiglog' @closeDialog='closeDialog' :ipData="ipData"></onlineDiglog>
  <cmdDiglog :openCmdDiglog ='openCmdDiglog' @closeDialog='closeDialog' :ipData="ipData"></cmdDiglog>
</template>

<script setup>
 import { ref, defineProps } from "vue";
import onlineDiglog from "@/pages/node/diglog/onlineDiglog";
import cmdDiglog from "@/pages/node/diglog/cmdDiglog";
import { nodeStore } from "@/store/nodeManage.ts"
import { ElMessageBox } from "element-plus";
const nodeStoreData = nodeStore()

const props = defineProps({
  nodeCardData:{
    type:Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {}
  },
  isOff:{
    type:Boolean,
    default:false
  }
})

const openOnlineDiglog = ref(false)
const ipData = ref('')
const onlineHandle = () => {    // 上线
  openOnlineDiglog.value = true
  ipData.value = props.nodeCardData.Ip
}
const openCmdDiglog = ref(false)
const cmdHandle = () => {   // cmd
  openCmdDiglog.value = true
  ipData.value = props.nodeCardData.Ip 
}

const deleteHandle = () => { // 删除
  ElMessageBox.confirm('确认删除 ' + props.nodeCardData.Ip + '?','提示',{
    confirmBottonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
      nodeStoreData.deleteHost({
        data:{
          ip: props.nodeCardData.Ip
        }
      }).then(() => {
        nodeStoreData.getHostInfos()
      })
  })
}
const closeDialog = () => { // diglog 取消回调
  openOnlineDiglog.value = false
  openCmdDiglog.value = false
  ipData.value = ''
}
</script>

<style>

</style>