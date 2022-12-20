<!--
 * @Description: 配置管理
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-14 15:27:23
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 15:52:42
 * @FilePath: \sim-application-web(应用云)\src\pages\manage\configManage.vue
 -->
<template>
    <div>
        <div class="hander">
            <span class="btn-default" @click="addConfigHandle"><i></i>添加配置</span>
            <span class="btn-default" @click="historyClick"><i></i>历史版本</span>
            <span class="btn-default"><i></i>克隆</span>
            <span class="btn-default"><i></i>导入</span>  
            <span class="btn-default"><i></i>导出</span>
            <el-input v-model="inputModel" class="" placeholder="请输入搜索内容..." :prefix-icon="Search" @change="inputChange"></el-input>
        </div>
        <el-table :data="tableData" style="width:100%">
            <el-table-column type="index" width="150" label="序号"> </el-table-column>
            <el-table-column label="服务配置名称">
                <template #default="scope">
                    <span><i></i> {{ scope.row.ByName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center" >
            <template #default="scope">
                <span  class="text-default" @click="editorHandle(scope.row)">编辑</span>
                <span class="text-warn" @click="deleteHanle(scope.row)">删除</span>
            </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { Search } from '@element-plus/icons-vue'
    import { manageStore } from "@/store/systemManage.ts"
    import { ElMessageBox } from "element-plus"
    import { storeToRefs } from "pinia";
    import { globalStore } from "@/store/globalManage.ts"

    const globalStoreData = globalStore()
    const store = manageStore()
    const { activeSystemData } = storeToRefs(globalStoreData)

    //
    onMounted(() => {
        globalStoreData.getConfigs({
            data:{
                SystemName: activeSystemData.value.Name
            }
        })
    })
    // input
    const inputModel = ref('')
    const inputChange = () => {

    }
    // 按钮操作
    const historyClick = () => {
        console.log('-历史版本')
        store.isHistory = true
        store.firstPage = -1
        store.secondPage = 1
    }
    const editorHandle = () => {
        store.firstPage = -1
        store.secondPage = 3
    }
    // 添加配置
    const addConfigHandle = () => {
        store.firstPage = -1
        store.secondPage = 2
    }

     // table
    const tableData = [{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    }]
    const deleteHanle = (item) => {
        ElMessageBox.confirm(
            '确认移除' + item.Name + '?',
                {
                    confirmBottonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }
            ).then(() => {
                // globalStoreData.deleteSystem({
                //     data:{
                //         Name:item.Name
                //     }
                // }).then(() => {
                //     start()
                // })
        })
    }

</script>

<style>

</style>