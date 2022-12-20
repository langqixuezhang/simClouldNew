<!--
 * @Description: new file
 * @version: 1.0.0
 * @Author: 
 * @Date: 2022-07-27 09:41:36
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-29 14:17:03
 * @FilePath: \eom-project-vue3\src\App.vue
 -->
<template>
    <router-view></router-view>
</template>

<script>
import { nextTick , ref, provide } from "vue";
// import router from './router';
// import { globalStore } from "@/store/globalManage.ts"
// import { storeToRefs } from "pinia";

// const store = globalStore()
// const { isLogin } = storeToRefs(store)

export default {
  name: 'App',
  setup () {
    const isRouterAlive = ref(true)
    const reload = () => {
      isRouterAlive.value = false
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload)
    return {
      isRouterAlive,reload
    }
  },
  mounted () {
  }
}

</script>

<style>
#app,.app {
  color: #2c3e50;
  height: 100vh;
  width:100vw;
}
</style>
