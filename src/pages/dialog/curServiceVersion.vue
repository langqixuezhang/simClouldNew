
<template>
      <el-dialog v-model="dialogVisible" title="切换版本" @close="dialogCancel" width="36%" custom-class="cur-version" @open="openHandle()">
        <div >
            <p class="title">当前版本: {{ activeServiceData.Version }}</p>
            <el-input v-model="inputModel" class="" placeholder="请输入关键字搜索" :prefix-icon="Search" @input="inputChange"></el-input>
            <el-table :data="seachListData || serviceVersionList" style="width:100%" border="true" height="400px"
                highlight-current-row @current-change="tableCurrentChange">
                <el-table-column label="服务名称">
                    <template #default="scope">
                        <span><i></i> {{ scope.row.Name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="版本号" prop="Version" width="80px" >
                </el-table-column>
                <el-table-column label="系统" prop="info"  width="150px"></el-table-column>
                <el-table-column label="描述"  prop="Description">
                </el-table-column>
            </el-table>
        </div>

        <template #footer>
          <span class="dialog-footer"> 
            <el-botton class="btn-cancel" @click="dialogCancel">取消</el-botton>
            <el-botton class="btn-primary" type="primary" @click="dialogPrimary">确定</el-botton>
          </span>
        </template>
      </el-dialog>
</template>

<script setup>
import { ref, defineProps, watch , defineEmits } from "vue";
import { globalStore } from "@/store/globalManage.ts"
import { storeToRefs } from "pinia";
import { seachInput } from "@/utils/handle_data";
import { Search } from '@element-plus/icons-vue'
import {  ElMessage } from "element-plus"



const store = globalStore()
const { activeSystemData, activeServiceData, serviceVersionList } = storeToRefs(store)

// props
const props = defineProps ({
  openCutVersion:Boolean,
})

// onMounted ( async () => {
//     await store.getservicebundle({
//       data: {
//         SystemName: activeSystemData.value.Name,
//         ServiceBundleName: activeServiceData.value.Name
//       }
//     })
// })
const openHandle = () => {
   store.getservicebundle({
      data: {
        SystemName: activeSystemData.value.Name,
        Name: activeServiceData.value.Name
      }
    })
}
// 
const emit = defineEmits (['closeDialog'])
const dialogVisible = ref(false)
// table点击选中
const tableCurreentData = ref('') // table 选中数据
const tableCurrentChange = (item) => {
    tableCurreentData.value = item
} 
// input搜索
const inputModel = ref('')
const seachListData =  ref(null)
const inputChange = () => { 
  seachListData.value = seachInput( serviceVersionList.value, inputModel )
}


// 确认
const dialogPrimary = () => {
  if (!tableCurreentData.value) {
        ElMessage({
            message: '请选择所需添加的服务',
            type:'warning'
          })
  }
  store.addServiceBundle({
    data:{
      SystemName:activeSystemData.value.Name,
      Name: tableCurreentData.value.Name,
      Description:tableCurreentData.value.Description,
      Version:tableCurreentData.value.Version,
      PackageUrl:tableCurreentData.value.PackageUrl,
      RunParams:tableCurreentData.value.RunParams,
      StopParams:tableCurreentData.value.StopParams
    }
  }).then(()=> {
      store.getSystemServiceBundle( {
      data: {
        SystemName:activeSystemData.value.Name
      }
    })
  })

  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
}


watch ( () => props.openCutVersion,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style lang='scss'  >
.cur-version {
    .el-input {
        width: 300px;
        margin: 16px 0;
    }
}

</style>