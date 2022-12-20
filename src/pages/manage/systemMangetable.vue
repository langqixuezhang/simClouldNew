<!--
 * @Description: 系统管理table组件
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-18 14:01:10
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 10:27:30
 * @FilePath: \sim-application-web(应用云)\src\pages\manage\systemMangetable.vue
 -->
<template>
    <el-table :data="seachListData || _tableData.value" style="width:100%" @cell-dblclick="tabeDbclick"  empty-text="暂无数据" height="544px"
        highlight-current-row @current-change="tableCurrentChange" :default-sort="{prop:'ByName',order:'ascending'}">
        <el-table-column label="系统名称" sortable prop="ByName">
            <template #default="scope">
                <span class="ellipsis">{{ scope.row.ByName}}</span>
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
                <span class="text-default" @click="systemHanle(scope.row, 1)">一键运行 </span>
                <span class="text-default" @click="deployHandle(scope.row)">一键部署 </span>
                <span class="text-default" @click="clickHandle(scope.row,2)">系统维护 </span>
                <span class="text-default" @click="clickHandle(scope.row,3)">配置管理 </span>
                <span class="text-default" @click="containHandle(scope.row)">系统监控 </span>
                <span class="text-default" @click="deleteHandle(scope.row)">删除系统 </span>
                <span  @click="systemHanle(scope.row, 4)" class="green-sm-btn">下线</span>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page.sync="currentPage" :page-size="12" :small="small"
        layout="total, prev, pager, next, jumper"
        :total="_total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
</template>


<script setup>
import { ref, defineProps, watch , defineEmits, reactive } from "vue";
import { seachInput } from "@/utils/handle_data";
import { globalStore } from "@/store/globalManage.ts"
const globalStoreData = globalStore()

const props = defineProps ({
  tableData:Array,
  inputModel:String,
})

const emit = defineEmits (['closeDialog'])

const tabeDbclick =  (item) => {     // table 双击-维护
    emit('tabeDbclick', item)
}

const systemHanle = (item, index) => {
    emit('systemHanle', item,index)
    globalStoreData.setSyatemData(item)

}
const deployHandle = (item, index) => {
    emit('deployHandle', item,index)
    globalStoreData.setSyatemData(item)

}
const clickHandle = (item, index) => {
    emit('clickHandle',index)
    globalStoreData.setSyatemData(item)
}

const containHandle = (item) => {
    emit('containHandle')
    globalStoreData.setSyatemData(item)
}
const deleteHandle = (item) => {
    emit('deleteHandle', item)
}
const tableCurrentChange = (item) => {
    globalStoreData.setSyatemData(item)
}
const _total = ref(0)

// input查询
const seachListData =  ref(null)
const seachName = ref('')
watch ( 
    () => props.inputModel,  (newValue) => {
        let arr = []
        arr = props.tableData
        seachName.value = newValue
        seachListData.value = seachInput( arr,  seachName )
        _total.value = seachListData.value.length
        if (!newValue) seachListData.value = null ,_total.value = props.tableData.length
    },{deep:true}
)

const _tableData  = reactive([])

watch(() => props.tableData, (newValue) => {
     console.log('ceeecec',newValue )
    _tableData.value = newValue
    _total.value = newValue.length
    handleCurrentChange(1)
},{deep:true})
    // 分页
const currentPage =ref(1)
const small = ref(false)
const handleCurrentChange =(val) => {
    let startNum = (val - 1) * 12
    let endNum = val * 12
   _tableData.value = props.tableData.slice(startNum, endNum)
}
const handleSizeChange = () => {
}
</script>

<style>

</style>