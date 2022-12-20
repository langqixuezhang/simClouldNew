<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-29 14:56:55
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-07 15:57:49
 * @FilePath: \sim-application-web(应用云)\src\pages\node\nodeLfList.vue
 -->
<template>
  <div class="node-lf-list">
    <hander class="content-hander">节点列表</hander>
    <div class="lf-title">
        <p class="fz-mid order-p">
            <span>节点数量：<span class="num">{{ nodeList.length }}</span></span>
            <span class="node-sort-group">
              <el-tooltip content="排序" placement="top">
                <i class="" @click.stop="handleOrder(1)"></i>
              </el-tooltip>
              <el-tooltip content="分组" placement="top">
                <i @click.stop="handleOrder(2)"></i>
              </el-tooltip>
              </span>
            <ul v-show="dropdownShow1" class="order-ul">
              <li @click="handSort()">按节点名称排序</li>
              <li @click="handSortIp()">按节点IP排序</li>
            </ul>
            <ul v-show="dropdownShow2" class="order-ul">
              <li @click="forcerRerender(0)">不分组</li>
              <li @click="forcerRerender(1)">按网段分组</li>
              <li @click="forcerRerender(2)">按网段+主机号分组</li>
            </ul>
        </p>
        <el-checkbox v-model="nodeLine" label="仅显示在线节点" />
    </div>
    <div class="node-list contant-scroll">
      <div  v-if='groupDisplay'>
            <el-collapse >
              <div v-for="value,index in onSegmentList" :key="index" >
                <el-collapse-item :title="Object.keys(value)[0]" :name="index">
                   <div >
                    <nodeListChild v-for="item,index in value[Object.keys(value)[0]]" :key="index" :nodeCardData='item'></nodeListChild>
                  </div>
                </el-collapse-item>
              </div>
              <div  v-if='!nodeLine'>
                <div v-for="value,index in onSegmentList" :key="index" >
                  <el-collapse-item :title="Object.keys(value)[0]" :name="index">
                    <div >
                      <nodeListChild v-for="item,index in value[Object.keys(value)[0]]" :key="index" :nodeCardData='item'></nodeListChild>
                    </div>
                  </el-collapse-item>
                </div>
              </div>
            </el-collapse>
      </div>
      <div v-else>
          <div >
            <nodeListChild v-for="item,index in nodeOnlineList" :key="index" :nodeCardData='item'></nodeListChild>
          </div>
          <div v-if='!nodeLine' class="off-line">
            <nodeListChild v-for="item,index in nodeOfflineList" :key="index" :nodeCardData='item' :isOff="true"></nodeListChild>
          </div>
        </div>
    </div>
    <span class="fz-mid apply-btn" @click="applyHandle()">申请虚拟机</span>
  </div>
  <applyDiglog :openApplyDiglog ='openApplyDiglog' @closeDialog='closeDialog'></applyDiglog>

</template>

<script setup >
import { ref, onBeforeUnmount, onMounted  } from "vue";
import nodeListChild from "@/pages/node/nodeListChild";
import { storeToRefs } from "pinia";
import applyDiglog from "@/pages/node/diglog/applyDiglog";
import { nodeStore } from "@/store/nodeManage.ts"
const nodeStoreData = nodeStore()
const { nodeList, nodeOnlineList, nodeOfflineList, onSegmentList, offSegmentList } = storeToRefs(nodeStoreData)

const nodeLine  = ref(true)

onMounted(() => {
  window.addEventListener('click', ()=> {
  dropdownShow1.value = false
  dropdownShow2.value = false
  })
})

const dropdownShow1 = ref(false)
const dropdownShow2 = ref(false)
const handleOrder = (index) => {  // 排序
  if ( index === 1) {
    dropdownShow1.value = true
  } else {
    dropdownShow2.value = true
  }
}
const handSort = () => {  // 名称排序
  nodeOnlineList.value = nodeOnlineList.value.sort((a, b) => a.HostName.localeCompare(b.typeName, 'zh'))
  dropdownShow1.value = false
}
const handSortIp = () => {  // Ip排序
   nodeOnlineList.value.sort((a, b) => {
    const ip1 = a.Ip.split('.').map(e => e.padStart(3, '0')).join('')
    const ip2 = b.Ip.split('.').map(e => e.padStart(3, '0')).join('')
    return ip1 - ip2
  })
  dropdownShow1.value = false
}
const groupDisplay = ref(false)     // 分组显示控制
const forcerRerender = (index) => {   // 网段排序
    if (index) {
     groupDisplay.value = true
      groupShow(index)
    } else {
       groupDisplay.value  = false
    }
}
const agentGroupOnline = ref({})  // 在线主机代理分组 { key：网段 value：[{主机}] }
const agentGroupOffline = ref({}) // 离线主机代理分组 { key：网段 value：[{主机}] }
const hostNum = ref(0) // ip地址主机号，每增10为间隔分组


const groupShow = (rule) => {
  onSegmentList.value = []
  offSegmentList.value = []
  agentGroupOnline.value = {}
  agentGroupOffline.value = {}

  if ( nodeList.value == []) {
    return
  }

  let  keyArray = []
  nodeList.value.forEach( ele => {
    let keyValue = ''
    if (rule === 1) {
      keyValue = ele.Ip.substring(0, ele.Ip.lastIndexOf('.'))
      const flag = keyArray.some(key => {
        if (key === keyValue) {
          return true
        }
      })
      if (!flag) {
        keyArray.push(keyValue)
      }
      ele.RunningState ? groupSave(ele.RunningState,agentGroupOffline.value , ele, keyValue) 
      : groupSave(ele.RunningState, agentGroupOnline.value , ele, keyValue) 
    } else if (rule === 2) {
      const netSegment = ele.Ip.substring(0,ele.Ip.lastIndexOf('.') )
      const hostSegment = ele.Ip.substring(ele.Ip.lastIndexOf('.') + 1)
      hostNum.value = parseInt(Number(hostSegment) / 10)
      keyValue = netSegment + '.' +hostNum.value * 10 + '—' +netSegment + '.' + (hostNum.value * 10 + 10)
      if (hostNum.value === 25) {
          keyValue = netSegment + '.' + hostNum.value * 10 + '—' + netSegment +'.' + (hostNum.value * 10 + 5)
        }
      const flag = keyArray.some(key => {
        if (key === keyValue) {
           return true
        }
       })
       if (!flag) {
         keyArray.push(keyValue)
        }
      ele.RunningState ? groupSave(ele.RunningState,agentGroupOffline.value , ele, keyValue) 
      : groupSave(ele.RunningState, agentGroupOnline.value , ele, keyValue) 
    }
    onSegmentList.value = objectGroupSortByIp(agentGroupOnline.value)
    offSegmentList.value = objectGroupSortByIp(agentGroupOnline.value)
  })
}

const groupSave = (index,group, element, keyValue) => {
  if (typeof group[keyValue] === 'undefined') {
    const hostArray = []
    hostArray.push(element)
    group[keyValue] = hostArray
  } else {
    group[keyValue].push(element)
  }
  return index ?  agentGroupOnline.value = group :  agentGroupOffline.value = group
}
const objectGroupSortByIp = (unOrdered = {}) => {
    const orderedArr = []
      Object.keys(unOrdered).sort((a, b) => {
        const ip1 = a.slice(0, a.indexOf('—')).split('.').map(e => e.padStart(3, 0)).join('')
        const ip2 = b.slice(0, b.indexOf('—')).split('.').map(e => e.padStart(3, 0)).join('')
        return ip1 - ip2
      }).forEach(key => {
        const tmpObj = {}
        tmpObj[key] = unOrdered[key]
        orderedArr.push(tmpObj)
      })
      return orderedArr
}

const openApplyDiglog = ref(false)
const applyHandle = () => { // 申请虚拟机
  openApplyDiglog.value = true
}
const closeDialog = () => {
  openApplyDiglog.value = false
}

onBeforeUnmount( () => {
  // window.removeEventListener('click')
})
</script>

<style>

</style>