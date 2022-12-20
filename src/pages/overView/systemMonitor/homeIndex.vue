<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-11 11:55:41
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 10:19:11
 * @FilePath: \sim-application-web(应用云)\src\pages\overView\stytemMonitor\homeIndex.vue
 -->
<template>
  <div class="monitor-top">
    <div class="monitor-top-lf">
      <hander class="content-hander">{{ activeSystemData.ByName }}</hander>
      <el-table :data="systemServiceIpData" style="width:100%"  height="300px" empty-text="暂无数据" row-key="id" lazy border
    :tree-props="{ children:'children', hasChildren:'true' }" @row-click="rowCilckHandle" highlight-current-row="">
            <el-table-column label="服务名称" prop="ByName" ></el-table-column>
            <el-table-column label="已部署/已规划" width="120px" prop="stateContrast"></el-table-column>
            <el-table-column label="节点Ip" prop="Ip" width="140px"></el-table-column>
            <el-table-column label="端口号" prop="Port"  width="100px"></el-table-column>
            <el-table-column label="CPU"  width="80px">
               <template #default="scope">
                  <span> {{ scope.row.children ? '' : cupComputed(scope.row.inInfo) }} </span>
              </template>
            </el-table-column>
            <el-table-column label="内存"  width="80px">
               <template #default="scope">
                  <span> {{ scope.row.children ? '' : memoryComputed(scope.row.inInfo) }} </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
                <template #default="scope">
                  <span class="text-stop" @click="stopHanle(scope.row)">停止</span>
                  <span class="text-default" @click="restartHanle(scope.row)">重启</span>
                  <span  class="text-destroy" v-if="!scope.row.children"  @click="destoryHanle(scope.row)">销毁</span>
                  <span  class="text-destroy"  v-if="scope.row.children && scope.row.isAllDeploy && activeTabHost === 0"  
                  @click="destoryAllHanle(scope.row)">销毁全部</span>
                  <span  class="text-destroy"  v-if="scope.row.children && !scope.row.isAllDeploy"  @click="deployAllHanle(scope.row)">部署全部</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="monitor-top-rg">
        <monitorRg></monitorRg>
    </div>
  </div>
  <div class="monitor-bootom">
    <systemLog></systemLog>
  </div>
</template>


<script setup>
  import {  onMounted, computed, watch } from "vue"
  import monitorRg from '@/pages/overView/systemMonitor/monitorRg'
  import { storeToRefs } from "pinia";
  import { globalStore } from "@/store/globalManage.ts"
  import { nodeStore } from "@/store/nodeManage.ts"
  import systemLog from "@/pages/overView/systemLog";
   import { ElMessageBox , ElMessage} from "element-plus"

  const globalStoreData = globalStore()
  const nodeStoreData = nodeStore()

  const { activeSystemData, systemServiceIpData, activeTabHost } = storeToRefs(globalStoreData)


  onMounted( async () => {
    await start()
  })
  const start = ()=> {    // 初始
    globalStoreData.getSystemServiceBundle( {
      data: {
        SystemName:activeSystemData.value.Name
      }
    })
      globalStoreData.getIpServiceInstances( {
      data: {
        SystemName:activeSystemData.value.Name
      }
    })
    globalStoreData.getSystemServiceBundle( { // 获取当前系统下服务
      data: {
        SystemName: activeSystemData.value.Name
      }
    })
    if (activeTabHost.value === 0) {
      nodeStoreData.getHostNodeInfos()
      nodeStoreData.vesselNodeList = [{}]
    } else {
      nodeStoreData.getVesselNodeInfos()
      nodeStoreData.hostNodeList = [{}]
    }
  }
  const cupComputed = computed( () => {
    return ele => {
      return ele ?  ele.wsCpuRate ? ele.wsCpuRate + '%' :'0%'  : '0%'
    }
  })
  const memoryComputed = computed( () => {
    return ele => {
      return ele ?  ele.wsMemoryRate ? ele.wsMemoryRate + '%' :'0%'  : '0%'
    }
  })
  

  const rowCilckHandle = (item) => {  // table 行点击
    if (!item.children) {
      globalStoreData.nodeInfo = item
    } else {
      globalStoreData.nodeInfo = ''
    }
  }

  const stopHanle = (item) => { // 停止
    if (item.children) {
        ElMessageBox.confirm(
          '确认停止' + item.ByName + '?','提示',
              {
                  confirmBottonText:'确定',
                  cancelButtonText:'取消',
                  type:'warning'
              }
          ).then(() => {
            globalStoreData.servicesStop({
              data:{
                SystemName: activeSystemData.value.Name,
                SystemServiceBundleName:item.Name
              }
            })
          })   
    } else {
      ElMessageBox.confirm(
          '确认停止' + item.Ip + ':' + item.Port + ' ?','提示',
              {
                  confirmBottonText:'确定',
                  cancelButtonText:'取消',
                  type:'warning'
              }
          ).then(() => {
            globalStoreData.serviceStop({
              data:{
                SystemName: activeSystemData.value.Name,
                ServiceInstanceName:item.Name
              }
            })
          }) 
    }
  }
  const restartHanle = (item) => { // 重启
    if (item.children) {
        ElMessageBox.confirm(
          '确认重启' + item.ByName + '?','提示',
              {
                  confirmBottonText:'确定',
                  cancelButtonText:'取消',
                  type:'warning'
              }
          ).then(() => {
            globalStoreData.servicesRestart({
              data:{
                SystemName: activeSystemData.value.Name,
                SystemServiceBundleName:item.Name
              }
            })
          })   
    } else {
      ElMessageBox.confirm(
          '确认重启' + item.Ip + ':' + item.Port + ' ?','提示',
              {
                  confirmBottonText:'确定',
                  cancelButtonText:'取消',
                  type:'warning'
              }
          ).then(() => {
            globalStoreData.serviceRestart({
              data:{
                SystemName: activeSystemData.value.Name,
                ServiceInstanceName:item.Name
              }
            })
          }) 
    }
  }
  const destoryHanle = (item) => {// 销毁
    if (item.children) return
    ElMessageBox.confirm(
        '确认销毁' + item.Ip + ':' + item.Port + ' ?','提示',
            {
                confirmBottonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }
        ).then(() => {
          globalStoreData.serviceDestroy({
            data:{
              SystemName: activeSystemData.value.Name,
              ServiceInstanceName:item.Name
            }
          })
        }) 
  }
  const destoryAllHanle = (item) => {
    if (!item.children) return
      ElMessageBox.confirm(
        '确认销毁' + item.ByName + '?','提示',
            {
                confirmBottonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }
        ).then(() => {
            globalStoreData.servicesDestroy({
            data:{
              SystemName: activeSystemData.value.Name,
              SystemServiceBundleName:item.Name
            }
          })
        }) 
  }
  const deployAllHanle =(item) => {
    if (!item.children) return
      ElMessageBox.confirm(
        '确认部署' + item.ByName + '?','提示',
            {
                confirmBottonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }
        ).then(() => {
            globalStoreData.servicesDeploy({
            data:{
              SystemName: activeSystemData.value.Name,
              SystemServiceBundleName:item.Name
            }
          })
        }) 
  }
  watch( () => {
    
  })

</script>

<style lang="scss">
 @import '@/assets/styles/ued/over_view'

</style>