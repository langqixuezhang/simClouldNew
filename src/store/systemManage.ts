/*
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-11 15:31:37
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-05 16:13:55
 * @FilePath: \sim-application-web(应用云)\src\store\systemManage.ts
 */

import http from '@/utils/http'
import { defineStore } from 'pinia'

export const manageStore = defineStore('manage' ,{
    state: () => {
        return {
            firstPage:1, //  1 系统管理 || 2 维护 || 3 配置 
            secondPage: 0,   //  1 历史 || 2 添加配置 || 3 编辑配置
            isMaintain: false,   //  系统管理 || 维护
            isHistory:false, // 历史版本
            isHostPage:0, // 1 容器 0 主机 是否为主机（系统维护）
        }
    },
    actions:  {
        routerStart () {
            this.firstPage = 1 
            this.secondPage = 0 
        },
        setHostPage(index) {
            this.isHistory = index
        }
    }
})