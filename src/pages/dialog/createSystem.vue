<!--
 * @Description: 创建新系统
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-14 17:46:24
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-12 16:10:14
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\createSystem.vue
 -->
<template>
      <el-dialog v-model="dialogVisible" title="创建新系统" @close="dialogCancel" width="30%" >
        <el-form :model="form" :rules="rules" ref="ruleFromRef">
          <el-form-item label="系统名称" :label-width="formLabelWidth" >
            <el-input v-model="form.byname" autocomplete="off"  placeholder="如：应用云" />
          </el-form-item>
          <el-form-item label="系统标识" :label-width="formLabelWidth" >
            <el-input v-model="form.name" autocomplete="off"  placeholder="如：XSimCloud" oninput="value = value.replace(/[^a-z0-9_]/g, '')" />
          </el-form-item>
          <el-form-item label="系统描述" :label-width="formLabelWidth" >
            <el-input v-model="form.describe" autocomplete="off" placeholder="请输入系统描述" :rows='3' resize="none"/>
          </el-form-item>

          <el-form-item label="系统URL" :label-width="formLabelWidth">
            <el-input v-model="form.url" autocomplete="off"  placeholder="http://..." @change="urlChange(form.url)" />
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
            <el-botton class="btn-primary" type="primary" @click="dialogPrimary(ruleFromRef)">确定</el-botton>

          </span>
        </template>
      </el-dialog>
</template>

<script setup >
import { ref,defineProps,watch ,reactive, defineEmits} from "vue";
import {  ElMessage } from "element-plus"
import { globalStore } from "@/store/globalManage.ts"
const store = globalStore()

// props
const props = defineProps ({
  openNewSystem:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive ({
  name:'',
  describe:'',
  url:'', 
  byname:'',
  resource:'容器型'
})
 // 表单验证
 const ruleFromRef = ref(null)
 const rules = reactive({
  name:[
     { required: true, message:"请输入活动名称", trigger:'blur' }
     ],
  describe:[
     { required: true, message:"请输入活动名称", trigger:'blur' }
     ],
  url:[
     { required: true, message:"请输入活动名称", trigger:'blur' }
     ],
 }) 
 const urlChange = (e) => {
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
  if (!form.name || !form.byname ||  !form.describe ) {
    ElMessage({
      message: `${ !form.name ? '请输入系统名称' :   !form.byname   ? '请输入系统别名' : '请输入系统描述'  }`,
      type:'warning'
    })
    return
  }
  
  store.addSystem({
    data:{
      Name:form.name,
      Description:form.describe,
      ByName: form.byname,
      Url: form.url,
      Type: form.resource === '容器型' ? 1 : form.resource === '静态节点型' ? 0 : 2,

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
  form.name = ''
  form.describe = ''
  form.url = ''
  form.byname = ''
  form.resource = '容器型'
}

watch ( () => props.openNewSystem,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style>

</style>