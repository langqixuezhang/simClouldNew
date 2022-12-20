<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-07 13:49:55
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 13:57:34
 * @FilePath: \sim-application-web(应用云)\src\pages\node\diglog\serviceInfoDiglog.vue
 -->

<template>
      <el-dialog v-model="dialogVisible" title="服务运行详情" @close="dialogCancel" width="762px" custom-class="service-info-diglog" append-to-body="true">
        <el-table :data="tableData" style="width:100%" empty-text="暂无数据" height="440px">
              <el-table-column label="服务名称">
                  <template #default="scope">
                      <span><i></i> {{ scope.row.Name}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="数量" prop="num" width="100px">

              </el-table-column>
              <el-table-column label="运行状态" width="150px">
                  <template #default="scope">
                      <span><i></i> {{ scope.row.state}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="服务占用端口" prop="prot" width="150px">
              </el-table-column>
          </el-table>
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
  openServiceInfoDiglog:Boolean,
  ipData: String
})
// 
const emit = defineEmits (['closeDialog'])
const dialogVisible = ref(false)

  // table数据
  const tableData = []
// 确认
const dialogPrimary = () => {
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
}


watch ( () => props.openServiceInfoDiglog,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style  lang='scss' >
   
</style>