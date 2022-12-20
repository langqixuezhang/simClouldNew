<!--
 * @Description: 配置管理
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-17 16:05:19
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 15:29:00
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\serviceConfigManage.vue
 -->


<template>
      <el-dialog v-model="dialogVisible" title="配置管理" @close="dialogCancel" width="40%" custom-class="ser-config-manage" @open="openHandle()">
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
import { globalStore } from "@/store/globalManage.ts"
import { storeToRefs } from "pinia";

const store = globalStore()
const { activeSystemData, activeServiceData  } = storeToRefs(store)
// props
const props = defineProps ({
  openServiceManage:Boolean
})

const openHandle = () => {
  console.log('activeServiceData', activeServiceData)
  store.getInstanceConfigInfo({
    data: {
      SystemName: activeSystemData.value.Name,
      ServiceInstanceName: activeServiceData.value.Name
    }
  })
}

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


watch ( () => props.openServiceManage,  (newValue) => {
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