<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 16:36:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 15:29:44
 * @FilePath: \sim-application-web(应用云)\src\pages\manage\manageIndex.vue
 -->
<template>
    <div class="info">
      <p>
        <span class="btn-role fz-mid btn-default" @click="roleHandle()"><i></i>角色管理</span>
        <span class="btn-editor fz-mid  btn-default" @click="editorHandle()"><i></i>编辑</span>
      </p>
      <div class="title-info fz-mid">
            {{activeSystemData.Description}}
      </div>
    </div>
  <div class="preserve-content">
      <div class="preserve-conditions">
          <el-input v-model="inputModel" class="" placeholder="请输入关键字搜索" :prefix-icon="Search" @input="inputChange"></el-input>
          <dir class="con-left">
            <el-dropdown trigger="click">
              <el-button type="primary">添加服务<el-icon class="el-icon-right"><arrow-down/> </el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item  @click="addNewService()">添加新服务</el-dropdown-item>
                  <el-dropdown-item @click="addHasService()">添加已有服务</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span class="btn-default btn-resource" @click="planSysHandle()"><i></i>系统资源规划</span>
            <span class="btn-default btn-config" @click="configSysHandle()"><i></i>系统配置</span>
          </dir>
      </div>
      <el-table :data="seachListData || serviceList" style="width:100%" border="true" height="530px">
          <el-table-column type="index" width="50"> </el-table-column>
          
        <el-table-column label="服务名称">
            <template #default="scope">
                <span><i></i> {{ scope.row.ByName}}</span>
            </template>
        </el-table-column>
        <el-table-column label="服务版本" prop="Version" width="200px">
            <template #default="scope">
           <span class="text-default" @click="cutVersionHandle(scope.row)">
            {{ scope.row.Version}}
           </span>
          </template>
        </el-table-column>
        <el-table-column label="实例数量" prop="InstanceNum" width="200px">
         
        </el-table-column>
        <el-table-column label="操作" width="300px" >
           <template #default="scope">
            <span class="text-default" @click="planSerHandle(scope.row)">规划实例  </span>
            <span class="text-default " @click="conSerHandle(scope.row)">配置管理 </span>
            <span class="text-warn " @click="deleteSevice(scope.row)">移除</span>
           </template>
        </el-table-column>
      </el-table>
  </div>
  <roleManage :openRoleManage = 'openRoleManage' @closeDialog='closeDialog'></roleManage>
  <serviceEditor :openServiceEditor = 'openServiceEditor' @closeDialog='closeDialog'></serviceEditor>

  <createService :openNewService = 'openNewService' @closeDialog='closeDialog'></createService>
  <systemPlan :openSystemPlan = 'openSystemPlan' @closeDialog='closeDialog'></systemPlan>
  <servicePlan :openServicePlan = 'openServicePlan' @closeDialog='closeDialog'></servicePlan>
  <systemConfigDialog :openSystemConfig = 'openSystemConfig' @closeDialog='closeDialog'></systemConfigDialog>
  <addAlreadyService :openAlreadyService = 'openAlreadyService' @closeDialog='closeDialog'></addAlreadyService>
  <serviceConfigManage :openServiceManage = 'openServiceManage' @closeDialog='closeDialog'></serviceConfigManage>
  <curServiceVersion :openCutVersion = 'openCutVersion'  @closeDialog='closeDialog'></curServiceVersion>
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import { globalStore } from "@/store/globalManage.ts" 
    import { storeToRefs } from "pinia";
    import createService from "@/pages/dialog/createService";
    import systemPlan from "@/pages/dialog/systemPlan";
    import servicePlan from "@/pages/dialog/servicePlan";
    import systemConfigDialog from "@/pages/dialog/systemConfigDialog";
    import addAlreadyService from "@/pages/dialog/addAlreadyService";
    import serviceConfigManage from "@/pages/dialog/serviceConfigManage";
    import { ElMessageBox, ElMessage } from "element-plus"
    import { Search } from '@element-plus/icons-vue'
    import { seachInput } from "@/utils/handle_data";
    import roleManage from "@/pages/dialog/roleManage";
    import serviceEditor from "@/pages/dialog/serviceEditor";
    import curServiceVersion from "@/pages/dialog/curServiceVersion";

    const globalStoreData = globalStore()
    const { activeSystemData, serviceList } = storeToRefs(globalStoreData)


    // left
    // 初始
    onMounted( async () => {
      await start()
    })
    const start = ()=> {    // 初始
        globalStoreData.getSystemServiceBundle( {
          data: {
            SystemName:activeSystemData.value.Name
          }
        })
    }

    const openRoleManage = ref(false)
    const roleHandle = () => {  // 角色管理
      openRoleManage.value = true
    }
    const openServiceEditor = ref(false)
    const editorHandle = () => {  // 角色管理
      openServiceEditor.value = true
    }

    // 
    const openNewService = ref(false)
    const addNewService = () => { // 添加新服务
      openNewService.value = true
    }
    // 添加已有服务
    const openAlreadyService = ref(false)
    const addHasService = () => {
      openAlreadyService.value = true
    }
    // 系统资源规划
    const openSystemPlan = ref(false)
    const planSysHandle = () => {
      openSystemPlan.value = true
    }
    // 系统配置
    const openSystemConfig = ref(false)
    const configSysHandle = () => {
      openSystemConfig.value = true
    }
    const closeDialog = () => { // 关闭弹窗
        openNewService.value = false
        openSystemPlan.value = false
        openServicePlan.value = false
        openSystemConfig.value = false
        openAlreadyService.value = false
        openServiceManage.value = false
        openRoleManage.value = false
        openCutVersion.value = false
        openServiceEditor.value = false
    }
 
    // table
     // input 操作

    const openCutVersion = ref(false)
    const cutVersionHandle  =  (item) => {  // 服务版本切换
      openCutVersion.value = true
      globalStoreData.setServiceData(item)
    }
    const inputModel = ref('')
    const seachListData =  ref(null)
    const inputChange = () => { 
       seachListData.value = seachInput( serviceList.value, inputModel )
    }

    const openServicePlan = ref(false)
    const planSerHandle = (item) => {   // 规划实例
      openServicePlan.value = true
      globalStoreData.setServiceData(item)
    }
    const openServiceManage = ref(false)
    const conSerHandle = (item) => { // 服务配置
      globalStoreData.setServiceData(item)
      openServiceManage.value = true
    }
    const deleteSevice = (item) => {  // 服务移除
      ElMessageBox.confirm(
        '确认移除' + item.ByName + '?',
            {
                confirmBottonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }
        ).then(() => {
            globalStoreData.deleteServiceBundle({
                data:{
                    ServiceBundleName:item.ServiceBundleName,
                    SystemName: activeSystemData.value.Name
                }
            }).then(() => {
               ElMessage({
                message: '删除成功',
                type:'success'
              })
                start()
            })
            .catch(err => {
              ElMessage({
                message: err,
                type:'error'
              })
            })
        })
    }
</script>

<style lang='scss' scoped>
 @import '@/assets/styles/ued/system_manage'

</style>