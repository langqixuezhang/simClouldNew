<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: duhuan
 * @Date: 2022-11-11 11:25:19
 * @LastEditors  : duhuan
 * @LastEditTime : 2022-11-11 15:14:33
 * @FilePath: \sim-application-web(应用云)\src\pages\overView\viewRg.vue
 -->
<template>
    <el-tabs v-model="activeName" calss="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="服务列表" name="frist" >
              <el-table :data="tableData" style="width:100%" @cell-dblclick="tabeDbclick">
                  <el-table-column label="服务名称">
                      <template #default="scope">
                          <span><i></i> {{ scope.row.name}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column label="版本号" prop="version">

                  </el-table-column>
                  <el-table-column label="已部署/已规划" prop="info"></el-table-column>
                  <el-table-column label="运行状态">
                      <template #default="scope">
                          <span><i></i> {{ scope.row.name}}</span>
                      </template>
                  </el-table-column>
              </el-table>
              <div ref="mainMacocoEditor" style="width: 500px; height: 300px; border: 1px solid #aaa;"></div>
          </el-tab-pane>
          <el-tab-pane label="节点列表" name="second" >节点列表</el-tab-pane>
    </el-tabs>
</template>

<script setup>
    import { ref, onMounted  } from "vue"
    // import { storeToRefs } from "pinia";
    
    import { homeStore }  from '@/store/overView.ts'
    // import * as monaco from 'monaco-editor'
    import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

    // store
    const store = homeStore()
    
    const monacoEditor = ref(null)
    const mainMacocoEditor = ref(null);
    onMounted(() => { 
        monacoEditor.value= monaco.editor.create(mainMacocoEditor.value, {
            theme: "vs-dark", // 主题
            value: '111', // 默认显示的值
            language: "javascript",
            folding: true, // 是否折叠
            foldingHighlight: true, // 折叠等高线
            foldingStrategy: "indentation", // 折叠方式  auto | indentation
            showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
            disableLayerHinting: true, // 等宽优化
            emptySelectionClipboard: false, // 空选择剪切板
            selectionClipboard: false, // 选择剪切板
            automaticLayout: true, // 自动布局
            codeLens: false, // 代码镜头
            scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
            colorDecorators: true, // 颜色装饰器
            // accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
            // lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
            // lineNumbersMinChars: 5, // 行号最小字符   number
            // enableSplitViewResizing: false,
            readOnly: true, //是否只读  取值 true | false
      });
    })
    // const { isSystemMonitor } = storeToRefs(store)
    // tab 
    const activeName = ref('frist')
    const handleClick = (  ) => {
        console.log('tab点击', )
    }
    // table 
    const tableData = [{
        name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    },{
        name:'注册中心服务',
        version: '1.0.0',
        info:'已部署',
        state:'正在运行'
    }]
    const tabeDbclick = (row) => {
        console.log('table双击', row)
        store.isSystemMonitor = true
    }

</script>

<style>

</style>