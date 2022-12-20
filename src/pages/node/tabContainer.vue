<!--
 * @Description: tab-容器节点
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-01 09:28:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 17:16:26
 * @FilePath: \sim-application-web(应用云)\src\pages\node\tabContainer.vue
 -->
<template>
    <div class="header">
        <div class="fz-mid">已上线节点: <span class="num">{{ vesselNodeList.length }}</span></div>
        <div>
            <el-input v-model="inputModel" class="" placeholder="请输入搜索IP" :prefix-icon="Search" @input="inputChange"></el-input>
            <!-- <span class="node-sort-group"><i></i><i></i></span> -->
        </div>
    </div>
    <div class="card-list contant-scroll">
        <div>
            <nodeCardChild v-for="item in seachListData || vesselNodeList" :key="item.IP" :nodeCardData="item"></nodeCardChild>
        </div>
    </div>
</template>

<script setup>
  import { ref } from "vue"
  import { Search } from '@element-plus/icons-vue'
  import { storeToRefs } from "pinia";
  import nodeCardChild from "@/pages/node/nodeCardChild";
  import { nodeStore } from "@/store/nodeManage.ts"
  import { seachInputIp } from "@/utils/handle_data";


  const nodeStoreData = nodeStore()
  const { vesselNodeList } = storeToRefs(nodeStoreData)

  const seachListData =  ref(null)
  const inputModel = ref('')
  const inputChange = () => { // 搜索
    seachListData.value = seachInputIp( vesselNodeList.value, inputModel )
 
  }
</script>

<style>

</style>