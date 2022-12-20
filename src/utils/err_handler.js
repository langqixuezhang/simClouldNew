/*
 * @Author: your name
 * @Date: 2021-03-22 19:12:53
 * @LastEditTime : 2022-11-10 17:43:07
 * @LastEditors  : duhuan
 * @Description: In User Settings Edit
 * @FilePath: \jmzweb\seed\project-router-seed\src\utils\err_mid.js
 */
// import utils from './utils'
class ErrHanlder {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    // this.config = [
    //   { code: 401, msg: '没有权限' },
    //   { code: 403, msg: '请求资源不允许访问' },
    //   { code: 404, msg: '请求的内容不存在' },
    //   { code: 406, msg: '请求的资源并不符合要求' },
    //   { code: 408, msg: '客户端请求超时' },
    //   { code: 413, msg: '请求体积过大' },
    //   { code: 415, msg: '类型不正确' },
    //   { code: 416, msg: '请求的区间无效' },
    //   { code: 500, msg: '服务器错误' },
    //   { code: 501, msg: '请求还没有被实现' },
    //   { code: 502, msg: '网关错误' },
    //   { code: 503, msg: '服务暂时不可用' },
    //   { code: 504, msg: '超时，请重新请求' },
    //   { code: 505, msg: '请求的http版本不支持' }
    // ]
  }

  // 通过 token 判断是否有权限
  isToken (token) {
    if (!token) {
      this.clearSession()
      // this.toLoginPage()
    }
    return false
  }
  isHttpAjax (data) {
    try {
      switch (data.status) {
        case 401:
          // 没有权限，则返回登录页面
          this.clearSession()
          this.toLoginPage()
          return '没有权限'
        case 403:
          // 抛给后台
          return '请求资源不允许访问'
        case 404:
          // 抛给后台
          return '请求的内容不存在'
        case 406:
          // 抛给后台
          return '请求的资源并不符合要求'
        case 408:
          // 抛给web
          return '客户端请求超时'
        case 413:
          // 抛给web
          return '请求体积过大'
        case 415:
          // 抛给web
          return '类型不正确'
        case 416:
          // 抛给后台
          return '请求的区间无效'
        case 500:
          // 抛给后台
          return '服务器错误'
        case 501:
          // 抛给后台
          return '请求还没有被实现'
        case 502:
          // 抛给后台
          return '网关错误'
        case 503:
          // 抛给后台
          return '服务暂时不可用'
        case 504:
          // 抛给后台
          return '超时，请重新请求'
        case 505:
          // 抛给web
          return '请求的http版本不支持'
        default:
          return ''
      }
    } catch (err) {
      throw new Error('未知错误')
    }
  }
  isSpecialAjax (data) {
    try {
      switch (data.status) {
        case '506':
          this.clearSession()
          this.toLoginPage()
          return data.message || data.msg
        default:
          return ''
      }
    } catch (err) {
      throw new Error('未知错误')
    }
  }
  // 回退到登录页
  toLoginPage () {
    location.href = `/login`
  }
  clearSession () {
    // utils.clearStorage()
  }
}

export default new ErrHanlder()
