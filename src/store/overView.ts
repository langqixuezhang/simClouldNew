/*
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-07 14:40:09
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-11 13:55:11
 * @FilePath: \sim-application-web(应用云)\src\store\index.ts
 */
import http from '@/utils/http'
import { defineStore } from 'pinia'

export const homeStore = defineStore('home' ,{
    state: () => {
        return {
            isSystemMonitor: false,   //  系统总览 || 监控
            num:12
        }
    },
    actions:  {
        // 获取系统列表
        async getSystemList ( params )  {
            try {
              const result = await http.post(`/XSim_Cloud_ApplicationService/action?command=getsystems`, { ...params })
              if (result.statusCode === 0) {
                return result
              }
            } catch (err) {
              return Promise.reject(err.msg)
            }
          },
           // 获取系统列表
        async addSystem ( params )  {
          try {
            const result = await http.post(`/XSim_Cloud_ApplicationService/action?command=addsystem`, { ...params })
            if (result.statusCode === 0) {
              return result
            }
          } catch (err) {
            return Promise.reject(err.msg)
          }
        },
        savaName(name) {
            this.name = name
        }
    }
})