<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 16:36:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 15:42:54
 * @FilePath: \sim-application-web(应用云)\src\pages\manage\manageIndex.vue
 -->
<template>
  <div class="content-head">
    <span class=title @click="goBack(1)">
      <span class="space-lrspace">系统管理 </span> 
      <span class="space-lrspace"> | </span>
       <i class="manage_icon space-lrspace"></i>
    </span>
    <span class=title @click="goBack(2)" v-if="firstPage ===2">
      <span class="space-lrspace">> </span> 
      <span class="space-lrspace"> 系统维护 </span> 
    </span>
    <span class=title @click="goBack(3)" v-if="firstPage ===3 || secondPage">
      <span class="space-lrspace">> </span> 
      <span class="space-lrspace"> 配置管理 </span> 
    </span>
    <span class=title  v-if="secondPage === 1">
      <span class="space-lrspace">> </span> 
      <span class="space-lrspace"> 历史版本 </span> 
    </span>
    <span class=title  v-if="secondPage === 2">
      <span class="space-lrspace">> </span> 
      <span class="space-lrspace"> 添加配置 </span> 
    </span>
    <span class=title  v-if="secondPage === 3">
      <span class="space-lrspace">> </span> 
      <span class="space-lrspace"> 编辑配置 </span> 
    </span>
  </div>
  <div class="content">
    <!-- 系统管理 -->
    <div class="system-manage" v-if="firstPage === 3">
      <header class="content-hander">系统管理</header>
      <main>
        <systemManage></systemManage>
      </main>
    </div>
    <!-- 系统维护 - 静态（主机）-->
    <div class="system-perserve-host"  v-else-if="firstPage ===2 && !isHostPage">
      <header class="content-hander">
        <span>谋战联合作战推演系统（测试环境）</span>
          <span class="green-sm-btn">静态节点型</span>
        </header>
      <main>
         <manegePreserveHost></manegePreserveHost>
      </main>
    </div>
       <!-- 系统维护  - 容器，云-->
    <div class="system-perserve"  v-else-if="firstPage === 2 && isHostPage">
      <header class="content-hander">
        <span>{{activeSystemData.ByName}} </span>
          <span class="green-sm-btn">容器型</span>
        </header>
      <main>
         <manegePreserve></manegePreserve>
      </main>
    </div>
    <!-- 配置管理 -->
    <!-- <div class="config-manage" v-else-if="firstPage === 3"> -->
    <div class="config-manage"  v-else-if="firstPage === 1">
      <header class="content-hander">
        <span>配置管理</span>
      </header>
      <main>
         <configManage></configManage>
      </main>
    </div>
    <!-- 历史版本 -->
    <div class="history-version" v-if="secondPage === 1 ">
      <header class="content-hander">
        <span>历史版本</span>
      </header>
      <main>
         <historyVersion></historyVersion>
      </main>
    </div>
     <!-- 新增配置 -->
    <div class="new-config" v-if="secondPage === 2 ">
        <header class="content-hander">
          <span>添加配置</span>
        </header>
        <main>
          <newConfig></newConfig>
        </main>
      </div>
      <!-- 编辑配置 -->
      <div class="new-config" v-if="secondPage === 3 ">
        <header class="content-hander">
          <span>编辑配置</span>
        </header>
        <main>
          <editorConfig></editorConfig>
        </main>
      </div>
  </div>
</template>

<script setup>
  // import { ref } from "vue"
  // import { Search } from '@element-plus/icons-vue'
  import { storeToRefs } from "pinia";
  import { manageStore } from "@/store/systemManage.ts"
  import manegePreserve from '@/pages/manage/manegePreserve'
  import manegePreserveHost from '@/pages/manage/manegePreserveHost'
  import systemManage from '@/pages/manage/systemManage'
  import configManage from '@/pages/manage/configManage'
  import historyVersion from '@/pages/manage/historyVersion'
  import newConfig from '@/pages/manage/newConfig'
  import editorConfig from '@/pages/manage/editorConfig'
  import { globalStore } from "@/store/globalManage.ts"



  const store = manageStore()
  const globalStoreData = globalStore()

  // store
  const { firstPage,isHostPage,secondPage } = storeToRefs(store)
  const { activeSystemData } = storeToRefs(globalStoreData)
  console.log('所选系统', activeSystemData)

  const goBack = (index) => {
    store.firstPage = index
    store.secondPage = 0
  }

</script>

<style lang='scss' >
 @import '@/assets/styles/ued/system_manage'
 

</style>