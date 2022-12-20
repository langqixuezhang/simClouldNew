
<template>
    <el-form :model="form">
        <div class="config-row">
        <el-form-item label="服务名称"  >
            <el-input v-model="form.name" autocomplete="off"  placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="分组" >
            <el-input v-model="form.group" autocomplete="off" placeholder="请输入分组" />
        </el-form-item>
        </div>
        <el-form-item label="描述"  >
            <el-input v-model="form.describe" autocomplete="off"  placeholder="请输入"  type="textarea"  :rows='8' resize="none"/>
        </el-form-item>
        <el-form-item label="系统类型" >
        <el-radio-group v-model="form.resource">
            <el-radio label="TEXT"/> 
            <el-radio label="JSON"/> 
            <el-radio label="XML"/> 
            <el-radio label="HTML"/> 
            <el-radio label="Properties"/> 
        </el-radio-group>
        </el-form-item>

        <el-form-item label="配置内容" >
            <el-input v-model="form.info" autocomplete="off" type="textarea"  :rows='18' resize="none"/>
        </el-form-item>
    </el-form>
    <div class="footer"> 
        <span class="btn-primary" type="primary" @click="primary">发布</span>
        <span class="btn-cancel" @click="cancel">返回</span>
    </div>
</template>

<script setup>
    import {  reactive } from "vue";
    import { manageStore } from "@/store/systemManage.ts"
    const manageStoreData = manageStore()

    //
    const form = reactive ({
        name:'',
        group:'',
        describe:'', 
        resource:'TEXT',
        info:''
    })

    const primary = () => {
        manageStoreData.secondPage = -1
        manageStoreData.firstPage = 3
    }
    const cancel = () => {
        manageStoreData.firstPage = 3
        manageStoreData.secondPage = -1
    }

</script>

<style>

</style>