<!--
 * @Description: 二级弹窗
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-07-31 12:37:31
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-08-02 20:05:49
 * @FilePath: \eom-project(mz-vue3)\src\components\popup-dialog\hr-seconday-dialog.vue
 -->
<template>
  <div class="alert-box" >
      <section class="header">
          <aside class="left"></aside>
          <aside class="right"></aside>
          <aside class="middle">
              <div class="case-left"></div>
              <div class="case-midle"></div>
              <div class="case-right"></div>
          </aside>
          <aside class="left"></aside>
          <aside class="left"></aside>
          <aside class="header-hot-tip-left"></aside>
          <aside class="header-hot-tip-right"></aside>
      </section>
       <section>
         <div class="alertHeader" v-if="customHeader"  @mousedown="$emit('handleAlertMouseDown')" @mouseup="$emit('handleAlertMouseUp')">
            <div></div>
            <div class="titleText"><span>{{title}}</span> </div>
            <div> <i @click="$emit('deleteAlert')" style="margin-top:10px;cursor: pointer;font-size: 16px;" class="h-dialog__close h-icon h-icon-close"></i></div>
          </div> 
          <slot name="continer">
            cscsscs
          </slot> 
      </section>
  </div>
</template>

<script>

export default {
  name: 'HrSecondaryDialog',
  // setup: {
  // },
  props: {
      title: {
      type: String,
          default: '标题'
      },
      width: {
          type: Number
      },
      height: {
          type: Number
      },
      customHeader: {
          type: Boolean,
          default: true
      }
  },
   computed: {
    alertClassx () {
      return 'width:' + this.width + 'px;'
    },
    alertClassy () {
      return 'min-height:' + this.height + 'px;'
    },
    alertHeaderx () {
      return 'width:' + (this.width - 2) + 'px'
    },
    transform () {
      return (
        'position:relative;left:' +
        (1920 - this.width) / 2 +
        'px;top:' +
        ((1080 - this.height) / 2 - 75) +
        'px'
      )
    }
  }
}
</script>

<style>

</style>