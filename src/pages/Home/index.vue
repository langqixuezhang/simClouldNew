<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 16:36:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-08 15:43:02
 * @FilePath: \sim-application-web(应用云)\src\pages\Home\index.vue
 -->

<template>
    <div class='box'>
        <div class="box-title" :class="isShow ? '' : 'box-sm-title'">
            <div class="logo"><i></i><span v-show="isShow">XSimCloud</span></div>
            <div class="title-info" :class="{  }">
                <span><i></i><span class="fz-xxm" v-show="isShow">应用云</span></span>
                <router-link :class="tabClass(1)" to="/home/overView" @click="tabHandle(1)">
                    <i class="overview"></i><span v-show="isShow">系统总览</span>
                </router-link>
                <router-link :class="tabClass(2)" to="/home/manage" @click="tabHandle(2)">
                    <i class="manage"></i><span v-show="isShow">系统管理</span>
                </router-link>
                <router-link  :class="tabClass(3)" to="/home/node" @click="tabHandle(3)">
                    <i class="node" ></i><span v-show="isShow">节点管理</span>
                </router-link>
               <div class="scalong-btn" :class="isShow ? '' : 'scalong-sm-btn'" @click="scalingClick">
                    <i></i>
                </div>
            </div>
        </div>
        <div class="box-main fz-m "  :class="isShow ? '' : 'box-sm-main'">
            <div class="mian-title"></div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted  } from "vue"
    import { storeToRefs } from "pinia";
    import { globalStore }  from '@/store/globalManage.ts'
    import { manageStore }  from '@/store/systemManage.ts'
    import { homeStore }  from '@/store/overView.ts'
    import { nodeStore }  from '@/store/nodeManage.ts'
    import router from "@/router/index";

    // store
    const store = globalStore()
    const manageStoreData = manageStore()
    const nodeStoreData = nodeStore()
    const viewStoreData = homeStore()

    const { isShow } = storeToRefs(store)

    // computed
    const tabClass = computed (() => {
        return  ele => {
           return ele === store.actionTable ? 'tab-active' : ''
        }
    })


    onMounted( async () => {
        nodeStoreData.getWsNodeDynamicInfo()
        window.addEventListener('load', () => {
            router.push({ path:'/home/overView' })
        })
    })

    // 
    const tabHandle = (ele) => {
        store.actionTable = ele
        manageStoreData.$reset()
        nodeStoreData.$reset()
        viewStoreData.$reset()
    }
    //
    const scalingClick = () => {
        store.isShow = !store.isShow
    }
    

</script>

<style lang="scss">

</style>
