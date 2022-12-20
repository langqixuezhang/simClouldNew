<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-06 14:38:16
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-06 16:55:51
 * @FilePath: \sim-application-web(应用云)\src\pages\node\diglog\onlineDiglog.vue
 -->
<template>
      <el-dialog v-model="dialogVisible" title="节点上线" @close="dialogCancel" width="20%" custom-class="node-oline" append-to-body="true">
           <el-form >
            <el-form-item label="将节点设置为" >
                <el-radio-group v-model="nodeModel">
                    <el-radio label="主机节点"/> 
                    <el-radio label="容器节点"/> 
                </el-radio-group>
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
import { ref, defineProps, watch, defineEmits} from "vue";
import { nodeStore } from "@/store/nodeManage.ts"
const nodeStoreData = nodeStore()
  
// props
const props = defineProps ({
  openOnlineDiglog:Boolean,
  ipData: String
})
// 
const emit = defineEmits (['closeDialog'])
const dialogVisible = ref(false)

// 确认
const dialogPrimary = () => {
    if (nodeModel.value === '主机节点') { 
        nodeStoreData.onlineHostNode({
            data: {
                ip: props.ipData
            }
        }).then(() => {
            nodeStoreData.getHostInfos()
        })
    } else {
        nodeStoreData.onlineVesselNode({
            data: {
                ip:props.ipData
            }
        }).then(() => {
            nodeStoreData.getHostInfos()
        })
    }
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
}

const nodeModel = ref('主机节点')


watch ( () => props.openOnlineDiglog,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style  lang='scss' >
   
</style>