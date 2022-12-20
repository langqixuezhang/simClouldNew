<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-07 10:54:48
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 11:32:50
 * @FilePath: \sim-application-web(应用云)\src\pages\node\diglog\allotDiglog.vue
 -->

<template>
      <el-dialog v-model="dialogVisible" :title="`权限分配-` + `${props.ipData}`" @close="dialogCancel" width="400px" custom-class="allot-diglog" append-to-body="true">
        <div class="allot">
            <el-radio-group v-model="nodeModel">
                <el-radio label="待分配"/> 
                <el-radio label="公开可用"/> 
                <el-radio label="指定用户可用"/> 
            </el-radio-group>
            <p v-show="nodeModel === '待分配'">待分配节点仅管理员可用</p>
            <p v-show="nodeModel === '公开可用'">平台内全部用户和系统皆可以使用该节点</p>
            <el-select v-model="userModel"  placeholder="请选择用户" v-show="nodeModel === '指定用户可用'">
                <el-option v-for="item in userList" :key="item.value" 
                :value="item.value" :label="item.label">
                </el-option>
            </el-select> 
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
import { ref, defineProps, watch, defineEmits} from "vue";
import { nodeStore } from "@/store/nodeManage.ts"
import {  ElMessage } from "element-plus"
const nodeStoreData = nodeStore()
  
// props
const props = defineProps ({
  openAllotDiglog:Boolean,
  ipData: String
})
// 
const emit = defineEmits (['closeDialog'])
const dialogVisible = ref(false)

const nodeModel = ref('待分配')

const userModel = ref('')
const userList = []

// 确认
const dialogPrimary = () => {
    if (nodeModel.value === '指定用户可用' && !userModel.value) {
        ElMessage({
            message: '请选择指定用户',
            type:'warning'
        })
    return
  }
  nodeStoreData.AssignNodePermission({
      data:{
         ip: props.ipData,
         public: nodeModel.value === '待分配',
         userid: userModel.value
      }
  }).then({

  })
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
}



watch ( () => props.openAllotDiglog,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style  lang='scss' >
    .allot-diglog .allot{
        height: 70px;
        .el-radio-group {
            margin-bottom: 12px;
        }
    }
</style>