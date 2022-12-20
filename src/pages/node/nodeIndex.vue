<!--
 * @Description: 节点管理
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 13:49:48
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 16:05:02
 * @FilePath: \eom-project(mz-vue3)\src\pages\node\index.vue
 -->
<template>
  <div class="content-head">
    <span class=title @click="goBack(1)">
      <span class="space-lrspace">节点管理</span> 
      <span class="space-lrspace"> | </span>
       <i class="node_icon space-lrspace"></i>
    </span>
    <span class=title>
      <span class="space-lrspace">> </span> 
      <span class="space-lrspace"> 主机节点 </span> 
    </span>
  </div>
  <div class="content">
    <div class="node-manage">
      <nodeLfList></nodeLfList>
      <nodeRgInfo></nodeRgInfo>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue"
  // import { Search } from '@element-plus/icons-vue'
  import { manageStore } from "@/store/systemManage.ts"
  import { nodeStore } from "@/store/nodeManage.ts"
  import nodeLfList from "@/pages/node/nodeLfList";
  import nodeRgInfo from "@/pages/node/nodeRgInfo";



  const store = manageStore()
  const nodeStoreData = nodeStore()

  onMounted ( async () => {
     nodeStoreData.getHostInfos()
     nodeStoreData.getHostNodeInfos()
     nodeStoreData.getVesselNodeInfos()
  })
  // store

  const goBack = (index) => {
    store.firstPage = index
    store.secondPage = 0
  }

</script>

<style lang='scss' >
 @import '@/assets/styles/ued/node_system'
 

</style>