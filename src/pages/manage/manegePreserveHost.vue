<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 16:36:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 11:18:31
 * @FilePath: \sim-application-web(应用云)\src\pages\manage\manageIndex.vue
 -->
<template>
  <div class="info">
      <p>
        <span class="btn-role fz-mid btn-default" @click="roleHandle()"><i></i>角色管理</span>
        <span class="btn-editor fz-mid  btn-default" @click="editorHandle()"><i></i>编辑</span>
      </p>
      <div class="title-info fz-mid">
            {{activeSystemData.Description ? activeSystemData.Description : '-- --' }}
      </div>
  </div>
  <div class="preserve-content-host">
      <div class="lf">
        <div class="lf-input">
            <el-dropdown trigger="click">
              <el-button type="primary">添加服务<el-icon class="el-icon-right"><arrow-down/> </el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="addNewService()">添加新服务</el-dropdown-item>
                  <el-dropdown-item @click="addHasService()">添加已有服务</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-input v-model="inputModel" class="" placeholder="请输入关键字搜索" :prefix-icon="Search" @input="inputChange"></el-input>
        </div>
        <el-table :data="seachListData || serviceList" style="width:100%" border="true" height="480px" 
            highlight-current-row @current-change="tableCurrentChange">
            <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column label="服务名称">
              <template #default="scope">
                  <span  class="ellipsis"><i></i> {{ scope.row.ByName}}</span>
              </template>
          </el-table-column>
          <el-table-column label="版本号" prop="Version" width="100px" >
          </el-table-column>
          <el-table-column label="已部署/已规划" prop="info"  width="130px"></el-table-column>
          <el-table-column label="操作" width="240px">
              <template #default="scope">
                <span class="text-default" @click="planSerHandle(scope.row)">规划实例  </span>
                <span class="text-default " @click="conSerHandle(scope.row)">配置管理 </span>
                <span class="text-warn " @click="deleteSevice(scope.row)">移除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rg">
          <p class="fz-xm"><i></i>服务所在节点</p>
          <el-table :data="serviceInstanceList" style="width:100%" border="true" height="480px" >
            <el-table-column type="index"> </el-table-column>
            <el-table-column label="节点名称">
                <template #default="scope">
                    <span><i></i> {{ scope.row.ByName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="节点Ip" prop="Ip">
            </el-table-column>
            <el-table-column label="CPU" width="60px">
            </el-table-column>
              <el-table-column label="内存" width="60px">
            </el-table-column>
            <el-table-column label="已部署/已规划" prop="info"></el-table-column>
            <el-table-column label="操作" >
              <span class="text-default">规划服务</span>
          </el-table-column>
        </el-table>
      </div>
  </div>
  <roleManage :openRoleManage = 'openRoleManage' @closeDialog='closeDialog'></roleManage>
  <serviceEditor :openServiceEditor = 'openServiceEditor' @closeDialog='closeDialog'></serviceEditor>
  <createService :openNewService = 'openNewService' @closeDialog='closeDialog'></createService>
  <addAlreadyService :openAlreadyService = 'openAlreadyService' @closeDialog='closeDialog'></addAlreadyService>
  <InstancePlan :openInstancePlan = 'openInstancePlan' @closeDialog='closeDialog'></InstancePlan>
  <serviceConfigManage :openServiceManage = 'openServiceManage' @closeDialog='closeDialog'></serviceConfigManage>


</template>

<script setup>
    import { Search } from '@element-plus/icons-vue'
    import { ref , onMounted } from "vue"
    import { storeToRefs } from "pinia";
    import { globalStore } from "@/store/globalManage.ts" 
    import { seachInput } from "@/utils/handle_data";
    import { ElMessageBox, ElMessage } from "element-plus"
    
    import roleManage from "@/pages/dialog/roleManage";
    import serviceEditor from "@/pages/dialog/serviceEditor";

    import createService from "@/pages/dialog/createService";
    import addAlreadyService from "@/pages/dialog/addAlreadyService";
    import serviceConfigManage from "@/pages/dialog/serviceConfigManage";
    import InstancePlan from "@/pages/dialog/InstancePlan";


    const globalStoreData = globalStore()

    const { activeSystemData, serviceList, serviceInstanceList } = storeToRefs(globalStoreData)



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
    const closeDialog = () => { // 关闭弹窗
      openInstancePlan.value = false
      openServiceManage.value = false
      openNewService.value = false
      openAlreadyService.value = false
      openRoleManage.value = false
      openServiceEditor.value = false
    }

    const openRoleManage = ref(false)
    const roleHandle = () => {  // 角色管理
      openRoleManage.value = true
    }
    const openServiceEditor = ref(false)
    const editorHandle = () => {  // 角色管理
      openServiceEditor.value = true
    }
 
    // left
    const openNewService = ref(false)
    const addNewService = () => { // 添加新服务
      openNewService.value = true
    }
    const openAlreadyService = ref(false)
    const addHasService = () => { // 添加已有服务
      openAlreadyService.value = true
    }
    // input 操作
    const inputModel = ref('')
    const seachListData =  ref(null)
    const inputChange = () => {  // 查询
       seachListData.value = seachInput( serviceList.value, inputModel )
    }
    const openInstancePlan = ref(false)
    const planSerHandle = (item) => {   // 规划实例
      openInstancePlan.value = true
      globalStoreData.setServiceData(item)
    }
    const openServiceManage = ref(false)
    const conSerHandle = () => { // 服务配置
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
                    ServiceBundleName:item.Name,
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
    const tableCurrentChange = (item) => {
       globalStoreData.getserviceinstances({
         data:{
           SystemName:item.SystemName,
          SystemServiceBundleName: item.Name,
         }
       })
    }

    
  // table
    const tableData = [{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        Name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    }]
</script>

<style lang='scss' scoped>
 @import '@/assets/styles/ued/system_manage'

</style>