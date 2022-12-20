/*
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-04 16:36:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-05 14:18:57
 * @FilePath: \sim-application-web(应用云)\vue.config.js
 */

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: './web',
  devServer: {
    open: true,
    proxy: {
        // '/api': {         
        //     // target: 'http://192.168.70.112:30002', // 接口地址
        //     target: 'http://192.168.100.77:30002/XSim_Cloud_ApplicationService', // 接口地址
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '^/XSim_Cloud_ApplicationService': ''
        //     }
        //   },
          '/api': {         
            target: 'http://192.168.100.77:30002/XSim_Cloud_ApplicationService', // 接口地址
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          },
      }
  },
})
