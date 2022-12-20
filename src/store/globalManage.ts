/*
 * @Description: 系统全局资源管理
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-14 11:09:50
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 15:56:54
 * @FilePath: \sim-application-web(应用云)\src\store\globalManage.ts
 */

import http from '@/utils/http'
import { defineStore } from 'pinia'
import { nodeStore } from '@/store/nodeManage.ts'

export const globalStore = defineStore('global' ,{
    state: () => {
        return {
            isLogin: false,   // 登陆
            actionTable: 1,   //  1  系统总览 || 2 管理 || 3 节点
            isShow:true,    // 左右样式收缩（

            // ------系统
            vesselList:[],  // 系统列表-容器
            hostList:[],    // 系统列表-主机(静态)
            virtualList:[],  // 系统列表-云
            systemList:[],   // 系统列表-all 
            activeSystemData:'',   // 当前选中系统
          activeTabHost: 0, // 当然所处模式 0 主机 1 动态  2容器

            // ------服务
            serviceList:[],   // 选中系统下的服务列表
            serviceAlreadyList: [],     // 已有服务list 
            serviceVersionList: [],     // 服务所有版本 
            activeServiceData:'',   // 当前选中服务

            // -----实例
            serviceInstanceList:[],// 服务下所有实例list
            serviceIpList: [], // 系统下所有实例list

            // ----- 监控
            nodeInfo: '' , // 节点详情
            systemLog: [],  // 日志

            // --- 配置
            instanceConfigInfo:'',  // 实例配置信息
            configList:'',    //  系统下所有配置
        }
    },
    actions:  {
      // -------------sate操作
      setSyatemData (payload) {
        this.activeSystemData = payload
      },
      setServiceData (payload) {
        this.activeServiceData = payload
      },
      seActiveTabHost (payload) {
        this.activeTabHost = payload
      },

      
        // 获取系统列表
        async getSystems( params )  {
            try {
              const result = await http.post(`/api/action?command=getsystems`, { ...params })
              if (result.statusCode === 0) {
                //   1 容器 0 主机
                 this.systemList = result.data
                 this.vesselList = result.data.filter(ele => ele.Type === 1)
                 this.hostList = result.data.filter(ele => ele.Type === 0)
                return result
              }
            } catch (err) {
              return Promise.reject(err.msg)
            }
        },
        // 获取系统信息
        async getSystem ( params )  {
            try {
              const result = await http.post(`/api/action?command=getsystem`, { ...params })
              if (result.statusCode === 0) {
                //   1 容器 0 主机
                 this.systemList = result.data
                 this.vesselList = result.data.filter(ele => ele.Type === 1)
                 this.hostList = result.data.filter(ele => ele.Type === 0)
                return result
              }
            } catch (err) {
              return Promise.reject(err.msg)
            }
        },    
        // 创建系统
        async addSystem ( params )  {
          try {
            await http.post(`/api/action?command=addsystem`, { ...params })
          } catch (err) {
            return Promise.reject(err.msg)
          }
        },
        // 删除系统
        async deleteSystem ( params )  {
            try {
                await http.post(`/api/action?command=deletesystem`, { ...params })
                } catch (err) {
                  return Promise.reject(err.msg)
            }
        },
        // 修改系统
        async putSystem ( params )  {
            try {
              const result =  await http.post(`/api/action?command=putsystem`, { ...params })
              if (result.statusCode === 0) this.setSyatemData(result.data)
            } catch (err) {
             return Promise.reject(err.msg)
            }
        },
        // 系统部署
        async systemDeploy ( params )  {
            try {
                await http.post(`/api/action?command=systemdeploy`, { ...params })
                } catch (err) {
                return Promise.reject(err.msg)
            }
        },
        async systemRun ( params )  {
          try {
              await http.post(`/api/action?command=systemrun`, { ...params })
              } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        async systemStop ( params )  {
          try {
              await http.post(`/api/action?command=systemstop`, { ...params })
              } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        async systemDownline ( params )  {
          try {
              await http.post(`/api/action?command=systemdownline`, { ...params })
              } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        async systemOnline ( params )  {
          try {
              await http.post(`/api/action?command=systemonline`, { ...params })
              } catch (err) {
              return Promise.reject(err.msg)
          }
        },
         // 系统控制 1运行 2停止 3上线 4下线
        async systemControl ( params )  {
            try {
                await http.post(`/api/action?command=systemcontrol`, { ...params })
                } catch (err) {
                return Promise.reject(err.msg)
            }
        },
       // 增加系统资源规划
       async addSystemreSourcePlan ( params )  {
          try {
              await http.post(`/api/action?command=addsystemresourceplan`, { ...params })
              } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  ---------- 服务
        //  获取系统服务版本信息(系统下的服务列表)
        async getSystemServiceBundle ( params )  {
          try {
            const result =  await http.post(`/api/action?command=getsystemservicebundle`, { ...params })
            if (result.statusCode === 0) {
              this.serviceList = result.data
            }  
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  增加服务版本
        async addServiceBundle ( params )  {
          try {
           const result = await http.post(`/api/action?command=addservicebundle`, { ...params })
           return result
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
         //  增加系统服务版本
        async addSystemServiceBundle ( params )  {
          try {
           await http.post(`/api/action?command=addsystemservicebundle`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  获取服务版本信息列表(已有服务)
        async getServicebundles ( params )  {
          try {
            const result =  await http.post(`/api/action?command=getservicebundles`, { ...params })
            if (result.statusCode === 0) {
              this.serviceAlreadyList = result.data
            }  
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
         //  获取服务版本信息(单个服务的所有版本)
        async getservicebundle ( params )  {
          try {
            const result =  await http.post(`/api/action?command=getservicebundle`, { ...params })
            if (result.statusCode === 0) {
              this.serviceVersionList = result.data
            }  
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  删除服务版本
        async deleteServiceBundle ( params )  {
          try {
          await http.post(`/api/action?command=deleteservicebundle`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  服务停止
        async serviceStop ( params )  {
          try {
            await http.post(`/api/action?command=servicestop`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  服务重启
        async serviceRestart ( params )  {
          try {
            await http.post(`/api/action?command=servicerestart`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  服务销毁 - 主机
        async serviceDestroy ( params )  {
          try {
            await http.post(`/api/action?command=servicedestroy`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  模板下 服务停止
        async servicesStop ( params )  {
          try {
            await http.post(`/api/action?command=servicesstop`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  模板下 服务重启
        async servicesRestart ( params )  {
          try {
            await http.post(`/api/action?command=servicesrestart`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  模板下 服务销毁 - 主机
        async servicesDestroy ( params )  {
          try {
            await http.post(`/api/action?command=servicesdestroy`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  模板下 服务部署 - 主机
        async servicesDeploy ( params )  {
          try {
            await http.post(`/api/action?command=servicesdeploy`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        // --------------------实例
        // 添加服务实例
        async addserviceinstance ( params )  {
          try {
           await http.post(`/api/action?command=addserviceinstance`, { ...params })
            // if (result.statusCode === 0) {
            //   this.serviceInstanceList = result.data
            // }  
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        // 获取服务实例信息
        async getServiceInstance ( params )  {
          try {
            const result = await http.post(`/api/action?command=getserviceinstance`, { ...params })
            if (result.statusCode === 0) this.serviceInstance = result.data
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  获取服务实例信息列表
        async getserviceinstances ( params )  {
          try {
            const result =  await http.post(`/api/action?command=getserviceinstances`, { ...params })
            if (result.statusCode === 0) {
              this.serviceInstanceList = result.data
            }  
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  获取所有服务实例Ip信息列表
        async getIpServiceInstances ( params )  {
          try {
            const result =  await http.post(`/api/action?command=getserviceinstances`, { ...params })
            if (result.statusCode === 0) {
              this.serviceIpList = result.data
            }  
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  查询日志
        async getSystemLog ( params )  {
          try {
            const result =  await http.post(`/api/action?command=getsystemlog`, { ...params })
            if (result.statusCode === 0) {
              this.systemLog = result.data
            }  
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        // -----------------配置
        //  获取服务实例配置
        async getInstanceConfigInfo ( params )  {
          try {
            const result =  await http.post(`/api/action?command=getinstanceconfiginfo`, { ...params })
            if (result.statusCode === 0) this.instanceConfigInfo = result.data 
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        // nacos获取系统下 所有配置
        async getConfigs ( params )  {
          try {
            const result =  await http.post(`/api/action?command=configs`, { ...params })
            if (result.statusCode === 0) this.configList = result.data 
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
        //  nacos 发布配置
        async publishConfig ( params )  {
          try {
            await http.post(`/api/action?command=publishconfig`, { ...params })
          } catch (err) {
              return Promise.reject(err.msg)
          }
        },
    },
    getters:{
      // * Status：【0,部署中，1,未启动，2,运行中 ,3错误 ，4,未部署 ，99,其它】，
      systemServiceIpData_ : (state) => { // 静态
        let _serviceIpList = state.serviceIpList
        let _serviceList = state.serviceList
        let _nodeList = state.hostNodeList.concat(state.vesselNodeList)
        _serviceIpList = _serviceIpList.map(ele => {
          return {
            ...ele,
            inInfo: _nodeList.filter(_e => _e.Ip === ele.Ip )[0] ? _nodeList.filter(_e => _e.Ip === ele.Ip )[0] : ''
          }
        })

      
        let _arr = []
        _arr = _serviceList.map((_ele1, _index1) => {
          let _childLists = _serviceIpList.filter( _item => _item.SystemServiceBundleName === _ele1.Name)  // 父 deploy / plan

          const res = new Map()
          let _childList = _childLists.filter((a) => !res.has(a.Ip) && res.set(a.Ip, 1))

          let _childStateContrast = _childList.map( _item1 => { // 子 deploy / plan
            return _childLists.filter( _item2 => _item2.Ip === _item1.Ip) 
          })

          return {
            id: _index1 + '',
            stateContrast: _childLists.filter( _item => _item.Status !== 4 ).length + '/' + _childLists.length,
            ..._ele1,
            children: _childList.map((_ele2 , _index2) => {
              let _childContrast = _childStateContrast.filter( _childele => _childele[0].Ip === _ele2.Ip)[0]

              return {
                id: _index1 + '-' +_index2,
                stateContrast: _childContrast.filter( _item => _item.Status !== 4 ).length + '/' + _childContrast.length,
                ..._ele2
              }
            })
          }
        })
        return _arr
      },   
      // * Status：【0,部署中，1,未启动，2,运行中 ,3错误 ，4,未部署 ，99,其它】，
      systemServiceIpData__ () { // 动态
        const useOtherStore =  nodeStore()
        let _serviceIpList = this.serviceIpList
        let _serviceList = this.serviceList
        let _nodeList = useOtherStore.hostNodeList.concat(useOtherStore.vesselNodeList)
        _serviceIpList = _serviceIpList.map(ele => {
          return {
            ...ele,
            inInfo: _nodeList.filter(_e => _e.Ip === ele.Ip )[0] ? _nodeList.filter(_e => _e.Ip === ele.Ip )[0] : ''
          }
        })

        let _arr = []
        _arr = _serviceList.map((_ele1, _index1) => {
          let _childLists = _serviceIpList.filter( _item => _item.SystemServiceBundleName === _ele1.Name)  // 父 deploy / plan
         
          const res = new Map()
          let _childList = _childLists.filter((a) => !res.has(a.Ip) && res.set(a.Ip, 1))

          let _childStateContrast = _childList.map( _item1 => { // 子 deploy / plan
            return _childLists.filter( _item2 => _item2.Ip === _item1.Ip) 
          })

          return {
            id: _index1 + '',
            stateContrast: _childLists.filter( _item => _item.Status !== 4 ).length + '/' + _childLists.length,
            ..._ele1,
            children: _childList.map((_ele2 , _index2) => {
              let _childContrast = _childStateContrast.filter( _childele => _childele[0].Ip === _ele2.Ip)[0]

              return {
                id: _index1 + '-' +_index2,
                stateContrast: _childContrast.filter( _item => _item.Status !== 4 ).length + '/' + _childContrast.length,
                ..._ele2
              }
            })
          }
        })
        return _arr
      }, 
       // * Status：【0,部署中，1,未启动，2,运行中 ,3错误 ，4,未部署 ，99,其它】，
      systemServiceIpData () { // 动态端口
        const useOtherStore =  nodeStore()
        let _serviceIpList = this.serviceIpList
        let _serviceList = this.serviceList
        let _nodeList = useOtherStore.hostNodeList.concat(useOtherStore.vesselNodeList)
        _serviceIpList = _serviceIpList.map(ele => {
          return {
            ...ele,
            inInfo: _nodeList.filter(_e => _e.Ip === ele.Ip )[0] ? _nodeList.filter(_e => _e.Ip === ele.Ip )[0] : ''
          }
        })

        let _arr = []
        _arr = _serviceList.map((_ele1, _index1) => {
          let _childLists = _serviceIpList.filter( _item => _item.SystemServiceBundleName === _ele1.Name)  // 父 deploy / plan
         
          let _childList = _childLists

          let _childStateContrast = _childList.map( _item1 => { // 子 deploy / plan
            return _childLists.filter( _item2 => _item2.Ip === _item1.Ip) 
          })
          return {
            id: _index1 + '',
            isAllDeploy: _childLists.filter( _item => _item.Status !== 4 ).length !== 0,
            stateContrast: _childLists.filter( _item => _item.Status !== 4 ).length + '/' + _childLists.length,
            ..._ele1,
            children: _childList.map((_ele2 , _index2) => {
              return {
                id: _index1 + '-' +_index2,
                stateContrast: _ele2.Status !== 4 ? 1 : 0 + '/' + 1,
                ..._ele2
              }
            })
          }
        })
        return _arr
      },      
    }
})