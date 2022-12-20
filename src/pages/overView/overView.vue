<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 13:51:46
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-12 17:23:12
 * @FilePath: \eom-project(mz-vue3)\src\pages\overView\index.vue
 -->
<template>
  <div class="content-head">
    <span class=space-lrspace  @click="goBack()">
      <span class="space-lrspace">系统总览</span> 
      <span class="space-lrspace"> | </span>
      <i class="view_icon space-lrspace"></i>
    </span>
    <span class=title v-if="isSystemMonitor">
      <span class="space-lrspace">> </span>
      <span class="space-lrspace">系统监控</span> 
    </span>
  </div>
  <div class="content">
    <div class="view-content" v-if="!isSystemMonitor">
      <viewHome></viewHome>
    </div>
    <div class="view-content-monitor" v-else>
      <systemMonitor></systemMonitor>
    </div>
  </div>
  

</template>

<script setup>
    import {  onMounted, } from "vue"
    import { storeToRefs } from "pinia";
    import { homeStore } from "@/store/overView.ts"
    import systemMonitor from '@/pages/overView/systemMonitor/homeIndex'
    import viewHome from '@/pages/overView/viewHome/viewHome'
    const store = homeStore()


    // console.log('num3', num3)
    
  

    // 
    onMounted( async () => {
      // await store.getSystemList()
    })
    // computed

    // ------------------------------------
    // store
    const { isSystemMonitor } = storeToRefs(store)

    // title 回退
    const goBack  = () => {
      store.isSystemMonitor = false
    }
    // select
</script>

<style lang='scss'>
 @import '@/assets/styles/ued/over_view'
</style>