<!--
 * @Description: 服务编辑
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-21 16:38:16
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-12 16:10:22
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\serviceEditor.vue
 -->

<template>
      <el-dialog v-model="dialogVisible" title="编辑系统" @close="dialogCancel" width="30%" custom-class="system-editor">
        <el-form :model="form">
         <el-form-item label="系统名称" :label-width="formLabelWidth" >
            <el-input v-model="form.ByName" autocomplete="off"  placeholder="如：应用云" />
          </el-form-item>
          <el-form-item label="系统标识" :label-width="formLabelWidth" >
            <el-input v-model="form.Name" autocomplete="off"  :disabled="true" />
          </el-form-item>
          <el-form-item label="系统描述" :label-width="formLabelWidth" >
            <el-input v-model="form.describe" autocomplete="off" type="textarea" placeholder="请输入系统描述" :rows='3' resize="none"/>
          </el-form-item>
          <el-form-item label="系统URL" :label-width="formLabelWidth">
            <el-input v-model="form.url" autocomplete="off"  placeholder="http://..." @change="urlChange(form.url)"/>
          </el-form-item>
            <el-form-item label="系统类型" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="静态节点型"/> 
              <el-radio label="动态虚拟机型"/> 
              <el-radio label="容器型"/> 
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
import { ref, defineProps, watch ,reactive, defineEmits, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { globalStore } from "@/store/globalManage.ts"
import {  ElMessage} from "element-plus"

const globalStoreData = globalStore()
const { activeSystemData } = storeToRefs(globalStoreData)

// props
const props = defineProps ({
  openServiceEditor:Boolean
})
onMounted (() => {
   form.Name = activeSystemData.value.Name
   form.describe = activeSystemData.value.Description
   form.url = activeSystemData.value.Url
   form.ByName= activeSystemData.value.ByName
   form.resource = activeSystemData.value.Type === 1 ? '容器型' : activeSystemData.value.Type === 0 ? '静态节点类型' : '动态节点类型'
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)


const form = reactive ({ // form 数据
  Name:'',
  ByName:'',
  describe:'',
  url:'', 
  resource:'容器型'
})
 const urlChange = (e) => { // 表单验证
   if ( !(/^((https|http)?:\/\/)[^\s]+/.test(e)) ) {
        ElMessage({
            message: '请输入正确或完整的URL',
            type:'warning'
        })
        form.url = ''
   } 
 }
// 确认
const dialogPrimary = () => {
 if (!form.Name || !form.ByName || !form.describe ) {
    ElMessage({
      message: `${ !form.name ? '请输入系统名称' : !form.byname   ? '请输入系统别名' :  '请输入系统描述'  }`,
      type:'warning'
    })
    return
  }
  globalStoreData.putSystem({
    data:{
      Name:activeSystemData.value.Name,
      NewSystemName:form.Name,
      Description:form.describe,
      ByName: form.ByName,
      Url: form.url,
      Type: form.resource === '容器型' ? 1 : form.resource === '静态节点型' ? 0 : 2,
    }
  }).then(() => {
    ElMessage({
      message: '编辑成功',
      type:'success'
    })
    globalStoreData.getSystem({
     data:{
        Name:form.Name
     }
    })
  })
  .catch(_ => {
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
}


watch ( () => props.openServiceEditor,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style lang='scss' >
   
</style>