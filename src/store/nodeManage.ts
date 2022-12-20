/*
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-12-01 09:38:19
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-09 14:34:10
 * @FilePath: \sim-application-web(应用云)\src\store\nodeManage.ts
 */

import http from '@/utils/http'
import { defineStore } from 'pinia'
exclude: /node_modules/

export const nodeStore = defineStore('node' ,{
    state: () => {
        return {
            isServiceRunInfo: true,   //  服务运行详情
            isHostTab:true, // 主机节点&容器节点
            nodeList:[],     // 节点列表
            nodeOnlineList: [],    // 在线节点列表
            nodeOfflineList:[],     // 离线节点列表
            hostNodeList: [],     // 静态节点列表
            vesselNodeList: [],     // 容器节点列表
            applyList:[], // 申请虚拟机初始list
            applyTypeList:[], // 申请虚拟机初始配置规格list
            onSegmentList:[{}], // 
            offSegmentList:[{}], // 
        }
    },
    actions:  {
        routerStart() {
        },
        setServiceRunState (item) {
            this.isServiceRunInfo = item
        },
        setNodeList (payload) {  // 节点列表
            this.nodeList = payload
            this.nodeOnlineList = payload.filter( ele => ele.RunningState)
            this.nodeOfflineList = payload.filter( ele => !ele.RunningState)
        },
        setWsHostList (payload) {
            console.log('-------', payload)

        },

        // 获取节点列表
        async getHostInfos( params )  {
            try {
                const result = await http.post(`/api/action?command=hostinfos`, { ...params })
                if (result.statusCode === 0) this.setNodeList(result.data)
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 获取静态节点列表
        async getHostNodeInfos( params )  {
            try {
                const result = await http.post(`/api/action?command=hostnodeinfos`, { ...params })
                if (result.statusCode === 0)  this.hostNodeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 获取容器节点列表
        async getVesselNodeInfos( params )  {
            try {
                const result = await http.post(`/api/action?command=k8snodeinfos`, { ...params })
                if (result.statusCode === 0)  this.vesselNodeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 主机节点上线
        async onlineHostNode( params )  {
            try {
                const result = await http.post(`/api/action?command=onlinehostnode`, { ...params })
                if (result.statusCode === 0)  this.hostNodeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 主机节点下线
          async offlineHostNode( params )  {
            try {
                const result = await http.post(`/api/action?command=offlinehostnode`, { ...params })
                if (result.statusCode === 0)  this.hostNodeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
          // 容器节点上线
        async onlineVesselNode( params )  {
            try {
                const result = await http.post(`/api/action?command=onlinek8snode`, { ...params })
                if (result.statusCode === 0)  this.vesselNodeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 容器节点下线
        async offlineVesselNode( params )  {
            try {
                const result = await http.post(`/api/action?command=offlinek8snode`, { ...params })
                if (result.statusCode === 0)  this.vesselNodeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 节点删除
        async deleteHost( params )  {
            try {
             await http.post(`/api/action?command=deletehost`, { ...params })
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // CMD
        async cmdCommand( params )  {
            try {
                await http.post(`/api/action?command=cmdcommand`, { ...params })
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 获取虚拟机可选系统列表
        async getNodeSystems( params )  {
            try {
                const result = await http.post(`/api/action?command=virtualnodeimages`, { ...params })
                if (result.statusCode === 0)  this.applyList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
         // 获取虚拟机配置规格(cpu内存)
         async getNodeTypes( params )  {
            try {
                const result = await http.post(`/api/action?command=virtualnodetypes`, { ...params })
                if (result.statusCode === 0)  this.applyTypeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 创建虚拟机
        async createVirtualNodes( params )  {
            try {
                const result = await http.post(`/api/action?command=createvirtualnodes`, { ...params })
                if (result.statusCode === 0)  this.applyTypeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        // 节点权限分配
        async AssignNodePermission( params )  {
            try {
                const result = await http.post(`/api/action?command=AssignNodePermission`, { ...params })
                if (result.statusCode === 0)  this.applyTypeList = result.data
            } catch (err) {
                return Promise.reject(err.msg)
            }
         },
        // 获取主机动态信息
        async getWsNodeDynamicInfo (state) {
            let ws = new WebSocket('ws://192.168.100.77:30002/?subTopicArray=Huaru_OP_Node_NodeDynamicInfo')
            ws.onopen = () => {
            }
            ws.onerror = () => {
            }
            // ws.send();
            ws.onmessage = ( _data ) => {
                if(!_data.data) {
                    return 
                }
                let obj = JSON.parse(_data.data)
                if( Array.isArray(obj) ){
                } else {
                    this.hostNodeList = this.hostNodeList.map( ele => {
                        return {
                            ...ele,
                            wsCpuRate: ele.Ip === obj.data.Ip ?   obj.data.CpuRate : 0,
                            wsMemoryRate: ele.Ip === obj.data.Ip ?   obj.data.MemoryRate : 0,
                        }
                    }) 
                    this.vesselNodeList = this.vesselNodeList.map( ele => {
                        return {
                            ...ele,
                            wsCpuRate: ele.Ip === obj.data.Ip ?   obj.data.CpuRate : 0,
                            wsMemoryRate: ele.Ip === obj.data.Ip ?   obj.data.MemoryRate : 0,
                        }
                    }) 
         

                }

            }
              // ws.send();
            ws.onclose = ( _data ) => {
            }
      },
    },
    getters:{
        systemHanleList : (state) => {
            let _applyList = state.applyList
            return _applyList.map((item) => {
                return {
                    value: item.ImageId,
                    label: item.Platform + '系统' + item.Architecture
                }
            })
        },
       nodeScaleList : (state) => {
            let _arr = state.applyTypeList
            return _arr.map((item) => {
                return {
                    label: item.NodeTypeName + '(CPU:'+ item.CPU + '核,内存:' + item.Memory + 'MB,GPU:' + item.GPU  +')',
                    value: item.NodeType
                }
            })
        }
    }
})