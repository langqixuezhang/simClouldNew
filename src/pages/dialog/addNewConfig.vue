<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-18 09:26:55
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-18 09:37:47
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\addNewConfig.vue
 -->
<template>
      <el-dialog v-model="dialogVisible" title="添加配置" @close="dialogCancel" width="40%" custom-class="ser-config-manage">
          <div class="contant">
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
import { ref,defineProps,watch , defineEmits} from "vue";

// props
const props = defineProps ({
  openAddConfig:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)


// 确认
const dialogPrimary = () => {
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
//   isCustom.value = '使用自定义配置'
}


watch ( () => props.openAddConfig,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style  lang='scss' scoped>
    .ser-config-manage {
        .contant {
            height: 500px;
        }
    }
</style>