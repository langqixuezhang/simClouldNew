import { ElMessageBox } from "element-plus"

/*
 * @Description: 公共方法
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-15 14:10:14
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-12 14:47:14
 * @FilePath: \sim-application-web(应用云)\src\utils\handle_data.js
 */

function messageBox( value ) {
    console.log('00000000000000000000000')
    ElMessageBox.confirm(
        '确认删除' + value + '?',
        {
            confirmBottonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
        }
    )
}
function seachInput(list, name) {
    let _arr = []
    list.filter(ele => {
        if(ele.ByName.indexOf(name.value.trim()) !== -1) {
            _arr.push(ele)
        }
    })
    return _arr
}
// Ip索引
function seachInputIp(list, input) {
    let _arr = []
    list.filter(ele => {
        if(ele.Ip && ele.Ip.indexOf(input.value.trim()) !== -1) {
            _arr.push(ele)
        }
    })
    return _arr
}
export {
    messageBox,
    seachInput,
    seachInputIp
}
