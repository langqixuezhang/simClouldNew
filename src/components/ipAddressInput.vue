<!--
 * @Description:
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-21 17:06:04
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-12-08 10:20:33
 * @FilePath: \sim-application-web(应用云)\src\components\ipAddressInput.vue
 -->

<template>
  <ul class="ip-address-input hr-ui">
    <li v-for="(item, index) in ipAddress" :key="index">
      <input ref="ipInput" v-model="item.value" class="ip-address-input__item"
        @input="checkIpVal(item,index)" @keyup="turnIpPosition(item,index)"   @change="inputDataChange" />
      <div class="ip-address-input__dot" v-if="index !== ipAddress.length-1">.</div>
    </li>
  </ul>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from "vue";

  // props
  defineProps ({
    value:String
  })
  const emit = defineEmits (['ipInputData'])

  const ipAddress = [
        {
          value: 0
        },
        {
          value: 0
        },
        {
          value: 0
        },
        {
          value: 0
        }
      ]
  const ipAddressStr = ref('')
  watch( () =>  ipAddress, (newValue) => {
    if (!newValue.value.some(ele => ele.value === '')) {
        ipAddressStr.value = ''
        for (const i in newValue.value) {
          ipAddressStr.value += newValue.value[i].value
          if (Number(i) !== newValue.value.length - 1) { ipAddressStr.value += '.' }
        }
        if (ipAddressStr.value === '000.000.000.000' || ipAddressStr.value === '0.0.0.0') {
          ipAddressStr.value = ''
        }
      }
  } )

  const checkIpVal = (item, index) => {
    let val = item.value
    val = val.toString().replace(/[^0-9]/g, '')
    val = parseInt(val, 10)
    if (isNaN(val)) {
      val = 0
    } else {
      val = val < 0 ? 0 : val
      val = val > 255 ? 255 : val
    }
    ipInput.value[index].value = val
    ipAddress[index].value = val
  }
  const inputDataChange = ()=> {
    emit('ipInputData', ipAddress)
  }
  const ipInput = ref('')
  const  turnIpPosition = (item, index)  =>  {
    let e = event || window.event
    if (e.keyCode === 37) { // 左箭头向左跳转，左一不作任何处理
      if (index !== 0 && e.currentTarget.selectionStart === 0) {
        ipInput.value[index - 1].focus()
      }
    } else if (e.keyCode === 39) { // 右箭头向左跳转，右一不作任何处理
      if (index !== 0 && e.currentTarget.selectionStart === item.value.toString().length) {
        ipInput.value[index + 1].focus()
      }
    } else if (e.keyCode === 8) { // 删除键把当前数据删除完毕后跳转到前一个input，左一不做任何处理
      if (index !== 0 && item.value === '') {
        ipInput.value[index - 1].focus()
      }
    } else if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 190) { // 回车键、空格键、冒号均向右跳转，右一不作任何处理
      if (index !== 3) {
        ipInput.value[index + 1].focus()
      }
    } else if (item.value.toString().length === 3) {  // 满3位，光标自动下一个输入框跳转
      if (index !== 3) {
        ipInput.value[index + 1].focus()
      }
    }
  }
</script>

<style scoped lang="scss">
 .ip-address-input {
   display: flex;
   box-sizing: border-box;;
   border: 1px solid #ced9e6;
   border-radius: 4px;
   width:215px;
   height: 36px;
   padding-inline-start: 0px;
 }
 .ip-address-input li {
   position: relative;
   display: flex;
   height: 36px;
   margin: 0;
   list-style-type: none;
 }
  .ip-address-input li div{
   position: relative;
   bottom: 8px;
   right: 0;
   border-radius: 50%;
   background: #f2f5f8;
  //  width: 2px;
  //  height:2px
  
 }
  .ip-address-input li:last-child div{
    display: none;
 }
  .ip-address-input input:focus{
    outline: none;
 }
 .ip-address-input__item {
   border: none;
   width: 49px;
   height:36px;
   text-align: center;
   background: transparent;
 }
.ip-address-input li .ip-address-input__dot {
  margin-top:15px;
  background: #fff;
}
</style>
