<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-09 14:37:42
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-09 17:06:41
 * @FilePath: \sim-application-web(应用云)\src\pages\overView\systemLog.vue
 -->

<template>
  <div class="title">
    <span class="fz-xxm ">系统日志</span>
  </div>
  <div class="log-handle">
      <div>
        <span class="select-title">服务</span>
        <el-select v-model="seviceModel"  placeholder="请选择系统">
            <el-option v-for="item in serviceList" :key="item.ServiceBundleName" 
            :value="item.ServiceBundleName" :label="item.ByName">
            </el-option>
        </el-select>
        <span class="select-title space-lfspace">类型</span>
        <el-select v-model="typeModel"  placeholder="请选择系统">
            <el-option v-for="item in typeList" :key="item.value" 
            :value="item.value" :label="item.label">
            </el-option>
        </el-select>
        <span class="select-title space-lfspace">时间范围</span>
        <el-date-picker v-model="timeModel" 
        start-placeholder="开始日期"  range-separator="至" end-placeholder="结束日期" />
        <!-- <span class="search-btn">
          <el-icon><Search/></el-icon> 立即搜索
        </span> -->
        </div>
        <div  class="seach-input">
          <el-input v-model="inputModel" class="" placeholder="请输入关键字" :prefix-icon="Search" @input="inputChange"></el-input>
        </div>
  </div>
  <div class="log-main">
    <div class="contant"></div>
    <div class="log-main-foot fz-mid">
      <span class="" @click="logHandle()"><i></i>历史日志</span>
      <span class=""><i></i>下载</span>
    </div>
  </div>
  <historyLog :openHistoryLog = 'openHistoryLog' @closeDialog='closeDialog'></historyLog>

</template>

<script setup >
  import { ref, onMounted, reactive } from "vue";
  import { Search } from '@element-plus/icons-vue'
  import { storeToRefs } from "pinia";
  import { globalStore } from "@/store/globalManage.ts"
  import historyLog from "@/pages/dialog/historyLog";

  const globalStoreData = globalStore()

  const { serviceList } = storeToRefs(globalStoreData)


onMounted(() => {
  console.log('测测是', serviceList)
})

const seviceModel  = ref('')
const typeModel = ref('全部')
const timeModel = ref('')
const typeList = reactive([
  {
    value:'全部',
    lable:'全部'
  }, {
    value:'致命',
    lable:'致命'
  }, {
    value:'错误',
    lable:'错误'
  }, {
    value:'警告',
    lable:'警告'
  }, {
    value:'跟踪',
    lable:'跟踪'
  }, {
    value:'调试',
    lable:'调试'
  }, {
    value:'信息',
    lable:'信息'
  }
])
const inputModel = ref('')
const inputChange = () => {
  
}


const openHistoryLog = ref(false)
const logHandle = () => {
  openHistoryLog.value = true
}
const closeDialog = () => {
  openHistoryLog.value = false
}

</script>

<style  lang="scss">

</style>