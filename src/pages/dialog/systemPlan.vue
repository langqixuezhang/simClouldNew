<!--
 * @Description: 系统资源规划
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-17 10:56:13
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-05 17:53:40
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\systemPlan.vue
 -->

<template>
      <el-dialog v-model="dialogVisible" title="系统资源规划" @close="dialogCancel" width="20%" custom-class="system-plan">
        <el-form :model="form">
          <el-form-item label="资源规划" class="from-title-border">
          </el-form-item>
          <el-form-item label="CPU" :label-width="formLabelWidth" >
            <el-input  v-model="form.cpu" type="number" :min="0"/>
            <span class="from-item-tail">核</span>
          </el-form-item>
          <el-form-item label="内存" :label-width="formLabelWidth"  >
            <el-input  v-model="form.memory" type="number"  :min="0"/>
            <span class="from-item-tail">G</span>
          </el-form-item>
         <el-form-item label="GPU" :label-width="formLabelWidth" >
            <el-input  v-model="form.gpu" type="number" :min="0"/>
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
import { ref,defineProps,watch ,reactive, defineEmits} from "vue";
import {  ElMessage } from "element-plus"
import { storeToRefs } from "pinia";
import { globalStore } from "@/store/globalManage.ts"

const store = globalStore()
const { activeSystemData } = storeToRefs(store)
// props
const props = defineProps ({
  openSystemPlan:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive ({
  cpu: 0,
  memory:0,
  gpu:0, 
})
// 确认
const dialogPrimary = () => {
   if (!form.cpu || !form.memory || !form.gpu) {
    ElMessage({
      message: `${!form.cpu ? 'CPU不能为空' : !form.memory   ? '内存不能为空' : 'GPU不能为空'}`,
      type:'warning'
    })
    return
  }
  store.addSystemreSourcePlan({
    data:{
      SystemName: activeSystemData.value.Name,
      Cpu:form.cpu,
      Memory: form.memory,
      Gpu: form.gpu,

    }
  }).then(()=> {
     store.getSystems()
  })
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
  form.cpu = ''
  form.memory = ''
  form.gpu = ''
}


watch ( () => props.openSystemPlan,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style lang='scss' >
   
</style>