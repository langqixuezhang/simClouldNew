<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-09 16:57:13
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-12 10:10:57
 * @FilePath: \sim-application-web(应用云)\src\pages\dialog\historyLog.vue
 -->

<template>
    <el-dialog v-model="dialogVisible" title="历史日志" @close="dialogCancel" width="1300px" custom-class="history-log" @open="dialogOpenHandle">
        <div class="log-header">
                <span class="select-title">类型</span>
            <el-select v-model="typeModel"  placeholder="请选择系统" class="type-select">
                <el-option v-for="item in typeList" :key="item.value" 
                :value="item.value" :label="item.label">
                </el-option>
            </el-select>
            <el-select v-model="seviceModel"  placeholder="请选择服务" class="space-lfspace">
                <el-option v-for="item in serviceList" :key="item.ServiceBundleName" 
                :value="item.ServiceBundleName" :label="item.ByName">
                </el-option>
            </el-select>
        
            <el-date-picker v-model="timeModel" type="daterange" class="space-lfspace"
                start-placeholder="开始日期"  range-separator="至" end-placeholder="结束日期" />

            <span class="btn-default ">查询</span>

            <div  class="seach-input space-lfspace">
              <el-input v-model="inputModel" class="" placeholder="请输入关键字" :prefix-icon="Search" @input="inputChange"></el-input>
            </div>

            <span class="btn-download space-lfspace"><i></i>下载</span>
        </div>
        <!-- {{ systemLog.length }} -->
        <el-table :data="tableData" style="width:100%" height="500px">
            <template v-slot:empty>
              <!-- <img src="static/img/" alt /> -->
              暂无数据
            </template>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column label="时间">
                <template #default="scope">
                    <span><i></i> {{ scope.row.ByName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="信息" >
            </el-table-column>
        </el-table>
        <div>

        </div>
    </el-dialog>
</template>

<script setup>
import { ref,defineProps,watch ,reactive, defineEmits} from "vue";
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from "pinia";
import { globalStore } from "@/store/globalManage.ts"
const globalStoreData = globalStore()

const { serviceList , systemLog , activeSystemData } = storeToRefs(globalStoreData)

// props
const props = defineProps ({
  openHistoryLog:Boolean
})
// 
const emit = defineEmits (['closeDialog'])
// 
const dialogVisible = ref(false)

// 初始
const dialogOpenHandle = () => {
  globalStoreData.getSystemLog({
    data:{
      SystemName: activeSystemData.value.Name,
      ServiceInstanceName: '',
      Level:'',
      TimeStart: '', 
      TimeEnd:'',
      Message:''
    }
  })
}

const seviceModel  = ref('')
const typeModel = ref('全部')
const timeModel = ref('')
const typeList = reactive([
  {
    value:'全部',
    lable:'全部'
  }, {
    value:'致命',
    lable:'致命'
  }, {
    value:'错误',
    lable:'错误'
  }, {
    value:'警告',
    lable:'警告'
  }, {
    value:'跟踪',
    lable:'跟踪'
  }, {
    value:'调试',
    lable:'调试'
  }, {
    value:'信息',
    lable:'信息'
  }
])

// input 
const inputModel = ref('')
const inputChange = () => {   // chang回调

}

// 取消
const dialogCancel = () => {
  emit('closeDialog', false)
  dialogVisible.value = false
}


watch ( () => props.openHistoryLog,  (newValue) => {
  dialogVisible.value = newValue
})




</script>

<style  lang='scss'>
.history-log {
    .log-header {
        border-bottom: 1px solid #ebecec;
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        .space-lfspace {
            margin-left: 32px ;
            }
        .select-title {
            display: inline-block;
            font-size: 16px;
            line-height: 30px;
            color: #333333;
            margin-right: 15px;
        }
        .el-date-editor {
          
        }
        .type-select {
            .el-input {
                width: 120px;
            }
        }
       .el-date-editor  {
            flex-grow: 0;
            margin-right: 20px;
        }
        .search-btn {
            display: inline-block;
            cursor: pointer;
            color: #fff;
            line-height: 32px;
            padding: 0 11px;
            background-color: #1f88fe;
            border-radius: 3px;
            font-size: 16px;
            margin-left: 24px;
            &:hover {
                background-color: #0675f1;
            }
            .el-icon {
                vertical-align: middle;
            }
        }
    }
}
</style>