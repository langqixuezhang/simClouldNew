<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-06 16:56:36
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-06 18:38:37
 * @FilePath: \sim-application-web(应用云)\src\pages\node\diglog\applyDiglog.vue
 -->

<template>
      <el-dialog v-model="dialogVisible" title="申请虚拟机" @close="dialogCancel" width="510px" custom-class="apply-diglog" append-to-body="true">
         <el-form>
            <el-form-item label="操作系统">
               <el-select v-model="ststemModel"  placeholder="请选择系统">
                   <el-option v-for="item in systemHanleList" :key="item.value" 
                    :value="item.value" :label="item.label">
                    </el-option>
               </el-select> 
            </el-form-item> 
              <el-form-item label="节点规模">
               <el-select v-model="nodeModel"  placeholder="请选择节点">
                   <el-option v-for="item in nodeScaleList" :key="item.value" 
                    :value="item.value" :label="item.label">
                    </el-option>
               </el-select> 
            </el-form-item> 
         </el-form>
        <template #footer>
          <span class="dialog-footer"> 
            <el-botton class="btn-cancel" @click="dialogCancel">取消</el-botton>
            <el-botton class="btn-primary" type="primary" @click="dialogPrimary">确定</el-botton>
          </span>
        </template>
      </el-dialog>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits,  onMounted } from "vue";
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia";
import { nodeStore } from "@/store/nodeManage.ts"
const nodeStoreData = nodeStore()
const {  systemHanleList , nodeScaleList } = storeToRefs(nodeStoreData)
  
// props
const props = defineProps ({
  openApplyDiglog:Boolean
})

onMounted(() => {
     nodeStoreData.getNodeSystems()
     nodeStoreData.getNodeTypes()
})
// 
const emit = defineEmits (['closeDialog'])
const dialogVisible = ref(false)

const ststemModel = ref('')
const nodeModel = ref('')


// 确认
const dialogPrimary = () => {
    if ( !ststemModel.value || !nodeModel.value ) {
        ElMessage({
            message: `${ !ststemModel.value ? '请选择操作系统' :'请选择节点规模' }`,
            type:'warning'
        })
        return
    }
    nodeStoreData.createVirtualNodes({
        data:{
            ImageId:ststemModel.value,
            NodeType:nodeModel.value
        }
    })
    .catch( _ => {
        ElMessage({
            message: _,
            type:'error'
        })
    })
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
    dialogVisible.value = false
    ststemModel.value  = ''
    nodeModel.value  = ''
}



watch ( () => props.openApplyDiglog,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style  lang='scss' >
   .apply-diglog {
    .el-select {
        width: 350px;
    }
   }
</style>