<!--
 * @Description: 系统管理
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 16:36:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 11:25:24
 * @FilePath: \sim-application-web(应用云)\src\pages\manage\manageIndex.vue
 -->
<template>
    <div class="header">
        <span class="btn-default create-system-btn" @click="newSystem"><i></i>创建新系统</span>
        <el-input v-model="inputModel" class="" placeholder="请输入搜索内容..." :prefix-icon="Search" @input="inputChange"></el-input>
    </div>
    <span class="copy btn-default" @click='copySystem'><i></i>克隆</span>
    <el-tabs v-model="activeName" calss="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="静态节点型" name="frist" >
            <systemMangetable  :tableData='hostList' @systemHanle="systemHanle" @deployHandle="deployHandle" @clickHandle="clickHandle"
            @deleteHandle="deleteHandle" :inputModel='inputModel'  @tabeDbclick="tabeDbclick" @containHandle="containHandle"></systemMangetable>
        </el-tab-pane>
        <el-tab-pane label="动态虚拟机型" name="second" >
            <systemMangetable :tableData = 'virtualList' @systemHanle="systemHanle" @deployHandle="deployHandle" @clickHandle="clickHandle"
            @deleteHandle="deleteHandle" :inputModel='inputModel'  @tabeDbclick="tabeDbclick" @containHandle="containHandle"></systemMangetable>
        </el-tab-pane>
        <el-tab-pane label="容器型" name="third" >
            <systemMangetable :tableData = 'vesselList' @systemHanle="systemHanle" @deployHandle="deployHandle" @clickHandle="clickHandle"
            @deleteHandle="deleteHandle" :inputModel='inputModel' @tabeDbclick="tabeDbclick" @containHandle="containHandle"></systemMangetable>
        </el-tab-pane>
    </el-tabs>
    <createSystem :openNewSystem = 'openNewSystem' @closeDialog='closeDialog'></createSystem>
</template>

<script setup>
    import { ref, onMounted, watch,reactive } from "vue"
    import { storeToRefs } from "pinia";
    import { Search } from '@element-plus/icons-vue'
    import { manageStore } from "@/store/systemManage.ts"
    import { homeStore } from "@/store/overView.ts"
    import { globalStore } from "@/store/globalManage.ts"
    import createSystem from "@/pages/dialog/createSystem";
    import { ElMessageBox , ElMessage} from "element-plus"
    import { seachInput } from "@/utils/handle_data";
    import systemMangetable from "@/pages/manage/systemMangetable";
    import router from "@/router/index";

    const manageStoreData = manageStore()
    // const globalStore = globalStore()
    const viewStore = homeStore()
    const globalStoreData = globalStore()
    // store 数据
    const { vesselList, hostList, virtualList } = storeToRefs(globalStoreData)
    
    const tableData = []
    watch ( () => vesselList,  (newValue) => {
        tableData.value = newValue
    },{deep:true})

    // 
    onMounted( async () => {
      await start()
    })
    const start = ()=> {    // 初始
        globalStoreData.getSystems()
    }

    // input 
    const inputModel = ref('')
    const seachListData =  ref(null)
    const inputChange = () => {
        let _arr = []
        switch (activeName.value) {
            case 'frist':
                _arr = globalStoreData.hostList
                break;
            case 'second':
                _arr = globalStoreData.virtualList
                break;
            default:
                _arr = globalStoreData.vesselList
                break;
        }
       seachListData.value = seachInput( _arr, inputModel )
    }

    // new system
    const openNewSystem = ref(false) // 创建系统
    const newSystem  = () => {
        openNewSystem.value = true
    }
    const closeDialog = () => {
        openNewSystem.value = false
    }
    const copySystem = () => {
        if (!globalStoreData.activeSystemData) {
            ElMessage({
                message: '请选择需要克隆的系统',
                type:'warning'
            })
            return 
        }
        globalStoreData.addSystem({
            data:{
                Name: globalStoreData.activeSystemData.Name,
                Description:globalStoreData.activeSystemData.Description,
                ByName:  globalStoreData.activeSystemData.ByName,
                Url: globalStoreData.activeSystemData.Url,
                Type: globalStoreData.activeSystemData.Type
            }
        }).then(()=> {
            globalStoreData.getSystems()
        })
    }
    // tab 

    const activeName = ref('frist')
    const handleClick = (  ) => {
        globalStoreData.setSyatemData('')
        let _num = activeName.value === 'frist' ? 0 : activeName.value === 'second' ? 1 : 0
        globalStoreData.seActiveTabHost(_num)
    }

    // table
    const tabeDbclick = (item) => {     // table 双击-维护
      manageStoreData.firstPage = 2
      manageStoreData.isHostPage = activeName.value === 'frist' ? 0 :1
      globalStoreData.serviceList = []
      globalStoreData.setSyatemData(item)
    }
    const clickHandle = (index,item) => {   // 维护 配置
        manageStoreData.firstPage = index
        manageStoreData.isHostPage = activeName.value === 'frist' ? 0 :1
        globalStoreData.serviceList = []
        globalStoreData.setSyatemData(item)

    }
    const systemHanle=(item, index) => {    // 一键运行，系统控制 1运行 2停止 3上线 4下线
        switch (index) {
            case 1 :
                globalStoreData.systemRun({
                    data:{
                        Name:item.Name
                    }
                }) .then(() => {
                start()
         })
            break
                case 2 :
                globalStoreData.systemStop({
                    data:{
                        Name:item.Name
                    }
                }) .then(() => {
                start()
         })
            break
                case 3 :
                globalStoreData.systemOnline({
                    data:{
                        Name:item.Name
                    }
                }) .then(() => {
                start()
         })
            break
                case 4 :
                globalStoreData.systemDownline({
                    data:{
                        Name:item.Name
                    }
                }) .then(() => {
                start()
         })
            break


        }
       
    }
    const deployHandle = (item) => {    // 一键部署
        globalStoreData.systemDeploy({
            data:{
                Name:item.Name
            }
        })
    }
    const deleteHandle = (item) => {       // 删除系统
      ElMessageBox.confirm(
        '确认删除' + item.ByName + '?','提示',
            {
                confirmBottonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }
        ).then(() => {
            globalStoreData.deleteSystem({
                data:{
                    Name:item.Name
                }
            }).then(() => {
                start()
            })
        })
    }
    const containHandle = () => {   // 系统监控
      viewStore.isSystemMonitor = true
      globalStoreData.actionTable = 1
      router.push({fullPath:'/home/overView',path:'/home/overView'})

    }
</script>

<style lang='scss' scoped>
 @import '@/assets/styles/ued/system_manage'

</style>