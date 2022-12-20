/*
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-07-27 14:51:14
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-12 10:54:34
 * @FilePath: \eom-project(mz-vue3)\src\router\index.js
 */

import {createRouter,createWebHashHistory,  
  // useRouter, onBeforeRouteUpdate
} from 'vue-router'
import Home from '../pages/Home/index.vue'
import Login from '../pages/Login/LoginPage.vue'

const Manage = () => import('@/pages/manage/manageIndex')
const Node = () => import('@/pages/node/nodeIndex')
const OverView = () => import('@/pages/overView/overView')


const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      if (to.path === '/') {
        next('/login')
      } else next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'manage',
        component: Manage
      },
      {
        path: 'node',
        component: Node
      },
      {
        path: 'overView',
        component: OverView
      }
    ]
  },
  // {
  //   path: '/maininterface',
  //   name: 'maininterface',
  //   component: () => import ('../pages//index.vue')
  // },
]

// let routerUrl = useRouter()
// onBeforeRouteUpdate( (to) => {
//   console.log('路由守卫', routerUrl, to)
// })

const router = createRouter({
  base: process.env.BASE_URL,
  history:createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
