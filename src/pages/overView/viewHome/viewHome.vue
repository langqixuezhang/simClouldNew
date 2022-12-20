<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-29 10:39:19
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-05 11:05:18
 * @FilePath: \sim-application-web(应用云)\src\pages\overView\viewHome\viewHome.vue
 -->
<template>
    <div class=view-lf>
        <div class="lf-title">
            <hander class="content-hander">系统总览</hander>
            <el-select v-model="selectModle" class="lf-select" @change="selectChange"> 
                <el-option v-for="item in viewList" 
                :key="item.value" 
                :value="item.value"
                :label="item.label"></el-option>
            </el-select>
            <el-input v-model="inputModel" class="lf-input" placeholder="请输入关键字搜索" :prefix-icon="Search" @change="inputChange"></el-input>
            <span class="btn-default" @click="newSystem"><i></i>创建新系统</span>
            <span class="cut-system" @click="enterSystem">进入管理系统>></span>
        </div>
        <div class="lf-card contant-scroll">
            <div>
            <systemCard v-for="item, index in cardList" :key="index"></systemCard>
            </div>
        </div>
    </div>
    <div class="view-rg">
        <viewRg></viewRg>
    </div>

    <createSystem :openNewSystem = 'openNewSystem' @closeDialog='closeDialog'></createSystem>
</template>

<script setup>
    import { ref, onMounted, reactive } from "vue"
    // import { storeToRefs } from "pinia";
    import { Search } from '@element-plus/icons-vue'
    import systemCard from '@/components/systemCard'
    import createSystem from "@/pages/dialog/createSystem";
    import viewRg from '@/pages/overView/viewRg'
    import router from "@/router/index";
    import { globalStore } from "@/store/globalManage.ts"
    import { homeStore } from "@/store/overView.ts"

    const store = homeStore()
    const globalStoreData = globalStore()


    // console.log('num3', num3)
    
  

    // 
    onMounted( async () => {
      // await store.getSystemList()
    })
    // computed

    // select
    const selectModle = ref('1')
    const viewList = reactive([{
      value:'1',
      label:'全部'
    },{
      value:'2',
      label:'在线'
    },{
      value:'3',
      label:'离线'
    },{
      value:'4',
      label:'未上线'
    }])
    const selectChange = () => {
      console.log('选择', selectModle.value)
    }
    // input
    const inputModel = ref('')
    const inputChange = () => {
      console.log('input', inputModel.value)
    }

    const openNewSystem = ref(false) // 创建系统
    const newSystem = () => {
      openNewSystem.value = true
    }
    const closeDialog = () => {
        openNewSystem.value = false
    }
    // 进入系统管理
    const enterSystem = () => {
      globalStoreData.actionTable = 2
      router.push({fullPath:'/home/manage',path:'/home/manage'})
    }
    // 系统总览卡片list
    const cardList = [{
      value: 1
    },{
      value: 2
    },{
      value: 3
    },{
      value: 4
    },{
      value: 5
    },{
      value: 6
    },{
      value: 7
    },{
      value: 4
    },{
      value: 5
    },{
      value: 6
    },{
      value: 7
    },{
      value: 8
    },{
      value: 9
    }]
</script>

<style>

</style>