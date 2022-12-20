<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-11 14:20:20
 * @LastEditors: duhuan
 * @LastEditTime: 2022-12-09 14:40:29
 * @FilePath: \sim-application-web(应用云)\src\pages\overView\systemMonitor\monitorRg.vue
 -->

<template>
  <span class="fz-xxm ">节点详情</span>
  <div class="ip">
    <p><i></i><span>{{ nodeInfo.Ip ? nodeInfo.Ip :  '---' }}</span></p>
  </div>
  <div class="ip-chart">
      <div class="chart-memory" :class="cpuClass(ipData.wsMemoryRate)">
        <p  class="memory-icon">
           <i ></i> <span>内存:</span><span class="text-nomal">{{ ipData.wsMemoryRate ? ipData.wsMemoryRate : 0 }}%</span>
        </p>
        <el-progress :percentage="ipData.wsMemoryRate" :stroke-width="18" :show-text="false" :color="memoryColor(ipData.wsMemoryRate)"></el-progress>
      </div>
      <div class="chart-cpu" :class="memoryClass(ipData.wsCpuRate)">
         <p class="cpu-icon">
           <i ></i> <span>CPU:</span><span class="text-nomal"> {{ ipData.wsCpuRate ? ipData.wsCpuRate : 0 }}%</span>
        </p>
        <el-progress :percentage="ipData ? ipData.wsCpuRate : 0" :stroke-width="18" :show-text="false" :color="cpuColor(ipData.wsCpuRate)"></el-progress>
      </div>
  </div>
  <div class="node-info card-info">
    <div class="card-info-system">
        <div>
            <p class="title-text">内存</p>
            <p>{{ ipData ? Math.ceil( ipData.Memory/1024 ) + 'G' : '---'}}</p>
        </div>
        <div>
            <p class="title-text">操作系统</p>
            <p>{{ ipData ? ipData.OperatingSystem : '---'  }}</p>
        </div>
      </div>
      <div class="card-info-proce">
          <p class="title-text">处理器（{{ ipData.CpuCoreNum }}核）</p>
          <p>{{  ipData ? ipData.CpuInfo : '---' }}</p>
      </div>
  </div>
</template>

<script setup >
  import { computed } from "vue"
  import { storeToRefs } from "pinia";
  import { globalStore } from "@/store/globalManage.ts"

  const globalStoreData = globalStore()

  const { nodeInfo } = storeToRefs(globalStoreData)

const ipData = computed ( () => {
  return nodeInfo.value.inInfo ? nodeInfo.value.inInfo : ''
}) 
// 0≤正常＜75；75≤一般＜90；过高≥90
// 0≤正常＜60；60≤一般＜90；过高≥90

const cpuColor = computed( () => {
    return ele =>{
        return   ele ? ele < 76 ? '#0675f1' :  ele > 89 ?  '#ea5151' : '#f99d22'   : '#0675f1'
    }
})

const memoryColor = computed( () => {
    return ele =>{
        return   ele ? ele < 61 ? '#0675f1' :  ele > 89 ?  '#ea5151' : '#f99d22' : '#0675f1'
    }
})


const cpuClass = computed ( () => {
       return ele =>{
        return   ele ? ele < 76 ? 'progress-nolmal' :  ele > 89 ?  'progress-waring' : 'progress-general' : 'progress-nolmal'
    }
})
const  memoryClass = computed ( () => {
       return ele =>{
        return   ele ? ele < 61 ? 'progress-nolmal' :  ele > 89 ?  'progress-waring' : 'progress-general' : 'progress-nolmal'
    }
})

</script>

<style>

</style>