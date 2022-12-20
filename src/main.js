/*
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-07-27 09:43:08
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-13 16:43:23
 * @FilePath: \eom-project(mz-vue3)\src\main.js
 */

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import "/src/assets/styles/common.css"
import "@/assets/styles/common.scss"
import "@/assets/styles/ued/ued_index.scss"
import "@/assets/styles/element_modify.scss"
import router from './router/index'
import { createPinia } from 'pinia'
import localeCn from '@/assets/locale/cn.js'


const pinia = createPinia()
const app = createApp(App)
import locale from 'element-plus/lib/locale/lang/zh-cn'

for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}
app.use(pinia)
app.use(router)
// app.use(Pagination, {
//     localeCn
//   })
app.use(ElementPlus,{ size:'small;', zIndex:1000, locale,localeCn })
app.mount('#app')
