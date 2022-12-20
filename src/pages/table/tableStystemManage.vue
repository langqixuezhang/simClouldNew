<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-15 15:04:40
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 17:25:44
 * @FilePath: \sim-application-web(应用云)\src\pages\table\tableStystemManage.vue
 -->
<template>
    <el-table :data="vesselList" style="width:100%" @cell-dblclick="tabeDbclick" border="true" empty-text="暂无数据">
            <el-table-column label="服务名称">
                <template #default="scope">
                    <span><i></i> {{ scope.row.Name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="Description">

            </el-table-column>
            <el-table-column label="创建者" prop="info"></el-table-column>
            <el-table-column label="运行状态">
                <template #default="scope">
                    <span><i></i> {{ scope.row.state}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="600px" >
                <template #default="scope">
                    <span @click="systemHanle(scope.row, 1)">一键运行 |</span>
                    <span @click="deployHandle(scope.row)">一键部署 |</span>
                    <span @click="clickHandle(2)">系统维护 |</span>
                    <span @click="clickHandle(3)">配置管理 |</span>
                    <span>系统监控 |</span>
                    <span @click="deleteHandle(scope.row)">删除系统 |</span>
                    <span @click="systemHanle(scope.row, 4)" class="green-sm-btn">下线</span>
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
export default {

}
</script>

<style>

</style>