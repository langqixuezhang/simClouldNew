/**
 * ajax 封装
 */

//  import md5 from 'md5'
import _ from 'lodash'
import axios from 'axios'
import util from './utils'
import { BASE_URL } from '../config'
import errHandler from './err_handler'
import Vue from 'vue'
// import HrLoading from '@/utils/HrLoading'

const http = {}

let msg = ''
let showMsgStamp = new Date().getTime()

// 公共请求参数数据
// const publicData = {}

// 获取随机数
// const getNonceStr = (len) => {}

// 获取请求 header
const getHeader = (data) => {
  return _.extend({
    'Accept': 'multipart/form-data',
  }, data)
}

// 获取 url
// const getForatUrl = url => {
//   url = url || ''
//   return url
// }

// axios 配置
const axiosConfig = {
  baseURL: BASE_URL,
  headers: getHeader(),
  timeout: 60 * 1000,
  // 是否开启cors
  withCredentials: true
}

const instance = axios.create(axiosConfig)

/**
 * 添加请求拦截器
 */
instance.interceptors.request.use(function (o) {
  o.headers = getHeader(o.headers)
  if (o.method.toUpperCase() === 'GET' || o.method.toUpperCase() === 'DELETE') {
    o.params = o.data || o.params || _.clone({}, o.data, o.params)
  }
  // HrLoading.startLoading()
  return o
}, function (err) {
  return Promise.reject(err)
})

/**
 * 添加响应拦截器
 * * */
instance.interceptors.response.use(function (res) {
  // HrLoading.endLoading()
  return res
}, function (err) {
  // HrLoading.endLoading()
  return Promise.reject(err)
})

/***
 * 添加语法糖
 * ** */
_.each(['get', 'post', 'put', 'delete'], type => {
  http[type] = async (url, o = {}) => {
    if (_.isObject(url)) {
      o = url
    } else if (_.isString(url)) {
      o.url = url
    }
    o.method = type.toUpperCase()

    // 对token检查
    const token = util.getStorage('token')
    if (url.indexOf('MidUserManagerService/Login') === -1) errHandler.isToken(token)
    // 设置ticketid
    let ticketid = util.getStorage('ticketid')
    let viewid = sessionStorage.getItem('wsId')

    instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    instance.defaults.headers.common['ticketid'] = ticketid
    instance.defaults.headers.common['viewid'] = viewid
    instance.defaults.headers.common['token'] = sessionStorage.getItem('token')
    try {
      let res = await instance.request(o)

      if (res.status === 200 && res.data) {
        // 2、res.statusCode === -1 (错误信息由后端给出)
        if (res.data.statusCode === -1) {
          if (new Date().getTime() - showMsgStamp > 1000) msg = ''
          if (msg !== res.data.msg) {
            Vue.prototype.$HrMessage({
              message: res.data.msg,
              type: 'error',
              customClass: 'hr-ui',
              offset: 55
            })
          }
          msg = res.data.msg
        }
        return Promise.resolve(res.data)
      } else {
        // 1、http发生错误 (错误信息由前端给出)
        if (res.status !== 200) {
          Vue.prototype.$HrMessage({
            message: errHandler.isHttpAjax(res),
            type: 'error',
            customClass: 'hr-ui',
            offset: 55
          })
        // 2、res.statusCode === -1 (错误信息由后端给出)
        } else if (res.status === 200 && res.data && res.data.statusCode === 0) {
          Vue.prototype.$HrMessage({
            message: res.data.msg,
            type: 'error',
            customClass: 'hr-ui',
            offset: 55
          })
        } else {
          Vue.prototype.$HrMessage({
            message: '未知错误',
            type: 'error',
            customClass: 'hr-ui',
            offset: 55
          })
        }
        return Promise.reject(res.data)
      }
    } catch (err) {
      if (err && err.response) {
        Vue.prototype.$HrMessage({
          message: errHandler.isHttpAjax(err.response),
          type: 'error',
          customClass: 'hr-ui',
          offset: 55
        })
      }
      return Promise.reject({ msg: err })
    }
  }
})

export default http
