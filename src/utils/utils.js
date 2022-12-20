/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/*
 * @Author: your name
 * @Date: 2021-03-19 16:11:41
 * @LastEditTime : 2021-06-23 11:30:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jmzweb\seed\project-router-seed\src\utils\utils.js
 */
/* eslint-disable no-unused-vars */
class Utils {
  // 缓存 公共方法
  getStorage (key) {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.getItem(key)
  }
  setStorage (key, val) {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.setItem(key, val)
  }
  removeStorage (key) {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.removeItem(key)
  }
  clearStorage () {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.clear()
  }
  getSecStorage (key) {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.getItem(key)
  }
  setSecStorage (key, val) {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.setItem(key, val)
  }
  removeSecStorage (key) {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.removeItem(key)
  }
  clearSecStorage () {
    const flag = !!window.sessionStorage
    return flag && sessionStorage.clear()
  }
  // cookies
  setCookie (objName, objValue, objHours) {
    let str = `${objName}=${EncodeUtf8(objValue)}`
    if (objHours > 0) {
      let date = new Date()
      let ms = objHours * 3600 * 1000
      date.setTime(date.getTime() + ms)
      str += `;expires=${data.toGMTString()}`
    }
  }
  getCookie (objName) {
    let arrStr = document.cookie.split(';')
    for (let i = 0; i < arrStr.length; i++) {
      let temp = arrStr[i].split('=')
      if (temp[0] == objName) {
        return unicodeFromUtf8(temp[1])
      }
    }
  }
  delCookie (name) {
    let date = new Date()
    date.setTime(date.getTime() - 10000)
    document.cookie = `${name}=;expires=${date.toGMTString()}`
  }
  allCookie () {
    let str = document.cookie
    if (str == '') {
      str = '没有保存任何 cookie'
    }
    return str
  }
  // 从 url 上 获取 param
  transformUrlParam (paramName) {
    let reg = new RegExp(`(^|&)${paramName}=([^&]*)(&|$)`, 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return r[2]
    return null
  }
  // 删除当前 URL 中 指定参数
  delUrlParam (paramName) {
    if (typeof paramName === 'string') {
      paramName = [paramName]
    }
    let local = window.location; let obj = {}; let arr = local.search.substr(1).split('&')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=')
      obj[arr[i][0]] = arr[i][1]
    }
    for (let i = 0; i < paramName.length; i++) {
      delete obj[paramName[i]]
    }
    let param = JSON.stringify(obj).replace(/[\"\{\}]/g, '=').replace(/\:/g, '=').replace(/\,/g, '&')
    return local.origin + local.pathname + '?' + param
  }

  title () {
    window.document.title = title || 'huaru-ui'
  }
}

export default new Utils()
