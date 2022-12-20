
<template>
      <el-dialog v-model="dialogVisible" title="添加已有服务" @close="dialogCancel" width="36%" custom-class="system-config">
        <div class="add-alread">
          <el-input v-model="inputModel" class="" placeholder="请输入关键字搜索" :prefix-icon="Search" @input="inputChange"></el-input>
            <el-table :data="seachListData || serviceAlreadyList" style="width:100%" border="true" height="480px"
            highlight-current-row @current-change="tableCurrentChange">
                <el-table-column label="服务名称">
                    <template #default="scope">
                        <span><i></i> {{ scope.row.ByName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="版本号" prop="Version" width="80px" >
                </el-table-column>
                <el-table-column label="系统" prop="BaseSystem"  width="150px"></el-table-column>
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
import { ref,defineProps,watch , defineEmits, onMounted} from "vue";
import { globalStore } from "@/store/globalManage.ts"
import { storeToRefs } from "pinia";
import { seachInput } from "@/utils/handle_data";
import { Search } from '@element-plus/icons-vue'
import {  ElMessage} from "element-plus"

const store = globalStore()
const { activeSystemData, serviceAlreadyList } = storeToRefs(store)

// props
const props = defineProps ({
  openAlreadyService:Boolean
})

onMounted ( async () => {
    await store.getServicebundles({
      data: {
        SystemName: activeSystemData.value.Name
      }
    })
})
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
  seachListData.value = seachInput( serviceAlreadyList.value, inputModel )
}


// 确认
const dialogPrimary = () => {
  if (!tableCurreentData.value) {
        ElMessage({
            message: '请选择所需添加的服务',
            type:'warning'
          })
  }
  store.addSystemServiceBundle({
      data:{
        SystemName: activeSystemData.value.Name,
        ServiceBundleName: tableCurreentData.value.ServiceBundleName,
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


watch ( () => props.openAlreadyService,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style lang='scss'  >
.system-config {
    .el-input {
        margin-bottom: 16px;
    }
    .el-input__wrapper {
        border-radius: 16px;
    }
}

</style>