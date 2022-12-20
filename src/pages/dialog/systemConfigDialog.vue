<!--
 * @Description: 系统配置
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-17 14:45:45
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-17 15:15:25
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\systemConfigDialog.vue
 -->


<template>
      <el-dialog v-model="dialogVisible" title="系统配置" @close="dialogCancel" width="40%" custom-class="system-config">
        <el-form :model="form">
          <el-form-item >
              <div class="config-checkbox">
                <el-checkbox v-model="form.isCustom" label="使用自定义配置"></el-checkbox>
                <span class="fz-mid info">开启后，系统将应用自定义配置</span>
              </div>
          </el-form-item>
        </el-form>
         <p class="config-title">自定义配置详情</p>
        <div class="config-info"></div>
         <p class="fallback">
             <span class="text-default">恢复默认</span>
         </p>

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
// import { globalStore } from "@/store/globalManage.ts"
// const store = globalStore()

// props
const props = defineProps ({
  openSystemConfig:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)

// const isCustom = reactive(['使用自定义配置'])
const form = reactive ({
  isCustom: false
})
// 确认
const dialogPrimary = () => {
    console.log('确认', form.isCustom)
  dialogCancel()
}
// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
//   isCustom.value = '使用自定义配置'
}


watch ( () => props.openSystemConfig,  (newValue, oldValue) => {
    console.log('watch', newValue, oldValue)
  dialogVisible.value = newValue
})




</script>

<style lang='scss'  >
.system-config {
   .config-checkbox {
       .el-checkbox__label {
           font-size: 16px;
           margin-right: 10px;
       }
   }
   .el-form-item {
       margin-bottom: 10px;
   }

}

</style>
<style  lang='scss' scoped>
    .info {
        color: #999999;
    }
    .config-title {
        font-size: 16px;
        color: #333333;
         margin-bottom: 16px;
    }
    .config-info {
        width: 100%;
        height: 355px;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #e1e3e4;
    }
    .fallback {
        margin-top: 16px;
        overflow: hidden;
        span {
            float: right;
        }
    }
</style>