<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-07-29 18:38:25
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-08 09:21:00
 * @FilePath: \eom-project(mz-vue3)\src\pages\Login\Login.vue
 -->
<template>
  <div class="login-wrap">
    <form action="#">
      <div>
        <span>用户名:</span>
        <el-input v-model.trim="inputMode" placeholder="请输入用户名"/>
      </div>
        <div>
        <span>密码:</span>
        <el-input v-model.trim="passWord" placeholder="请输入密码"/>
      </div>
       <span class="btn-bule" @click="login()">登陆</span>
    </form>
  </div>
</template>

<script setup>
  // import  { Vue } from 'vue-property-decorator'
  import { ref } from 'vue'
  import router from '../../router'

  const inputMode = ref('')
  const passWord = ref('')
  
  const login = () => {
    router.push('/home/overView')
  }
</script>

<style scoped lang="scss">
.login-wrap {
  background-color: rgba(8,89,185, 1);
  height: 100%;
  position: relative;
  
  form {
    width: 300px;
    height: 300px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
