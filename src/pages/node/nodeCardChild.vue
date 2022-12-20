<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-30 09:56:20
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-09 14:18:33
 * @FilePath: \sim-application-web(应用云)\src\pages\node\nodeCardChild.vue
 -->
<template>
  <div class="node-card">
      <div class="card-title">
          <span><i></i>{{  nodeCardData.Ip }}</span>
          <div class="card-title-rg">
              <i class="user"></i>
              <div class="show">
                <el-tooltip content="操作" placement="top">
                    <i ></i>
                </el-tooltip>
                <ul class="order-ul">
                    <li @click="allotHandle()">节点权限分配</li>
                    <li @click="cmdHandle()">CMD</li>
                    <li @click="offLineHandle()">下线</li>
                    </ul>
                </div>
            </div>
      </div>
      <div class="card-chart">
          <div :class="cpuClass(nodeCardData.wsCpuRate)">
            <el-progress type="circle" :percentage="nodeCardData.wsCpuRate" :color="cpuColor(nodeCardData.wsCpuRate)">
              <template #default="{ percentage }">
                <p class="cpu-icon"><i></i></p>
                <p >CPU: <span>{{ percentage }}%</span></p>
              </template>
            </el-progress>
          </div>
          <div :class="memoryClass(nodeCardData.wsMemoryRate)">
            <el-progress type="circle" :percentage="nodeCardData.wsMemoryRate" :color="memoryColor(nodeCardData.wsMemoryRate)">
                <template #default="{ percentage }">
                    <p class="memory-icon"><i></i></p>
                    <p >内存: <span>{{ percentage }}%</span></p>
                </template>
            </el-progress>
        </div>
      </div>
      <div class="card-info fz-mid">
         <div class="card-info-system">
            <div>
                <p class="title-text">内存</p>
                <p>{{ Math.ceil( nodeCardData.Memory /1024 ) }}G</p>
            </div>
            <div>
                <p class="title-text">操作系统</p>
                <p>{{ nodeCardData.OperatingSystem ? nodeCardData.OperatingSystem : '--' }}  {{ nodeCardData.OsArchitecture }}</p>
            </div>
            <div>
                <span class=""><i @click="enterInfo()"></i></span>
            </div>
         </div>
          <div class="card-info-proce">
              <p class="title-text">处理器（{{ nodeCardData.CpuCoreNum }}核）</p>
              <p>{{ nodeCardData.OsCaption }}</p>
          </div>
      </div>
  </div>
  <cmdDiglog :openCmdDiglog ='openCmdDiglog' @closeDialog='closeDialog' :ipData="ipData"></cmdDiglog>
  <allotDiglog :openAllotDiglog ='openAllotDiglog' @closeDialog='closeDialog' :ipData="ipData"></allotDiglog>
  <serviceInfoDiglog :openServiceInfoDiglog ='openServiceInfoDiglog' @closeDialog='closeDialog' :ipData="ipData"></serviceInfoDiglog>

</template>

<script setup>
 import { defineProps, onMounted, ref, computed } from "vue";
 import { nodeStore } from "@/store/nodeManage.ts"
import { storeToRefs } from "pinia";
import cmdDiglog from "@/pages/node/diglog/cmdDiglog";
import allotDiglog from "@/pages/node/diglog/allotDiglog";
import serviceInfoDiglog from "@/pages/node/diglog/serviceInfoDiglog";
import { ElMessageBox } from "element-plus";

const nodeStoreData = nodeStore()

const { isHostTab } = storeToRefs(nodeStoreData)

const _props = defineProps ({
    nodeCardData: {
        type: Object,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: {}
    },
})

onMounted(() => {

})

// 0≤正常＜75；75≤一般＜90；过高≥90
// 0≤正常＜60；60≤一般＜90；过高≥90

const cpuColor = computed( () => {
    return ele =>{
        return   ele ? ele < 76 ? '#0675f1' :  ele > 89 ?  '#ea5151' : '#f99d22'   : '#0675f1'
    }
})

const memoryColor = computed( () => {
    return ele =>{
        return   ele ? ele < 61 ? '#0675f1' :  ele > 89 ?  '#ea5151' : '#f99d22' : '#0675f1'
    }
})


const cpuClass = computed ( () => {
       return ele =>{
        return   ele ? ele < 76 ? 'progress-nolmal' :  ele > 89 ?  'progress-waring' : 'progress-general' : 'progress-nolmal'
    }
})
const  memoryClass = computed ( () => {
       return ele =>{
        return   ele ? ele < 61 ? 'progress-nolmal' :  ele > 89 ?  'progress-waring' : 'progress-general' : 'progress-nolmal'
    }
})

const openServiceInfoDiglog = ref(false)
const enterInfo = () => {
    openServiceInfoDiglog.value = true
}

const ipData = ref('')
const openCmdDiglog = ref(false)
const cmdHandle = () => {   // cmd操作回调
  openCmdDiglog.value = true
  ipData.value = _props.nodeCardData.Ip
}

const offLineHandle = () => {       // 下线
  ElMessageBox.confirm('确认删除 ' + _props.nodeCardData.Ip + '?','提示',{
    confirmBottonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
      if (isHostTab.value) {
        nodeStoreData.offlineHostNode({
            data:{
            ip: _props.nodeCardData.Ip
            }
        }).then(() => {
            nodeStoreData.getHostNodeInfos()
        })
      } else {
        nodeStoreData.offlineVesselNode({
            data:{
                ip: _props.nodeCardData.Ip
            }
        }).then(() => {
            nodeStoreData.getVesselNodeInfos()
        })
      }
     
  })
}

const openAllotDiglog = ref(false)
const allotHandle = () => {     // 权限分配
  openAllotDiglog.value = true
  ipData.value = _props.nodeCardData.Ip
}

const closeDialog = () => { // diglog 取消回调
  openAllotDiglog.value = false
  openServiceInfoDiglog.value = false
  openCmdDiglog.value = false
  ipData.value = ''
}

</script>

<style lang='scss' scoped>
.node-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 378px;
	height: 316px;
	background-color: #ffffff;
	box-shadow: 0px 0px 6px 0px 
		rgba(0, 12, 19, 0.14);
    border-radius: 6px;
    box-sizing: border-box;
    padding-bottom: 18px;
    overflow: hidden;
    border: 1px solid #ffffff;
    .card-title {
        display: flex;
        position: relative;
        height: 33px;
        justify-items: center;
        background-color: #fafafa;
        justify-content: space-between;
        padding: 0 10px;
        i {
            display: inline-block;
            width: 23px;
            height: 23px;
        }
        span {
            display: inline-block;
            line-height: 32px;
            i {
                background: url('@/assets/images/node/node_icon.png') no-repeat;
                vertical-align: sub;
                width: 25px;
                margin-right: 8px;

            }
        }
        .card-title-rg {
            i {
                top: 4px;
                &+i {
                    margin-left: 1px;
                }
            }
            .user {
                background: url('@/assets/images/node/user_nomal.png') no-repeat;
                margin: 5px 5px 0 0;
            }
            .show {
                cursor: pointer;
                display: inline-block;
                position: relative;

                i {
                     background: url('@/assets/images/node/show_nomal.png') no-repeat;
                }
                &:hover .order-ul {
                    display: block;
                }
            }
        }
       .order-ul {
            position: absolute;
            display: none;
            top: 25px;
            right: -8px;
            z-index: 9999;
            background-color: white;
            text-align: center;
               box-shadow: 0px 0px 6px 0px 
                rgba(0, 12, 19, 0.14);
            border-radius: 3px;
            overflow: hidden;
            li {
                list-style: none;
                cursor: pointer;
                min-width: 106px;
                box-sizing: border-box;
                width: auto;
                line-height: 32px;
                font-size: 14px;
                color: #34455a;
                &:hover{
                    color: #fff;
                    background-color: #2c74f3;
                }
            }
        }
    }
    .card-chart {
        display: flex;
        width: 85%;
        justify-content: space-around;
        align-self: center;
        i {
            display: inline-block;
            height: 30px;
            width: 30px;
            cursor: pointer;
        }
    }
    .progress-nolmal, .progress-general, .progress-waring {
        .el-progress__text {
            top: 46%;
        }
       p i {
           display: inline-block;
           width: 36px;
            height: 36px;
       }
       p {
           margin-top: 5px;
           color: #666666;
           font-size: 14px;
           text-align: center;
           span {
                font-size: 16px;
                font-weight: bold;
           }
       }
    }
    .progress-nolmal {
        .cpu-icon i {
           background: url('@/assets/images/node/cpu_nolmal.png') no-repeat;
        }
        .memory-icon i {
           background: url('@/assets/images/node/memory_nolmal.png') no-repeat;
        }
        span {
            color: #1869f5;
        }
    }
    .progress-general {
        .cpu-icon i {
           background: url('@/assets/images/node/cpu_general.png') no-repeat;
        }
        .memory-icon i {
           background: url('@/assets/images/node/memory_general.png') no-repeat;
        }
        span {
            color: #f79b1a;
        }
    }
    .progress-waring {
        .cpu-icon i {
           background: url('@/assets/images/node/cup_waring.png') no-repeat;
        }
        .memory-icon i {
           background: url('@/assets/images/node/memory_waring.png') no-repeat;
        }
        span {
            color: #f02f2f;
        }
    }
    .card-info {
        width: 342px;
        height: 105px;
        background-color: rgba(245, 245, 245, 0.5);
        border-radius: 5px;
        align-self: center;
        padding: 10px 18px;
        box-sizing: border-box;
        color: #333;
        .title-text {
            color: #8d9498;
        }
       .card-info-system{
            display: flex;
            align-items: center;
            height: 40px;
            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
            }
            div:nth-child(1) {
                width: 60px;
            }
             div:nth-child(3) {
                i{  
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 3px;
                    cursor: pointer;
                    border: solid 1px #c5d8f9;
                }
            }
            div:nth-child(2),div:nth-child(3) {
                padding: 0 30px;
            }
            div + div {
                border-left: 1px solid #c1c8cc;
            }
        }
        .card-info-proce {
            margin-top: 8px;
            p {
                line-height: 20px;
            }
        }

    }

    &:hover {
        border: 1px solid #aabbcc;
        .card-title {
           background-image: linear-gradient(0deg, #2a73f2 0%, #4287ff 100%);
            color: #fff;
            i {
                background: url('@/assets/images/node/node_icon_hover.png') no-repeat;
            }
            .card-title-rg {
                .user {
                    background: url('@/assets/images/node/user_hover.png') no-repeat;
                }
                .show i {
                    background: url('@/assets/images/node/show_hover.png') no-repeat;
                }
            }
        }
    }
}

</style>