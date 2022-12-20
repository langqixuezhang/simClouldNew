<!--
 * @Description: 配置管理
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-14 15:27:23
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-18 10:49:17
 * @FilePath: \sim-application-web(应用云)\src\pages\manage\configManage.vue
 -->
<template>
  <div class="hander">
    <span>服务名称</span>
    <el-select v-model="nameModel" placeholder="请选择">
        <el-option  v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <span>分组</span>
    <el-select v-model="groupModel" placeholder="请选择" >
        <el-option  v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <span class="search-btn">
      <el-icon><Search/></el-icon> 搜索
    </span>
  </div>
    <el-table :data="tableData" style="width:100%" height="600px" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="服务名称">
            <template #default="scope">
                <span><i></i> {{ scope.row.name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="组" >
          
        </el-table-column>
        <el-table-column label="操作人" >
          
        </el-table-column>
        <el-table-column label="最后操作时间" >
          
        </el-table-column>
        <el-table-column label="操作" >
            <span class="text-default" >详情</span>
             <span class="text-default" >回滚</span>
        </el-table-column>
    </el-table>
  
</template>

<script setup>
    import { ref } from "vue";
    import { Search } from '@element-plus/icons-vue'

    //

    // input
    const nameModel = ref('')
    const groupModel = ref('')

    const selectList=[{
        value:'1',
        label:'11'
    },{
        value:'2',
        label:'22'
    }]

     // table
    const tableData = []
</script>

<style>

</style>