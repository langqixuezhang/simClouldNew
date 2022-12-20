<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-29 14:58:28
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 13:49:23
 * @FilePath: \sim-application-web(应用云)\src\pages\node\nodeRgInfo.vue
 -->
<template>
  <div class="node-rg-info">
    <el-tabs v-model="activeName" calss="" @tab-click="tabHandleClick">
        <el-tab-pane label="静态节点" name="frist" >
           <tabHost></tabHost>
        </el-tab-pane>
        <el-tab-pane label="容器节点" name="second" >
          <tabContainer></tabContainer>
        </el-tab-pane>
    </el-tabs>
    <!-- <div v-else class="node-service-info">
      <span class="fz-xm" @click="gaBack()"><i></i>服务运行详情 - 192.168.70.101</span>
        <el-table :data="tableData" style="width:100%"  border="true" empty-text="暂无数据" height="750px">
              <el-table-column label="服务名称">
                  <template #default="scope">
                      <span><i></i> {{ scope.row.Name}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="数量" prop="num" width="100px">

              </el-table-column>
              <el-table-column label="运行状态" width="300px">
                  <template #default="scope">
                      <span><i></i> {{ scope.row.state}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="服务占用端口" prop="prot" width="300px">
              </el-table-column>
          </el-table>
    </div> -->
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import tabContainer from "@/pages/node/tabContainer";
  // import { storeToRefs } from "pinia";
  import tabHost from "@/pages/node/tabHost";
  import { nodeStore } from "@/store/nodeManage.ts"

  const nodeStoreData = nodeStore()

  // const { isServiceRunInfo } = storeToRefs(nodeStoreData)

  const activeName = ref('frist')
  const tabHandleClick = () => {
    nodeStoreData.isHostTab = activeName.value === 'second'
  }

  // 服务运行详情
  // const gaBack = () => {
  //   nodeStoreData.setServiceRunState(true)
  // }
  // // table数据
  // const tableData = [{
  //   Name:'服务1',
  //   num:'1',
  //   state:'正常',
  //   prot:'1001'
  // },{
  //   Name:'服务2',
  //   num:'1',
  //   state:'正常',
  //   prot:'1001'
  // },{
  //   Name:'服务3',
  //   num:'1',
  //   state:'正常',
  //   prot:'1001'
  // }]

</script>

<style>

</style>